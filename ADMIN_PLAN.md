# Plano de Implementação — Admin Panel

Guia de referência para a implementação do painel administrativo dentro do projeto `ellen-teixeira`.

---

## Contexto

O admin consome a `ellen-api` (NestJS + PostgreSQL) e oferece duas experiências:

- **`/admin/(desktop)/*`** — painel completo para uso no computador
- **`/admin/mobile/*`** — experiência simplificada para uso diário no celular

Ao acessar `/admin`, o middleware detecta o dispositivo e redireciona automaticamente. Se o usuário acessar diretamente `/admin/mobile` pelo desktop (ou vice-versa), a interface respectiva é exibida sem forçar redirecionamento — o link acessado é respeitado.

---

## Pré-requisitos na ellen-api

Todas as alterações necessárias na ellen-api antes de iniciar o frontend.

### ✅ Fase 0 — `driveFileId` no SELECT_MEDIA (concluído)

Adicionado `driveFileId: true` ao `SELECT_MEDIA` em `media.service.ts`.
Permite ao frontend construir a URL de preview das imagens:
```
https://drive.google.com/thumbnail?id={driveFileId}&sz=w400
```

### Fase 0 — `driveFileId` no MediaResponseDto (pendente)

O campo foi adicionado ao `SELECT_MEDIA` mas o DTO ainda não o reflete.
Não quebra runtime, mas o tipo está desatualizado:

```typescript
// src/media/media.dto.ts
export class MediaResponseDto {
  // ...campos existentes...
  driveFileId: string; // adicionar
}
```

---

## Instalações

```bash
# UI
npx shadcn@latest init
npx shadcn@latest add button input label card table badge dialog sheet \
  select textarea tabs separator skeleton toast avatar dropdown-menu \
  form popover calendar

# Server state
npm install @tanstack/react-query @tanstack/react-query-devtools

# Formulários e validação
npm install react-hook-form zod @hookform/resolvers

# Datas
npm install date-fns

# Gráfico
npm install recharts

# Auth (leitura de JWT no middleware)
npm install jose

# Cookie no client
npm install js-cookie
npm install -D @types/js-cookie
```

---

## Variáveis de ambiente

Adicionar ao `.env.local` e no painel do Vercel:

```env
# URL da ellen-api (mesmo valor de REVIEWS_API_URL)
ADMIN_API_URL=https://ellen-api-dun.vercel.app

# Mesmo JWT_SECRET da ellen-api — usado pelo middleware para verificar o token localmente
JWT_SECRET=seu-segredo-aqui
```

---

