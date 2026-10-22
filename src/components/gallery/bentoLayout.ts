/**
 * Bento mosaic spans for a 12-column grid. Photos are laid out in blocks that each fill
 * complete rows, so any photo count produces a grid with no holes.
 */

export type TileVariant = "feature" | "small" | "wide" | "portrait" | "half" | "cinema";

export interface BentoSpan {
  col: number;
  row: number;
  variant: TileVariant;
  /** On phones (2-column grid) the tile spans both columns */
  mobileFull: boolean;
}

type Block = { size: number; tiles: Omit<BentoSpan, "mobileFull">[] };

const feature = { col: 6, row: 4, variant: "feature" } as const;
const small = { col: 3, row: 2, variant: "small" } as const;
const wide = { col: 6, row: 2, variant: "wide" } as const;
const portrait = { col: 4, row: 4, variant: "portrait" } as const;
const half = { col: 6, row: 4, variant: "half" } as const;

/** Feature left, two small + one wide on the right */
const blockA: Block = { size: 4, tiles: [feature, small, small, wide] };
/** Three portraits in a row */
const blockB: Block = { size: 3, tiles: [portrait, portrait, portrait] };
/** Mirror of A: two small + wide on the left, feature right */
const blockC: Block = { size: 4, tiles: [small, small, feature, wide] };
/** Two halves */
const blockPair: Block = { size: 2, tiles: [half, half] };

const CYCLE = [blockA, blockB, blockC, blockB];
const FALLBACKS = [blockB, blockA, blockPair];

/** Remaining counts of 0 or 2+ can always be finished with blocks of 2, 3, or 4 */
function canFinish(remaining: number): boolean {
  return remaining === 0 || remaining >= 2;
}

/** Full, half, half, full, … — a trailing lone half is promoted to full */
function mobileFlags(count: number): boolean[] {
  const flags = Array.from({ length: count }, (_, i) => i % 3 === 0);
  if (count % 3 === 2) flags[count - 1] = true;
  return flags;
}

export function getBentoSpans(count: number): BentoSpan[] {
  if (count <= 0) return [];
  if (count === 1) return [{ col: 12, row: 7, variant: "cinema", mobileFull: true }];

  const spans: Omit<BentoSpan, "mobileFull">[] = [];
  let remaining = count;
  let step = 0;

  while (remaining > 0) {
    const preferred = CYCLE[step % CYCLE.length];
    const block =
      preferred.size <= remaining && canFinish(remaining - preferred.size)
        ? preferred
        : FALLBACKS.find((b) => b.size <= remaining && canFinish(remaining - b.size))!;
    spans.push(...block.tiles);
    remaining -= block.size;
    step += 1;
  }

  const mobile = mobileFlags(count);
  return spans.map((span, i) => ({ ...span, mobileFull: mobile[i] }));
}
