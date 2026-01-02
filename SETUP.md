# Next.js + shadcn/ui Setup Instructions

## Step 1: Install Dependencies

Run the following command in the `Client dashboard` directory:

```bash
npm install
```

## Step 2: Initialize shadcn/ui

After dependencies are installed, run:

```bash
npx shadcn@latest init
```

This will set up shadcn/ui with the configuration already provided in `components.json`.

## Step 3: Add shadcn/ui Components

You can now add components using:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add sidebar
npx shadcn@latest add calendar
# ... and more
```

## Step 4: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
Client dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles with Tailwind
│   ├── components/          # Your React components
│   │   └── ui/              # shadcn/ui components (auto-generated)
│   └── lib/
│       └── utils.ts         # Utility functions (cn helper)
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Next Steps

1. Install dependencies: `npm install`
2. Initialize shadcn/ui: `npx shadcn@latest init`
3. Start building your dashboard components!

