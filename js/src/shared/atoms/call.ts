import type { BaseAtom } from "./base";

export interface CallAtom extends BaseAtom {
    kind: "call";

    // name of the called function or method
    calleeName: string;

    // name of the enclosing function
    caller: string | null;
}
