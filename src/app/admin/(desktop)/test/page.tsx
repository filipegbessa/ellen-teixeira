'use client';

import { useState, useEffect, FormEvent } from 'react';
import adminApi from '@/lib/admin-api';
import { parseApiError } from '@/utils/parse-api-error';
import type { Media } from '@/types/admin';

function decodeTokenPayload(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function TestPage() {
  const [identity, setIdentity] = useState({ email: '', role: '' });
  const [patientId, setPatientId] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Media | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      const payload = decodeTokenPayload(token);
      if (payload) setIdentity({ email: payload.email ?? '', role: payload.role ?? '' });
    }
  }, []);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file || !patientId) return;

    setErrors([]);
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);

      const res = await adminApi.post<Media>(
        `/patients/${patientId}/media`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      setResult(res.data);
    } catch (err) {
      setErrors(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Página de Teste — Admin</h1>
      <p>Logado como: <strong>{identity.email || '—'}</strong> | role: <strong>{identity.role || '—'}</strong></p>
      <hr />
      <h2>Upload de Mídia</h2>
      <form onSubmit={handleUpload}>
        <div style={{ marginBottom: 8 }}>
          <label>ID do Paciente</label><br />
          <input
            type="number"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Título</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Arquivo (imagem)</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />
        </div>
        {errors.map((err, i) => (
          <p key={i} style={{ color: 'red' }}>{err}</p>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 16, background: '#f0f0f0', padding: 12 }}>
          <h3>Resposta da API</h3>
          <p>Code: {result.code}</p>
          <p>driveFileId: {result.driveFileId}</p>
          <p>
            <a href={result.driveUrl} target="_blank" rel="noopener noreferrer">
              Abrir no Drive
            </a>
          </p>
          <pre style={{ fontSize: 12 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
