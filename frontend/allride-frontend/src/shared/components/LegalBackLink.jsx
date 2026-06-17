import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function LegalBackLink() {
  const { state } = useLocation();

  const returnTo = state?.returnTo ?? "/";
  const label =
    state?.returnLabel ??
    (returnTo === "/" ? "Back to Home" : "Back to Profile");

  return (
    <Link
      to={returnTo}
      className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition mb-8"
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  );
}

export default LegalBackLink;