export * from "./base";
export * from "./call";
export * from "./file";
export * from "./function";
export * from "./import";

import type { CallAtom } from "./call";
import type { ExportAtom } from "./export";
import type { FileAtom } from "./file";
import type { FunctionAtom } from "./function";
import type { ImportAtom } from "./import";

export type Atom = FileAtom | FunctionAtom | CallAtom | ImportAtom | ExportAtom;
