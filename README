# code-atoms

`code-atoms` is a lightweight parsing library that extracts **atomic, language-agnostic facts** from source code.

It does **not** build graphs, resolve symbols, or interpret code.
It only answers one question:

> **What is literally written in the source code?**

The output is a flat list of JSON-serializable **atoms**, designed to be consumed by higher-level tools.

---

## Installation

```bash
npm install code-atoms
```

## Usage

```js
import { parseCode } from "code-atoms";

const atoms = parseCode({
  code: `
    import { foo } from "./foo";

    export function bar() {
      foo();
    }
  `,
  sourceId: "file:/example.js",
});

console.log(atoms);
```

## Example output

```json
[
  {
    "kind": "function",
    "sourceId": "file:/example.js",
    "name": "bar",
    "isAsync": false,
    "params": [],
    "loc": {
      "range": { "start": 33, "end": 68 },
      "start": { "line": 4, "column": 4 },
      "end": { "line": 6, "column": 5 }
    }
  },
  {
    "kind": "call",
    "sourceId": "file:/example.js",
    "caller": "bar",
    "calleeName": "foo",
    "loc": {
      "range": { "start": 56, "end": 61 },
      "start": { "line": 5, "column": 6 },
      "end": { "line": 5, "column": 11 }
    }
  }
]
```

## Atom Model

All atoms share a common base shape:

```ts
interface BaseAtom {
  kind: "file" | "function" | "call" | "import" | "export";
  sourceId: string;
  loc: SourceLocation | null;
}
```

## Supported atoms

- **file** — source file
- **function** — function or method definition
- **call** — function or method call
- **import** — ES module import
- **export** — ES module export

## Atom characteristics

- flat (no references between them)
- deterministic
- JSON-serializable
- language-agnostic by design

## Design Principles

- Parsing only — no interpretation
- No symbol resolution
- No call graphs
- No framework awareness
- No cross-file linking
- All higher-level logic (relations, graphs, analysis) is expected to live **outside** this library.

## Language Support

Currently supported:

- JavaScript (ES modules)

Planned:

- TypeScript
- Python
- Other languages via the same atom format

## License

MIT
