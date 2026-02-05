import type { BaseAtom } from "./base";

export interface FileAtom extends BaseAtom {
    kind: "file";
    path: string;
}
