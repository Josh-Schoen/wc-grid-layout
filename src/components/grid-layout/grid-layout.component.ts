import { css, html } from "lit";
import {styleMap} from 'lit/directives/style-map.js';
import { customElement, property } from "lit/decorators.js";
import { breakPoints as bp, GridLayoutFoundation, gap, } from "./foundation";

@customElement('cwc-grid-layout') 
export class GridLayout extends GridLayoutFoundation {

//     static override get properties() {
//         return columnBreakpoints
// }
    
    @property()
    columnBreakpoints = `{"lg": 1024}`;

    @property()
    gridTemplateColumns = ``;
    @property()
    gridAutoRows = `minmax(10px, auto)`;
    
    @property({type: Number})
    gap = gap;

    @property({type: Number})
    rows = 1;

    @property()
    columnGap?: string;

    @property()
    rowGap?: string;

    @property()
    columns: number | string = 12;

    @property()
    width = '100%';

    @property()
    gridTemplateAreas?: string;

    points = bp;

    constructor() {
        super(bp);
    }

    static override styles = css`
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
    
    mqls = [ // list of window.matchMedia() queries
        window.matchMedia("(max-width: 1900px)"),
        window.matchMedia("(max-width: 600px)"),
        window.matchMedia("(max-height: 500px)")
    ]

    override connectedCallback(): void {
        super.connectedCallback();

        try {
            this.points = JSON.parse(this.columnBreakpoints);
        } catch(e) {
            console.log(e)
        }
    }

    override attributeChangedCallback(name:string, _old: string, value: string | null): void {
        console.log(value);
        try {
            this.columnBreakpoints = JSON.parse(value ? value : _old);
        } catch(e) {
            console.log(e)
        }
        super.attributeChangedCallback(name, _old, value);
        console.log(this.points);
    }

    override render() {
        console.log(this.rowGap)
        const style = {
            display: 'grid',
            color: 'blue',
            // overrides CSS media queries
            'grid-template-columns': this.gridTemplateColumns,
            width: this.width,
            gap: `#{this.gap}px`,
            rowGap: this.rowGap ? this.rowGap : null,
            columnGap: this.columnGap ? this.columnGap : null,
            'grid-auto-rows': this.gridAutoRows,
            // 'grid-template-areas': this.gridTemplateAreas
          };
        // const width = window.innerWidth;
        // const classes = {lg: this.breakPoints.lg >= width, md: this.breakPoints.md >= width, sm: this.breakPoints.sm <= width}
        return html`<div class="cwc-grid" style=${styleMap(style)}><slot></slot></div>
        `
    }

}