## Estrutura de pastas

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx                    # Auth check + AdminProvider (sem shell visual)
│       ├── page.tsx                      # Redirect por device → dashboard ou mobile/home
│       ├── login/
│       │   └── page.tsx                  # Página de login (sem sidebar/bottom nav)
│       │
│       ├── (desktop)/                    # Route group — não aparece na URL
│       │   ├── layout.tsx                # Shell desktop: Sidebar + Header
│       │   ├── dashboard/page.tsx
│       │   ├── patients/
│       │   │   ├── page.tsx
│       │   │   ├── new/page.tsx
│       │   │   └── [id]/
│       │   │       ├── page.tsx
│       │   │       └── media/page.tsx
│       │   ├── transactions/
│       │   │   ├── page.tsx
│       │   │   ├── new/page.tsx
│       │   │   ├── [id]/page.tsx
│       │   │   └── comparison/page.tsx
│       │   ├── users/
│       │   │   ├── page.tsx
│       │   │   └── new/page.tsx
│       │   └── reviews/
│       │       └── page.tsx
│       │
│       └── mobile/                       # /admin/mobile/* na URL
│           ├── layout.tsx                # Shell mobile: BottomNav
│           ├── home/page.tsx
│           ├── transactions/
│           │   ├── page.tsx
│           │   └── new/page.tsx
│           └── patients/
│               ├── page.tsx
│               └── [id]/page.tsx
│
├── app/
│   └── api/
│       └── admin/
│           ├── auth/
│           │   └── route.ts              # POST → login, seta cookie
│           └── auth/logout/
│               └── route.ts             # DELETE → apaga cookie, redirect login
│
├── middleware.ts                         # Protege /admin/*, redirect na raiz
│
├── lib/
│   ├── api.ts                           # Existente (reviews públicas)
│   └── admin-api.ts                     # Novo — axios com interceptors de auth
│
├── hooks/
│   └── admin/
│       ├── use-patients.ts
│       ├── use-transactions.ts
│       ├── use-users.ts
│       ├── use-media.ts
│       └── use-reviews.ts
│
├── components/
│   ├── ui/                              # shadcn (gerado automaticamente)
│   ├── admin/
│   │   ├── layout/
│   │   │   ├── AdminShell.tsx           # Desktop: Sidebar + Header + conteúdo
│   │   │   ├── AdminSidebar.tsx         # Links por role, drawer no tablet
│   │   │   └── AdminHeader.tsx          # Usuário logado + logout
│   │   ├── shared/
│   │   │   ├── DataTable.tsx            # Tabela genérica paginada
│   │   │   ├── StatCard.tsx             # Card de métrica
│   │   │   ├── PageHeader.tsx           # Título + botão de ação
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── ConfirmDialog.tsx        # Confirmação antes de deletar
│   │   └── forms/
│   │       ├── PatientForm.tsx
│   │       ├── TransactionForm.tsx      # Campos dinâmicos por tipo (CREDIT/DEBIT)
│   │       ├── UserForm.tsx
│   │       └── MediaUploadForm.tsx
│   └── mobile/
│       ├── layout/
│       │   ├── MobileShell.tsx
│       │   └── BottomNav.tsx            # 4 abas: Home, Lançamentos, Pacientes, Perfil
│       └── shared/
│           ├── TransactionCard.tsx      # Card compacto de lançamento
│           ├── PatientCard.tsx
│           └── QuickAmountInput.tsx     # Input numérico grande, touch-friendly
│
├── providers/
│   ├── QueryProvider.tsx                # TanStack Query (Client Component)
│   └── AdminProvider.tsx               # Context com role + dados do usuário logado
│
├── utils/
│   ├── format.ts                        # formatBRL, formatDate, formatCPF, parseCPF
│   ├── parse-api-error.ts              # normaliza string | string[] → string[]
│   └── drive.ts                         # buildThumbnailUrl, isImage
│
└── types/
    └── admin.ts                         # Todos os tipos: User, Patient, Transaction, Media, ApiError, ApiPaginated<T>
```

---

## Auth — fluxo completo

### Login

```
User submete { email, password }
  → POST /api/admin/auth (Route Handler Next.js)
    → chama ellen-api POST /auth/login
    → recebe { access_token }
    → seta cookie: {
        name: "admin_token",
        value: token,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 43200   // 12h — mesmo valor do JWT_EXPIRES_IN da ellen-api
      }
  → detecta device → redirect /admin/dashboard ou /admin/mobile/home
