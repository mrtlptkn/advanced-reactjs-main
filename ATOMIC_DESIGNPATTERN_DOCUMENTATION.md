# PostCard Component - Atomic Design

Bu doküman, Atomic Design prensiplerine göre oluşturulmuş PostCard bileşen sistemini açıklar.

## 📁 Klasör Yapısı

```
src/ui/
├── atoms/                    # Temel yapı taşları
│   ├── Typography.tsx        # Metin bileşeni
│   ├── ProfileCircle.tsx     # Avatar bileşeni
│   ├── Link.tsx              # Link bileşeni
│   ├── Icon.tsx              # İkon bileşeni
│   └── index.ts
├── molecules/                # Atom kombinasyonları
│   ├── CardHeader.tsx        # Kart başlığı
│   ├── CardBody.tsx          # Kart içeriği
│   ├── UserInfo.tsx          # Kullanıcı bilgisi
│   └── index.ts
├── organisms/                # Molekül kombinasyonları
│   ├── PostCard.tsx          # Ana kart bileşeni
│   └── index.ts
└── index.ts                  # Merkezi export
```

## 🧪 Atoms (Atomlar)

### Typography

Genel amaçlı metin bileşeni. HTML etiketlerini dinamik olarak render eder.

**Props:**

```typescript
interface TypographyProps {
	renderAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	children: React.ReactNode;
	className?: string;
}
```

**Kullanım:**

```tsx
<Typography renderAs="h1" className="text-2xl font-bold">
	Başlık
</Typography>
```

### ProfileCircle

Avatar/profil resmi gösterimi. Resim veya baş harfler ile çalışır.

**Props:**

```typescript
interface ProfileCircleProps {
	initials?: string; // Baş harfler (örn: "AY")
	imageUrl?: string; // Profil resmi URL'i
	alt?: string; // Alt text
	size?: 'sm' | 'md' | 'lg'; // Boyut
	className?: string;
}
```

**Kullanım:**

```tsx
// Baş harfler ile
<ProfileCircle initials="AY" size="md" />

// Resim ile
<ProfileCircle imageUrl="https://..." alt="Ali Yılmaz" />
```

### Link

Özelleştirilmiş link bileşeni. Hover efektleri ve stil tutarlılığı sağlar.

**Props:**

```typescript
interface LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	rel?: string;
}
```

**Kullanım:**

```tsx
<Link href="/post/123">Devamını oku</Link>
```

### Icon

SVG ikonlar. Heroicons kütüphanesinden ilham alınmıştır.

**Props:**

```typescript
interface IconProps {
	name: 'calendar' | 'user' | 'clock' | 'arrow-right';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}
```

**Kullanım:**

```tsx
<Icon name="calendar" size="sm" className="text-gray-500" />
```

## 🧬 Molecules (Moleküller)

### CardHeader

Kart başlığını temsil eder. Typography atomunu kullanır.

**Props:**

```typescript
interface CardHeaderProps {
	title: string;
	className?: string;
}
```

**Kullanım:**

```tsx
<CardHeader title="React ve TypeScript" />
```

### CardBody

Kart içeriği ve detay linki. Typography ve Link atomlarını kullanır.

**Props:**

```typescript
interface CardBodyProps {
	content: string;
	detailHref?: string;
	detailText?: string; // Varsayılan: "detail"
	className?: string;
}
```

**Kullanım:**

```tsx
<CardBody
	content="Bu bir örnek içeriktir..."
	detailHref="/post/1"
	detailText="devamını oku"
/>
```

### UserInfo

Kullanıcı bilgisi satırı. ProfileCircle, Typography ve Icon atomlarını kullanır.

**Props:**

```typescript
interface UserInfoProps {
	userName: string;
	date: string;
	userInitials?: string;
	userImageUrl?: string;
	className?: string;
}
```

**Kullanım:**

```tsx
<UserInfo userName="Ali Yılmaz" date="19.12.2025" userInitials="AY" />
```

## 🏗️ Organisms (Organizmalar)

### PostCard

Tüm molekülleri bir araya getiren ana kart bileşeni.

**Props:**

```typescript
interface PostCardProps {
	title: string; // Kart başlığı
	body: string; // Kart içeriği
	userName: string; // Kullanıcı adı
	date: string; // Tarih (format: "DD.MM.YYYY")
	detailHref?: string; // Detay linki
	detailText?: string; // Link metni
	userInitials?: string; // Kullanıcı baş harfleri
	userImageUrl?: string; // Kullanıcı profil resmi
	className?: string; // Ek CSS sınıfları
}
```

**Kullanım:**

