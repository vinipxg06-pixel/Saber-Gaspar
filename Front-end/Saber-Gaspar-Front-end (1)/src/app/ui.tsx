import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useNav } from "./store";

export const C = {
  green: "#1B6B3A",
  greenDark: "#155c30",
  ink: "#0D2318",
  muted: "#4A6B54",
  bg: "#F2F7F4",
  amber: "#C8860A",
  amberBg: "#FEF3C7",
  red: "#B91C1C",
  card: "#ffffff",
};

export const cardStyle: CSSProperties = {
  background: C.card,
  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  border: "1.5px solid rgba(0,0,0,0.05)",
};

/** Cabeçalho verde das telas internas. */
export function Header({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  const { back, canBack } = useNav();
  return (
    <div
      className="px-4 pt-3 pb-4 shrink-0 flex items-center gap-3"
      style={{ background: "linear-gradient(175deg, #1B6B3A 0%, #155c30 100%)" }}
    >
      {canBack && (
        <button
          onClick={back}
          aria-label="Voltar"
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 active:scale-95"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <ArrowLeft size={18} color="#fff" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-white text-lg font-black leading-tight truncate" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.65)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {right}
    </div>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex-1 min-h-0 overflow-y-auto no-scrollbar ${className}`}>
      <div className="px-4 pt-5 pb-8">{children}</div>
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: C.green, letterSpacing: "0.08em" }}>
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Btn({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  loading,
  full = true,
  small,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger" | "soft";
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  small?: boolean;
}) {
  const styles: Record<string, CSSProperties> = {
    primary: { background: C.green, color: "#fff" },
    soft: { background: "#E3F2E8", color: C.green },
    ghost: { background: "transparent", color: C.green, border: `1.5px solid ${C.green}` },
    danger: { background: "#FEE2E2", color: C.red },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${full ? "w-full" : ""} ${small ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"} rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60`}
      style={styles[variant]}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  multiline,
  required = true,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  required?: boolean;
  min?: string;
}) {
  const common = {
    value,
    required,
    placeholder,
    autoComplete,
    onChange: (e: any) => onChange(e.target.value),
    className: "w-full px-4 py-3 rounded-2xl text-sm font-semibold outline-none focus:ring-2",
    style: { background: "#fff", border: "1.5px solid rgba(27,107,58,0.18)", color: C.ink, "--tw-ring-color": C.green } as CSSProperties,
  };
  return (
    <label className="block mb-3">
      <span className="block text-xs font-black mb-1.5" style={{ color: C.muted }}>
        {label}
      </span>
      {multiline ? <textarea rows={4} {...common} /> : <input type={type} min={min} {...common} />}
    </label>
  );
}

export function Loading({ texto = "Carregando…" }: { texto?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-10" style={{ color: C.muted }}>
      <Loader2 className="animate-spin" size={22} />
      <span className="text-xs font-bold">{texto}</span>
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl p-4 flex flex-col items-center text-center gap-2" style={{ background: "#FEE2E2", color: C.red }}>
      <AlertCircle size={22} />
      <p className="text-sm font-bold">{message}</p>
      {onRetry && (
        <Btn variant="danger" onClick={onRetry} full={false} small>
          Tentar novamente
        </Btn>
      )}
    </div>
  );
}

export function Empty({ icon, title, text }: { icon: ReactNode; title: string; text?: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-10 px-6" style={{ color: C.muted }}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#E3F2E8", color: C.green }}>
        {icon}
      </div>
      <p className="text-sm font-black" style={{ color: C.ink }}>
        {title}
      </p>
      {text && <p className="text-xs font-semibold leading-relaxed">{text}</p>}
    </div>
  );
}

/* ---------- datas ---------- */
const MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
export function partesData(iso: string) {
  const d = new Date(iso);
  return { dia: String(d.getDate()).padStart(2, "0"), mes: MESES[d.getMonth()], d };
}
export function horaCurta(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes();
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}
export function dataLonga(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}
export function paraInputLocal(iso: string): string {
  return iso.slice(0, 16); // yyyy-MM-ddTHH:mm
}