```

### Middleware (`middleware.ts`)

```
Toda request para /admin/* (exceto /admin/login)
  → lê cookie "admin_token"
  → sem cookie ou expirado → redirect /admin/login
  → verifica assinatura com jose (sem chamar a API)
  → válido → extrai { role } do payload → injeta header x-user-role
  → segue para a página

GET /admin (raiz)
  → token válido → detecta User-Agent
    ├── mobile  → redirect /admin/mobile/home
    └── desktop → redirect /admin/dashboard
```

### Role em Client Components (`AdminProvider`)

```
app/admin/layout.tsx (Server Component)
  → lê header x-user-role injetado pelo middleware
  → renderiza <AdminProvider role={role}>
      → expõe useAdmin() para qualquer componente filho
```

### Logout

```
Clica em "Sair"
  → DELETE /api/admin/auth/logout (Route Handler)
    → apaga cookie "admin_token"
    → redirect /admin/login
```

---

## API client — `src/lib/admin-api.ts`

Instância axios separada da pública com dois interceptors:

**Request** — injeta o token em todo request:
```typescript
// lê cookie "admin_token" via js-cookie (client) ou cookies() do next/headers (server)
// adiciona Authorization: Bearer <token>
```

**Response** — trata erros globalmente:
```typescript
// 401 → apaga cookie → redirect /admin/login
// 403 → redirect para página de acesso negado
// demais erros → repassa para o TanStack Query tratar
```

---

## Utilitários — `src/utils/`

### `format.ts`
```typescript
formatBRL(value: number): string
// Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
// 1500 → "R$ 1.500,00"

formatDate(iso: string): string
// date-fns: dd/MM/yyyy

formatDatetime(iso: string): string
// date-fns: dd/MM/yyyy HH:mm

formatCPF(raw: string): string
// "12345678900" → "123.456.789-00"

parseCPF(formatted: string): string
// "123.456.789-00" → "12345678900"
```

### `parse-api-error.ts`
```typescript
parseApiError(error: unknown): string[]
// AxiosError com message: string  → [message]
// AxiosError com message: string[] → message
// Qualquer outra coisa → ["Erro inesperado"]
```

### `drive.ts`
```typescript
buildThumbnailUrl(driveFileId: string, size = 400): string
// → `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w${size}`

isImage(mimeType: string): boolean
// → mimeType.startsWith('image/')
```

---

## Controle de acesso por role

| Seção | ADMIN | MANAGER | VIEWER |
|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ |
| Pacientes | ✅ | ✅ | ✅ |
| Mídia | ✅ | ✅ | ✅ |
| Transações | ✅ | ✅ | ✅ |
| Comparison | ✅ | ✅ | ❌ |
| Usuários | ✅ | ❌ | ❌ |
| Reviews | ✅ | ✅ | ✅ |

- `AdminSidebar` esconde itens não permitidos pelo role
- Páginas restritas verificam o role via `useAdmin()` e retornam `403` se necessário

---

## Páginas — Desktop

### `/admin/login`
- Form: email + senha
- Validação: `z.string().email()` + `z.string().min(1)`
- Chama `POST /api/admin/auth`
- Erro exibe `parseApiError()` abaixo do form

### `/admin/dashboard`
Queries em paralelo via TanStack Query:
- `GET /transactions/summary` → NF pendentes
- `GET /transactions/comparison` → créditos, débitos, saldo
- `GET /patients?limit=1` → campo `total`
- `GET /reviews/summary` → avaliação média

Layout: 4 `StatCard` + gráfico de barras Recharts (últimos 6 meses) + tabela das últimas 5 transações

### `/admin/patients`
- `DataTable`: Nome, CPF (formatado), Cadastro, Ações
- Busca com debounce 400ms → query param `?search=`
- Paginação URL-based → `?page=&limit=`
- Botão "Novo paciente"

### `/admin/patients/new`
- `PatientForm`: nome*, CPF* (com formatação automática ao digitar)
- Sucesso → redirect `/admin/patients/:id`

### `/admin/patients/[id]`
Tabs:
- **Dados**: `PatientForm` pré-preenchido → `PATCH /patients/:id`
- **Arquivos**: grade de cards
  - Imagem → `<img>` com `buildThumbnailUrl(driveFileId)` + link para abrir no Drive
  - Outro tipo → ícone por extensão (PDF, DOC…) + nome do arquivo
  - Botão upload → Dialog com `MediaUploadForm` (arquivo + título + descrição opcional, máx 20MB)
  - Botão remover → `ConfirmDialog` → `DELETE /patients/:patientId/media/:id`

### `/admin/transactions`
- `DataTable`: Data, Tipo (badge verde/vermelho), Paciente, Descrição, Valor (BRL), NF, Ações
- Toolbar: filtro tipo (CREDIT/DEBIT), data início/fim (Calendar), busca livre
- Paginação URL-based
- Linha clicável → editar

### `/admin/transactions/new` e `/admin/transactions/[id]`
`TransactionForm` com campos dinâmicos por tipo:
- **CREDIT**: data*, valor*, pagamento*, paciente (autocomplete), procedimento, NF emitida (toggle)
- **DEBIT**: data*, valor*, pagamento*, pago a, observações

Edit: botão "Excluir" → `ConfirmDialog` → `DELETE /transactions/:id`

### `/admin/transactions/comparison` *(ADMIN + MANAGER)*
- Filtros: período início/fim
- 3 `StatCard`: total créditos, total débitos, saldo
- `BarChart` Recharts: barras agrupadas por mês (verde = crédito, vermelho = débito)
- Tabela de breakdown por forma de pagamento

### `/admin/users` *(ADMIN only)*
- `DataTable`: Nome, Email, Role (badge), Cadastro
- Edição inline via Dialog (sem página separada)
- Botão "Novo usuário" → `/admin/users/new`

### `/admin/users/new`
- `UserForm`: nome*, email*, senha*, role* (select: ADMIN / MANAGER / VIEWER)
- Submit → `POST /users`

### `/admin/reviews`
- `DataTable` read-only: Autor, Estrelas, Texto (truncado), Data
- Card no topo: média + total (`GET /reviews/summary`)

---

## Páginas — Mobile

Filosofia: **uma ação por tela, touch-friendly, sem tabelas**.

### `/admin/mobile/home`
- Saldo do mês em destaque (grande)
- NF pendentes
- Botões rápidos: `+ Entrada` / `+ Saída`
- Lista das últimas 5 transações do dia (cards compactos)

### `/admin/mobile/transactions`
- Lista cronológica em cards compactos
- Filtro rápido: Hoje / Esta semana / Este mês
- Tap no card → editar

### `/admin/mobile/transactions/new`
- Tabs grandes: **ENTRADA** / **SAÍDA**
- **ENTRADA**: valor (teclado numérico grande), pagamento, paciente (opcional), NF (toggle)
- **SAÍDA**: valor, pagamento, pago a
- Botão "Salvar" fixo no rodapé

### `/admin/mobile/patients`
- Campo de busca em destaque
- Lista em cards: nome + CPF
- FAB "+" → formulário rápido de novo paciente

### `/admin/mobile/patients/[id]`
- Nome e CPF em destaque
- Lista de arquivos com thumbnail/ícone
- Botão upload de arquivo
- Botão "Editar" abre bottom sheet com formulário

### `BottomNav` — 4 abas
```
🏠 Início  |  💰 Lançamentos  |  👥 Pacientes  |  👤 Perfil
```
Perfil: exibe nome + role + botão logout

---

## Paginação

Todas as listagens usam paginação **URL-based**:

```
/admin/patients?page=2&limit=20
/admin/transactions?page=1&limit=20&type=CREDIT&dateFrom=2024-01-01
```

Vantagem: back button funciona, link compartilhável abre na página correta.

---

## Código compartilhado entre desktop e mobile

| O que compartilha | Onde fica |
|---|---|
| Auth (cookie, middleware, Route Handlers) | `middleware.ts`, `app/api/admin/auth/` |
| API client com interceptors | `src/lib/admin-api.ts` |
| Tipagens | `src/types/admin.ts` |
| Hooks de dados | `src/hooks/admin/` |
| Utilitários | `src/utils/` |
| Context de role | `src/providers/AdminProvider.tsx` |
| Componentes shadcn | `src/components/ui/` |

---

## `robots.txt`

Criar `src/app/robots.ts` para bloquear indexação do admin:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/admin/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

---

## Fases de implementação

```
Fase 0 — Pré-requisito (ellen-api)
  [x] Adicionar driveFileId ao SELECT_MEDIA em media.service.ts
  [x] Commit + deploy

Fase 0.5 — Prova de conceito ⚠️ TEMPORÁRIA (deletar após validação)
  Objetivo: validar a conexão com a ellen-api antes de investir no layout.
  Sem shadcn, sem layout, sem estilo — só campos HTML e fetch funcionando.

  Trabalho permanente (fica após o teste):
  [x] Instalar dependências (jose, js-cookie, react-hook-form, zod, @hookform/resolvers)
  [x] Adicionar variáveis de ambiente (.env.local: ADMIN_API_URL, NEXT_PUBLIC_ADMIN_API_URL, JWT_SECRET)
  [x] Criar types/admin.ts (tipos básicos: LoginResponse, Patient, Media)
  [x] Criar utils/parse-api-error.ts
  [x] Criar admin-api.ts com interceptors
  [x] Criar Route Handlers: POST /api/admin/auth, DELETE /api/admin/auth/logout
  [x] Criar middleware.ts (proteção + redirect por device)
  [x] Criar app/admin/layout.tsx (auth check sem shell visual)

  Trabalho temporário (deletar após o teste):
  [x] app/admin/login/page.tsx — campos email + senha + botão, sem estilo
  [x] app/admin/(desktop)/test/page.tsx — página de teste protegida pelo middleware com:
        · exibe "logado como: {email} | role: {role}" (valida que o token chegou)
        · select de paciente (input de ID manual para simplificar)
        · input file (aceita imagens)
        · input text para título
        · botão "Enviar" → POST /patients/:id/media
        · exibe resposta da API (driveUrl, code) ou erro

  O que o teste valida:
  ✓ Cookie é setado corretamente após login
  ✓ Middleware protege a rota (sem cookie → redirect login)
  ✓ Token é injetado no header pelo admin-api.ts
  ✓ Upload multipart chega na ellen-api e vai ao Google Drive
  ✓ Resposta da API retorna driveUrl e driveFileId
  ✓ parseApiError normaliza erros corretamente

  Após validação:
  [ ] Deletar app/admin/(desktop)/test/
  [ ] Seguir para Fase 1

Fase 1 — Fundação
  [ ] Configurar shadcn/ui (dependências já instaladas na Fase 0.5)
  [ ] Criar utils/ completo (format, drive — parse-api-error já feito)
  [ ] Criar AdminProvider + QueryProvider
  [ ] Criar robots.ts
  [ ] Página de login com layout definitivo

Fase 2 — Desktop core
  [ ] Layout desktop: AdminShell, AdminSidebar, AdminHeader
  [ ] Dashboard
  [ ] Pacientes: lista, novo, detalhe
  [ ] Mídia: upload, preview, remoção
  [ ] Transações: lista, novo, editar

Fase 3 — Desktop complementar
  [ ] Comparison (gráfico Recharts)
  [ ] Usuários
  [ ] Reviews

Fase 4 — Mobile
  [ ] Layout mobile: MobileShell, BottomNav
  [ ] Home mobile
  [ ] Lançamento rápido
  [ ] Pacientes mobile
```

---

## Observações finais

- O `app/admin/layout.tsx` é independente do `app/layout.tsx` raiz — cada um gerencia seus próprios providers, fonts e analytics
- O route group `(desktop)` faz com que a pasta não apareça na URL — rotas ficam em `/admin/dashboard`, não `/admin/desktop/dashboard`
- A pasta `mobile/` aparece na URL — rotas ficam em `/admin/mobile/home`
- Se o usuário acessar `/admin/mobile` pelo desktop (ou `/admin/dashboard` pelo celular), a interface é exibida sem forçar redirecionamento — o redirect automático só ocorre em `/admin` (raiz)
