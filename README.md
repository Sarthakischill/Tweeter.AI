# Tweeter.AI

Tweeter.AI is a web application that helps users elevate their tweets with AI-powered refinement.

## Features

- AI-powered tweet refinement
- Email/password authentication
- 1 free use without an account
- Unlimited usage for authenticated users
- Save, copy, share, and follow-up options for refined tweets
- Dark mode support
- Responsive design

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Authentication & Database**: Supabase
- **AI**: Google Generative AI
- **UI Components**: Radix UI
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google AI
GOOGLE_API_KEY=your-google-api-key

# App Settings
SYSTEM_PROMPT=your-system-prompt-for-ai
```

### Database Setup

1. Create a new Supabase project
2. Run the SQL commands from `supabase-schema.sql` in the Supabase SQL editor
3. Set up email authentication in the Supabase dashboard

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

- `src/app`: Next.js app router
- `src/components`: UI components
- `src/context`: React context providers
- `src/hooks`: Custom React hooks
- `src/lib`: Utility functions including Supabase client
- `src/types`: TypeScript type definitions
- `public`: Static assets

## License

This project is licensed under the MIT License.