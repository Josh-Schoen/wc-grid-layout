import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BreakPointMediaMatch} from '../foundation';
import {GridLayoutAdvanced} from '../grid-layout-advanced.component';
import {MediaMatch} from '../media-match';
import {Placement, getCellPositionString} from './foundation';

@customElement('cwc-grid-cell')
export class GridCell extends LitElement {
  @property({type: String})
  /**
   * row start / column start / row end / column end
   */
  default = 'auto / auto / auto / auto';

  @property({type: String})
  // Required default propery. Use if no other CellSize is defined
  xs?: string;

  @property({type: String})
  sm?: string;

  @property({type: String})
  md?: string;

  @property({type: String})
  lg?: string;

  @property({type: String})
  xl?: string;

  xsRow?: string;

  @property({type: String})
  smRow?: string;

  @property({type: String})
  mdRow?: string;

  @property({type: String})
  lgRow?: string;

  @property({type: String})
  xlRow?: string;

  @property()
  height = '100%';

  @property()
  rowStart?: string | number;

  @property()
  justifyContent: Placement = 'center';

  @property()
  alignItems: Placement = 'center';

  @property()
  backgroundColor = '';

  mediaMatch = new MediaMatch();

  breakPointEvent?: BreakPointMediaMatch;

  cellSize?: string;

  constructor() {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.mediaMatch.subscribe(this.fnc);
    this.style.gridArea = `${this.default}`;
    this.style.justifyContent = `${this.justifyContent}`;
    this.style.alignItems = `${this.alignItems}`;
    // this.updateStyles();
  }

  updateStyles = () => {

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

    this.cellSize = getCellPositionString(
      {
        xs: this.xs ? this.xs : this.default,
        sm: this.sm ? this.sm : this.default,
        md: this.md ? this.md : this.default,
        lg: this.lg ? this.lg : this.default,
        xl: this.xl ? this.xl : this.default,
      },
      this.breakPointEvent
    );

    const cellPositionLength = this.cellSize.split('/').length;

    if (cellPositionLength > 2) {
      this.style.gridArea = this.cellSize;
    } else {
      this.style.gridColumn = this.cellSize;
      this.style.gridRow = 'auto / auto';
    }

    this.style.justifyContent = `${this.justifyContent}`;
    this.style.alignItems = `${this.alignItems}`;
    // this.style.backgroundColor = this.backgroundColor;
  };

  fnc = (e: CustomEvent<BreakPointMediaMatch>) => {
    this.breakPointEvent = e.detail;
    this.requestUpdate();
  };

  static override get styles() {
    return css`
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

  override render() {
    this.updateStyles();
    return html` <div class="cwc-grid-cell"><slot></slot></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cwc-grid-cell': GridLayoutAdvanced;
  }
}
