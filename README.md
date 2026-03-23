# AllInAI - Multi-language AI Tools Directory

A multi-language AI tools directory website inspired by ai-bot.cn, built with Next.js 14.

## Features

- **5 Languages**: Chinese (中文), English, Japanese (日本語), Korean (한국어), Spanish (Español)
- **Auto Language Detection**: Detects user's preferred language from browser settings
- **510+ AI Tools**: Seed data from ai-bot.cn covering writing, image, video, chatbots, and coding tools
- **15 Categories**: Writing, Image, Video, Office, Agents, Chatbots, Coding, Design, Audio, Search, Platforms, Learning, Models, Detection, Prompts
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Static Generation**: All pages pre-rendered for fast loading
- **SEO Optimized**: Server-side rendering with proper meta tags

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **i18n**: next-intl
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel / Docker / Any Node.js host

## Getting Started

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale layout with i18n provider
│   │   ├── page.tsx            # Homepage
│   │   └── favorites/
│   │       └── [category]/
│   │           └── page.tsx    # Category page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Navigation + language switcher + theme toggle
│   ├── Footer.tsx              # Footer
│   ├── ToolCard.tsx            # Tool card component
│   ├── CategoryGrid.tsx        # Category grid component
│   ├── SearchBar.tsx           # Search component
│   └── ThemeProvider.tsx       # Dark/light theme provider
├── data/
│   ├── categories.ts           # Category definitions
│   └── tools/
│       ├── zh.json             # Chinese tool data (510 tools)
│       ├── en.json             # English tool data
│       ├── ja.json             # Japanese tool data
│       ├── ko.json             # Korean tool data
│       └── es.json             # Spanish tool data
├── i18n/
│   ├── routing.ts              # Locale routing config
│   └── request.ts              # Server-side i18n config
├── messages/
│   ├── zh.json                 # Chinese translations
│   ├── en.json                 # English translations
│   ├── ja.json                 # Japanese translations
│   ├── ko.json                 # Korean translations
│   └── es.json                 # Spanish translations
├── lib/
│   └── geoip.ts                # IP-based locale detection utilities
└── middleware.ts               # Next.js middleware for locale routing
```

## Adding More Tools

Edit the JSON files in `src/data/tools/` to add more tools. Each category is a key mapping to an array of tool objects:

```json
{
  "category-id": [
    {
      "id": "unique-id",
      "name": "Tool Name",
      "url": "https://example.com",
      "description": "Brief description",
      "icon": "https://favicon.im/example.com"
    }
  ]
}
```

## Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Next Steps (Phase 2)

- [ ] Search functionality with filtering
- [ ] More category pages with full tool data
- [ ] Tool detail pages
- [ ] User submissions
- [ ] Rating and favorites
- [ ] Admin dashboard
- [ ] Full tool data translation to all languages
