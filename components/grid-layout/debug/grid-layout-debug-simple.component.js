import { __decorate } from "tslib";
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import '../grid-cell/gird-cell.component';
import { GridLayoutAdvanced } from '../grid-layout-advanced.component';
import styles from './grid-debug-styles.scss';
let GridLayoutDebugSimple = class GridLayoutDebugSimple extends GridLayoutAdvanced {
    constructor() {
        super();
    }
    // static override styles = css`
    //   .cwc-grid {
    //       height: 100%;
    //   }
    //   cwc-grid-cell {
    //     background-color: pink;
    //     border: 1px dashed red;
    //     opacity: 0.6;
    //     color: red;
    //     font-family: sans-serif;
    //   }
    // `
    connectedCallback() {
        super.connectedCallback();
    }
    renderColumnArray() {
        var _a, _b;
        const test = [];
        if ((_a = this.breakPointMediaMatch) === null || _a === void 0 ? void 0 : _a.value) {
            for (let i = 1; i <= ((_b = this.breakPointMediaMatch) === null || _b === void 0 ? void 0 : _b.value); i++) {
                test.push(html `<cwc-grid-cell>${i}</cwc-grid-cell>`);
            }
            return test;
        }
        return null;
    }
    render() {
        var _a, _b, _c;
        return html `
      <!-- ${((_a = this.breakPointMediaMatch) === null || _a === void 0 ? void 0 : _a.media).media}
      ${(_b = this.breakPointMediaMatch) === null || _b === void 0 ? void 0 : _b.breakpoint}
      ${(_c = this.breakPointMediaMatch) === null || _c === void 0 ? void 0 : _c.value} -->

      <div class="cwc-grid" style=${styleMap(this.customStyles)}>
        ${this.renderColumnArray()}
      </div>
    `;
    }
};
GridLayoutDebugSimple.styles = styles;
GridLayoutDebugSimple = __decorate([
    customElement('cwc-grid-layout-debug-smiple')
], GridLayoutDebugSimple);
export { GridLayoutDebugSimple };
//# sourceMappingURL=grid-layout-debug-simple.component.js.map