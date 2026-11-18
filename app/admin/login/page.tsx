"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase";

export default function Login() {
  const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const [error,setError] = useState(""); const [busy,setBusy] = useState(false);
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const db = supabaseBrowser();
      const { error } = await db.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/admin"); router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "No se pudo iniciar sesión."); }
    finally { setBusy(false); }
  }
  return <main className="admin-shell"><form className="login-card" onSubmit={submit}>
    <a className="brand" href="/">ORÍGENES<span>®</span><small>ESTUDIO CREATIVO</small></a>
    <p className="eyebrow">PANEL PRIVADO</p><h1>Qué bueno<br/>tenerte de vuelta.</h1>
    <label>Correo electrónico<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="tu correo"/></label>
    <label>Contraseña<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Tu contraseña"/></label>
    {error && <p className="error">{error}</p>}
    <button className="button dark full" disabled={busy}>{busy ? "Ingresando…" : "Iniciar sesión"}</button>
    <a className="backlink" href="/">← Volver al sitio</a>
  </form></main>;
}
