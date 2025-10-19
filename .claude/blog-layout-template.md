# Blog Post Layout Template - StonesForHealth

Deze template definieert de standaard layout voor alle blog posts op StonesForHealth.nl.

## Design Filosofie

**Clean, professioneel, Wikipedia-stijl**
- Geen gekleurde achtergronden of gradients
- Geen decoratieve borders of shadows
- Geen emoji's in headings of content
- Simpele witte achtergrond met subtiele grijze borders
- Focus op leesbaarheid en professionaliteit

## Standaard Structuur

### 1. Article Container
```tsx
<article className="min-h-screen bg-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
```

### 2. Breadcrumbs
```tsx
<Breadcrumbs
  customItems={[
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Titel van Blog Post', url: '' }
  ]}
/>
```

### 3. Header Section
```tsx
<header className="mb-8 pb-6 border-b border-gray-200">
  <h1 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
    Hoofdtitel van Blog Post
  </h1>
  <div className="flex items-center gap-4 text-sm text-gray-500">
    <time dateTime="2025-10-20">20 oktober 2025</time>
    <span>•</span>
    <span>8 min leestijd</span>
  </div>
</header>
```

### 4. Introductie
```tsx
<section className="mb-8">
  <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
    Introductie tekst...
  </p>
</section>
```

### 5. Content Sections
```tsx
<div className="space-y-8">

  {/* Elke section */}
  <section>
    <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
      Section Titel
    </h2>
    <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
      Paragraaf tekst...
    </p>

    {/* Subsections */}
    <h3 className="text-xl font-semibold text-[#2D2D2D] mt-5 mb-3 font-[family-name:var(--font-eb-garamond)]">
      Subsection Titel
    </h3>

    {/* Lijsten */}
    <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
      <li>Lijst item 1</li>
      <li>Lijst item 2</li>
    </ul>

    {/* Product links */}
    <p className="mb-4">
      <Link
        href="/alle-producten?search=keyword"
        className="text-[#8B7355] hover:underline font-medium font-[family-name:var(--font-eb-garamond)]"
      >
        Bekijk producten →
      </Link>
    </p>
  </section>

</div>
```

### 6. Conclusie Section
```tsx
<section>
  <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)] border-b border-gray-200 pb-2">
    Conclusie
  </h2>
  <p className="text-base leading-relaxed text-gray-800 font-[family-name:var(--font-eb-garamond)] mb-4">
    Conclusie tekst...
  </p>
</section>
```

### 7. CTA Section
```tsx
<section className="border-t border-gray-200 pt-8 mt-8">
  <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4 font-[family-name:var(--font-eb-garamond)]">
    Ontdek [Product Categorie] bij StonesForHealth
  </h2>
  <p className="text-base text-gray-800 mb-6 font-[family-name:var(--font-eb-garamond)]">
    Bij <strong>StonesForHealth.nl</strong> vind je...
  </p>
  <div className="flex flex-col sm:flex-row gap-4 mb-4">
    <Link
      href="/alle-producten"
      className="inline-block bg-[#8B7355] hover:bg-[#6D5A42] text-white px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
    >
      Shop Alle Edelstenen
    </Link>
    <Link
      href="/bestsellers"
      className="inline-block border border-[#8B7355] hover:bg-gray-50 text-[#8B7355] px-8 py-3 text-center transition-colors font-medium font-[family-name:var(--font-eb-garamond)]"
    >
      Bekijk Bestsellers
    </Link>
  </div>
  <p className="text-sm text-gray-600 font-[family-name:var(--font-eb-garamond)]">
    Gratis verzending vanaf €50 | 30 dagen retourrecht | 100% authentiek
  </p>
</section>
```

### 8. Gerelateerde Artikelen
```tsx
<section className="border-t border-gray-200 pt-8 mt-8">
  <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6 font-[family-name:var(--font-eb-garamond)]">
    Zie ook
  </h2>
  <ul className="list-disc list-inside space-y-2 text-gray-800 font-[family-name:var(--font-eb-garamond)]">
    <li>
      <Link href="/blog/artikel-1" className="text-[#8B7355] hover:underline">
        Artikel Titel 1
      </Link>
    </li>
    <li>
      <Link href="/blog/artikel-2" className="text-[#8B7355] hover:underline">
        Artikel Titel 2
      </Link>
    </li>
  </ul>
</section>
```

