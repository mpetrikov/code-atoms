import traverseImport from "@babel/traverse";
import type { File } from "@babel/types";

const traverse =
  typeof traverseImport === "function"
    ? traverseImport
    : (traverseImport as any).default;

export const collectAtoms = (ast: File) => {
  traverse(ast, {
    Function: (path) => {
      console.log("Function:", path.node.type);
    },

    CallExpression: (path) => {
      console.log("Call:", path.node.callee.type);
    },
  });
};
