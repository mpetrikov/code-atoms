import type { NodePath } from "@babel/traverse";
import type { Function } from "@babel/types";

export const getFunctionName = (path: NodePath<Function>): string | null => {
  const { node, parent } = path;

  // 1️⃣ function foo() {}
  if ("id" in node && node.id && node.id.type === "Identifier") {
    return node.id.name;
  }

  // 2️⃣ const foo = function() {} / () => {}
  if (
    parent &&
    parent.type === "VariableDeclarator" &&
    parent.id.type === "Identifier"
  ) {
    return parent.id.name;
  }

  // 3️⃣ { foo() {} }
  if (node.type === "ObjectMethod" && node.key.type === "Identifier") {
    return node.key.name;
  }

  // 4️⃣ class A { foo() {} }
  if (node.type === "ClassMethod" && node.key.type === "Identifier") {
    return node.key.name;
  }

  return null;
};
