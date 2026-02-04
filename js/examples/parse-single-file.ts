import { collectAtoms } from "../src/parser/babelAstTraversal";
import { parseWithBabel } from "../src/parser/babelParser";

const ast = parseWithBabel({
  code: `
    import { foo } from "./foo";

    export const bar = () => {
      foo();
    };
  `,
  filePath: "example.js",
});

// console.log(ast);
// console.log(ast.type);

collectAtoms(ast);
