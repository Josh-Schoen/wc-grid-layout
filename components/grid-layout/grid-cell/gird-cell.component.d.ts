import { LitElement } from 'lit';
import { BreakPointMediaMatch } from '../foundation';
import { GridLayoutAdvanced } from '../grid-layout-advanced.component';
import { MediaMatch } from '../media-match';
import { Placement } from './foundation';
export declare class GridCell extends LitElement {
    /**
     * row start / column start / row end / column end
     */
    default: string;
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xsRow?: string;
    smRow?: string;
    mdRow?: string;
    lgRow?: string;
    xlRow?: string;
    height: string;
    rowStart?: string | number;
    justifyContent: Placement;
    alignItems: Placement;
    mediaMatch: MediaMatch;
    breakPointEvent?: BreakPointMediaMatch;
    cellSize?: string;
    constructor();
    connectedCallback(): void;
    updateStyles: () => void;
    fnc: (e: CustomEvent<BreakPointMediaMatch>) => void;
    static get styles(): import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'cwc-grid-cell': GridLayoutAdvanced;
    }
}
