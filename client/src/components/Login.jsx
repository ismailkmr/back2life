import React, { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.password) next.password = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onLogin) onLogin(form);
  };

  return (
    <div
      style={{
        background: "#EFEAD9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .adm-input {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #D8D2BE;
          border-radius: 6px;
          padding: 10px 12px 10px 38px;
          color: #2E2A1D;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color .15s ease;
        }
        .adm-input:focus { border-color: #A6821E; }
        .adm-input::placeholder { color: #A39C82; }
        .adm-label {
          display: block;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #8A8266;
          margin-bottom: 6px;
        }
        .adm-error { color: #B3552F; font-size: 12px; margin-top: 4px; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#FFFFFF",
          border: "1px solid #E4DEC9",
          borderRadius: 12,
          padding: "36px 34px",
          boxShadow: "0 1px 2px rgba(60,50,20,0.04)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 26 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#F6F1E4",
              border: "1px solid #E4DEC9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <BookOpen size={20} color="#A6821E" />
          </div>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#A6821E",
              marginBottom: 6,
            }}
          >
            Admissions portal
          </span>
          <h1
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: 26,
              color: "#2E2A1D",
              margin: 0,
            }}
          >
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label className="adm-label" htmlFor="email">Email</label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                color="#A39C82"
                style={{ position: "absolute", left: 12, top: 12 }}
              />
              <input
                id="email"
                className="adm-input"
                type="email"
                placeholder="you@school.edu"
                value={form.email}
                onChange={handleChange("email")}
              />
            </div>
            {errors.email && <div className="adm-error">{errors.email}</div>}
          </div>

          <div style={{ marginBottom: 10 }}>
            <label className="adm-label" htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                color="#A39C82"
                style={{ position: "absolute", left: 12, top: 12 }}
              />
              <input
                id="password"
                className="adm-input"
                style={{ paddingRight: 38 }}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 9,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                  display: "flex",
                }}
              >
                {showPassword ? (
                  <EyeOff size={16} color="#A39C82" />
                ) : (
                  <Eye size={16} color="#A39C82" />
                )}
              </button>
            </div>
            {errors.password && <div className="adm-error">{errors.password}</div>}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "14px 0 22px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#5C5540", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ accentColor: "#A6821E" }}
              />
              Remember me
            </label>
            <a href="#" style={{ fontSize: 13, color: "#A6821E", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#A6821E",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 6,
              padding: "12px 0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <LogIn size={16} /> Sign in
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 22, fontSize: 13, color: "#8A8266" }}>
          Don't have an account?{" "}
          <a href="#" style={{ color: "#A6821E", fontWeight: 500, textDecoration: "none" }}>
            Request access
          </a>
        </div>
      </div>
    </div>
  );
}