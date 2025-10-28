# MY TEAM POM Portfolio

A futuristic, interactive developer portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

## Features

- 🎨 **3D Background**: Floating energy orb with mouse interaction
- 🎭 **Smooth Animations**: Scroll-based transitions and micro-interactions
- 🌳 **Interactive SkillTree**: Visual skill network with hover effects
- 👥 **Team Section**: Animated team member cards
- 📱 **Responsive Design**: Optimized for all devices
- ⚡ **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Background3D.tsx
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillTreeSection.tsx
│   ├── TeamSection.tsx
│   └── ContactSection.tsx
├── lib/
│   └── utils.ts
├── public/
│   └── data/
│       └── skills.json
└── ...
```

## Customization

- **Skills Data**: Edit `public/data/skills.json` to modify the skill tree
- **Team Members**: Update the team array in `components/TeamSection.tsx`
- **Colors**: Modify the gradient colors in `tailwind.config.js`
- **3D Object**: Customize the floating orb in `components/Background3D.tsx`

## Deployment

The project is ready to be deployed on Vercel, Netlify, or any other platform that supports Next.js.

```bash
npm run dev
```

## License

MIT License - feel free to use this project for your own portfolio!
