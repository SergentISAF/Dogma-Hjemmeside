# Dogma Cables — Project Conventions

This file is loaded into Claude Code sessions working on this repo. Keep it short and current.

## Language

**All content is in English.** Page copy, headings, button labels, alt text, meta tags, comments, commit messages, README, and the Hans setup guide. No Danish anywhere.

The Ferrari quote on `about.html` is Hans's own line, translated to English: "You don't buy a Ferrari and put cheap wheels on it." If we ever want to honour the original Danish on a separate "in his own words" section, that's a deliberate exception, not the default.

## Audience and tone

The customer is a hi-fi enthusiast who can smell snake oil. Plain-spoken, no marketing buzzwords, no "crafted with passion" filler. Avoid: "quantum", "directional", "cryogenically treated", "audiophile-grade", em-dashes, the rule of three.

Hans has 20+ years of experience but the business is new. Phrase it as "experience refined cable by cable", not "since 2005".

## Visual direction

Heritage / artisan, not corporate / clinical. Reference brand: **Cardas Audio**. Avoid Nordost / Shunyata / AudioQuest's pharma-clean look (pure white, blue accents, sans-serif everything).

- Typography: Playfair Display for headings, Lora for body. Both from Google Fonts.
- Colour: warm wood tones (cream, walnut, copper, brass, charcoal). Never pure `#fff` or `#000`.
- Background: subtle wood-grain via repeating linear-gradients in `base.css`.
- Logo: black serif/script (`img/dogma-logo.png`). Transparent PNG. On dark themes a CSS `--logo-filter: invert(...)` makes it readable.

Three themes selectable from the header (`light`, `mid`, `dark`). User choice is persisted in `localStorage` under key `dogma-theme`.

## Structure

Each topic is its own page. As more content arrives (materials, process, "letter from Hans", reviews), add a new HTML file at the root and a link in the header nav. Don't pile everything on one long scroll.

Current pages:
- `index.html` — coming-soon teaser (logo + one-line tagline)
- `about.html` — about Hans + the Ferrari quote
- `cables.html` — what Hans builds
- `contact.html` — contact form + direct phone/email
- `guide.html` — Cloudflare + GitHub Pages + Formspree setup guide for Hans

Each page reuses the same sticky header (logo, nav, theme switcher) and footer.

## Files

```
index.html, about.html, cables.html, contact.html, guide.html
css/base.css       layout, typography, components, theme-agnostic vars
css/themes.css     body.theme-{light,mid,dark} overrides
js/theme.js        loads saved theme from localStorage, binds switcher
js/form.js         contact form submit, Formspree with mailto fallback
img/               logo (transparent PNG, full + compact)
```

## Form

Contact form posts to Formspree. The Form ID lives in `js/form.js` as `FORMSPREE_ID`. Until Hans creates a Formspree account and supplies the ID, the form falls back to a `mailto:` link to `hansmlauridsen@gmail.com`. Don't break this fallback.

## Hosting

Hosted on GitHub Pages from `main`. Deploy is automatic on push:
`https://sergentisaf.github.io/Dogma-Hjemmeside/`

When Hans buys his domain and sets up Cloudflare per `guide.html`, point a custom domain in repo Settings → Pages.

## Owner-supplied data still pending

Don't fabricate these — leave placeholders or omit until Hans provides them:

- Photo of Hans at the bench (use logo + texture as the hero placeholder)
- Hans's home city (footer currently says "Hand made in Denmark")
- CVR number (footer)
- Material specs for each cable type (`cables.html` uses generic placeholder copy)
- A signed "letter from Hans" — strongest trust signal we identified, but only if Hans wants to write one

## Don't

- Don't add stock-photo audio rooms, 3D-rendered cable mockups, gradient backgrounds, glassmorphism, or carousel sliders.
- Don't add 5-star widget reviews. Use named text quotes if reviews come.
- Don't translate content back to Danish without an explicit ask.
- Don't add a webshop. The brand sells through conversation, not cart.
