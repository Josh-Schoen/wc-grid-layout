import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MediaMatch } from '../media-match';
import { getCellPositionString } from './foundation';
let GridCell = class GridCell extends LitElement {
    constructor() {
        super();
        /**
         * row start / column start / row end / column end
         */
        this.default = 'auto / auto / auto / auto';
        this.height = '100%';
        this.justifyContent = 'center';
        this.alignItems = 'center';
        this.mediaMatch = new MediaMatch();
        this.updateStyles = () => {
            if (this.xs) {
                this.default = this.xs;
            }
            if (this.sm) {
                this.default = this.sm;
            }
            if (this.md) {
                this.default = this.md;
            }
            if (this.lg) {
                this.default = this.lg;
            }
            this.cellSize = getCellPositionString({
                xs: this.xs ? this.xs : this.default,
                sm: this.sm ? this.sm : this.default,
                md: this.md ? this.md : this.default,
                lg: this.lg ? this.lg : this.default,
                xl: this.xl ? this.xl : this.default,
            }, this.breakPointEvent);
            const cellPositionLength = this.cellSize.split('/').length;
            if (cellPositionLength > 2) {
                this.style.gridArea = this.cellSize;
            }
            else {
                this.style.gridColumn = this.cellSize;
                this.style.gridRow = 'auto / auto';
            }
            this.style.justifyContent = `${this.justifyContent}`;
            this.style.alignItems = `${this.alignItems}`;
        };
        this.fnc = (e) => {
            this.breakPointEvent = e.detail;
            this.updateStyles();
            this.requestUpdate();
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.mediaMatch.subscribe(this.fnc);
        this.style.gridArea = `${this.default}`;
        this.style.justifyContent = `${this.justifyContent}`;
        this.style.alignItems = `${this.alignItems}`;
        this.updateStyles();
    }
    static get styles() {
        return css `
      :host {
        min-width: 0;
        box-sizing: border-box;
        grid-column-start: var(--columnStart);
        grid-column-start: var(--columnEnd);
        justify-self: stretch;
        display: inline-flex;
        flex-flow: column wrap;
      }
    `;
    }
    render() {
        return html ` <div class="cwc-grid-cell"><slot></slot></div> `;
    }
};
__decorate([
    property({ type: String })
], GridCell.prototype, "default", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "xs", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "sm", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "md", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "lg", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "xl", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "smRow", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "mdRow", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "lgRow", void 0);
__decorate([
    property({ type: String })
], GridCell.prototype, "xlRow", void 0);
__decorate([
    property()
], GridCell.prototype, "height", void 0);
__decorate([
    property()
], GridCell.prototype, "rowStart", void 0);
__decorate([
    property()
], GridCell.prototype, "justifyContent", void 0);
__decorate([
    property()
], GridCell.prototype, "alignItems", void 0);
GridCell = __decorate([
    customElement('cwc-grid-cell')
], GridCell);
export { GridCell };
//# sourceMappingURL=gird-cell.component.js.map