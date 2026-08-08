import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto w-full border-t border-secondary-container bg-surface">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between px-margin-mobile py-12 md:flex-row md:px-margin-desktop">
        <div className="mb-4 md:mb-0">
          <span className="font-headline text-headline-sm text-brand">
            Crimson Sentinel
          </span>
          <p className="mt-2 font-code text-code-md text-on-surface-variant">
            © 2026 Crimson Sentinel. Engineering-Grade Evaluation.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 font-code text-code-md text-on-surface-variant">
          <Link className="transition-colors hover:text-on-surface" href="#">
            Documentation
          </Link>
          <Link className="transition-colors hover:text-on-surface" href="#">
            System Status
          </Link>
          <Link className="transition-colors hover:text-on-surface" href="#">
            Privacy
          </Link>
          <Link className="transition-colors hover:text-on-surface" href="#">
            Security
          </Link>
        </nav>
      </div>
    </footer>
  );
}
