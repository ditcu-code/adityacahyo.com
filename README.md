<div align="center">
  <a href="https://adityacahyo.com"><h1 align="center">adityacahyo.com</h1></a>
  <p>Personal website and project portfolio for Aditya Cahyo.</p>
</div>

<br/>

## Stack
- Next.js 13 App Router with TypeScript
- Tailwind CSS for styling and typography
- Contentlayer to source MDX content for projects
- Upstash Redis for lightweight analytics
- Deployed on Vercel Edge

## Prerequisites
- Node.js 18+
- `pnpm` (recommended package manager)
- Upstash Redis credentials (only required for production analytics)

Create a `.env.local` file in the project root if you want to enable pageview counting:

```dotenv
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

When `UPSTASH_*` variables are absent the app falls back to a no-op analytics mode locally.

## Development
```sh-session
git clone https://github.com/adityacahyo/adityacahyo.com.git
cd adityacahyo.com
pnpm install
pnpm dev
```

Useful scripts:
- `pnpm build` – production build
- `pnpm start` – run the production server locally
- `pnpm fmt` – format & lint with Rome

## Project Structure
- `app/` – App Router routes, layouts, and shared components
- `pages/api/` – legacy API routes (e.g. pageview analytics)
- `content/` – MDX content for projects
- `public/` – static assets such as images and favicons
- `types/`, `util/` – shared types and utilities

## Contributing / Forking
Feel free to use this project as a reference. If you publish your own fork, please replace personal details (content entries, images, copy) with your own information.
