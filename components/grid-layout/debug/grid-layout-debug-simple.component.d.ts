import '../grid-cell/gird-cell.component';
import { GridLayoutAdvanced } from '../grid-layout-advanced.component';
export declare class GridLayoutDebugSimple extends GridLayoutAdvanced {
    constructor();
    static styles: import("lit").CSSResultGroup;
    connectedCallback(): void;
    renderColumnArray(): any[];
    render(): import("lit-html").TemplateResult<1>;
}
