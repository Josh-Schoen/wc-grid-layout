import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BreakPointMediaMatch } from "../foundation";
import { GridLayoutAdvanced } from "../grid-layout-advanced.component";
import { MediaMatch } from '../media-match';
import { CellSize, getCellCPosition, Placement } from "./foundation";

@customElement('cwc-grid-cell-advanced') 
export class GridCellAdvanced extends LitElement {

    @property({ type: Object })
    // Required default propery. Use if no other CellSize is defined
    default: CellSize = {start: 'auto', end: 'auto'};

    @property({ type: Object })
    // Required default propery. Use if no other CellSize is defined
    xs?: CellSize;

    @property({ type: Object })
    sm?: CellSize;

    @property({ type: Object })
    md?: CellSize;

    @property({ type: Object })
    lg?: CellSize;

    @property({ type: Object })
    xl?: CellSize;

    @property()
    height = '100%';

    @property()
    rowStart?: string | number;

    @property()
    justifyContent: Placement = 'center';

    @property()
    alignItems: Placement = 'center';

    mediaMatch = new MediaMatch();

    breakPointEvent?: BreakPointMediaMatch;

    cellSize?: CellSize;

    constructor() {
        super();
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.mediaMatch.subscribe(this.fnc);
            this.style.gridColumnStart = `${this.default.start}`;
            this.style.gridColumnEnd = `${this.default.end}`;
            this.style.justifyContent = `${this.justifyContent}`;
            this.style.alignItems = `${this.alignItems}`;
        this.updateStyles();
    }

    updateStyles = () => {
        this.cellSize = getCellCPosition(
            {
                xs: this.xs ? this.xs : this.default,
                sm: this.sm ? this.sm : this.default,
                md: this.md ? this.md : this.default,
                lg: this.lg ? this.lg : this.default,
                xl: this.xl ? this.xl : this.default},
                this.breakPointEvent);
        this.style.gridColumnStart = `${this.cellSize.start}`;
        this.style.gridColumnEnd = `${this.cellSize.end}`;
        this.style.gridRowStart = `${this.cellSize.row?.start}`;
        this.style.gridRowEnd = `${this.cellSize.row?.end}`;
        this.style.justifyContent = `${this.justifyContent}`;
        this.style.alignItems = `${this.alignItems}`;
    }

     fnc = (e: CustomEvent<BreakPointMediaMatch>)=>{
        this.breakPointEvent = e.detail;
        this.updateStyles();
        this.requestUpdate();
    }

    setDefaultCellSize = (): CellSize  => {
        const grid: GridLayoutAdvanced | null = this.closest('cwc-grid-layout-advanced');
        if (grid) {
            return {
                ...this.default,
                end: grid.columns + 1
            }
        }
        return this.default;
    }

    static override get styles() {
        return css`
        :host {
            background: pink;
            min-width: 0;
            box-sizing: border-box;
            grid-column-start: var(--columnStart);
            grid-column-start: var(--columnEnd);
            justify-self: stretch;
            display: inline-flex;
            flex-flow: column wrap;

        }`
    }

    override render() {
    return html`
    <div class="cwc-grid-cell"><slot></slot></div>
    `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
      'cwc-grid-cell-advanced': GridLayoutAdvanced;
    }
  }