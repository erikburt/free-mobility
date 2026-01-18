# Development

## Project Structure

```
src/
├── components/
│   ├── MuscleGroupSelector.tsx  # Select muscle groups + set priority
│   ├── ExerciseSelector.tsx     # Choose exercises, set time per exercise
│   └── SessionTimer.tsx         # Timer with progress ring, transitions
├── data/
│   └── exercises.ts             # Foam roller/lacrosse ball/barbell exercises
├── utils/
│   └── sessionBuilder.ts        # Builds session from selected exercises
├── types.ts                     # TypeScript types
├── App.tsx                      # Main app with view routing
└── App.css                      # Mobile-first styling
```

## Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## GitHub Pages Deployment

The app is configured for GitHub Pages deployment:

1. Push to GitHub
2. Go to Settings > Pages > Source: GitHub Actions
3. The workflow in `.github/workflows/deploy.yml` auto-deploys on push to main

Note: If your repo name differs from `free-mobility`, update the `base` path in `vite.config.ts`.

## Adding/Modifying Exercises

Edit `src/data/exercises.ts` to add or modify exercises. Each exercise has:

- `id`: Unique identifier
- `name`: Display name
- `muscleGroup`: Which muscle group it targets
- `type`: `foam_roller`, `lacrosse_ball`, or `barbell`
- `description`: Instructions for the exercise
- `defaultDuration`: Default time in seconds
- `isUnilateral`: Whether it's done on each side separately
