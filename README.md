# Local Event Planner & RSVP Tracker

Local event planner and RSVP tracker build with latest Next.js (with Nest.js backend) project using Server component first architecture(with some limitations due to local storage session handle), App Router and Server actions with latest react js hooks like useActionState.

## Getting Started

First, install [Node.js](https://nodejs.org/en/download)

Package manager used is [Pnpm](https://pnpm.io/)

Clone the project

Create a .env file in the project room and add below line

```bash
API_BASE_URL=http://localhost:4000
```

Then, run the development server: (Always check if the backend is running or not on the port 4000 )

```bash
pnpm i
pnpm run dev
```

## Paths

### Event Planner

```bash
http://localhost:3000/events/my-events
```

### User

```bash
http://localhost:3000/public-events
```

## Project Structure & Layouts

This repo includes three isolated layouts to separate user flows cleanly:

- app/(auth)/layout.tsx -> For authentication-related pages

- app/(publicApplication)/layout.tsx -> For general public page

- app/(application)/layout.tsx -> For event planner-specific experiences

This ensures we can evolve each user group’s experience independently without bloating or coupling UI logic.

## Reusable UI Components

To streamline development (especially in teams) and also to minimize rework across developers, I have built modular, pre-designed UI components.

```bash
path: src/components/ui
```

## Architecture Principles

- Server Components First: Prioritize server-rendered logic wherever possible(with some limitations due to local storage session handle)

- Form Submission: Built using React’s latest useActionState and server actions.

- Data Fetching: Uses native fetch() which now supports deduplication, caching, and Request memoization

- Zod for Runtime Validation: TypeScript is compile-time only. Zod handles runtime validation to ensure type safety where it matters (API inputs, responses, form submissions, etc).

- Minimal State Management: Two custom hooks abstract user context & session state. I avoided global state libraries like redux, zustand since set up is minimal

```bash
path: src/hooks
```

## Auth Strategy

LocalStorage is used temporarily, but it's not secure for tokens. We need to move it to HttpOnly cookies for production, with some JWT token coming from backend

We should use Middleware for route protection. But since we have local storage and since it's client, we can't use middleware since it's server. but ideally, we should use middlware. For the moment, I have done that on client using useEffect

```bash
useEffect(() => {
    const eventPlanner = localStorage.getItem("eventPlanner");

    if (!eventPlanner) {
      router.push("/login-event-planner");
    }
}, [router]);
```

## Technologies Used

- Next.js App Router
- React 19+ (with useActionState)
- Zod for runtime schema validation
- Native fetch with full caching support
- Modular layouts + reusable components
- Custom hooks for session/user retrieval

# Limitations or areas I would improve

- Definitely we should replace local storage session with some sort of JWT token mechanism where, back end will generate a token upon login with a expiry time, and we should store that token in the http cookie to send out with subsequent API requests.

- For complex projects, we should go for client state management tool like Zustand and for server state management, Tansack Query.

- We should introduce a database for data persistency.
