import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2, Upload } from "lucide-react";
import { uploadImage } from "./github";
import { emptyItem, move } from "./schema";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-accent-blue focus:outline-none";
export const iconButtonClass =
  "rounded-md border border-white/10 p-1.5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent";

// A new upload isn't on the site until the host redeploys, so show the local file until then.
const localPreviews = new Map();

const Label = ({ field }) => <span className="mb-1 block text-xs font-semibold text-slate-300">{field.label}</span>;
const Hint = ({ field }) => field.hint && <span className="mt-1 block text-xs text-slate-500">{field.hint}</span>;

function StringList({ field, value = [], onChange }) {
  const separator = field.type === "tags" ? "," : "\n";
  const join = (items) => items.join(field.type === "tags" ? ", " : "\n");
  const [state, setState] = useState({ text: join(value), emitted: value });

  // Typing keeps the raw text (trailing comma, half-typed line); outside changes (undo, reorder) replace it.
  if (state.emitted !== value) setState({ text: join(value), emitted: value });

  const handleChange = (e) => {
    const items = e.target.value
      .split(separator)
      .map((s) => s.trim())
      .filter(Boolean);
    setState({ text: e.target.value, emitted: items });
    onChange(items);
  };

  const Input = field.type === "tags" ? "input" : "textarea";
  return (
    <div>
      <label className="block">
        <Label field={field} />
        <Input className={inputClass} rows={6} value={state.text} onChange={handleChange} />
      </label>
      <Hint field={field} />
    </div>
  );
}

function ImageField({ field, value = "", onChange, setBusy }) {
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setBusy(true); // Form is locked while uploading, so this onChange can't overwrite newer edits.
    try {
      const path = await uploadImage(file);
      localPreviews.set(path, URL.createObjectURL(file));
      onChange(path);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label className="block">
        <Label field={field} />
        <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      </label>
      <div className="mt-2 flex items-center gap-3">
        {value && (
          <img
            src={localPreviews.get(value) || value}
            alt=""
            className="h-12 w-12 rounded-lg border border-white/10 bg-white/5 object-contain"
          />
        )}
        <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 focus-within:border-accent-blue">
          <Upload size={14} />
          Tải ảnh lên
          <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function ListField({ field, value = [], onChange, setBusy }) {
  const [addedIndex, setAddedIndex] = useState(null);
  // Buttons sit inside <summary>; preventDefault stops them toggling it.
  const act = (fn) => (e) => {
    e.preventDefault();
    fn();
  };

  return (
    <div>
      <Label field={field} />
      <Hint field={field} />
      <div className="mt-2 space-y-2">
        {value.map((item, i) => {
          const title = item[field.itemLabel] || `Mục ${i + 1}`;
          return (
            <details key={i} open={i === addedIndex} className="rounded-xl border border-white/10 bg-white/2">
              <summary className="flex items-center gap-2 px-3 py-2">
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-200">{title}</span>
                <button
                  type="button"
                  className={iconButtonClass}
                  disabled={i === 0}
                  aria-label={`Chuyển ${title} lên`}
                  onClick={act(() => onChange(move(value, i, -1)))}
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  className={iconButtonClass}
                  disabled={i === value.length - 1}
                  aria-label={`Chuyển ${title} xuống`}
                  onClick={act(() => onChange(move(value, i, 1)))}
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  className={iconButtonClass}
                  aria-label={`Xóa ${title}`}
                  onClick={act(() => {
                    if (window.confirm(`Xóa "${title}"?`)) onChange(value.filter((_, j) => j !== i));
                  })}
                >
                  <Trash2 size={14} />
                </button>
              </summary>
              <div className="border-t border-white/10 p-3">
                <Fields
                  fields={field.fields}
                  value={item}
                  onChange={(next) => onChange(value.map((x, j) => (j === i ? next : x)))}
                  setBusy={setBusy}
                />
              </div>
            </details>
          );
        })}
      </div>
      <button
        type="button"
        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
        onClick={() => {
          setAddedIndex(value.length);
          onChange([...value, emptyItem(field.fields)]);
        }}
      >
        <Plus size={14} /> Thêm
      </button>
    </div>
  );
}

function Field({ field, value, onChange, setBusy }) {
  switch (field.type) {
    case "tags":
    case "lines":
      return <StringList field={field} value={value} onChange={onChange} />;
    case "image":
      return <ImageField field={field} value={value} onChange={onChange} setBusy={setBusy} />;
    case "list":
      return <ListField field={field} value={value} onChange={onChange} setBusy={setBusy} />;
    case "select":
      return (
        <label className="block">
          <Label field={field} />
          <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    case "color":
      return (
        <label className="block">
          <Label field={field} />
          <span className="flex items-center gap-2">
            <input
              type="color"
              className="h-9 w-14 rounded-lg border border-white/10 bg-transparent"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className="text-xs text-slate-400">{value}</span>
          </span>
        </label>
      );
    default: {
      const Input = field.type === "textarea" ? "textarea" : "input";
      return (
        <div>
          <label className="block">
            <Label field={field} />
            <Input
              className={inputClass}
              rows={field.type === "textarea" ? 4 : undefined}
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </label>
          <Hint field={field} />
        </div>
      );
    }
  }
}

export default function Fields({ fields, value, onChange, setBusy }) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <Field
          key={field.key}
          field={field}
          value={value[field.key]}
          onChange={(next) => onChange({ ...value, [field.key]: next })}
          setBusy={setBusy}
        />
      ))}
    </div>
  );
}
