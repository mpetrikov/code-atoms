import { parse } from "@babel/parser";
import type { File } from "@babel/types";

export interface ParseOptions {
    code: string;
    sourceId: string;
}

export const parseWithBabel = (parseOptions: ParseOptions): File => {
    const { code, sourceId } = parseOptions;

    return parse(code, {
        sourceType: "module",
        sourceFilename: sourceId,

        plugins: [
            // core JS
            "importMeta",
            "topLevelAwait",
            // JSX
            "jsx",
            // future-proofing
            "classProperties",
            "classPrivateProperties",
            "classPrivateMethods",
            "dynamicImport",
        ],
    });
};
