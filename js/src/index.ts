import { collectAtoms } from "./parser/babelAstTraversal";
import { parseWithBabel } from "./parser/babelParser";
import { Atom } from "./shared/atoms";

export interface ParseCodeOptions {
    code: string;
    sourceId: string;
}

export const parseCode = (options: ParseCodeOptions): Atom[] => {
    const { code, sourceId } = options;

    const ast = parseWithBabel({
        code,
        sourceId,
    });

    return collectAtoms(ast, sourceId);
};
