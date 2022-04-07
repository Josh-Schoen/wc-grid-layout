import { __decorate } from "tslib";
import { css, html } from "lit";
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property } from "lit/decorators.js";
import { breakPoints as bp, GridLayoutFoundation, gap, } from "./foundation";
let GridLayout = class GridLayout extends GridLayoutFoundation {
    constructor() {
        super(bp);
        //     static override get properties() {
        //         return columnBreakpoints
        // }
        this.columnBreakpoints = `{"lg": 1024}`;
        this.gridTemplateColumns = ``;
        this.gridAutoRows = `minmax(10px, auto)`;
        this.gap = gap;
        this.rows = 1;
        this.columns = 12;
        this.width = '100%';
        this.points = bp;
        this.mqls = [
            window.matchMedia("(max-width: 1900px)"),
            window.matchMedia("(max-width: 600px)"),
            window.matchMedia("(max-height: 500px)")
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        try {
            this.points = JSON.parse(this.columnBreakpoints);
        }
        catch (e) {
            console.log(e);
        }
    }
    attributeChangedCallback(name, _old, value) {
        console.log(value);
        try {
            this.columnBreakpoints = JSON.parse(value ? value : _old);
        }
        catch (e) {
            console.log(e);
        }
        super.attributeChangedCallback(name, _old, value);
        console.log(this.points);
    }
    render() {
        console.log(this.rowGap);
        const style = {
            display: 'grid',
            color: 'blue',
            // overrides CSS media queries
            'grid-template-columns': this.gridTemplateColumns,
            width: this.width,
            gap: this.gap,
            rowGap: this.rowGap ? this.rowGap : null,
            columnGap: this.columnGap ? this.columnGap : null,
            'grid-auto-rows': this.gridAutoRows,
            background: '#efefef',
            // 'grid-template-areas': this.gridTemplateAreas
        };
        // const width = window.innerWidth;
        // const classes = {lg: this.breakPoints.lg >= width, md: this.breakPoints.md >= width, sm: this.breakPoints.sm <= width}
        return html `<div class="cwc-grid" style=${styleMap(style)}><slot></slot></div>
        `;
    }
};
GridLayout.styles = css `
    :host {
        color: blue;
        display: flex;
        width: 100%;
    }
    @media (min-width: ${bp.xs}px) {
        .cwc-grid {
            grid-template-columns: var(--xs);
        }
    }
    @media (min-width: ${bp.sm}px) {
        .cwc-grid {
            grid-template-columns: var(--sm);
        }
    }
    @media (min-width: ${bp.md}px) {
        .cwc-grid {
            grid-template-columns: var(--md);
        }
    }
    @media (min-width: ${bp.lg}px) {
        .cwc-grid {
            grid-template-columns: var(--lg);
        }
    }
        @media (min-width: ${bp.xl}px) {
            .cwc-grid {
                grid-template-columns: var(--xl);
            }
    }
    `;
__decorate([
    property()
], GridLayout.prototype, "columnBreakpoints", void 0);
__decorate([
    property()
], GridLayout.prototype, "gridTemplateColumns", void 0);
__decorate([
    property()
], GridLayout.prototype, "gridAutoRows", void 0);
__decorate([
    property()
], GridLayout.prototype, "gap", void 0);
__decorate([
    property({ type: Number })
], GridLayout.prototype, "rows", void 0);
__decorate([
    property()
], GridLayout.prototype, "columnGap", void 0);
__decorate([
    property()
], GridLayout.prototype, "rowGap", void 0);
__decorate([
    property()
], GridLayout.prototype, "columns", void 0);
__decorate([
    property()
], GridLayout.prototype, "width", void 0);
__decorate([
    property()
], GridLayout.prototype, "gridTemplateAreas", void 0);
GridLayout = __decorate([
    customElement('cwc-grid-layout')
], GridLayout);
export { GridLayout };
//# sourceMappingURL=grid-layout.component.js.map