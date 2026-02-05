import { parse } from "@babel/parser";
import type { File } from "@babel/types";

export interface ParseOptions {
    code: string;
    filePath?: string;
}

export const parseWithBabel = (parseOptions: ParseOptions): File => {
    const { code, filePath } = parseOptions;

    return parse(code, {
        sourceType: "module",
        sourceFilename: filePath,

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
