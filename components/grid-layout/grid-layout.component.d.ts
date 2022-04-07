import { GridLayoutFoundation } from "./foundation";
export declare class GridLayout extends GridLayoutFoundation {
    columnBreakpoints: string;
    gridTemplateColumns: string;
    gridAutoRows: string;
    gap: string;
    rows: number;
    columnGap?: string;
    rowGap?: string;
    columns: number | string;
    width: string;
    gridTemplateAreas?: string;
    points: import("./foundation").BreakPointValues;
    constructor();
    static styles: import("lit").CSSResult;
    mqls: MediaQueryList[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, _old: string, value: string | null): void;
    render(): import("lit-html").TemplateResult<1>;
}
