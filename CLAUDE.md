# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio site for Yan He (AI Engineer) deployed on Vercel. AI chatbot widget powered by OpenAI GPT-4o-mini.

## Development

```bash
# Local dev server (serves static files + proxies /api/chat)
# Requires OPENAI_API_KEY environment variable
node server.js
# → http://localhost:3000

# Deploy to Vercel
vercel --yes
```

No build step — all HTML/CSS/JS is served statically. The only server-side code is the `api/chat.js` serverless function.

## Architecture

- **`index.html`** — Single-page portfolio (About, Projects, Contact sections + chatbot widget)
- **`css/styles.css`** — All layout/component styles with CSS variables and responsive breakpoints
- **`css/chatbot.css`** — Chatbot widget styles
- **`js/script.js`** — Navigation, smooth scrolling, scroll-triggered animations
- **`js/chatbot.js`** — Chatbot widget logic (sends messages to `/api/chat`)
- **`api/chat.js`** — Vercel serverless function; calls OpenAI API with native `fetch` (NOT the OpenAI SDK — SDK causes connection errors on Vercel serverless). System prompt is embedded at the top of this file.
- **`server.js`** — Local dev server; serves static files and proxies `/api/chat` to the handler
- **`system-prompt.txt`** — Reference copy of the chatbot system prompt (canonical version is in `api/chat.js`)
- **`vercel.json`** — Sets `maxDuration: 30` for the chat function

## Key Constraints

- **No OpenAI SDK**: `api/chat.js` must use native `fetch` to call the OpenAI API. The SDK fails with connection errors in Vercel's serverless environment.
- **No build tools**: Pure vanilla HTML/CSS/JS. No bundler, no framework.
- **Vercel deployment**: Serverless functions live in `api/` directory. Environment variable `OPENAI_API_KEY` is set in Vercel dashboard.
