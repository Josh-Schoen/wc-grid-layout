import { __decorate } from "tslib";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { gridLayoutToolbar } from "./grid-layout-toolbar.css.js";
let GridLayoutToolbar = class GridLayoutToolbar extends LitElement {
    constructor() {
        super(...arguments);
        this.open = true;
    }
    connectedCallback() {
        this.classList.toggle(this.open ? 'open' : '');
        super.connectedCallback();
    }
    render() {
        return html `
        <div>
        <ul>
        <li>
            <button>Grid columns</button>
        </li>
        <li>
            <button>Grid rows</button>
        </li>
        <li>
            <button>Grid gap</button>
        </li>
        <li>
            <button disabled>Selected row</button>
        </li>
        <li>
            <button disabled>Selected column</button>
        </li>
        </ul>
        </div>`;
    }
};
GridLayoutToolbar.styles = [gridLayoutToolbar];
__decorate([
    property({ type: Boolean })
], GridLayoutToolbar.prototype, "open", void 0);
GridLayoutToolbar = __decorate([
    customElement('grid-layout-toolbar')
], GridLayoutToolbar);
export { GridLayoutToolbar };
//# sourceMappingURL=grid-layout-toolbar.component.js.map