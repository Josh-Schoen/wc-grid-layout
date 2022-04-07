import { __decorate } from "tslib";
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { breakPoints as bp, GridLayoutFoundation, gap, } from './foundation';
import { MediaMatch } from './media-match';
let GridLayoutAdvanced = class GridLayoutAdvanced extends GridLayoutFoundation {
    constructor() {
        super(bp);
        this.mediaMatch = new MediaMatch([
            {
                breakpoint: 'xs',
                value: 4,
                media: '(min-width: 0px) and (max-width: 719px)',
            },
            {
                breakpoint: 'sm',
                value: 4,
                media: '(min-width: 720px) and (max-width: 1023px)',
            },
            {
                breakpoint: 'md',
                value: 8,
                media: '(min-width: 1024px) and (max-width: 1279px)',
            },
            {
                breakpoint: 'lg',
                value: 12,
                media: '(min-width: 1280px) and (max-width: 1919px)',
            },
            {
                breakpoint: 'xl',
                value: 12,
                media: '(min-width: 1920px)',
            },
        ]);
        this.columnBreakpoints = `{"lg": 1024}`;
        this.gridTemplateColumns = ``;
        this.gridAutoRows = `minmax(100px, auto)`;
        this.gap = gap;
        this.rows = 1;
        this.columns = 12;
        this.width = '100%';
        this.points = bp;
        this.mqls = [
            // list of window.matchMedia() queries
            window.matchMedia('(max-width: 1900px)'),
            window.matchMedia('(max-width: 600px)'),
            window.matchMedia('(max-height: 500px)'),
        ];
        this.breakPointMediaMatch = {
            breakpoint: 'lg',
            value: 12,
            media: '(min-width: 1280px) and (max-width: 1919px)',
        };
        this.fnc = async (e) => {
            this.breakPointMediaMatch = await e.detail;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        try {
            this.points = JSON.parse(this.columnBreakpoints);
        }
        catch (e) {
            console.log(e);
        }
        this.mediaMatch.subscribe(this.fnc);
    }
    get customStyles() {
        var _a, _b;
        const gridTemplateColumns = ((_a = this.breakPointMediaMatch) === null || _a === void 0 ? void 0 : _a.breakpoint)
            ? (_b = this.breakPointMediaMatch) === null || _b === void 0 ? void 0 : _b.value
            : 12;
        return {
            display: 'grid',
            // overrides CSS media queries
            'grid-template-columns': this.frGetter(gridTemplateColumns),
            width: this.width,
            gap: this.gap,
            rowGap: this.rowGap ? this.rowGap : null,
            columnGap: this.columnGap ? this.columnGap : null,
            'grid-auto-rows': this.gridAutoRows,
            background: '#efefef',
        };
    }
    render() {
        var _a, _b, _c;
        return html `
      ${((_a = this.breakPointMediaMatch) === null || _a === void 0 ? void 0 : _a.media).media}
      ${(_b = this.breakPointMediaMatch) === null || _b === void 0 ? void 0 : _b.breakpoint}
      ${(_c = this.breakPointMediaMatch) === null || _c === void 0 ? void 0 : _c.value}

      <div class="cwc-grid" style=${styleMap(this.customStyles)}><slot></slot></div>
    `;
    }
};
__decorate([
    property()
], GridLayoutAdvanced.prototype, "columnBreakpoints", void 0);
__decorate([
    property()
], GridLayoutAdvanced.prototype, "gridTemplateColumns", void 0);
__decorate([
    property()
], GridLayoutAdvanced.prototype, "gridAutoRows", void 0);
__decorate([
    property()
], GridLayoutAdvanced.prototype, "gap", void 0);
__decorate([
    property({ type: Number })
], GridLayoutAdvanced.prototype, "rows", void 0);
__decorate([
    property()
], GridLayoutAdvanced.prototype, "columnGap", void 0);
__decorate([
    property()
], GridLayoutAdvanced.prototype, "rowGap", void 0);
__decorate([
    property({ type: Number })
], GridLayoutAdvanced.prototype, "columns", void 0);
__decorate([
    property()
], GridLayoutAdvanced.prototype, "width", void 0);
__decorate([
    property()
], GridLayoutAdvanced.prototype, "gridTemplateAreas", void 0);
__decorate([
    state({
        hasChanged(newVal, oldVal) {
            return oldVal && newVal.media && oldVal.media !== newVal.media ? true : false;
        }
    })
], GridLayoutAdvanced.prototype, "breakPointMediaMatch", void 0);
GridLayoutAdvanced = __decorate([
    customElement('cwc-grid-layout-advanced')
], GridLayoutAdvanced);
export { GridLayoutAdvanced };
//# sourceMappingURL=grid-layout-advanced.component.js.map