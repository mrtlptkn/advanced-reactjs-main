# 🎯 React Vite App (React Lab)

Modern web uygulaması geliştirmek için React, TypeScript, Vite ve ileri düzey state yönetimi teknolojilerini kullanarak oluşturulmuş, architectural best practices'i takip eden kapsamlı bir örnek proje.

Uygulama artık tek bir karışık menü değil; her React konusu (Atomic Design, Hooks, Posts, Products, Cart, Auth) sol taraftaki **sidebar**'da kendi modülü olarak gruplanıyor ve her sayfa ortak bir başlık/teknik etiket (chip) bileşeniyle tutarlı bir görünüme sahip.

---

## 📋 İçindekiler

- [Proje Özeti](#proje-özeti)
- [Özellikler](#özellikler)
- [Teknoloji Stack'i](#teknoloji-stacki)
- [Kurulum](#kurulum)
- [Proje Yapısı](#proje-yapısı)
- [UI Mimarisi ve Navigasyon](#-ui-mimarisi-ve-navigasyon)
- [State Yönetimi](#state-yönetimi)
- [Sayfalar ve Modüller](#sayfalar-ve-modüller)
- [API Entegrasyonu](#api-entegrasyonu)
- [Test](#-test)
- [Kullanılan Paketler](#kullanılan-paketler)
- [Komutlar](#komutlar)

---

## 🎯 Proje Özeti

Bu proje, React uygulamalarında modern geliştirme yaklaşımlarını gösteren bir referans uygulamadır. Context API, Redux Toolkit, RTK Query gibi state yönetimi çözümlerini pratikte nasıl kullanacağınızı, API entegrasyonunu, form yönetimini, route guard (auth) akışını ve component mimarisini öğretir. Her konu bağımsız bir "modül" olarak ele alınır ve hangi tekniği gösterdiği arayüzde açıkça etiketlenir.

---

## ✨ Özellikler

### 1. **Modüler Sidebar Navigasyon**

- Sol sidebar'da modüller (Atomic Design, React Hooks, Posts, Products, Cart, Auth) gruplu şekilde listelenir
- Masaüstünde sabit (permanent) drawer, mobilde hamburger ile açılır/kapanır (temporary) drawer
- Aktif route otomatik olarak vurgulanır
- Tek doğruluk kaynağı: `src/config/navigation.config.ts` (sidebar ve dashboard home page aynı veriyi kullanır)

### 2. **Çoklu State Yönetimi Yaklaşımları**

- **Context API**: Sepet yönetimi (CartProvider) ve mock kimlik doğrulama (AuthProvider)
- **Redux Toolkit**: Redux ile sepet ve ürün state'i yönetimi
- **RTK Query**: Modern async data fetching ve caching

### 3. **Kapsamlı Routing Sistemi**

- Nested Routes ve Nested Layouts
- Error Boundaries
- Loader'lar ile veri ön yükleme
- Route Guard (Protected Route) ile auth korumalı sayfalar
- React Router v7 özellikleri (`useParams`, `useSearchParams`, `useLocation`)

### 4. **UI Component Mimarisi**

- **Atomic Design Pattern**: Atoms, Molecules, Organisms, Templates
- Ortak `PageHeader` / `ModuleShell` ile her modül sayfasında tutarlı başlık + teknik chip'leri
- Material-UI (MUI) entegrasyonu + özel tema (`src/theme/theme.ts`)
- Tailwind CSS styling
- Responsive tasarım

### 5. **Form Yönetimi**

- React Hook Form entegrasyonu
- Yup validation schema
- Custom form components

### 6. **API Entegrasyonu**

- RESTful API çağrıları (JSONPlaceholder, OData)
- RTK Query caching mekanizması
- Error handling ve loading states
- Request debouncing

### 7. **Hook Örnekleri**

- `useState` - State yönetimi
- `useEffect` - Lifecycle ve side effects
- `useRef` / `useImperativeHandle` - Ref yönetimi ve dışa açılan metodlar
- `useCallback` - Function memoization
- `useSelector` / `useDispatch` - Redux state
- Custom hooks

### 8. **Route Guard (Auth) Demosu**

- Mock auth: gerçek bir backend doğrulaması yapmaz, sadece client state üzerinde "giriş yapılmış mı?" tutar
- `ProtectedRoute` ile korunan sayfalar (`/cart-summary`, `/cart-summary-v2`)
- Giriş yapılmadan korumalı sayfaya gidilirse `/login`'e yönlendirme, giriş sonrası orijinal sayfaya geri dönüş (`location.state.from`)

### 9. **Scroll-to-Top Butonu**

- Sayfa aşağı kaydırıldığında otomatik görünme
- Yumuşak scroll animasyonu
- Fixed positioning

### 10. **Type Safety & Test**

- TypeScript ile tam tip güvenliği, strict type checking
- Vitest + Testing Library ile unit testler

---

## 🛠️ Teknoloji Stack'i

### Frontend Framework

- **React 19.2.0** - UI kütüphanesi
- **React Router 7.11.0** - Routing çözümü
- **React DOM 19.2.0** - DOM rendering

### State Yönetimi

- **Redux Toolkit 2.11.2** - State management
- **React Redux 9.2.0** - Redux bindings
- **RTK Query** - Async state management

### UI & Styling

- **Material-UI 7.3.6** - Component library
- **Material-UI Icons 7.3.6** - Icon set
- **Tailwind CSS 4.1.18** - Utility-first CSS
- **Emotion 11.14.0** - CSS-in-JS
- **Sass 1.101.0** - CSS Modules için SCSS desteği (örn. `StatsPanel.module.scss`)

### Form Yönetimi

- **React Hook Form 7.69.0** - Form state yönetimi
- **@hookform/resolvers 5.2.2** - Yup şema entegrasyonu
- **Yup 1.7.1** - Schema validation

### HTTP Client

- **Axios 1.13.2** - HTTP requests

### Fonts

- **Fontsource Roboto 5.2.9** - Google Fonts

### Test

- **Vitest 4.1.9** - Test runner
- **Testing Library (React/User Event/Jest-DOM)** - Component testleri
- **jsdom 29.1.1** - Tarayıcı ortamı simülasyonu

### Build Tools

- **Vite 7.2.4** - Build tool
- **TypeScript 5.9.3** - Type system
- **ESLint 9.39.1** - Code linting
- **Vite Plugin React SWC 4.2.2** - Fast refresh

---

## 📥 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Adımlar

```bash
# Proje klasörüne girin
cd advanced-reactjs

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın (http://localhost:3000)
npm run dev

# Testleri çalıştırın
npm test

# Production build
npm run build

# Preview build
npm run preview

# Linting kontrolü
npm run lint
```

---

## 📁 Proje Yapısı

```
src/
├── config/
│   └── navigation.config.ts   # Sidebar + dashboard'un tek doğruluk kaynağı (modül/teknik tanımları)
│
├── theme/
│   └── theme.ts                # MUI tema (Tailwind ile aynı marka rengi #2563eb, ortak shape/typography)
│
├── layout/
│   ├── main.layout.tsx         # Ana layout: Sidebar + TopBar + Scroll-to-Top butonu
│   └── post.layout.tsx         # Post v1/v2 arasında geçiş için pill-tab sub-layout
│
├── pages/
│   ├── index/
│   │   ├── home.page.tsx           # Dashboard: modül kartları + code-splitting demosu
│   │   ├── react.hooks.page.tsx    # React Hooks örnekleri
│   │   └── atomic-design.page.tsx  # Atomic Design örneği
│   ├── post/
│   │   ├── pages/
│   │   │   ├── index.page.tsx        # Posts v1 (useState + useEffect)
│   │   │   ├── index-v2.page.tsx     # Posts v2 (RTK Query + React.memo/useCallback)
│   │   │   └── post-detail.page.tsx  # Post detay sayfası (useParams)
│   │   └── components/
│   │       └── post.form.tsx         # Post Form komponenti
│   ├── product/
│   │   ├── products.page.tsx   # Products v1 (Redux Thunk + Context/Redux sepet)
│   │   └── products.pagev2.tsx # Products v2 (RTK Query + debounced search)
│   ├── cart/
│   │   ├── cart.summary.page.tsx    # Context API ile sepet (Protected Route)
│   │   ├── cart.summary.v2.page.tsx # Redux Toolkit ile sepet (Protected Route)
│   │   └── components/
│   │       └── cart.summary.tsx     # Paylaşılan sepet UI'ı
│   ├── auth/
│   │   └── login.page.tsx      # Mock giriş sayfası
│   └── error.tsx                # Error boundary
│
├── routes/
│   ├── main.routes.ts          # Route konfigürasyonu (nested routes, loader, error boundary)
│   └── protected.route.tsx     # Route Guard: giriş yapılmamışsa /login'e yönlendirir
│
├── ui/                          # Atomic Design Components
│   ├── atoms/
│   │   ├── Typography.tsx (+ test)
│   │   ├── CustomTextInput.tsx # forwardRef + useImperativeHandle örneği
│   │   ├── Link.tsx
│   │   ├── Icon.tsx
│   │   └── ProfileCircle.tsx
│   ├── molecules/
│   │   ├── Card.tsx / CardHeader.tsx / CardContent.tsx / CardFooter.tsx
│   │   └── UserInfo.tsx
│   ├── organisms/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx          # Responsive Drawer (permanent + temporary)
│   │   │   └── SidebarContent.tsx   # Modül listesi (navigation.config.ts'den okunur)
│   │   ├── TopBar.tsx          # Üst bar: mobil hamburger + giriş/çıkış durumu
│   │   ├── PageHeader.tsx      # Sayfa başlığı + açıklama + teknik chip'leri
│   │   ├── PostCard.tsx
│   │   └── StatsPanel.tsx (+ StatsPanel.module.scss) # Lazy-loaded, SCSS Module örneği
│   └── templates/
│       ├── ModuleShell.tsx     # PageHeader + içerik için ortak sayfa iskeleti
│       ├── PostGrid.tsx
│       ├── PostSummary.tsx
│       └── DataFetcher.tsx     # Render Prop Pattern örneği
│
├── store/                       # Redux Store
│   ├── store.ts
│   ├── cart/
│   │   ├── cart.slice.ts
│   │   └── cart.slice.test.ts
│   └── products/
│       └── product.slice.ts
│
├── api/                          # RTK Query APIs
│   ├── postApi/post.api.ts
│   └── productApi/product.api.ts
│
├── context/
│   ├── cart/                    # Cart context + provider (Context API)
│   │   ├── cart.context.ts
│   │   └── cart.provider.tsx
│   └── auth/                    # Mock Auth context + provider (Route Guard demosu)
│       ├── auth.context.ts
│       └── auth.provider.tsx
│
├── model/                       # TypeScript Types & Interfaces
│   ├── post.ts / product.ts / cart.ts
│
├── client/                      # API Client Utilities
│   ├── post.client.ts
│   └── jsonplaceholder.client.ts
│
├── styles/
│   └── _variables.scss          # SCSS değişkenleri ($primary-color, $radius, ...)
│
├── utils/
│   ├── debounce.ts (+ test)
│
├── test/
│   └── setup.ts                 # Vitest + Testing Library setup
│
├── main.tsx                     # Entry point (Redux Provider, AuthProvider, CartProvider, ThemeProvider)
└── index.css                    # Global styles (Tailwind import)
```

---

## 🧭 UI Mimarisi ve Navigasyon

Uygulamanın kabuğu (shell) üç parçadan oluşur:

1. **`Sidebar`** (`src/ui/organisms/Sidebar/`) — `navigation.config.ts`'deki modül listesini okuyup render eder. Masaüstünde her zaman görünen `permanent` Drawer, mobilde `TopBar`'daki hamburger ile açılan `temporary` Drawer kullanır; aktif route vurgulanır, çoklu sayfalı modüller (Posts/Products/Cart) açılır/kapanır gruplar halinde gösterilir.
2. **`TopBar`** (`src/ui/organisms/TopBar.tsx`) — artık navigasyon taşımaz, sadece mobil menü butonunu ve giriş/çıkış durumunu gösterir.
3. **`PageHeader` + `ModuleShell`** (`src/ui/organisms/PageHeader.tsx`, `src/ui/templates/ModuleShell.tsx`) — her modül sayfasının üstünde başlık, kısa açıklama ve o sayfanın hangi React tekniğini gösterdiğini belirten chip'leri (örn. `RTK Query`, `Context API`) render eder. Sayfalar kendi hook/state mantığını değiştirmeden bu shell içine sarılır.

Marka rengi ve köşe yuvarlaklığı `src/theme/theme.ts` üzerinden MUI'ye, Tailwind'in `blue-600` / `rounded-lg` değerleriyle eşleşecek şekilde tanımlanır; böylece MUI ve Tailwind ile yazılmış bileşenler aynı görsel dili paylaşır.

Dashboard (`/`) aynı `navigation.config.ts` verisini kart grid'i olarak gösterir — sidebar ve ana sayfa hep senkron kalır, yeni bir modül eklemek için sadece bu dosyaya bir grup eklemek yeterlidir.

---

## 🔄 State Yönetimi

Proje birden fazla state yönetimi yaklaşımını örneklemektedir:

### 1. Context API + useState

**Dosya**: `src/context/cart/cart.provider.tsx`

```tsx
// Basit state yönetimi için Context API kullanımı
const [cart, setCart] = useState<CartState>(initialCartState);
```

**Kullanım**: `src/pages/cart/cart.summary.page.tsx`

Aynı yaklaşım mock kimlik doğrulama için de kullanılır: `src/context/auth/auth.provider.tsx` (`AuthContext`), `ProtectedRoute`'un koruduğu sayfalara erişim kontrolü için.

### 2. Redux Toolkit Slices

**Dosya**: `src/store/cart/cart.slice.ts`

```typescript
const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addItem: (state, action) => {...},
    removeItem: (state, action) => {...},
    clearCart: (state) => {...},
  },
});
```

**Kullanım**: `src/pages/cart/cart.summary.v2.page.tsx`

### 3. RTK Query (Async Data Fetching)

**Dosya**: `src/api/productApi/product.api.ts`

```typescript
const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://services.odata.org/...'}),
  endpoints: (builder) => ({
    getProducts: builder.query<ODataResponse<Product>, void>({...}),
    getProductsFilterByName: builder.query<ODataResponse<Product>, {name:string}>({...}),
  }),
});
```

**Caching**: Varsayılan 60 saniye cache, custom TTL konfigürasyonu desteği

---

## 📄 Sayfalar ve Modüller

Aşağıdaki her modül, sidebar'da kendi grubunda ve dashboard'ta kendi kartında listelenir (bkz. `src/config/navigation.config.ts`).

### 🏠 Dashboard (Home)

- **Yol**: `/`
- **Dosya**: `src/pages/index/home.page.tsx`
- **Özellik**: Tüm modülleri açıklama + teknik etiketiyle gösteren kart grid'i, altında `React.lazy` + `Suspense` ile route dışı code-splitting demosu (`StatsPanel`)

### ⚙️ React Hooks

- **Yol**: `/hooks`
- **Dosya**: `src/pages/index/react.hooks.page.tsx`
- **Özellikler**: `useState`, `useRef`, `useImperativeHandle` (`CustomTextInput` ile focus/clear metodlarını dışa açma)

### 🎨 Atomic Design

- **Yol**: `/atomic-design`
- **Dosya**: `src/pages/index/atomic-design.page.tsx`
- **Özellikler**: PostSummary/PostGrid template örneği, `DataFetcher` ile Render Prop Pattern

### 📝 Posts

#### v1 — useState + useEffect

- **Yol**: `/posts/home`
- **Dosya**: `src/pages/post/pages/index.page.tsx`
- Manuel state yönetimi, `useEffect` ile data fetching, loading/error state'leri

#### v2 — RTK Query

- **Yol**: `/posts/v2`
- **Dosya**: `src/pages/post/pages/index-v2.page.tsx`
- RTK Query hooks, `React.memo` + `useCallback` ile render optimizasyonu, React Hook Form ile post ekleme

#### Detay — useParams

- **Yol**: `/posts/v2/:postId`
- **Dosya**: `src/pages/post/pages/post-detail.page.tsx`
- Dinamik route parametresi okuma, sidebar'da yer almaz (Posts v2 listesinden drill-down ile erişilir)

### 🛍️ Products

#### v1 — Redux Toolkit Thunk + Context API

- **Yol**: `/products`
- **Dosya**: `src/pages/product/products.page.tsx`
- Redux thunk ile veri çekme, sepete ekleme hem Context API hem Redux Toolkit ile gösterilir

#### v2 — RTK Query

- **Yol**: `/products-v2`
- **Dosya**: `src/pages/product/products.pagev2.tsx`
- RTK Query ile filtreleme, debounced search (`useSearchParams` ile URL senkronizasyonu), OData entegrasyonu

### 🛒 Cart

#### Context API

- **Yol**: `/cart-summary` (Protected Route)
- **Dosya**: `src/pages/cart/cart.summary.page.tsx`

#### Redux Toolkit

- **Yol**: `/cart-summary-v2` (Protected Route)
- **Dosya**: `src/pages/cart/cart.summary.v2.page.tsx`

### 🔐 Auth

- **Yol**: `/login`
- **Dosya**: `src/pages/auth/login.page.tsx`
- Mock giriş formu; `ProtectedRoute` (`src/routes/protected.route.tsx`) korumalı bir sayfaya girişsiz erişilirse buraya yönlendirir ve giriş sonrası orijinal sayfaya geri döner

---

## 🌐 API Entegrasyonu

### Kullanılan API'lar

#### 1. JSONPlaceholder

- **URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints**:
  - `GET /posts` - Post listesi

#### 2. OData Northwind Service

- **URL**: `https://services.odata.org/northwind/northwind.svc/`
- **Endpoints**:
  - `GET /Products` - Tüm ürünler
  - `GET /Products?$filter=substringof(...)` - Ürün arama

### RTK Query Caching

```typescript
// 120 saniye cache süresi
keepUnusedDataFor: 120,

// Tab arası geçişlerde refetch
refetchOnFocus: true,

// İnternet bağlantı geri gelince refetch
refetchOnReconnect: true,
```

---

## 🧪 Test

Test runner olarak **Vitest** (jsdom ortamı) ve **React Testing Library** kullanılır. Setup dosyası: `src/test/setup.ts`.

```bash
# Testleri tek seferlik çalıştır
npm test

# Watch modunda çalıştır
npm run test:watch
```

Mevcut test dosyaları:

- `src/ui/atoms/Typography.test.tsx` — polymorphic `renderAs` davranışı
- `src/utils/debounce.test.ts` — debounce utility
- `src/store/cart/cart.slice.test.ts` — cart reducer aksiyonları

---

## 📦 Kullanılan Paketler

### Production Dependencies

| Paket               | Versiyon | Amaç                       |
| ------------------- | -------- | -------------------------- |
| react               | 19.2.0   | React framework            |
| react-dom           | 19.2.0   | React DOM rendering        |
| react-router        | 7.11.0   | Client-side routing        |
| @reduxjs/toolkit    | 2.11.2   | Redux state management     |
| react-redux         | 9.2.0    | Redux React bindings       |
| @mui/material       | 7.3.6    | Material Design components |
| @mui/icons-material | 7.3.6    | Material Design icons      |
| tailwindcss         | 4.1.18   | Utility-first CSS          |
| @tailwindcss/vite   | 4.1.18   | Tailwind Vite plugin       |
| react-hook-form     | 7.69.0   | Form state management      |
| @hookform/resolvers | 5.2.2    | RHF + Yup entegrasyonu     |
| yup                 | 1.7.1    | Schema validation          |
| axios               | 1.13.2   | HTTP client                |
| @emotion/react      | 11.14.0  | CSS-in-JS                  |
| @emotion/styled     | 11.14.1  | Styled components          |
| @fontsource/roboto  | 5.2.9    | Roboto font                |

### Development Dependencies

| Paket                       | Versiyon | Amaç                             |
| --------------------------- | -------- | -------------------------------- |
| typescript                  | 5.9.3    | Type system                      |
| vite                        | 7.2.4    | Build tool                       |
| @vitejs/plugin-react-swc    | 4.2.2    | Fast refresh                     |
| eslint                      | 9.39.1   | Code linting                     |
| typescript-eslint           | 8.46.4   | TypeScript linting               |
| vitest                      | 4.1.9    | Test runner                      |
| @testing-library/react      | 16.3.2   | Component test'leri              |
| @testing-library/user-event | 14.6.1   | Kullanıcı etkileşimi simülasyonu |
| @testing-library/jest-dom   | 6.9.1    | DOM matcher'ları                 |
| jsdom                       | 29.1.1   | Tarayıcı ortamı simülasyonu      |
| sass                        | 1.101.0  | SCSS Modules desteği             |
| @types/react                | 19.2.5   | React types                      |
| @types/react-dom            | 19.2.3   | React DOM types                  |
| @types/node                 | 24.10.1  | Node.js types                    |

---

## 🚀 Komutlar

### Development

```bash
npm run dev
```

- Vite development server'ı başlatır
- Hot Module Replacement (HMR) etkin
- `http://localhost:3000` adresinde çalışır (bkz. `vite.config.ts` → `server.port`)

### Test

```bash
npm test          # tek seferlik çalıştırma
npm run test:watch  # watch modu
```

### Build

```bash
npm run build
```

- TypeScript derleme: `tsc -b`
- Vite production build
- Optimized bundle oluşturur

### Lint

```bash
npm run lint
```

- ESLint ile kod kontrolü
- React hooks linting
- TypeScript linting

### Preview

```bash
npm run preview
```

- Production build'i lokal olarak önizleme
- Build dosyalarını test etmek için

---

## 🎓 Öğrenme Kaynakları

### Hooks Örnekleri

- **useState**: State yönetimi
- **useEffect**: Lifecycle ve side effects
- **useRef / useImperativeHandle**: Ref yönetimi, dışa açılan imperative metodlar
- **useCallback**: Function memoization
- **useSelector**: Redux state okuma
- **useDispatch**: Redux actions dispatch

### Design Patterns

- Atomic Design Pattern
- Render Prop Pattern (`DataFetcher`)
- Compound Components
- Custom Hooks
- Context API
- Redux Slices
- Route Guard (Protected Route)

### Best Practices

- TypeScript ile type safety
- Error boundaries
- Lazy loading & route bazlı code splitting
- Memoization
- Debouncing (search)
- Tek doğruluk kaynağından (`navigation.config.ts`) beslenen navigasyon

---

## 🔍 Önemli Dosyalar

### UI Kabuğu (Shell)

- `src/config/navigation.config.ts` - Modül/teknik tanımları (sidebar + dashboard ortak kaynağı)
- `src/theme/theme.ts` - MUI tema (marka rengi, shape, component override'ları)
- `src/ui/organisms/Sidebar/` - Responsive sidebar (permanent + temporary Drawer)
- `src/ui/organisms/TopBar.tsx` - Üst bar (mobil menü + auth durumu)
- `src/ui/organisms/PageHeader.tsx`, `src/ui/templates/ModuleShell.tsx` - Sayfa başlığı/iskeleti

### Store Configuration

- `src/store/store.ts` - Redux store setup
- `src/store/cart/cart.slice.ts` - Cart reducer
- `src/store/products/product.slice.ts` - Product reducer

### API Definitions

- `src/api/postApi/post.api.ts` - Post API
- `src/api/productApi/product.api.ts` - Product API

### Layouts & Routing

- `src/layout/main.layout.tsx` - Sidebar + TopBar + Scroll-to-Top butonu ile ana layout
- `src/layout/post.layout.tsx` - Post v1/v2 pill-tab sub-layout
- `src/routes/main.routes.ts` - Route konfigürasyonu (nested routes, loader, error boundary)
- `src/routes/protected.route.tsx` - Route Guard

### Context

- `src/context/cart/` - Cart context + provider
- `src/context/auth/` - Mock auth context + provider

---

## 🎯 Geliştirme İpuçları

1. **Redux DevTools Integration**: Redux DevTools browser extension ile state debugging
2. **React DevTools**: React component hierarchy ve props debugging
3. **Network Tab**: API requests ve responses monitoring
4. **Console Warnings**: Unused imports ve performance warnings
5. **Yeni modül eklerken**: Sayfayı oluşturup `main.routes.ts`'e route'u ekledikten sonra `src/config/navigation.config.ts`'e ilgili grubu/öğeyi eklemeniz yeterli — sidebar ve dashboard otomatik güncellenir

---

## 📝 Lisans

Bu proje eğitim amaçlı olarak oluşturulmuştur.

---

## 👤 Kontribütörler

Vite React App - Modern React Development Practices Example

---

**Son Güncelleme**: Haziran 2026
