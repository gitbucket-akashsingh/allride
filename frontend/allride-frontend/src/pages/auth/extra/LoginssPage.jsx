function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-white/10">
        <h1 className="text-3xl font-black mb-8">Login</h1>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-2xl bg-zinc-800 border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-2xl bg-zinc-800 border border-white/10"
          />

          <button className="w-full p-4 rounded-2xl bg-yellow-500 text-black font-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