```tsx
<PostCard
	title="React ve TypeScript ile Modern Web Geliştirme"
	body="React ve TypeScript kombinasyonu, modern web uygulamaları..."
	userName="Ali Yılmaz"
	date="19.12.2025"
	detailHref="/post/1"
	detailText="devamını oku"
	userInitials="AY"
/>
```

## 🎨 Tailwind CSS Stilleri

PostCard bileşeni aşağıdaki stil özelliklerine sahiptir:

| Özellik           | CSS Class                        | Açıklama             |
| ----------------- | -------------------------------- | -------------------- |
| Arka plan         | `bg-white`                       | Beyaz arka plan      |
| Köşe yuvarlaklığı | `rounded-lg`                     | 8px border-radius    |
| Kenarlık          | `border border-gray-200`         | 1px gri kenarlık     |
| Gölge             | `shadow-md`                      | Orta seviye gölge    |
| Hover gölge       | `hover:shadow-lg`                | Hover'da büyük gölge |
| Geçiş             | `transition-shadow duration-300` | Yumuşak geçiş efekti |
| İç boşluk         | `p-6`                            | 24px padding         |

## 📦 Import Yöntemleri

### Tek Tek Import

```tsx
import { PostCard } from '@/ui/organisms';
import { CardHeader, CardBody, UserInfo } from '@/ui/molecules';
import { Typography, ProfileCircle, Link, Icon } from '@/ui/atoms';
```

### Merkezi Import

```tsx
import { PostCard, Typography, Link } from '@/ui';
```

## 🚀 Örnek Sayfa

Tam bir kullanım örneği için `src/pages/post/pages/example.page.tsx` dosyasına bakın.

```tsx
import { PostCard } from '@/ui';

export const MyPage = () => {
	return (
		<div className="p-8">
			<PostCard
				title="Başlık"
				body="İçerik"
				userName="Ali"
				date="19.12.2025"
				detailHref="/detail"
				userInitials="A"
			/>
		</div>
	);
};
```

## 🎯 Atomic Design Prensipleri

Bu component yapısı şu prensipleri takip eder:

1. **Atoms (Atomlar)**: En küçük, yeniden kullanılabilir UI parçaları

   - Tek bir işlevi var
   - Bağımsız çalışabilir
   - Minimal prop interface'i

2. **Molecules (Moleküller)**: Atomların anlamlı kombinasyonları

   - Belirli bir amaca hizmet eder
   - Atomları bir araya getirir
   - Hala yeniden kullanılabilir

3. **Organisms (Organizmalar)**: Moleküllerin kompleks kombinasyonları
   - Tam işlevsel UI bölümü
   - İş mantığı içerebilir
   - Sayfa içinde kullanılır

## 🔧 Özelleştirme

### Renk Teması Değiştirme

ProfileCircle'ın gradient renklerini değiştirmek için:

```tsx
// ProfileCircle.tsx içinde
className = 'bg-gradient-to-br from-blue-400 to-purple-500';
// Şuna değiştirin:
className = 'bg-gradient-to-br from-green-400 to-teal-500';
```

### Link Stilleri

Link hover rengini değiştirmek için:

```tsx
// Link.tsx içinde
className = 'text-blue-600 hover:text-blue-800';
```

### Kart Gölgesi

Gölge efektini artırmak için:

```tsx
// PostCard.tsx içinde
className = 'shadow-md hover:shadow-lg';
// Şuna değiştirin:
className = 'shadow-lg hover:shadow-2xl';
```

## 📱 Responsive Tasarım

Tüm bileşenler mobile-first yaklaşımı ile tasarlanmıştır. Tailwind CSS'in responsive class'larını kullanarak özelleştirebilirsiniz:

```tsx
<PostCard
	className="w-full md:w-96 lg:w-[500px]"
	// ...diğer props
/>
```

## ✅ TypeScript Type Safety

Tüm bileşenler tam TypeScript desteği ile gelir:

- Zorunlu ve opsiyonel prop'lar açıkça belirtilmiş
- Enum tipleri (size, renderAs, icon name) tanımlanmış
- Type inference otomatik çalışır

```tsx
// TypeScript hatayı yakalar ✅
<Icon name="invalid-icon" /> // ❌ Hata

// Doğru kullanım ✅
<Icon name="calendar" /> // ✅ Geçerli
```

## 🧪 Test Önerileri

Component'leri test etmek için:

```tsx
import { render, screen } from '@testing-library/react';
import { PostCard } from '@/ui';

test('PostCard renders correctly', () => {
	render(
		<PostCard
			title="Test Title"
			body="Test Body"
			userName="Test User"
			date="19.12.2025"
		/>
	);

	expect(screen.getByText('Test Title')).toBeInTheDocument();
	expect(screen.getByText('Test User')).toBeInTheDocument();
});
```

## 📄 Lisans

MIT
