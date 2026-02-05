import { collectAtoms } from "../src/parser/babelAstTraversal";
import { parseWithBabel } from "../src/parser/babelParser";

const ast = parseWithBabel({
    code: `
      import { foo } from "./foo";
      import bar from "./bar";

      export const a = () => {
        foo();
      };

      export const c = () => {
        bar();
      }

      export const b = () => {
        foo();
        a();
        c();
      };

      export default b;
    `,
    filePath: "example.js",
});

// console.log("ast", ast);
// console.log("ast.type", ast.type);

const atoms = collectAtoms(ast, "file.ts");
console.log(atoms);
