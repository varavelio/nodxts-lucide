import { assertEquals, assertStringIncludes } from "@std/assert";
import { Class } from "@varavel/nodx";
import {
  AArrowDown,
  Accessibility,
  Activity,
  Cherry,
  Circle,
  Heart,
  iconsInfo,
  Star,
} from "./index.ts";

Deno.test("icons render SVG wrapper with data-nodx attribute", () => {
  const html = Star().render();
  assertStringIncludes(html, `<svg`);
  assertStringIncludes(html, `data-nodx="lucide"`);
  assertStringIncludes(html, `xmlns="http://www.w3.org/2000/svg"`);
  assertStringIncludes(html, `</svg>`);
});

Deno.test("Cherry icon renders expected paths", () => {
  const html = Cherry().render();
  // Cherry should contain at least one path element
  assertStringIncludes(html, `<path`);
  // Should include the Lucide default attributes
  assertStringIncludes(html, `stroke="currentColor"`);
  assertStringIncludes(html, `stroke-width="2"`);
});

Deno.test("icons forward custom attributes", () => {
  const html = Heart(Class("size-6 text-red-500")).render();
  assertStringIncludes(html, `class="size-6 text-red-500"`);
  assertStringIncludes(html, `data-nodx="lucide"`);
});

Deno.test("icons are independent", () => {
  const a = Circle().render();
  const b = Heart().render();
  assertEquals(a === b, false);
});

Deno.test("iconsInfo entries have correct shape", () => {
  const sample = iconsInfo.find((i) => i.name === "Heart");
  if (!sample) throw new Error("Heart not found in iconsInfo");
  assertEquals(typeof sample.name, "string");
  assertEquals(typeof sample.icon, "function");
  assertEquals(Array.isArray(sample.tags), true);
  assertEquals(Array.isArray(sample.categories), true);
  // Rendering via the stored icon reference should work
  const html = sample.icon().render();
  assertStringIncludes(html, `<svg`);
});

Deno.test("iconsInfo first entry matches generated order", () => {
  assertEquals(iconsInfo[0].name, "A Arrow Down");
  assertEquals(iconsInfo[0].icon, AArrowDown);
});

Deno.test("sample icons render without attributes", () => {
  for (const fn of [AArrowDown, Accessibility, Activity, Circle, Heart, Star]) {
    const html = fn().render();
    assertStringIncludes(html, `<svg`);
    assertStringIncludes(html, `</svg>`);
  }
});
