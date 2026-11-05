import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getToken, login } from "./github";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (getToken()) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="admin-root flex min-h-screen items-center justify-center p-4">
      <meta name="robots" content="noindex" />
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-white/10 bg-tertiary p-6 sm:p-8">
        <h1 className="text-xl font-bold text-slate-100">Đăng nhập quản trị</h1>
        <label className="mt-6 block">
          <span className="mb-1 block text-xs font-semibold text-slate-300">GitHub token</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-accent-blue focus:outline-none"
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-accent-blue px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Đang kiểm tra..." : "Đăng nhập"}
        </button>
        <details className="mt-6 text-xs leading-relaxed text-slate-400">
          <summary>Tạo token lần đầu</summary>
          <ol className="mt-2 list-decimal space-y-1 pl-4">
            <li>
              Mở{" "}
              <a
                className="text-accent-blue underline"
                href="https://github.com/settings/personal-access-tokens/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                trang tạo token của GitHub
              </a>
              .
            </li>
            <li>Ở Repository access, chọn Only select repositories và chọn repo portfolio.</li>
            <li>Ở Permissions, đặt Contents thành Read and write.</li>
            <li>Tạo token, dán vào ô trên và để trình duyệt lưu như một mật khẩu.</li>
          </ol>
        </details>
      </form>
    </main>
  );
};

export default AdminLogin;
