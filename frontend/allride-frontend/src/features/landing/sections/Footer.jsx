import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-zinc-100 text-zinc-900 dark:bg-black dark:text-white overflow-hidden">
      <footer id="footer" className="bg-zinc-100 dark:bg-black border-t border-zinc-200 dark:border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">AllRide</h3>
            <p className="text-zinc-500 dark:text-gray-500 mt-2">Modern ride-sharing platform.</p>
          </div>

          <div className="flex gap-8 text-zinc-500 dark:text-gray-400 text-sm font-medium">
          <Link to="/privacy" className="hover:text-yellow-500 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-yellow-500 transition">Terms</Link>
          <Link to="/support" className="hover:text-yellow-500 transition">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
