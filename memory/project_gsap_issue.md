---
name: GSAP Issue — Needs Investigation
description: User flagged a GSAP-related problem during project detail page work; root cause and affected file unknown
type: project
---

User noticed a GSAP issue during the session where the project detail view was being built (2026-03-24). Exact error not captured — could be on the home page or the detail page.

**Why:** GSAP likely needs to be initialized in a client component with `useEffect` to avoid SSR hydration mismatches. Any GSAP usage that runs on import (outside useEffect) will fail in Next.js App Router server components.

**How to apply:** When investigating, check:
1. Which component(s) use GSAP — grep for `gsap` / `from "gsap"` across the codebase
2. Confirm GSAP calls are wrapped in `useEffect` or inside `"use client"` components
3. Check if ScrollTrigger is registered (`gsap.registerPlugin(ScrollTrigger)`) — must happen client-side
4. If the issue is on the detail page: the detail page is a Server Component; any GSAP usage needs to live in a child client component
