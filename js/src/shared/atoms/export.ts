import type { BaseAtom } from "./base";

export interface ExportAtom extends BaseAtom {
  kind: "export";

  name: string;
  exportKind: "named" | "default" | "namespace";
}
