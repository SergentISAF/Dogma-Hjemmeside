# Dogma Cables — Project Conventions

This file is loaded into Claude Code sessions working on this repo. Keep it short and current.

## Local-first workflow

Dan iterates against a local server before pushing:
`python3 -m http.server 8765 --directory /Users/dan/Dogma-Hjemmeside`
Browser at `http://localhost:8765/`. Only push to GitHub Pages once Dan signs off.

## Brand voice

Site is no longer a personal "Hans Lauridsen" story. Visible copy is in
first-person plural ("we / us") or "Dogma" / "Dogma Cables". Hans's name
stays inside `guide.html` (internal setup walkthrough) and in his real
contact details we still need behind the scenes — never in user-facing copy.

The customer is a hi-fi enthusiast who can smell snake oil. Plain-spoken,
no marketing buzzwords, no "crafted with passion" filler. Avoid:
"quantum", "directional", "cryogenically treated", "audiophile-grade",
em-dashes, the rule of three.

Company name in copyright: **Dogma Cables ApS**.
Footer line on every page: "Handmade with pride in Denmark" / "Håndlavet med stolthed i Danmark".

## Language

**Bilingual: Danish (default) and English.** `EN / DA` switcher in the
header. Choice stored in `localStorage` under `dogma-lang`. Translatable
elements carry `data-en` and `data-da` attributes; `js/lang.js` swaps
`textContent` (or the right attribute for META / INPUT / TEXTAREA / IMG).
The **Danish copy is also written into the HTML directly** so first
paint shows DA, not EN — keep that pattern when adding new bilingual
elements. Keep both languages in lockstep when changing copy.

**Selector gotcha**: `js/lang.js` sets `data-lang` on `<html>` for CSS hooks,
so the click-handler selector must be `.lang-switcher [data-lang]` — a bare
`[data-lang]` also matches `<html>` and installs a `preventDefault()` at the
document root that swallows every click on the page. We hit this once.

Commit messages, code comments, README and `guide.html` stay in English.

## Visual direction

Heritage / artisan, not corporate / clinical. Reference brand: **Cardas Audio**.
Avoid Nordost / Shunyata / AudioQuest's pharma-clean look.

- Typography: Playfair Display for headings, Lora for body. Both from Google Fonts.
- Colour: warm wood tones (cream, walnut, copper, brass, charcoal). Never pure `#fff` or `#000`.
- Logo: `img/dogma-logo.png` everywhere (header and hero) — the compact variant is no longer used on the main pages. Dark-theme `--logo-filter: invert(...)` makes it readable.

**Dark theme only.** The CSS still lives behind `body.theme-dark` so a light
variant can be added back without restructuring; the theme switcher UI and
`js/theme.js` were removed when we settled on dark-only.

**Full-bleed photo on the home page.** `body.page-home` carries
`img/dogma-hero-bg.jpg` as a fixed background on desktop (scroll on mobile)
with a `linear-gradient(rgba(28,26,24,0.4), rgba(28,26,24,0.55))` overlay
for readability. The home contact section is transparent so the photo
shows through; the footer flips back to solid `var(--bg)` so the area
under the footer-rule sits on black.

## Structure

Currently active: **`index.html` and `services.html`**, linked via a single
nav entry "Værkstedet" / "Workshop" in the header on both pages. about /
cables / contact pages still exist in the repo as dormant templates for
future activation; they keep the brand-voice rewrites and DA defaults so
they're ready to re-link from the nav when there's real content.

Files:
- `index.html` — coming-soon page with full-bleed hero photo, intro copy, contact form
- `services.html` ("Værkstedet") — page-header + 8-item service list + Nordost case study with 4-image gallery
- `about.html`, `cables.html`, `contact.html` — dormant, not linked
- `guide.html` — internal Cloudflare + GitHub Pages + form-setup walkthrough for Hans

## Files

```
index.html, about.html, cables.html, contact.html, guide.html
css/base.css       layout, typography, components, full-bleed bg for page-home
css/themes.css     body.theme-dark colour vars
js/lang.js         loads saved language from localStorage, swaps data-en/data-da text
js/form.js         contact form submit, FormSubmit with mailto fallback
img/               dogma-logo.png, dogma-logo-compact.png (unused on main pages), hero photo, favicons
```

Also: `Hjemme side til Hans/` folder of raw branding assets sits at the
repo root (was committed by accident; left in place by user instruction).

## Form

Contact form posts to FormSubmit
(`https://formsubmit.co/ajax/contact@dogmacables.com`). First submission
triggers a verification email to `contact@dogmacables.com` — that inbox
must be set up (Simply mailbox or forwarding to a real inbox) and the
verification link clicked before any further submissions deliver. The
mailto fallback also targets `contact@dogmacables.com`. Don't break the
fallback.

## Hosting and domain

Hosted on GitHub Pages from `main`. Deploy is automatic on push.

Live URL: **https://dogmacables.com** (HTTPS enforced, Let's Encrypt
cert auto-renewed by GitHub Pages, expires 2026-08-25).
Fallback: https://sergentisaf.github.io/Dogma-Hjemmeside/

DNS managed via Simply.com API (account S627516). Apex `@` has four
A records to GitHub Pages IPs (185.199.108-111.153); `www` is a CNAME
to `sergentisaf.github.io`; the `CNAME` file in repo root contains
`dogmacables.com`. Simply's MX / SPF / DKIM / DMARC records are
untouched, so mail on @dogmacables.com still flows through Simply.
The wildcard `*` A record was deleted so random subdomains return
NXDOMAIN instead of landing on Simply's parking page.

## Don't

- Don't add stock-photo audio rooms, 3D-rendered cable mockups, gradient backgrounds, glassmorphism, or carousel sliders.
- Don't add 5-star widget reviews. Use named text quotes if reviews come.
- Don't add a webshop. The brand sells through conversation, not cart.
- Don't reintroduce Hans's name into visible site copy — branding is "Dogma / we".
- Don't push to GitHub Pages without Dan's go-ahead. Use the local server first.
