import { CSSResultGroup, LitElement } from "lit";

export type BreakPointKeys = "xs" | "sm" | "md" | "lg" | "xl";

export type BreakPointValues = { [key in BreakPointKeys]: number };

export interface BreakPointMediaMatch {
  breakpoint: BreakPointKeys;
  breakpointMin: number;
  breakpointMax: number | undefined;
  value: number;
  media?: MediaQueryList;
}

export type BreakPointMediaQueries = {
  [key in BreakPointKeys]: BreakPointMediaMatch;
};

export const breakPoints: BreakPointValues = {
    xs: 0,
    sm: 720,
    md: 1024,
    lg: 1280,
    xl: 1920,
};

export const breakColumns: BreakPointValues = {
    xs: 4,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 12,
  };
  
export const breakPointMediaQueries: BreakPointMediaMatch[] = [
  {
    breakpoint: "xs",
    breakpointMin: breakPoints.xs,
    breakpointMax: breakPoints.sm - 1,
    value: breakColumns.xs,
    // media: window.matchMedia(`(min-width: max-width(${breakPoints.xs}px) and (max-width: ${breakPoints.sm - 1}px)`),
  },
  {
    breakpoint: "sm",
    value: breakColumns.sm,
    breakpointMin: breakPoints.sm,
    breakpointMax: breakPoints.md - 1,
    // media: window.matchMedia(`(min-width: ${breakPoints.sm}px) and (max-width: ${breakPoints.md - 1}px)`),
  },
  {
    breakpoint: "md",
    breakpointMin: breakPoints.md,
    breakpointMax: breakPoints.lg - 1,
    value: breakColumns.md,
    // media: window.matchMedia(`(min-width: ${breakPoints.md}px) and (max-width: ${breakPoints.lg - 1}px)`),
  },
  {
    breakpoint: "lg",
    breakpointMin: breakPoints.lg,
    breakpointMax: breakPoints.xl - 1,
    value: breakColumns.lg,
    // media: window.matchMedia(`(min-width: ${breakPoints.lg}px) and (max-width: ${breakPoints.xl - 1}px)`)
  },
  {
    breakpoint: "xl",
    breakpointMin: breakPoints.xl,
    breakpointMax: null,
    value: breakColumns.xl,
    // media: window.matchMedia(`min-width(${breakPoints.xl}px)`),
  },
];

export const gap = 20;

export class GridLayoutFoundation extends LitElement {
  breakPoints: BreakPointValues;
  _breakPointMediaMatch: BreakPointMediaMatch[] = [];

  constructor(breakPoints: BreakPointValues) {
    super();
    this.breakPoints = breakPoints;
  }

  up = (BreakPointKey: BreakPointKeys) => {
    //   console.log(this.breakPoints)
    return `@media (min-width: ${this.breakPoints[BreakPointKey]}px)`;
  };
  down = (BreakPointKey: BreakPointKeys) => {
    return `@media (max-width: ${this.breakPoints[BreakPointKey]}px)`;
  };

frGetter = (value: number | CSSResultGroup) =>
  typeof value === "number" ? `repeat(${value}, 1fr)` : value;

  get breakPointsValues(): BreakPointMediaMatch[]  {
    return this._breakPointMediaMatch
  }

  set breakPointsValues(breakPoints: BreakPointMediaMatch[]) {
    this._breakPointMediaMatch = breakPoints;
  }
}

export const frGetter = (value: number | CSSResultGroup) =>
  typeof value === "number" ? `repeat(${value}, 1fr)` : value;
