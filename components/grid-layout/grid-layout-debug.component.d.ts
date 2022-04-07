import { GridLayoutAdvanced } from './grid-layout-advanced.component';
import './grid-cell/gird-cell-advanced.component';
export declare class GridLayoutDebug extends GridLayoutAdvanced {
    constructor();
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    renderColumnArray(): any[];
    render(): import("lit-html").TemplateResult<1>;
}
