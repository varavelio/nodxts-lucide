import { build, emptyDir, LibName } from "@deno/dnt";
import { fromRoot } from "./helpers.ts";
import denoJson from "../../deno.json" with { type: "json" };

export async function buildNpmPackage(): Promise<void> {
  await emptyDir(fromRoot("./npm"));

  await build({
    entryPoints: [fromRoot("./src/index.ts")],
    outDir: fromRoot("./npm"),
    shims: {
      deno: "dev",
    },
    test: false,
    compilerOptions: {
      lib: ["ES2025", "DOM"] as LibName[],
      target: "ES2015",
      sourceMap: true,
    },
    package: {
      name: "@varavel/nodx-lucide",
      description:
        "Lucide icons for NodX TypeScript — beautiful & consistent icons as type-safe functions",
      version: denoJson.version,
      sideEffects: false,
      publishConfig: {
        access: "public",
      },
      license: "MIT",
      author: "Varavel",
      homepage: "https://github.com/varavelio/nodxts-lucide",
      repository: {
        type: "git",
        url: "git+https://github.com/varavelio/nodxts-lucide.git",
      },
      bugs: {
        url: "https://github.com/varavelio/nodxts-lucide/issues",
      },
      keywords: [
        "lucide",
        "icons",
        "nodx",
        "typescript",
        "html",
        "template-engine",
        "varavel",
        "deno",
        "node",
        "nodejs",
        "jsr",
      ],
    },
    postBuild(): void {
      Deno.copyFileSync(fromRoot("./LICENSE"), fromRoot("./npm/LICENSE"));
      Deno.copyFileSync(fromRoot("./README.md"), fromRoot("./npm/README.md"));
    },
  });

  console.log("NPM package built at ./npm");
}
