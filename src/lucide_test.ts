import { assertEquals, assertStringIncludes } from "@std/assert";
import { Attr, Class } from "@varavel/nodx";
import { lucideSvgWrapper } from "./lucide.ts";

Deno.test("lucideSvgWrapper renders the Lucide SVG skeleton", () => {
  const html = lucideSvgWrapper().render();
  assertEquals(
    html,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-nodx="lucide"></svg>`,
  );
});

Deno.test("lucideSvgWrapper forwards children and attributes", () => {
  const html = lucideSvgWrapper(
    Class("size-6 text-blue-500"),
    Attr("id", "my-icon"),
  ).render();
  assertStringIncludes(html, `class="size-6 text-blue-500"`);
  assertStringIncludes(html, `id="my-icon"`);
  assertStringIncludes(html, `data-nodx="lucide"`);
  assertStringIncludes(html, `<svg`);
  assertStringIncludes(html, `</svg>`);
});

Deno.test("lucideSvgWrapper expands Group children", async () => {
  const { Group, Text } = await import("@varavel/nodx");
  const html = lucideSvgWrapper(Group(Text("a"), Text("b"))).render();
  // Group is expanded inside the SVG; text nodes become content.
  assertStringIncludes(html, `>ab</svg>`);
});
