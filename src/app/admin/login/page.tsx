"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { parseApiError } from "@/utils/parse-api-error";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@ellen.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data?.message;
        setErrors(Array.isArray(msg) ? msg : [msg || "Erro ao fazer login"]);
        return;
      }

      sessionStorage.setItem('admin_token', data.token);
      router.push(data.redirect);
    } catch (err) {
      setErrors(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, maxWidth: 400 }}>
      <h1>Admin Login</h1>
      <div>
        <label>Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
      </div>
      <div>
        <label>Senha</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
      </div>
      {errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
