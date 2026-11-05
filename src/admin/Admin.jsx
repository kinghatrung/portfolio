import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, ExternalLink, LogOut } from "lucide-react";
import Fields, { iconButtonClass } from "./Fields";
import { clearToken, getToken, loadContent, saveContent } from "./github";
import { move, sections } from "./schema";

const ORDER_TAB = "order";

const SectionOrder = ({ order, onChange }) => (
  <div>
    <p className="mb-4 text-sm text-slate-400">Thứ tự hiển thị từ trên xuống, menu cũng đi theo thứ tự này.</p>
    <ol className="space-y-2">
      {order.map((id, i) => {
        const title = sections.find((s) => s.id === id)?.title ?? id;
        return (
          <li key={id} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/2 px-3 py-2">
            <span className="w-6 text-xs font-bold text-slate-500">{i + 1}</span>
            <span className="flex-1 text-sm font-medium text-slate-200">{title}</span>
            <button
              type="button"
              className={iconButtonClass}
              disabled={i === 0}
              aria-label={`Chuyển ${title} lên`}
              onClick={() => onChange(move(order, i, -1))}
            >
              <ArrowUp size={14} />
            </button>
            <button
              type="button"
              className={iconButtonClass}
              disabled={i === order.length - 1}
              aria-label={`Chuyển ${title} xuống`}
              onClick={() => onChange(move(order, i, 1))}
            >
              <ArrowDown size={14} />
            </button>
          </li>
        );
      })}
    </ol>
  </div>
);

const Admin = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(null);
  const [draft, setDraft] = useState(null);
  const [sha, setSha] = useState(null);
  const [tab, setTab] = useState(ORDER_TAB);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [loadError, setLoadError] = useState("");
  const authed = Boolean(getToken());

  const dirty = draft && JSON.stringify(draft) !== JSON.stringify(saved);

  useEffect(() => {
    if (!authed) return;
    loadContent()
      .then(({ content, sha: fileSha }) => {
        setSaved(content);
        setDraft(content);
        setSha(fileSha);
      })
      .catch((err) => setLoadError(err.message));
  }, [authed]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!authed) return <Navigate to="/admin-login" replace />;

  const logout = () => {
    if (dirty && !window.confirm("Bạn có thay đổi chưa lưu. Vẫn đăng xuất?")) return;
    clearToken();
    navigate("/admin-login", { replace: true });
  };

  const save = async () => {
    setSaving(true);
    setNotice(null);
    try {
      const result = await saveContent(draft, sha);
      setSha(result.sha);
      setSaved(draft);
      setNotice({ text: "Đã lưu. Site sẽ cập nhật sau khi host deploy xong.", link: result.commitUrl });
    } catch (err) {
      setNotice({ error: true, text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const topBar = (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-white/10 bg-primary/95 px-4 py-3 backdrop-blur">
      <h1 className="mr-auto text-base font-bold text-slate-100">Quản trị</h1>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
      >
        <ExternalLink size={14} /> Xem site
      </a>
      {draft && (
        <>
          <button
            type="button"
            disabled={!dirty || busy || saving}
            onClick={() => setDraft(saved)}
            className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Hoàn tác
          </button>
          <button
            type="button"
            disabled={!dirty || busy || saving}
            onClick={save}
            className="rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </>
      )}
      <button
        type="button"
        onClick={logout}
        aria-label="Đăng xuất"
        className="rounded-lg p-2 text-slate-300 hover:bg-white/10"
      >
        <LogOut size={16} />
      </button>
    </header>
  );

  if (!draft) {
    return (
      <div className="admin-root min-h-screen">
        <meta name="robots" content="noindex" />
        {topBar}
        <p role={loadError ? "alert" : "status"} className={`p-6 text-sm ${loadError ? "text-red-400" : "text-slate-400"}`}>
          {loadError || "Đang tải nội dung..."}
        </p>
      </div>
    );
  }

  const section = sections.find((s) => s.id === tab);
  const tabs = [{ id: ORDER_TAB, title: "Thứ tự section" }, ...sections];

  return (
    <div className="admin-root min-h-screen">
      <meta name="robots" content="noindex" />
      {topBar}
      {notice && (
        <p
          role={notice.error ? "alert" : "status"}
          className={`border-b border-white/10 px-4 py-2 text-sm ${notice.error ? "text-red-400" : "text-emerald-400"}`}
        >
          {notice.text}{" "}
          {notice.link && (
            <a href={notice.link} target="_blank" rel="noopener noreferrer" className="underline">
              Xem commit
            </a>
          )}
        </p>
      )}
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4 md:flex-row">
        <nav aria-label="Các mục quản trị" className="md:w-48 md:shrink-0">
          <ul className="flex gap-1 overflow-x-auto md:flex-col">
            {tabs.map((t) => (
              <li key={t.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? "page" : undefined}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                    tab === t.id ? "bg-accent-blue/15 text-accent-blue" : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  {t.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="min-w-0 flex-1">
          <h2 className="mb-4 text-lg font-bold text-slate-100">{section?.title ?? "Thứ tự section"}</h2>
          <fieldset disabled={busy} className={busy ? "opacity-60" : undefined}>
            {section ? (
              <Fields
                key={section.id}
                fields={section.fields}
                value={draft[section.id]}
                onChange={(next) => setDraft({ ...draft, [section.id]: next })}
                setBusy={setBusy}
              />
            ) : (
              <SectionOrder
                order={draft.sectionOrder}
                onChange={(sectionOrder) => setDraft({ ...draft, sectionOrder })}
              />
            )}
          </fieldset>
        </main>
      </div>
    </div>
  );
};

export default Admin;
