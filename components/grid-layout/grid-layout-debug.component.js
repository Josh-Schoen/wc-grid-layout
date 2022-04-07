import { __decorate } from "tslib";
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { GridLayoutAdvanced } from './grid-layout-advanced.component';
import './grid-cell/gird-cell-advanced.component';
let GridLayoutDebug = class GridLayoutDebug extends GridLayoutAdvanced {
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    renderColumnArray() {
        var _a, _b;
        const test = [];
        if ((_a = this.breakPointMediaMatch) === null || _a === void 0 ? void 0 : _a.value) {
            for (let i = 1; i <= ((_b = this.breakPointMediaMatch) === null || _b === void 0 ? void 0 : _b.value); i++) {
                test.push(html `<cwc-grid-cell-advanced>${i}</cwc-grid-cell-advanced>`);
            }
            return test;
        }
        return null;
    }
    render() {
        var _a, _b, _c;
        return html `
      ${((_a = this.breakPointMediaMatch) === null || _a === void 0 ? void 0 : _a.media).media}
      ${(_b = this.breakPointMediaMatch) === null || _b === void 0 ? void 0 : _b.breakpoint}
      ${(_c = this.breakPointMediaMatch) === null || _c === void 0 ? void 0 : _c.value}

      <div class="cwc-grid" style=${styleMap(this.customStyles)}>
        ${this.renderColumnArray()}
      </div>
    `;
    }
};
GridLayoutDebug.styles = css `
    .cwc-grid {
        height: 100%;
    }
  `;
GridLayoutDebug = __decorate([
    customElement('cwc-grid-layout-debug')
], GridLayoutDebug);
export { GridLayoutDebug };
//# sourceMappingURL=grid-layout-debug.component.js.map