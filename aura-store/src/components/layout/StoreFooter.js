"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

const shopLinks = [
  { label: "Apparel", filter: "apparel" },
  { label: "Living & Objects", filter: "living" },
  { label: "Footwear", filter: "Handcrafted Footwear" },
  { label: "Leather Accessories", filter: "accessories" },
  { label: "Digital Vouchers", filter: "gift-cards" },
];

const footerGroups = [
  {
    title: "Client service",
    links: [
      "Atelier Concierge",
      "Complimentary Shipping",
      "Exchanges & Returns",
      "Order Tracking",
      "Garment Care Guide",
    ],
  },
  {
    title: "Company",
    links: [
      "The Atelier Story",
      "Sustainability Charter",
      "Press & Editorials",
      "Careers",
      "Seasonal Archives",
    ],
  },
];

function openCatalogFilter(filter) {
  window.dispatchEvent(
    new CustomEvent("aura:catalog-search", {
      detail: { filter },
    }),
  );
}

export default function StoreFooter() {
  const [signupMessage, setSignupMessage] = useState("");

  function handleSubscribe(event) {
    event.preventDefault();
    setSignupMessage("Newsletter sign-up is coming soon.");
  }

  return (
    <footer
      className="mt-16 w-full bg-surface-low text-ink sm:mt-20"
      id="store-footer"
    >
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-14 lg:px-12 lg:pt-16">
        <section
          aria-labelledby="footer-newsletter-title"
          className="mb-10 flex flex-col items-start justify-between gap-6 bg-surface p-5 sm:mb-12 sm:p-8 lg:flex-row lg:items-center lg:gap-10 lg:p-10"
        >
          <div className="max-w-xl">
            <span className="eyebrow mb-2 block">Private archives</span>
            <h2
              className="mb-2 font-serif text-[25px] leading-tight tracking-tight text-ink sm:text-[30px]"
              id="footer-newsletter-title"
            >
              First access to curations &amp; seasonal drops
            </h2>
            <p className="max-w-lg text-sm leading-6 text-muted">
              Receive deliberate editorial notes, member-exclusive atelier
              invites, and advance lookbooks.
            </p>
          </div>

          <form
            className="w-full lg:w-auto lg:min-w-[460px]"
            onSubmit={handleSubscribe}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                autoComplete="email"
                className="min-h-12 min-w-0 flex-1 border border-transparent bg-surface-low px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink-300"
                id="footer-email"
                name="email"
                placeholder="Enter your email address"
                required
                type="email"
              />
              <button
                className="min-h-12 bg-obsidian px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:bg-obsidian-hover sm:px-7"
                type="submit"
              >
                Subscribe
              </button>
            </div>
            <p
              aria-live="polite"
              className="mt-2 flex min-h-4 items-center gap-1.5 text-xs text-muted"
              role="status"
            >
              {signupMessage && (
                <>
                  <Check aria-hidden="true" size={13} />
                  {signupMessage}
                </>
              )}
            </p>
          </form>
        </section>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-ink-200/70 py-7 sm:gap-x-10 md:grid-cols-4 md:gap-y-8 md:py-10">
          <nav aria-label="Shop">
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-ink">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="footer-link"
                    href="#catalog"
                    onClick={(event) => {
                      event.preventDefault();
                      openCatalogFilter(link.filter);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {footerGroups.map((group) => (
            <nav aria-label={group.title} key={group.title}>
              <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-ink">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li className="footer-link" key={link}>
                    {link}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section aria-labelledby="footer-repositories-title">
            <h3
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-ink"
              id="footer-repositories-title"
            >
              Repositories
            </h3>
            <p className="text-[13px] leading-5 text-muted">
              Curated from Paris, Kyoto, and New York. Pieces produced in
              numbered batches.
            </p>
            <ul
              aria-label="Accepted payment methods"
              className="mt-4 flex flex-wrap items-center gap-1.5"
            >
              {["VISA", "MASTERCARD", "AMEX", "APPLE PAY"].map((payment) => (
                <li
                  className="bg-surface px-2 py-1.5 text-[8px] font-semibold tracking-[0.08em] text-body"
                  key={payment}
                >
                  {payment}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-6 text-center text-xs text-muted md:flex-row md:gap-4 md:text-left">
          <p>
            © {new Date().getFullYear()} AURA Living &amp; Apparel Inc. All
            rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
            <span className="footer-link">
              Privacy Policy
            </span>
            <span className="footer-link">
              Terms of Service
            </span>
            <span className="inline-flex items-center gap-2">
              United States (USD $)
              <span aria-hidden="true" className="text-ink-300">
                ·
              </span>
              English (US)
            </span>
            <a
              aria-label="Back to top"
              className="ml-1 inline-flex h-8 w-8 items-center justify-center border border-ink-200 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              href="#top"
            >
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
