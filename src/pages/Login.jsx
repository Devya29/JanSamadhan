import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Landmark, Eye, EyeOff, Loader2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LogoMark } from "@/components/shared/Logo";

// NOTE: This app runs on a mock data/service layer (see /src/services).
// Sign-in below performs client-side validation and then activates the
// selected role locally — there is no real auth/session server yet.
// TODO(backend): swap handleSubmit / handleGoogle for real calls to an
// auth API (email+password) and an OAuth 2.0 / OpenID Connect flow for
// "Continue with Google", then persist the session instead of context state.

function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 7.1 29.5 5 24 5c-7.7 0-14.4 4.4-17.7 10.7z" />
      <path fill="#4CAF50" d="M24 45c5.4 0 10.3-2 14-5.4l-6.5-5.5c-2 1.5-4.6 2.4-7.5 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.5 40.6 16.2 45 24 45z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.5 5.5C41 36 45 30.7 45 24c0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export default function Login() {
  const { setRole } = useApp();
  const navigate = useNavigate();

  const [role, setRoleTab] = useState("citizen");
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const go = (r) => {
    setRole(r);
    navigate(`/${r}`);
  };

  const validate = () => {
    if (mode === "signup" && name.trim().length < 2) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      go(role);
    }, 450);
  };

  const handleGoogle = () => {
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      go(role);
    }, 450);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-[380px] max-h-full overflow-y-auto py-6">
        <Link to="/" className="text-xs text-muted-foreground hover:text-teal transition-colors mb-5 inline-flex items-center gap-1">
          <ArrowLeft size={12} /> Back to home
        </Link>

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-6">
          <LogoMark size={40} />
          <div>
            <p className="jc-heading font-bold text-[16px] leading-none text-foreground">Jansamadhan</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Civic Problem Intelligence</p>
          </div>
        </div>

        <h1 className="font-display text-[22px] font-semibold text-foreground mb-5">
          {mode === "signin" ? "Sign in to continue" : "Create your account"}
        </h1>

        {/* Role toggle */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-secondary rounded-xl p-1 border border-border">
          <button
            type="button"
            onClick={() => setRoleTab("citizen")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              role === "citizen" ? "bg-white text-teal shadow-sm border border-teal/30" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User size={15} /> Citizen
          </button>
          <button
            type="button"
            onClick={() => setRoleTab("authority")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              role === "authority" ? "bg-white text-slate-700 shadow-sm border border-slate-300" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Landmark size={15} /> Authority
          </button>
        </div>

        {/* Email/password form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-5 flex flex-col gap-4" noValidate>
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Singh"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground block">
                Password
              </label>
              {mode === "signin" && (
                <button type="button" className="text-xs text-teal hover:underline">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-danger bg-danger/10 border border-danger/25 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 py-2.5 bg-teal text-white rounded-lg text-sm font-semibold hover:opacity-90 glow-teal disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"} as {role === "citizen" ? "Citizen" : "Authority"}
          </button>

          <div className="flex items-center gap-3 my-0.5">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="flex items-center justify-center gap-2.5 py-2.5 bg-white text-[#1F1F1F] rounded-lg text-sm font-semibold border border-border hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
            }}
            className="text-teal hover:underline font-medium"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>

        <p className="text-[11px] text-muted-foreground/70 text-center mt-4">
          Demo mode — sign-in is mocked on the frontend; no real backend is connected yet.
        </p>
      </div>
    </div>
  );
}
