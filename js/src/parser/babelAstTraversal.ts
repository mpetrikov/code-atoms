import type { NodePath } from "@babel/traverse";
import traverseImport from "@babel/traverse";
import type {
    Function as BabelFunction,
    CallExpression,
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
    File,
    ImportDeclaration,
} from "@babel/types";
import { Atom } from "../shared/atoms";
import { getFunctionName } from "./getFunctionName";
import { fromBabelLoc } from "./location";

const traverse =
    typeof traverseImport === "function"
        ? traverseImport
        : (traverseImport as any).default;

export const collectAtoms = (ast: File, sourceId: string): Atom[] => {
    const atoms: Atom[] = [];
    const functionStack: (string | null)[] = [];

    traverse(ast, {
        Function: {
            enter(path: NodePath<BabelFunction>) {
                const name = getFunctionName(path);

                functionStack.push(name);

                atoms.push({
                    kind: "function",
                    sourceId,
                    name,
                    isAsync: path.node.async || false,
                    params: path.node.params.map((p) =>
                        p.type === "Identifier" ? p.name : "<unknown>",
                    ),
                    loc: fromBabelLoc(path.node.loc),
                });
            },

            exit() {
                functionStack.pop();
            },
        },

        CallExpression(path: NodePath<CallExpression>) {
            atoms.push({
                kind: "call",
                sourceId,
                caller:
                    functionStack.length > 0
                        ? functionStack[functionStack.length - 1]
                        : null,
                calleeName:
                    path.node.callee.type === "Identifier"
                        ? path.node.callee.name
                        : "<complex>",
                loc: fromBabelLoc(path.node.loc),
            });
        },

        ImportDeclaration(path: NodePath<ImportDeclaration>) {
            atoms.push({
                kind: "import",
                sourceId,
                source: path.node.source.value,
                specifiers: path.node.specifiers
                    .map((s) =>
                        "local" in s && s.local.type === "Identifier"
                            ? s.local.name
                            : null,
                    )
                    .filter((x): x is string => x !== null),
                loc: fromBabelLoc(path.node.loc),
            });
        },

        ExportNamedDeclaration(path: NodePath<ExportNamedDeclaration>) {
            // export const a = ...
            if (path.node.declaration?.type === "VariableDeclaration") {
                for (const decl of path.node.declaration.declarations) {
                    // export const a = ...
                    if (decl.id.type === "Identifier") {
                        atoms.push({
                            kind: "export",
                            sourceId,
                            name: decl.id.name,
                            exportKind: "named",
                            loc: fromBabelLoc(decl.loc ?? path.node.loc),
                        });
                    }
                }
                return;
            }

            // export function foo() {}
            if (
                path.node.declaration &&
                path.node.declaration.type === "FunctionDeclaration" &&
                path.node.declaration.id
            ) {
                atoms.push({
                    kind: "export",
                    sourceId,
                    name: path.node.declaration.id.name,
                    exportKind: "named",
                    loc: fromBabelLoc(path.node.loc),
                });
                return;
            }

            // export { foo, bar }
            for (const spec of path.node.specifiers) {
                atoms.push({
                    kind: "export",
                    sourceId,
                    name:
                        spec.exported.type === "Identifier"
                            ? spec.exported.name
                            : "unknown",
                    exportKind: "named",
                    loc: fromBabelLoc(spec.loc),
                });
            }
        },

        ExportDefaultDeclaration(path: NodePath<ExportDefaultDeclaration>) {
            atoms.push({
                kind: "export",
                sourceId,
                name: "default",
                exportKind: "default",
                loc: fromBabelLoc(path.node.loc),
            });
        },
    });

    return atoms;
};
