import { __decorate } from "tslib";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MediaMatch } from '../media-match';
import { getCellCPosition } from "./foundation";
let GridCellAdvanced = class GridCellAdvanced extends LitElement {
    constructor() {
        super();
        // Required default propery. Use if no other CellSize is defined
        this.default = { start: 'auto', end: 'auto' };
        this.height = '100%';
        this.justifyContent = 'center';
        this.alignItems = 'center';
        this.mediaMatch = new MediaMatch();
        this.updateStyles = () => {
            var _a, _b;
            this.cellSize = getCellCPosition({
                xs: this.xs ? this.xs : this.default,
                sm: this.sm ? this.sm : this.default,
                md: this.md ? this.md : this.default,
                lg: this.lg ? this.lg : this.default,
                xl: this.xl ? this.xl : this.default
            }, this.breakPointEvent);
            this.style.gridColumnStart = `${this.cellSize.start}`;
            this.style.gridColumnEnd = `${this.cellSize.end}`;
            this.style.gridRowStart = `${(_a = this.cellSize.row) === null || _a === void 0 ? void 0 : _a.start}`;
            this.style.gridRowEnd = `${(_b = this.cellSize.row) === null || _b === void 0 ? void 0 : _b.end}`;
            this.style.justifyContent = `${this.justifyContent}`;
            this.style.alignItems = `${this.alignItems}`;
        };
        this.fnc = (e) => {
            this.breakPointEvent = e.detail;
            this.updateStyles();
            this.requestUpdate();
        };
        this.setDefaultCellSize = () => {
            const grid = this.closest('cwc-grid-layout-advanced');
            if (grid) {
                return Object.assign(Object.assign({}, this.default), { end: grid.columns + 1 });
            }
            return this.default;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.mediaMatch.subscribe(this.fnc);
        this.style.gridColumnStart = `${this.default.start}`;
        this.style.gridColumnEnd = `${this.default.end}`;
        this.style.justifyContent = `${this.justifyContent}`;
        this.style.alignItems = `${this.alignItems}`;
        this.updateStyles();
    }
    static get styles() {
        return css `
        :host {
            background: pink;
            min-width: 0;
            box-sizing: border-box;
            grid-column-start: var(--columnStart);
            grid-column-start: var(--columnEnd);
            justify-self: stretch;
            display: inline-flex;
            flex-flow: column wrap;

        }`;
    }
    render() {
        return html `
    <div class="cwc-grid-cell"><slot></slot></div>
    `;
    }
};
__decorate([
    property({ type: Object })
], GridCellAdvanced.prototype, "default", void 0);
__decorate([
    property({ type: Object })
], GridCellAdvanced.prototype, "xs", void 0);
__decorate([
    property({ type: Object })
], GridCellAdvanced.prototype, "sm", void 0);
__decorate([
    property({ type: Object })
], GridCellAdvanced.prototype, "md", void 0);
__decorate([
    property({ type: Object })
], GridCellAdvanced.prototype, "lg", void 0);
__decorate([
    property({ type: Object })
], GridCellAdvanced.prototype, "xl", void 0);
__decorate([
    property()
], GridCellAdvanced.prototype, "height", void 0);
__decorate([
    property()
], GridCellAdvanced.prototype, "rowStart", void 0);
__decorate([
    property()
], GridCellAdvanced.prototype, "justifyContent", void 0);
__decorate([
    property()
], GridCellAdvanced.prototype, "alignItems", void 0);
GridCellAdvanced = __decorate([
    customElement('cwc-grid-cell-advanced')
], GridCellAdvanced);
export { GridCellAdvanced };
//# sourceMappingURL=gird-cell-advanced.component.js.map