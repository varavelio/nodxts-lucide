import { Attr, El, Group } from "@varavel/nodx";
import type { Node, NodeChild } from "@varavel/nodx";

/**
 * Creates the SVG wrapper for all Lucide icons.
 *
 * This follows the [Lucide guide](https://lucide.dev/guide/) and adds a
 * `data-nodx="lucide"` attribute so all icons can be targeted globally with
 * CSS (e.g. `svg[data-nodx="lucide"] { ... }`).
 *
 * The wrapper is intentionally not exported as part of the public icon API;
 * it is used internally by each generated icon function.
 *
 * Equivalent to:
 *
 * ```html
 * <svg
 *   xmlns="http://www.w3.org/2000/svg"
 *   width="24"
 *   height="24"
 *   viewBox="0 0 24 24"
 *   fill="none"
 *   stroke="currentColor"
 *   stroke-width="2"
 *   stroke-linecap="round"
 *   stroke-linejoin="round"
 *   data-nodx="lucide"
 * ></svg>
 * ```
 *
 * @param children The children to place inside the SVG element.
 * @returns The SVG element node.
 */
export function lucideSvgWrapper(...children: NodeChild[]): Node {
  return El(
    "svg",
    Attr("xmlns", "http://www.w3.org/2000/svg"),
    Attr("width", "24"),
    Attr("height", "24"),
    Attr("viewBox", "0 0 24 24"),
    Attr("fill", "none"),
    Attr("stroke", "currentColor"),
    Attr("stroke-width", "2"),
    Attr("stroke-linecap", "round"),
    Attr("stroke-linejoin", "round"),
    Attr("data-nodx", "lucide"),
    Group(...children),
  );
}
