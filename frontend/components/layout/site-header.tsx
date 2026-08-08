"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#platform", label: "Platform" },
  { href: "/#process", label: "Process" },
  { href: "/results", label: "Solutions" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isConsole = pathname.startsWith("/interview");

  if (isConsole) {
    return (
      <header className="z-50 border-b border-secondary-container bg-surface">
        <div className="flex h-14 w-full items-center justify-between px-4">
          <Link
            href="/"
            className="font-headline text-headline-sm tracking-tighter text-brand"
          >
            Crimson Sentinel
          </Link>
          <span className="font-label text-label-caps uppercase text-muted-foreground">
            Interview Console
          </span>
        </div>
      </header>
    );
  }

  return (
    <header className="z-50 border-b border-secondary-container bg-surface">
      <div className="mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link
          href="/"
          className="font-headline text-headline-lg font-semibold tracking-tighter text-brand"
        >
          Crimson Sentinel
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/results"
                ? pathname.startsWith("/results")
                : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-body text-body-md font-medium text-on-surface-variant transition-colors duration-200 hover:text-brand",
                  active &&
                    "border-b-2 border-brand pb-1 font-semibold text-brand opacity-90"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/setup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hidden rounded bg-primary-container px-6 font-code text-code-md text-white hover:bg-primary-container/90 hover:opacity-90 md:inline-flex"
          )}
        >
          Start Interview
        </Link>

        <button
          type="button"
          className="p-2 text-on-surface-variant md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-secondary-container px-margin-mobile py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-body-md text-on-surface-variant"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/setup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full rounded bg-primary-container font-code text-code-md text-white"
              )}
              onClick={() => setOpen(false)}
            >
              Start Interview
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
