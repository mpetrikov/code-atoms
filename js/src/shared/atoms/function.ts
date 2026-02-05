import type { BaseAtom } from "./base";

export interface FunctionAtom extends BaseAtom {
  kind: "function";
  name: string | null;
  isAsync: boolean;
  params: string[];
}
