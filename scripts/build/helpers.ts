import { dirname, fromFileUrl, join } from "@std/path";

/**
 * Resolves a path relative to the workspace root.
 *
 * @param relativePath Path relative to the workspace root.
 * @returns Absolute path.
 */
export const fromRoot = (relativePath: string): string => {
  const scriptDir = dirname(fromFileUrl(import.meta.url));
  return join(scriptDir, "..", "..", relativePath);
};
