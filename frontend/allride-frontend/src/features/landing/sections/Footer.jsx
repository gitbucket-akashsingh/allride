function Footer() {
  return (
    <div className=" bg-black text-white overflow-hidden">
      <footer className="bg-black border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black">AllRide</h3>
            <p className="text-gray-500 mt-2">Modern ride-sharing platform.</p>
          </div>

          <div className="flex gap-8 text-gray-400 text-sm font-medium">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
