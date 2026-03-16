# Andy Choi Networking — Project Context

## Project Overview

A single-page lead capture app for Andy Choi's real estate networking events. Visitors land, scan Andy's credentials, and fill out a qualification form. The webhook fires to N8n → GHL. No auth, no routing, no backend — pure conversion surface.

**Stack**: Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion
**Deploy**: Vercel (static)
**Integrations**: N8n webhook → GHL (CRM)

---

## Design Context

### Users

Real estate operators, developers, capital partners, and industry professionals who meet Andy at events or get his card. They're on mobile, standing at a venue or following up later that day. They have high BS detectors — they assess credibility fast and won't fill out a form unless they respect the person behind it.

**Job to be done**: Quickly validate that Andy is worth connecting with, then give him their contact info and professional context.

### Brand Personality

**Polished. Credible. Sharp.**

Andy is an operator-first investor with a measurable track record ($100MM+, 98+ projects, B-Class GC license). The design should feel like the digital equivalent of a well-printed business card handed by someone who clearly knows what they're doing. Not a startup founder, not a broker, not a realtor — a serious builder.

### Emotional Goal

Visitors should feel **"I want to work with him"** within 3 seconds.
That means: immediate credibility signal → clear sense of opportunity → frictionless path to the form.

Trust is built before the CTA, not after.

### Anti-References

This page should explicitly NOT look like:
- **Generic SaaS / startup** — no purple gradients, floating blobs, or "all-in-one platform" vibes
- **Corporate / boring** — not a gray LinkedIn profile or enterprise dashboard
- **Flashy / over-designed** — no heavy motion, no attention-seeking animations, no look-at-me effects
- **Luxury real estate glam** — no gold tones, marble textures, or high-end residential realtor aesthetics

### Aesthetic Direction

Flat, minimal, operator-grade. Sky 500 (`#0EA5E9`) as the single accent color against a Slate-grounded palette. Typography-led hierarchy. Generous whitespace. The current direction is correct — push it toward **slightly more premium**: tighter spacing rhythm, more refined type treatment, stronger contrast between sections.

Reference feel: a top-tier VC's personal site, or a respected developer's portfolio — not a lead gen funnel.

### Design Principles

1. **Credibility first, conversion second.** Every design decision should reinforce trust before asking for action. Don't rush to the form.

2. **Nothing decorative.** Every visual element must earn its place. If it doesn't communicate or guide, remove it. Restraint is the aesthetic.

3. **Premium through subtlety.** Elevation comes from tighter spacing, precise type sizing, and thoughtful micro-interactions — not more elements, heavier effects, or louder color.

4. **Flat but not sterile.** The flat design philosophy is intentional, but warmth comes through copy, Andy's photo, and the human details of the form flow. Don't make it feel like a government form.

5. **Mobile is the primary surface.** This is a 640px-max column view. Every spacing, sizing, and hierarchy decision should be designed for a phone screen first, verified on desktop second.

---

## Token Reference

```css
--color-primary:   #0F172A  /* Slate 900 — headings, high-contrast text */
--color-text:      #334155  /* Slate 700 — body copy */
--color-accent:    #0EA5E9  /* Sky 500 — primary CTA, focus states, selected UI */
--color-blue-alt:  #0284C7  /* Sky 600 — hover state on accent elements */
--color-bg:        #F8FAFC  /* Slate 50 — page background */
--color-input-bg:  #FFFFFF  /* Pure white — form inputs */
--color-border:    #E2E8F0  /* Slate 200 — borders, dividers */
```

## Typography

| Role       | Font       | Weight | Notes                        |
|------------|------------|--------|------------------------------|
| Headings   | Poppins    | 700    | h1–h6, stats numbers         |
| Body       | Open Sans  | 400/600| Paragraphs, bio, descriptions|
| UI / Form  | Inter      | 400/600| Inputs, labels, buttons      |

## Spacing & Radius

- Container: `max-w-[640px]`, `rounded-2xl` on desktop
- Buttons/CTAs: `rounded-full` (pill)
- Inputs: `rounded-sm` (minimal)
- Section padding: `p-4 sm:p-8` → `p-8 sm:p-12`

## Animation Guidelines

- Use Framer Motion. Always pair with `prefers-reduced-motion` check.
- Subtle only: `opacity + y: 20` fadeIn, 0.6s duration max
- Spring physics for major transitions (thank you screen)
- No looping animations, no attention-seeking motion
