import LegalBackLink from "@/shared/components/LegalBackLink";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function LegalSection({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function LegalPageLayout({ title, lastUpdated, children }) {
  const location = useLocation();

  return (

    
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <div className="fixed top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        {/* <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link> */}
                <LegalBackLink />

        <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-zinc-500">Last updated: {lastUpdated}</p>
          )}
        </header>

        <article>{children}</article>
      


        <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">
          <p>
            Questions? Visit our{" "}
            <Link
              to="/support"
              state={location.state}
              className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
            >
              Support Center
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

export { LegalPageLayout, LegalSection };