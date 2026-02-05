import type { SourceLocation as BabelLoc } from "@babel/types";
import { SourceLocation } from "../shared/atoms";

export const fromBabelLoc = (
  loc: BabelLoc | null | undefined,
): SourceLocation | null => {
  if (!loc) return null;

  return {
    range: {
      start: loc.start.index,
      end: loc.end.index,
    },
    start: {
      line: loc.start.line,
      column: loc.start.column,
    },
    end: {
      line: loc.end.line,
      column: loc.end.column,
    },
  };
};
