import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Em construção — Fase 0.5</p>
      <Link href="/admin/test">→ Ir para página de teste de upload</Link>
    </div>
  );
}
