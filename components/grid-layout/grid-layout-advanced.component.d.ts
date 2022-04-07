import { GridLayoutFoundation, BreakPointMediaMatch } from './foundation';
import { MediaMatch } from './media-match';
export declare class GridLayoutAdvanced extends GridLayoutFoundation {
    mediaMatch: MediaMatch;
    columnBreakpoints: string;
    gridTemplateColumns: string;
    gridAutoRows: string;
    gap: string;
    rows: number;
    columnGap?: string;
    rowGap?: string;
    columns: number;
    width: string;
    gridTemplateAreas?: string;
    points: import("./foundation").BreakPointValues;
    constructor();
    mqls: MediaQueryList[];
    breakPointMediaMatch: BreakPointMediaMatch;
    connectedCallback(): void;
    fnc: (e: CustomEvent<BreakPointMediaMatch>) => Promise<void>;
    get customStyles(): {
        display: string;
        'grid-template-columns': string;
        width: string;
        gap: string;
        rowGap: string;
        columnGap: string;
        'grid-auto-rows': string;
        background: string;
    };
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cwc-grid-layout-advanced': GridLayoutAdvanced;
    }
}
