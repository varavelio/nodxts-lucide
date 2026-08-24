<h1 align="center">🌀 Lucide icons for NodX TypeScript</h1>

<p align="center">
  Beautiful &amp; consistent
  <a href="https://lucide.dev/">Lucide Icons</a> for
  <a href="https://github.com/varavelio/nodxts">NodX TypeScript</a>.
</p>

<p align="center">
  <a href="https://jsr.io/@varavel/nodx-lucide">
    <img src="https://jsr.io/badges/@varavel/nodx-lucide" alt="JSR badge"/>
  </a>
  <a href="https://www.npmjs.com/package/@varavel/nodx-lucide">
    <img src="https://img.shields.io/npm/v/@varavel/nodx-lucide.svg?label=npm" alt="npm version"/>
  </a>
  <a href="https://github.com/varavelio/nodxts-lucide/actions/workflows/ci.yaml">
    <img src="https://github.com/varavelio/nodxts-lucide/actions/workflows/ci.yaml/badge.svg" alt="CI status"/>
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/varavelio/nodxts-lucide.svg" alt="License"/>
  </a>
  <a href="https://github.com/varavelio/nodxts-lucide">
    <img src="https://img.shields.io/github/stars/varavelio/nodxts-lucide?style=flat&label=github+stars" alt="GitHub stars"/>
  </a>
</p>

<p align="center">
  <a href="https://varavel.com">
    <img src="https://cdn.jsdelivr.net/gh/varavelio/brand@1.0.0/dist/badges/project.svg" alt="A Varavel project"/>
  </a>
</p>

---

- **1776 icons** — every Lucide icon as a type-safe function
- **Zero dependencies** beyond `nodx` — tiny and fast
- **Fully typed** — autocomplete for every icon name
- **Customizable** — Tailwind, inline styles or global CSS
- **No client JS** — pure server-rendered SVG

## Installation

```sh
# Deno (JSR)
deno add --save-exact jsr:@varavel/nodx-lucide

# Node / Bun / Deno via npm
npm install --save-exact @varavel/nodx-lucide
```

> Requires `jsr:@varavel/nodx@^1.0.0` (or `npm:@varavel/nodx`) as a peer.

## Usage

Browse icons at [lucide.dev/icons](https://lucide.dev/icons/), convert the kebab-case name to
`UpperCamelCase`, and call it as a function. Your editor will autocomplete the names.

```ts
import * as N from "@varavel/nodx";
import { Cherry, ChevronUp, CircleUser, Languages, Power, Star, Usb } from "@varavel/nodx-lucide";

function myPage(): N.Node {
  return N.Div(
    CircleUser(),
    ChevronUp(),
    Power(),
    Star(),
    Languages(),
    Usb(),
    // ... 1776 icons available
    Cherry(
      // Any NodX attribute works
      N.Class("size-6 text-blue-500"),
    ),
  );
}

console.log(myPage().render());
```

With namespace import:

```ts
import * as N from "@varavel/nodx";
import * as Lucide from "@varavel/nodx-lucide";

const page = N.Div(
  Lucide.Cherry(N.Class("size-6 text-blue-500")),
);
```

Each icon renders an `<svg>` that follows the [Lucide guide](https://lucide.dev/guide/):

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  data-nodx="lucide"
>
  <!-- icon paths -->
</svg>
```

### Icons metadata

All icons with their tags and categories are exported as `iconsInfo`:

```ts
import { iconsInfo, Star } from "@varavel/nodx-lucide";

console.log(iconsInfo.length); // 1776
console.log(iconsInfo[0]);
// { name: "A Arrow Down", icon: AArrowDown, tags: [...], categories: [...] }

// Find icons by tag
const medical = iconsInfo.filter((i) => i.categories.includes("medical"));
```

`IconsInfo` is also exported as an alias for Go compatibility.

## Customization

### Individually

Pass normal NodX attributes:

```ts
import { Class, Style } from "@varavel/nodx";
import { Cherry } from "@varavel/nodx-lucide";

Cherry(Class("size-6 text-blue-500"));
Cherry(Style("stroke-width: 4; stroke: red;"));
Cherry(Class("w-8 h-8"), Style("color: rebeccapurple"));
```

### Globally

Every icon includes `data-nodx="lucide"`. Target it in CSS:

```css
svg[data-nodx="lucide"] {
  stroke-width: 4;
  stroke: red;
}
```

### Avoiding conflicts with Tailwind

Use `:not()` to let per-icon Tailwind classes win:

```css
svg[data-nodx="lucide"]:not([class*="size-"]) {
  width: 24px;
  height: 24px;
}

svg[data-nodx="lucide"]:not([class*="text-"]) {
  color: currentColor;
}
```

Then:

```ts
Cherry(); // 24px default
Cherry(Class("size-32")); // overrides default
```

## API

| Export                          | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `IconName(...children)`         | Icon component, e.g. `Cherry()`, `CircleUser()` |
| `iconsInfo` / `IconsInfo`       | Array of `{ name, icon, tags, categories }`     |
| `lucideSvgWrapper(...children)` | Low-level SVG wrapper (advanced)                |

All icon functions have the signature `(...children: NodeChild[]) => Node` so you can pass `Class`,
`Style`, `Id`, `Group`, `Raw`, or any `Node`.

## Versioning

This package versions independently of Lucide. Each release notes the Lucide version it was
generated from (see `Lucide version` header in `src/generated/icons.ts`).

Check new Lucide releases at https://github.com/lucide-icons/lucide/releases.

## License

MIT — see [LICENSE](LICENSE).

Lucide icons themselves are licensed under the
[ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE).
