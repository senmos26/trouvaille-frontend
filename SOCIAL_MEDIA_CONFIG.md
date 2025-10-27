# Configuration des Réseaux Sociaux - La Trouvaille

## Configuration des Métadonnées

Le projet a été configuré avec des métadonnées complètes pour optimiser le partage sur les réseaux sociaux.

### Fichiers de Configuration

1. **`/public/manifest.json`** - Configuration PWA
2. **`/public/browserconfig.xml`** - Configuration Microsoft
3. **`/public/robots.txt`** - Configuration SEO
4. **`/public/sitemap.xml`** - Plan du site
5. **`/src/app/layout.tsx`** - Métadonnées globales

### Icônes et Favicon

- **Favicon** : `/src/app/favicon.ico` (logo La Trouvaille)
- **Icônes PWA** : `/public/icon-192x192.png`, `/public/icon-512x512.png`
- **Apple Touch Icon** : `/public/apple-touch-icon.png`

### Variables d'Environnement Requises

```env
# URL du site (pour les métadonnées Open Graph)
NEXT_PUBLIC_SITE_URL=https://latrouvaille.ma

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Site Verification (optionnel)
GOOGLE_SITE_VERIFICATION=your_google_verification_code
```

### Métadonnées Configurées

#### Open Graph (Facebook, LinkedIn, WhatsApp)
- Titre et description optimisés
- Images de partage (1200x630px)
- Type de contenu et locale
- URL canonique

#### Twitter Cards
- Summary Large Image
- Titre et description
- Images de partage
- Handles Twitter

#### SEO
- Mots-clés pertinents
- Description optimisée
- Robots.txt configuré
- Sitemap.xml généré

### Test des Métadonnées

Vous pouvez tester vos métadonnées avec :
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [WhatsApp Link Preview](https://developers.facebook.com/tools/debug/sharing/)

### Personnalisation

Pour personnaliser les métadonnées d'une page spécifique, ajoutez un export `metadata` dans le fichier de la page :

```typescript
export const metadata: Metadata = {
  title: "Titre de la page",
  description: "Description de la page",
  openGraph: {
    title: "Titre Open Graph",
    description: "Description Open Graph",
    images: ["/path/to/image.jpg"],
  },
}
```
