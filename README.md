# Free Mobility

A free post-WOD recovery app for foam rolling and lacrosse ball mobility work. Built with React + TypeScript + Vite.

## Features

- Select macro muscle groups (quads, hamstrings, glutes, etc.)
- Set priority (High/Medium/Low) for each selected group
- Choose session duration (5-30 min presets or custom)
- Algorithm distributes time weighted by priority (High=3x, Medium=2x, Low=1x)
- Timer with circular progress, auto-advance, pause/resume, skip
- Dark/light mode support
- Mobile-first responsive design

## Project Structure

```
src/
├── components/
│   ├── MuscleGroupSelector.tsx  # Select muscle groups + set priority
│   ├── SessionTimer.tsx         # Timer with progress ring
│   └── TimeSelector.tsx         # Choose session duration
├── data/
│   └── exercises.ts             # Foam roller/lacrosse ball exercises
├── utils/
│   └── sessionBuilder.ts        # Algorithm to allocate time by priority
├── types.ts                     # TypeScript types
├── App.tsx                      # Main app with 3 views
└── *.css                        # Mobile-first styling
```

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## GitHub Pages Deployment

1. Push this repo to GitHub
2. Go to Settings → Pages → Source: GitHub Actions
3. The workflow in `.github/workflows/deploy.yml` will auto-deploy on push to main
4. Site will be available at: `https://erikburt.github.io/free-mobility/`

Note: If your repo name is different, update the `base` path in `vite.config.ts` to match.
