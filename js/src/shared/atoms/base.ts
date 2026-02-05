export type SourceRange = {
  start: number; // absolute offset
  end: number; // absolute offset
};

export type SourcePosition = {
  line: number; // 1-based
  column: number; // 0-based
};

export type SourceLocation = {
  range: SourceRange;

  start: SourcePosition;
  end: SourcePosition;
};

export interface BaseAtom {
  kind: "file" | "function" | "call" | "import" | "export";

  // unique identifier of the source
  sourceId: string;

  // source location
  loc: SourceLocation | null;
}
