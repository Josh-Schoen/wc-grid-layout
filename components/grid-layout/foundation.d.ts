import { CSSResultGroup, LitElement } from "lit";
export declare type BreakPointKeys = "xs" | "sm" | "md" | "lg" | "xl";
export declare type BreakPointValues = {
    [key in BreakPointKeys]: number;
};
export interface BreakPointMediaMatch {
    breakpoint: BreakPointKeys;
    value: number;
    media: MediaQueryList | string;
}
export declare type BreakPointMediaQueries = {
    [key in BreakPointKeys]: BreakPointMediaMatch;
};
export declare const breakPoints: BreakPointValues;
export declare const breakColumns: BreakPointValues;
export declare const breakPointMediaQueries: BreakPointMediaMatch[];
export declare const gap = "20px";
export declare class GridLayoutFoundation extends LitElement {
    breakPoints: BreakPointValues;
    constructor(breakPoints: BreakPointValues);
    up: (BreakPointKey: BreakPointKeys) => string;
    down: (BreakPointKey: BreakPointKeys) => string;
    frGetter: (value: number | CSSResultGroup) => string;
    getBreakPoints: (columnsBreakpoints: BreakPointValues, columnGap: BreakPointValues, rowGap: BreakPointValues) => string;
}
export declare const frGetter: (value: number | CSSResultGroup) => string | CSSResultGroup;