### 9. Back to Blog Link
```tsx
<div className="mt-12 text-center">
  <Link
    href="/blog"
    className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#6D5A42] font-medium transition-colors font-[family-name:var(--font-eb-garamond)]"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
    Terug naar Blog Overzicht
  </Link>
</div>
```

## SEO Template

### Metadata
```tsx
export const metadata: Metadata = {
  title: 'Blog Titel | StonesForHealth',
  description: 'Korte beschrijving (max 160 karakters)',
  keywords: [
    'keyword1',
    'keyword2',
    'keyword3',
    // 10-15 keywords
  ],
  openGraph: {
    title: 'Blog Titel | StonesForHealth',
    description: 'Beschrijving voor social media',
    type: 'article',
    publishedTime: '2025-10-20',
  },
  alternates: {
    canonical: 'https://stonesforhealth.nl/blog/slug',
  }
};
```

### JSON-LD Schema
```tsx
const blogPostingSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Blog Post Titel",
  "description": "Blog post beschrijving",
  "image": "https://stonesforhealth.nl/logo.webp",
  "datePublished": "2025-10-20T09:00:00Z",
  "dateModified": "2025-10-20T09:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "StonesForHealth"
  },
  "publisher": {
    "@type": "Organization",
    "name": "StonesForHealth",
    "logo": {
      "@type": "ImageObject",
      "url": "https://stonesforhealth.nl/logo.webp"
    }
  }
};
```

## Styling Guidelines

### Kleuren
- **Hoofdtekst**: `text-gray-800`
- **Headings**: `text-[#2D2D2D]`
- **Subtiele tekst**: `text-gray-500` of `text-gray-600`
- **Links**: `text-[#8B7355] hover:underline`
- **Borders**: `border-gray-200`
- **Buttons primair**: `bg-[#8B7355] hover:bg-[#6D5A42] text-white`
- **Buttons secundair**: `border border-[#8B7355] text-[#8B7355] hover:bg-gray-50`

### Typografie
- **Font**: `font-[family-name:var(--font-eb-garamond)]` (EB Garamond)
- **H1**: `text-4xl md:text-5xl font-bold`
- **H2**: `text-2xl font-bold`
- **H3**: `text-xl font-semibold`
- **Body**: `text-base leading-relaxed`
- **Small**: `text-sm`

### Spacing
- **Section spacing**: `space-y-8`
- **Paragraph spacing**: `mb-4`
- **Heading margin**: `mt-5 mb-3` (h3), `mb-4` (h2)
- **Container padding**: `px-4 sm:px-6 lg:px-8 py-12`

### Lists
- **Unordered**: `list-disc list-inside space-y-2`
- **Ordered**: `list-decimal list-inside space-y-2`

## VERBODEN Elementen

❌ **NIET gebruiken:**
- Gradient achtergronden (`bg-gradient-to-*`)
- Gekleurde achtergronden (behalve wit: `bg-white`)
- Shadow effecten (`shadow-lg`, `shadow-xl`, etc.)
- Emoji's in headings of belangrijke tekst
- Decoratieve borders (alleen subtiele grijze borders: `border-gray-200`)
- Rounded corners op sections (`rounded-2xl`, etc.)
- Gekleurde borders (`border-yellow-200`, `border-purple-300`, etc.)
- Playful of fancy design elementen

## Voorbeeld Referentie

Zie: `/app/blog/edelstenen-geld-rijkdom-overvloed/page.tsx` voor een volledige implementatie van deze template.

## Checklist voor Nieuwe Blog Posts

- [ ] Metadata compleet (title, description, keywords, openGraph)
- [ ] JSON-LD schema toegevoegd
- [ ] Breadcrumbs correct ingesteld
- [ ] Witte achtergrond, geen gradients
- [ ] Geen emoji's in headings
- [ ] EB Garamond font gebruikt
- [ ] Correct kleurenschema (gray-800, #2D2D2D, #8B7355)
- [ ] Subtiele borders (border-gray-200)
- [ ] Clean sectie indeling met space-y-8
- [ ] Product links naar relevante producten
- [ ] CTA section met shop links
- [ ] Gerelateerde artikelen als simpele lijst
- [ ] "Terug naar Blog" link onderaan
- [ ] TypeScript types correct
- [ ] Build test succesvol

---

**Laatste update**: 20 oktober 2025
**Gebaseerd op**: app/blog/edelstenen-geld-rijkdom-overvloed/page.tsx
