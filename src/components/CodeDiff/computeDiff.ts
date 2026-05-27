import { diffLines } from 'diff';

export interface UnifiedDiff {
  /** Combined code with removed lines kept and added lines following them. */
  code: string;
  /** 1-based line numbers in `code` that were added. */
  addedLineNumbers: number[];
  /** 1-based line numbers in `code` that were removed. */
  removedLineNumbers: number[];
  addedCount: number;
  removedCount: number;
}

export interface SplitDiff {
  leftCode: string;
  rightCode: string;
  /** 1-based line numbers in `leftCode` that were removed. */
  leftRemovedLineNumbers: number[];
  /** 1-based line numbers in `rightCode` that were added. */
  rightAddedLineNumbers: number[];
  addedCount: number;
  removedCount: number;
}

const splitChunkLines = (value: string): string[] => {
  if (!value) return [];
  const stripped = value.endsWith('\n') ? value.slice(0, -1) : value;
  return stripped.split('\n');
};

export const toUnified = (before: string, after: string): UnifiedDiff => {
  const changes = diffLines(before, after);
  const lines: string[] = [];
  const addedLineNumbers: number[] = [];
  const removedLineNumbers: number[] = [];

  for (const change of changes) {
    const chunkLines = splitChunkLines(change.value);
    for (const line of chunkLines) {
      lines.push(line);
      const lineNumber = lines.length;
      if (change.added) addedLineNumbers.push(lineNumber);
      else if (change.removed) removedLineNumbers.push(lineNumber);
    }
  }

  return {
    code: lines.join('\n'),
    addedLineNumbers,
    removedLineNumbers,
    addedCount: addedLineNumbers.length,
    removedCount: removedLineNumbers.length,
  };
};

export const toSplit = (before: string, after: string): SplitDiff => {
  const changes = diffLines(before, after);
  const leftLines: string[] = [];
  const rightLines: string[] = [];
  const leftRemovedLineNumbers: number[] = [];
  const rightAddedLineNumbers: number[] = [];
  let addedCount = 0;
  let removedCount = 0;

  const pushRemoved = (chunkLines: string[]) => {
    for (const line of chunkLines) {
      leftLines.push(line);
      leftRemovedLineNumbers.push(leftLines.length);
      removedCount += 1;
    }
  };

  const pushAdded = (chunkLines: string[]) => {
    for (const line of chunkLines) {
      rightLines.push(line);
      rightAddedLineNumbers.push(rightLines.length);
      addedCount += 1;
    }
  };

  const padLeft = (n: number) => {
    for (let i = 0; i < n; i += 1) leftLines.push('');
  };
  const padRight = (n: number) => {
    for (let i = 0; i < n; i += 1) rightLines.push('');
  };

  for (let i = 0; i < changes.length; i += 1) {
    const change = changes[i];
    if (!change.added && !change.removed) {
      const lines = splitChunkLines(change.value);
      for (const line of lines) {
        leftLines.push(line);
        rightLines.push(line);
      }
      continue;
    }

    if (change.removed && changes[i + 1]?.added) {
      const removedLines = splitChunkLines(change.value);
      const addedLines = splitChunkLines(changes[i + 1].value);
      pushRemoved(removedLines);
      pushAdded(addedLines);
      const delta = removedLines.length - addedLines.length;
      if (delta > 0) padRight(delta);
      else if (delta < 0) padLeft(-delta);
      i += 1;
      continue;
    }

    if (change.removed) {
      const removedLines = splitChunkLines(change.value);
      pushRemoved(removedLines);
      padRight(removedLines.length);
      continue;
    }

    if (change.added) {
      const addedLines = splitChunkLines(change.value);
      pushAdded(addedLines);
      padLeft(addedLines.length);
    }
  }

  return {
    leftCode: leftLines.join('\n'),
    rightCode: rightLines.join('\n'),
    leftRemovedLineNumbers,
    rightAddedLineNumbers,
    addedCount,
    removedCount,
  };
};
