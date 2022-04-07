import { LitElement } from "lit";
import { BreakPointMediaMatch } from "../foundation";
import { GridLayoutAdvanced } from "../grid-layout-advanced.component";
import { MediaMatch } from '../media-match';
import { CellSize, Placement } from "./foundation";
export declare class GridCellAdvanced extends LitElement {
    default: CellSize;
    xs?: CellSize;
    sm?: CellSize;
    md?: CellSize;
    lg?: CellSize;
    xl?: CellSize;
    height: string;
    rowStart?: string | number;
    justifyContent: Placement;
    alignItems: Placement;
    mediaMatch: MediaMatch;
    breakPointEvent?: BreakPointMediaMatch;
    cellSize?: CellSize;
    constructor();
    connectedCallback(): void;
    updateStyles: () => void;
    fnc: (e: CustomEvent<BreakPointMediaMatch>) => void;
    setDefaultCellSize: () => CellSize;
    static get styles(): import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cwc-grid-cell-advanced': GridLayoutAdvanced;
    }
}
