---
name: optimizing-ai-seo
description: Generates content, code, and strategies for maximizing visibility in AI-powered search engines (ChatGPT, Google AI Overviews, Perplexity). Use this skill when the user asks for AI SEO, Generative Engine Optimization (GEO), or content strategy for LLMs.
---

# Optimizing for AI Search (Generative Engine Optimization)

## When to use this skill
- User asks how to rank in ChatGPT, Perplexity, or Google AI Overviews.
- User requests content strategy for AI overview features.
- User wants to optimize website structure for LLMs.
- User mentions "Generative Engine Optimization" (GEO).

## Provenance
Synthesized from insights by Neil Patel and Wes McDowell on AI SEO.

## 1. Prerequisites (Blocking Check)
- **Robots.txt**: Ensure you are NOT blocking AI crawlers like `GPTBot` (OpenAI), `Google-Extended`, or `PerplexityBot`. Missing these means invisibility.

## 2. Core Philosophy
- **Intent over Keywords**: Focus on "Bottom of Funnel" (BoFu) buyer intent (e.g., "Best [service] in [city]") rather than generic keywords.
- **Recommendation Engine**: Optimize for being the *single best answer*, not just a blue link.
- **Predictive Discovery**: Build topical authority so AI associates the brand with the niche.

## 3. Technical Requirements (Code Directives)
When writing HTML or structuring content:
1.  **BLUF (Bottom Line Up Front)**: Start every page with a bulleted summary of core facts.
2.  **Semantic Structure ("Tree Walking")**: 
    - AI reads top-to-bottom, paragraph-by-paragraph. 
    - Don't bury "juicy" points in walls of text. 
    - Use strict `<h1>`, `<h2>`, `<h3>` hierarchy.
    - Treat pages like strict outlines where every section flows naturally.
3.  **Schema Markup**: Implement detailed JSON-LD for Organization, Service, Product, and AggregateRating.
4.  **Comparison Tables**: Use HTML `<table>` to compare features/pricing against competitors (skewed simply to favor the client).
5.  **Video Transcripts**: Embed videos/TikToks with full text transcripts for machine readability.

## 4. Content Strategy
- **Tone**: 7th-grade conversational quality. Professional but accessible.
- **Perspective**: Use 3rd-person "Expert" voice for promotional content to sound objective.
- **Formats**:
    - **"Best Fit" Briefs**: Short posts answering specific questions (e.g., "Who determines the best [service]?").
    - **Listicles**: "Top 5 reasons to choose [Brand]".
    - **Matrix Pages**: Generate [Service] + [City] pages for local SEO.
    - **Complex Longtail Clusters**: Create deep content answering specific subqueries (e.g., "planning a 5-day trip" -> "best 5-day itinerary for families with toddlers").
    - **Trust Pages**: FAQ, Case Studies (Before/After), Pricing (Standard inputs), Testimonials.

## 5. Freshness (RAG Optimization)
- **Cycle**: Regularly update top-performing pages.
- **Actions**: Update stats, add new quotes, remove outdated refs, and re-date the post.
- **Why**: AI uses RAG (Retrieval-Augmented Generation) and favors the newest information (citations are often 25% fresher than standard results).

## 6. Off-Page & Reputation
- **Branded Mentions (The #1 Factor)**:
    - **Google AI**: Get mentioned on pages with high *inbound links*.
    - **ChatGPT/Perplexity**: Get mentioned on pages with high *organic traffic*.
- **Sentiment**: AI filters negative sentiment. Aggressively pursue 5-star reviews on Yelp, Trustpilot, Google.
- **Citations**: Ensure NAP (Name, Address, Phone) consistency across all directories (Google, Yelp, Bing, BBB).

## 7. Ecosystem Diversification
- **Google AI**: Favors User-Generated Content (Reddit, Quora) and YouTube.
- **ChatGPT**: Favors traditional publishers, news, and high-traffic blogs.
- **Perplexity**: Favors niche-specific authority sites and local blogs.
*Action*: Run gap analysis to find which niche blogs/threads populate answers for your topic.

## Instructions for Agent
"When generating website copy, designing layouts, or writing code, strictly adhere to these GEO principles. Prioritize structural clarity for AI scrapers over decorative elements. Always verify `robots.txt` access first."
