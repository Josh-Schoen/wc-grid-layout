import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../grid-cell/gird-cell.component';
import '../../toolbar/grid-layout-toolbar.component';
import {GridCell} from '../grid-cell/gird-cell.component';
import {GridLayoutAdvanced} from '../grid-layout-advanced.component';
import {styles} from './grid-debug.css.js';
import {observeElement} from '../../../utils/observe-element';
import {TextField} from '@material/mwc-textfield';

export interface Position {
  start: number | string;
  end: number | string;
}

export interface CellPosition {
  column: Position;
  row: Position;
}

@customElement('cwc-grid-layout-debug-smiple')
export class GridLayoutDebugSimple extends GridLayoutAdvanced {
  @state()
  selectedCell?: GridCell;

  @state()
  positionX = 0;
  @state()
  positionY = 0;

  toolbar?: Element | null;

  @state()
  selectedCellState: CellPosition = {
    column: {
      start: 'auto',
      end: 'auto',
    },
    row: {
      start: 'auto',
      end: 'auto',
    },
  };

  constructor() {
    super();
  }

  static override styles = [styles];

  override connectedCallback() {
    super.connectedCallback();
  }

  async handleCellClick(event: MouseEvent) {
    // event.stopPropagation();

    const target = event.target as GridCell;
    const width = Math.round(target.getBoundingClientRect().width);

    this.selectedCell = event.target as GridCell;
    this.toolbar = await observeElement(this.renderRoot, 'grid-layout-toolbar');

    const height = this.toolbar && this.toolbar.getBoundingClientRect().height ? this.toolbar.getBoundingClientRect().height : 0;
    const right = window.innerWidth < event.clientX + width;
    const left = event.clientX - width < 0;
    let positionX;

    positionX = event.clientX - width;

    if (!right && !left) {
      positionX = event.clientX - width;
    }
    if (right && !left) {
      positionX = event.clientX - width * 2;
    }
    if (!right && left) {
      positionX = event.clientX - width;
    }
    if (left && !right) {
      positionX = 0;
    }
    this.positionX = positionX;

    const top = event.clientY - height * 1.25 < 0;
    const positionY = top
      ? event.clientY + height / 3
      : event.clientY - height * 1.75;

    this.positionY = positionY;
    this.toolbar?.classList.add('open');
  }

  renderColumnArray() {
    const grid = [];
    if (this.breakPointMediaMatch?.value) {
      for (let i = 1; i <= this.breakPointMediaMatch?.value; i++) {
        grid.push(html`
          ${this.selectedCell && this.selectedCell.id === `debug-cell-${i}`
            ? html` <cwc-grid-cell
                @click=${this.handleCellClick}
                class="simple ${classMap({
                  selected: this.selectedCell?.id === `debug-cell-${i}`,
                })}"
                id="debug-cell-${i}"
                lg="${ifDefined(this.selectedCell && this.selectedCell.lg)}"
              >
                ${i}
              </cwc-grid-cell>`
            : html` <cwc-grid-cell
                @click=${this.handleCellClick}
                class="simple ${classMap({
                  selected: this.selectedCell?.id === `debug-cell-${i}`,
                })}"
                id="debug-cell-${i}"
              >
                ${i}
              </cwc-grid-cell>`}
        `);
      }
      return grid;
    }
    return null;
  }

  handleToolbarEvent(type: string, event: Event) {
    console.log(type);

    switch (type) {
      case 'columns': {
        console.log(type);
        this.breakPointMediaMatch = {
          ...this.breakPointMediaMatch,
          value: parseInt((event.target as TextField).value),
        };
        break;
      }
      case 'gap': {
        this.gap = parseInt((event.target as TextField).value);
        break;
      }
      case 'columnStart': {
        this.selectedCellState = {
          ...this.selectedCellState,
          column: {
            start: parseInt((event.target as TextField).value),
            end: this.selectedCellState.column.end,
          },
        };
        break;
      }
      case 'columnEnd': {
        this.selectedCellState = {
          ...this.selectedCellState,
          column: {
            start: this.selectedCellState.column.start,
            end: parseInt((event.target as TextField).value),
          },
        };
        break;
      }
      case 'rowStart': {
        this.selectedCellState = {
          ...this.selectedCellState,
          row: {
            start: parseInt((event.target as TextField).value),
            end: this.selectedCellState.column.end,
          },
        };
        break;
      }
      case 'rowEnd': {
        this.selectedCellState = {
          ...this.selectedCellState,
          row: {
            start: this.selectedCellState.column.start,
            end: parseInt((event.target as TextField).value),
          },
        };
        break;
      }
    }

    const {column, row} = this.selectedCellState;
    if (this.selectedCell) {
      this.selectedCell[this.breakPointMediaMatch.breakpoint] = `${
        row.start > 0 ? row.start : 'auto'
      } / ${column.start > 0 ? column.start : 'auto'} / ${
        row.end > 0 ? row.end : 'auto'
      } / ${column.end > 0 ? column.end : 'auto'}`;
    }
    this.requestUpdate();
  }

  renderToolbar() {
    return html`
      <grid-layout-toolbar
        .handler=${(type: string, event: Event) => this.handleToolbarEvent(type, event)}
        style="transform: translate(${this.positionX}px, ${this.positionY}px);"
        ?open="${this.selectedCell ? true : false}"
      ></grid-layout-toolbar>
    `;
  }

  override render() {
    return html`
      ${(this.breakPointMediaMatch?.media as MediaQueryList).media}
      ${this.breakPointMediaMatch?.breakpoint}
      ${this.breakPointMediaMatch?.value}

      <div class="cwc-grid" style=${styleMap(this.customStyles)}>
        ${this.renderColumnArray()}
      </div>
      ${this.selectedCell ? this.renderToolbar() : null}
    `;
  }
}
