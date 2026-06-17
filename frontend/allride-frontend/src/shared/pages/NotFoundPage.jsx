import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-md">
        <p className="text-yellow-400 font-semibold mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl font-black mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-yellow-500 text-black font-bold hover:scale-[1.02] transition-transform"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;