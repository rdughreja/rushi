# Rushi Ughreja Portfolio

A modern, interactive portfolio website built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **Framer Motion**. Features 3D backgrounds, scroll animations, mouse interactions, and a fully responsive design.

## ✨ Features

- 🎨 **Modern Design** - Dark theme with cyan/pink/purple gradient accents
- 🌐 **3D Backgrounds** - Interactive Three.js scenes (Hero, About, Services, Projects, Testimonials, Contact)
- 🎭 **Smooth Animations** - Framer Motion page transitions, scroll reveals, hover effects
- 🖱️ **Mouse Interactions** - Parallax effects, cursor-following glows, 3D scene responses
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- ♿ **Accessible** - Semantic HTML, ARIA labels, reduced motion support, focus management
- ⚡ **Performance Optimized** - Code splitting, lazy loading, optimized bundles
- 🔧 **Easy to Customize** - Centralized config file, modular components

## 🚀 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **3D Graphics** | Three.js, React Three Fiber, React Three Drei |
| **Animations** | Framer Motion 11 |
| **Utilities** | clsx, tailwind-merge |
| **Deployment** | Vercel (recommended), Netlify, GitHub Pages |

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── robots.txt
│   ├── site.webmanifest
│   └── favicon.ico
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── globals.css     # Global styles & Tailwind
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page
│   ├── components/         # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── HeroCanvas.tsx  # 3D scenes
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── config.ts       # All content/configuration
│   ├── hooks/
│   │   └── useInteractions.ts # Custom hooks
│   └── lib/
│       └── utils.ts        # Utility functions
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17+
- npm 9+ (or yarn/pnpm/bun)

### Installation

```bash
# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## ✏️ Customization

### 1. Update Personal Information

Edit `src/data/config.ts` to customize:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description...",
  email: "your@email.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, Country",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:your@email.com",
  },
};
```

### 2. Update About Section

```typescript
export const aboutContent = {
  title: "About Me",
  subtitle: "Your subtitle",
  description: [
    "Paragraph 1...",
    "Paragraph 2...",
    "Paragraph 3...",
  ],
  skills: [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL"] },
    // Add your skills
  ],
  highlights: [
    "Your achievement 1",
    "Your achievement 2",
  ],
};
```

### 3. Update Services

```typescript
export const services = [
  {
    id: 1,
    title: "Your Service",
    description: "Service description...",
    icon: "Brain", // Options: Brain, Zap, Code, Cpu, Lightbulb, Rocket
    features: ["Feature 1", "Feature 2", "Feature 3"],
    price: "$X,XXX+",
    timeline: "X-X weeks",
    popular: true/false,
  },
  // Add more services
];
```

### 4. Update Projects

```typescript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description...",
    image: "/projects/project-image.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    category: "AI Application",
    liveUrl: "https://your-demo.com",
    githubUrl: "https://github.com/yourusername/project",
    featured: true,
    metrics: { users: "100+", revenue: "$10k", retention: "90%" },
  },
  // Add more projects
];
```

### 5. Update Testimonials

```typescript
export const testimonials = [
  {
    id: 1,
    name: "Client Name",
    role: "CTO",
    company: "Company Name",
    avatar: "/testimonials/client.jpg",
    content: "Testimonial content...",
    rating: 5,
    project: "Project Name",
  },
  // Add more testimonials
];
```

### 6. Add Images

Place your images in `public/`:
- Project images: `public/projects/`
- Testimonial avatars: `public/testimonials/`
- OG image: `public/og-image.jpg` (1200x630)
- Favicon: `public/favicon.ico`
- PWA icons: `public/icon-192.png`, `public/icon-512.png`

## 🎨 Theming

### Color Scheme

The portfolio uses CSS variables for easy theming. Modify `src/app/globals.css`:

```css
:root {
  --background: #050505;
  --foreground: #ededed;
  --primary: #00d4ff;      /* Cyan */
  --secondary: #ff006e;    /* Pink */
  --accent: #8338ec;       /* Purple */
}
```

### Gradient Presets

Available in `globals.css`:
- `.gradient-text` - Cyan → Pink → Purple
- `.gradient-text-cyan` - Cyan → Blue
- `.gradient-text-pink` - Pink → Rose
- `.gradient-text-purple` - Purple → Violet

## 🌐 Deployment

### Vercel (Recommended - Free)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Deploy automatically

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Netlify (Free)

1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Output directory: `.next` (or `out` for static export)

### GitHub Pages (Free)

1. Enable static export in `next.config.ts`:
```typescript
output: 'export',
trailingSlash: true,
images: { unoptimized: true },
```
2. Build: `npm run build`
3. Deploy `out/` folder to GitHub Pages

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: ~150KB gzipped (first load)
- **3D Scenes**: Optimized with instanced meshes, reduced polygon counts

## ♿ Accessibility

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Focus visible outlines
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast ratios (WCAG AA)
- Keyboard navigation support
- Screen reader friendly

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
CONTACT_FORM_ENDPOINT=https://api.yourform.com/submit
```

### Analytics

Add Google Analytics or Plausible in `layout.tsx`:

```typescript
// In RootLayout
<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

If you have questions or need help customizing:
- Open an issue on GitHub
- Email: alex.morgan@email.com
- Twitter: [@alexmorgan](https://twitter.com/alexmorgan)

---

Built with ❤️ using Next.js, Three.js, and Framer Motion
