"use client";

import {
  ArrowRight,
  ChevronDown,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import catalog from "../../data/aura-catalog.json";

const products = catalog.products;
const currency = new Intl.NumberFormat(catalog.store.locale, {
  style: "currency",
  currency: catalog.store.currency,
  maximumFractionDigits: 0,
});
const cartStorageKey = "aura-shopping-bag";
const categories = [...new Set(products.map((product) => product.category))];
const emptyCart = [];
let cartSnapshot = [];
let cartInitialized = false;
const cartSubscribers = new Set();

function subscribeToCart(subscriber) {
  cartSubscribers.add(subscriber);
  return () => cartSubscribers.delete(subscriber);
}

function getCartSnapshot() {
  return cartSnapshot;
}

function getServerCartSnapshot() {
  return emptyCart;
}

function notifyCartSubscribers() {
  cartSubscribers.forEach((subscriber) => subscriber());
}

function initializeCart() {
  if (cartInitialized) return;
  cartInitialized = true;
  cartSnapshot = loadSavedCart();
  notifyCartSubscribers();
}

function updateShoppingBag(update) {
  cartSnapshot = update(cartSnapshot);
  notifyCartSubscribers();
  try {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(cartSnapshot));
  } catch (error) {
    console.error("Unable to save the AURA shopping bag.", error);
  }
}

const editorialLinks = [
  { label: "Shop all", filter: "all" },
  { label: "New arrivals", filter: "new-arrivals" },
  { label: "Curated classics", filter: "best-sellers" },
  { label: "Private sale", filter: "offers" },
];

function getProductCount(filter) {
  if (filter === "new-arrivals") {
    return products.filter((product) => product.flags?.isNewArrival).length;
  }
  if (filter === "best-sellers") {
    return products.filter((product) => product.flags?.isBestSeller).length;
  }
  if (filter === "offers") {
    return products.filter((product) => product.discountPercentage > 0).length;
  }
  return products.length;
}

function getFilterLabel(filter) {
  if (filter === "new-arrivals") return "New arrivals";
  if (filter === "best-sellers") return "Curated classics";
  if (filter === "offers") return "Private sale";
  if (filter === "apparel") return "Apparel";
  if (filter === "living") return "Living & Objects";
  if (filter === "accessories") return "Accessories";
  if (filter === "gift-cards") return "Digital Vouchers";
  return categories.includes(filter) ? filter : "The collection";
}

function matchesFilter(product, filter) {
  if (filter === "all") return true;
  if (filter === "new-arrivals") return product.flags?.isNewArrival;
  if (filter === "best-sellers") return product.flags?.isBestSeller;
  if (filter === "offers") return product.discountPercentage > 0;
  if (filter === "apparel") {
    return [
      "Outerwear & Tailoring",
      "Knitwear & Cashmere",
      "Pants & Trousers",
      "Shirts & Tunics",
      "Tops & Tunics",
      "Dresses & Columns",
      "Handcrafted Footwear",
    ].includes(product.category);
  }
  if (filter === "living") {
    return ["Living & Objects", "Ceramics & Vessels"].includes(product.category);
  }
  if (filter === "accessories") {
    return (
      /jewelry|accessories|leather|scents|extracts/i.test(product.category) ||
      /scarf/i.test(product.name)
    );
  }
  if (filter === "gift-cards") return false;
  return product.category === filter;
}

