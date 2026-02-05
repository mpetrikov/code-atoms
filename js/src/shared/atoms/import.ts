import type { BaseAtom } from "./base";

export interface ImportAtom extends BaseAtom {
  kind: "import";

  source: string;
  specifiers: string[];
}