function loadSavedCart() {
  try {
    const savedCart = window.localStorage.getItem(cartStorageKey);
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) {
      throw new TypeError("Saved shopping bag must be an array.");
    }

    return parsedCart.filter(
      (item) =>
        item &&
        products.some((product) => product.id === item.id) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch (error) {
    console.error("Unable to restore the saved AURA shopping bag.", error);
    return [];
  }
}

export default function StoreHeader() {
  const [activePanel, setActivePanel] = useState(null);
  const [collectionExpanded, setCollectionExpanded] = useState(true);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuQuery, setMenuQuery] = useState("");
  const searchInputRef = useRef(null);
  const cart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.id),
        }))
        .filter((item) => item.product),
    [cart],
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const shippingThreshold = catalog.store.activeCampaign.freeShippingThreshold;
  const remainingForShipping = Math.max(shippingThreshold - subtotal, 0);
  const shippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return products
      .filter((product) => {
        if (!matchesFilter(product, activeFilter)) return false;
        if (!normalizedQuery) {
          return activeFilter !== "all" || product.flags?.isFeatured;
        }

        const searchableText = [
          product.name,
          product.category,
          product.brand,
          product.shortDescription,
          ...(product.badges ?? []),
        ]
          .join(" ")
          .toLocaleLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [activeFilter, query]);

  const openSearch = useCallback((filter = "all", initialQuery = "") => {
    setActiveFilter(filter);
    setQuery(initialQuery);
    setActivePanel("search");
  }, []);

  useEffect(() => {
    initializeCart();
  }, []);

  useEffect(() => {
    if (activePanel === "search") searchInputRef.current?.focus();
    if (!activePanel) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") setActivePanel(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePanel]);

  useEffect(() => {
    function handleSearchShortcut(event) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLocaleLowerCase() === "k"
      ) {
        event.preventDefault();
        setActivePanel("search");
      }
    }

    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  useEffect(() => {
    function handleCatalogSearch(event) {
      openSearch(event.detail?.filter ?? "all");
    }

    window.addEventListener("aura:catalog-search", handleCatalogSearch);
    return () =>
      window.removeEventListener("aura:catalog-search", handleCatalogSearch);
  }, [openSearch]);

  const addToCart = useCallback((productId) => {
    updateShoppingBag((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...currentCart, { id: productId, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, change) => {
    updateShoppingBag((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    updateShoppingBag((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  }, []);

  function chooseFilter(filter) {
    openSearch(filter);
  }

  function submitMenuSearch(event) {
    event.preventDefault();
    setActivePanel(null);
    openSearch("all", menuQuery);
    setMenuQuery("");
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-surface/95 shadow-[0_1px_8px_rgba(17,17,17,0.06)] backdrop-blur-xl"
        id="top"
      >
        <div className="hidden border-b border-border bg-surface-low md:block">
          <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted xl:px-12">
            <span>USD ($) <span className="px-1 text-ink-300">/</span> EN</span>
            <p className="text-center">
              <span className="text-clay">AURA Atelier</span>
              <span className="px-2 text-ink-300">—</span>
              Complimentary courier on orders over {currency.format(shippingThreshold)}
            </p>
            <span className="tracking-[0.18em]">Private client services</span>
          </div>
        </div>

        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[82px] lg:px-12">
          <div className="flex items-center gap-1 lg:hidden">
            <button
              aria-label="Open navigation menu"
              aria-expanded={activePanel === "menu"}
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-clay"
              onClick={() => setActivePanel("menu")}
              type="button"
            >
              <Menu aria-hidden="true" size={22} strokeWidth={1.6} />
            </button>
            <button
              aria-label="Search the catalog"
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-clay sm:hidden"
              onClick={() => openSearch()}
              type="button"
            >
              <Search aria-hidden="true" size={20} strokeWidth={1.6} />
            </button>
          </div>

          <button
            aria-label="AURA home"
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-obsidian lg:static lg:translate-x-0 lg:items-start"
            onClick={() => {
              setActivePanel(null);
              setQuery("");
              setActiveFilter("all");
            }}
            type="button"
          >
            <span className="font-serif text-[25px] leading-none tracking-[0.2em] lg:text-[27px]">
              AURA
            </span>
            <span className="mt-1 text-[8px] uppercase leading-none tracking-[0.24em] text-muted">
              Living &amp; Apparel
            </span>
          </button>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            <button
              className="store-header__nav-link"
              onClick={() => chooseFilter("all")}
              type="button"
            >
              Shop
            </button>
            <button
              className="store-header__nav-link inline-flex items-center gap-1"
              onClick={() => setActivePanel("menu")}
              type="button"
            >
              Collections <ChevronDown aria-hidden="true" size={13} />
            </button>
            <button
              className="store-header__nav-link"
              onClick={() => chooseFilter("new-arrivals")}
              type="button"
            >
              New arrivals
            </button>
            <button
              className="store-header__nav-link"
              onClick={() => chooseFilter("best-sellers")}
              type="button"
            >
              Best sellers
            </button>
            <button
              className="store-header__nav-link"
              onClick={() => chooseFilter("offers")}
              type="button"
            >
              Offers
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-3">
            <button
              aria-label="Search the catalog (Ctrl+K)"
              className="hidden h-10 items-center gap-2 rounded-full bg-surface-low px-3 text-muted transition-colors hover:text-obsidian sm:flex lg:px-3.5"
              onClick={() => openSearch()}
              type="button"
            >
              <Search aria-hidden="true" size={17} strokeWidth={1.6} />
              <span className="hidden text-xs md:inline">Search atelier...</span>
              <kbd className="hidden rounded bg-surface px-1.5 py-0.5 text-[9px] tracking-wide text-muted xl:inline">
                Ctrl K
              </kbd>
            </button>
            <button
              aria-label={`Open shopping bag${cartCount ? `, ${cartCount} items` : ""}`}
              aria-expanded={activePanel === "cart"}
              className="relative flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-clay"
              onClick={() => setActivePanel("cart")}
              type="button"
            >
              <ShoppingBag aria-hidden="true" size={21} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-clay px-1 text-[9px] font-semibold leading-none text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {activePanel && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close panel"
            className="absolute inset-0 bg-obsidian/35 backdrop-blur-[2px]"
            onClick={() => setActivePanel(null)}
            type="button"
          />

          <section
            aria-label={
              activePanel === "menu"
                ? "Navigation menu"
                : activePanel === "cart"
                  ? "Shopping bag"
                  : "Search the catalog"
            }
            aria-modal="true"
            className={`absolute inset-y-0 flex w-full flex-col overflow-hidden bg-neutral shadow-2xl sm:w-[min(100vw,480px)] ${
              activePanel === "menu"
                ? "left-0"
                : "right-0"
            } ${activePanel === "search" ? "sm:w-[min(100vw,600px)]" : ""}`}
            role="dialog"
          >
            {activePanel === "menu" && (
              <>
                <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
                  <button
                    className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-clay"
                    onClick={() => setActivePanel(null)}
                    type="button"
                  >
                    <X aria-hidden="true" size={17} />
                    Close
                  </button>
                  <span className="font-serif text-lg tracking-[0.2em] text-obsidian">
                    AURA
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                    USD · EN
                  </span>
                </div>

                <form
                  className="px-5 pb-4 pt-5"
                  onSubmit={submitMenuSearch}
                  role="search"
                >
                  <label className="sr-only" htmlFor="drawer-search">
                    Search the catalog
                  </label>
                  <div className="flex items-center gap-3 rounded-sm bg-surface-low px-4 py-3 focus-within:ring-1 focus-within:ring-clay">
                    <Search aria-hidden="true" className="shrink-0 text-muted" size={18} />
                    <input
                      className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                      id="drawer-search"
                      onChange={(event) => setMenuQuery(event.target.value)}
                      placeholder="Search pieces, materials, collections..."
                      type="search"
                      value={menuQuery}
                    />
                    <button
                      aria-label="Submit catalog search"
                      className="text-muted transition-colors hover:text-clay"
                      type="submit"
                    >
                      <ArrowRight aria-hidden="true" size={18} />
                    </button>
                  </div>
                </form>

                <div className="mx-5 mb-4 flex items-center justify-between rounded-sm bg-surface-low px-3.5 py-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    Complimentary courier
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clay">
                    Orders over {currency.format(shippingThreshold)}
                  </span>
                </div>

                <nav
                  aria-label="Catalog navigation"
                  className="flex-1 overflow-y-auto px-5 pb-8"
                >
                  <div className="divide-y divide-border border-y border-border">
                    {editorialLinks.slice(0, 2).map((link) => (
                      <button
                        className="group flex w-full items-center justify-between py-4 text-left"
                        key={link.filter}
                        onClick={() => chooseFilter(link.filter)}
                        type="button"
                      >
                        <span className="font-serif text-[22px] tracking-tight text-ink transition-transform group-hover:translate-x-1">
                          {link.label}
                        </span>
                        <span className="flex items-center gap-2 text-[10px] tracking-wider text-muted">
                          [{getProductCount(link.filter)}]
                          <ArrowRight aria-hidden="true" size={15} />
                        </span>
                      </button>
                    ))}

                    <div className="py-4">
                      <button
                        aria-expanded={collectionExpanded}
                        className="flex w-full items-center justify-between text-left"
                        onClick={() => setCollectionExpanded((expanded) => !expanded)}
                        type="button"
                      >
                        <span className="font-serif text-[22px] tracking-tight text-ink">
                          Collections
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`text-muted transition-transform ${collectionExpanded ? "rotate-180" : ""}`}
                          size={19}
                        />
                      </button>
                      {collectionExpanded && (
                        <div className="mt-3 space-y-0.5 rounded-sm bg-surface-low p-3">
                          {categories.map((category) => (
                            <button
                              className="group flex w-full items-center justify-between gap-3 py-2 text-left text-[13px] text-body"
                              key={category}
                              onClick={() => chooseFilter(category)}
                              type="button"
                            >
                              <span className="transition-transform group-hover:translate-x-1">
                                {category}
                              </span>
                              <span className="text-[10px] text-muted">
                                {products.filter((product) => product.category === category).length}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {editorialLinks.slice(2).map((link) => (
                      <button
                        className="group flex w-full items-center justify-between py-4 text-left"
                        key={link.filter}
                        onClick={() => chooseFilter(link.filter)}
                        type="button"
                      >
                        <span className="font-serif text-[22px] tracking-tight text-ink transition-transform group-hover:translate-x-1">
                          {link.label}
                        </span>
                        <span className="flex items-center gap-2 text-[10px] tracking-wider text-muted">
                          [{getProductCount(link.filter)}]
                          <ArrowRight aria-hidden="true" size={15} />
                        </span>
                      </button>
                    ))}
                  </div>
                </nav>
                <div className="border-t border-border bg-surface px-5 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Considered pieces, made to be kept
                </div>
              </>
            )}

            {activePanel === "search" && (
              <>
                <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 sm:px-7">
                  <div>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-clay">
                      AURA Atelier
                    </span>
                    <h2 className="mt-1 font-serif text-[22px] leading-tight text-ink">
                      Search the collection
                    </h2>
                  </div>
                  <button
                    aria-label="Close search"
                    className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-obsidian"
                    onClick={() => setActivePanel(null)}
                    type="button"
                  >
                    <X aria-hidden="true" size={20} />
                  </button>
                </div>

                <div className="border-b border-border bg-surface px-5 pb-5 pt-4 sm:px-7">
                  <label className="sr-only" htmlFor="catalog-search">
                    Search products and collections
                  </label>
                  <div className="flex items-center gap-3 border-b border-ink-300 pb-3 focus-within:border-obsidian">
                    <Search aria-hidden="true" className="shrink-0 text-muted" size={19} />
                    <input
                      className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
                      id="catalog-search"
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setActiveFilter("all");
                      }}
                      placeholder="Try linen, ceramics, knitwear..."
                      ref={searchInputRef}
                      type="search"
                      value={query}
                    />
                    {query && (
                      <button
                        aria-label="Clear search"
                        className="text-muted hover:text-ink"
                        onClick={() => setQuery("")}
                        type="button"
                      >
                        <X aria-hidden="true" size={16} />
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">
                    {query.trim()
                      ? `${searchResults.length} matching ${searchResults.length === 1 ? "piece" : "pieces"}`
                      : getFilterLabel(activeFilter)}
                    <span className="float-right hidden font-normal normal-case tracking-normal sm:inline">
                      Press Esc to close
                    </span>
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-border">
                      {searchResults.map((product) => {
                        const quantityInCart =
                          cart.find((item) => item.id === product.id)?.quantity ?? 0;
                        return (
                          <article
                            className="flex items-center gap-4 py-4 first:pt-0"
                            key={product.id}
                          >
                            <div
                              aria-hidden="true"
                              className="flex h-[76px] w-[66px] shrink-0 items-center justify-center bg-tertiary font-serif text-xl text-ink-500"
                            >
                              {product.name
                                .split(" ")
                                .slice(0, 2)
                                .map((word) => word[0])
                                .join("")}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.13em] text-clay">
                                {product.category}
                              </p>
                              <h3 className="mt-1 line-clamp-2 font-serif text-[16px] leading-snug text-ink">
                                {product.name}
                              </h3>
                              <p className="mt-1 text-[13px] font-medium text-body">
                                {currency.format(product.price)}
                              </p>
                            </div>
                            <button
                              aria-label={`Add ${product.name} to shopping bag`}
                              className="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-ink transition-colors hover:border-obsidian hover:bg-obsidian hover:text-white"
                              onClick={() => addToCart(product.id)}
                              type="button"
                            >
                              {quantityInCart > 0 ? (
                                <span className="text-xs font-semibold">{quantityInCart}</span>
                              ) : (
                                <Plus aria-hidden="true" size={17} strokeWidth={1.6} />
                              )}
                            </button>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex min-h-48 flex-col items-center justify-center text-center">
                      <Search aria-hidden="true" className="mb-3 text-ink-300" size={25} />
                      <p className="font-serif text-xl text-ink">No pieces found</p>
                      <p className="mt-1 max-w-xs text-sm text-muted">
                        Try another name, material, or collection.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activePanel === "cart" && (
              <>
                <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 sm:px-7">
                  <div>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-clay">
                      AURA Atelier
                    </span>
                    <h2 className="mt-1 font-serif text-[22px] leading-tight text-ink">
                      Your shopping bag
                      <span className="ml-2 font-sans text-sm font-normal text-muted">
                        ({cartCount})
                      </span>
                    </h2>
                  </div>
                  <button
                    aria-label="Close shopping bag"
                    className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-obsidian"
                    onClick={() => setActivePanel(null)}
                    type="button"
                  >
                    <X aria-hidden="true" size={20} />
                  </button>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    <div className="border-b border-border bg-surface-low px-5 py-4 sm:px-7">
                      <p className="mb-2 text-[11px] text-body">
                        {remainingForShipping > 0
                          ? `You are ${currency.format(remainingForShipping)} away from complimentary courier.`
                          : "Your order qualifies for complimentary courier."}
                      </p>
                      <div
                        aria-label={`${Math.round(shippingProgress)}% of the way to complimentary courier`}
                        className="h-1 w-full bg-ink-100"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(shippingProgress)}
                      >
                        <div
                          className="h-full bg-clay transition-[width] duration-300"
                          style={{ width: `${shippingProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 sm:px-7">
                      <div className="divide-y divide-border">
                        {cartItems.map(({ product, quantity }) => (
                          <article className="flex gap-4 py-5" key={product.id}>
                            <div
                              aria-hidden="true"
                              className="flex h-[94px] w-[78px] shrink-0 items-center justify-center bg-tertiary font-serif text-2xl text-ink-500"
                            >
                              {product.name
                                .split(" ")
                                .slice(0, 2)
                                .map((word) => word[0])
                                .join("")}
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col justify-between">
                              <div>
                                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-clay">
                                  {product.category}
                                </p>
                                <h3 className="mt-1 font-serif text-[16px] leading-snug text-ink">
                                  {product.name}
                                </h3>
                                <p className="mt-1 text-[13px] text-body">
                                  {currency.format(product.price)}
                                </p>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <div
                                  aria-label={`Quantity: ${quantity}`}
                                  className="flex h-8 items-center border border-border"
                                >
                                  <button
                                    aria-label={`Decrease ${product.name} quantity`}
                                    className="flex h-full w-8 items-center justify-center text-muted transition-colors hover:text-ink"
                                    onClick={() => updateQuantity(product.id, -1)}
                                    type="button"
                                  >
                                    <Minus aria-hidden="true" size={13} />
                                  </button>
                                  <span className="min-w-6 text-center text-xs">{quantity}</span>
                                  <button
                                    aria-label={`Increase ${product.name} quantity`}
                                    className="flex h-full w-8 items-center justify-center text-muted transition-colors hover:text-ink"
                                    onClick={() => updateQuantity(product.id, 1)}
                                    type="button"
                                  >
                                    <Plus aria-hidden="true" size={13} />
                                  </button>
                                </div>
                                <button
                                  aria-label={`Remove ${product.name} from shopping bag`}
                                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-clay"
                                  onClick={() => removeFromCart(product.id)}
                                  type="button"
                                >
                                  <Trash2 aria-hidden="true" size={13} />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border bg-surface px-5 pb-6 pt-5 sm:px-7">
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        <span>Subtotal</span>
                        <span className="text-sm tracking-normal text-ink">
                          {currency.format(subtotal)}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] text-muted">
                        Taxes and delivery are calculated at checkout.
                      </p>
                      <button
                        className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 bg-obsidian px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white opacity-65"
                        disabled
                        type="button"
                      >
                        Checkout coming soon
                        <ArrowRight aria-hidden="true" size={15} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                    <ShoppingBag aria-hidden="true" className="mb-5 text-ink-300" size={32} strokeWidth={1.3} />
                    <p className="font-serif text-2xl text-ink">Your bag is waiting</p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
                      Discover thoughtful pieces from the AURA collection.
                    </p>
                    <button
                      className="mt-6 inline-flex items-center gap-2 border border-obsidian px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-obsidian transition-colors hover:bg-obsidian hover:text-white"
                      onClick={() => openSearch()}
                      type="button"
                    >
                      Explore the collection
                      <ArrowRight aria-hidden="true" size={14} />
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
