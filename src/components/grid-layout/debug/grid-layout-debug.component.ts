
import {html} from 'lit';
import {customElement, state, query} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import '../grid-cell/gird-cell.component';
import "../../toolbar/grid-layout-format-toolbar.component";
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

export interface GridFormat {
    gap: number;
    color: string;
    columns: number;
  }

@customElement('cwc-grid-layout-debug')
export class GridLayoutDebug extends GridLayoutAdvanced {
  @state()
  selectedCell?: GridCell;

  @state()
  positionX = 0;
  @state()
  positionY = 0;



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

  @state()
  gridFormatState: GridFormat = {
    columns: 12,
    color: '#ffc0cb',
    gap: 20
  };

  @query('grid-layout-format-toolbar')
  toolbar?: Element | null;

  constructor() {
    super();
  }

  static override styles = [styles];

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('toolbar', ((e: CustomEvent) => {
        // console.log(event.detail, event.target);
        const {toolbarItem, event} = e.detail;

        this.gridFormatState = {
            ...this.gridFormatState,
            [toolbarItem]: event.target.value
        }

        switch(toolbarItem) {
            case 'backgroundColor': {
                this.gridFormatState = {
                    ...this.gridFormatState,
                    color: event.target.value
                }
                break;
            }
            case 'columns': {
                this.gridFormatState = {
                    ...this.gridFormatState,
                    columns: parseInt(event.target.value)
                }
                this.breakPointMediaMatch = {
                    ...this.breakPointMediaMatch,
                    value: this.gridFormatState.columns,
                  };
                  this.mediaMatch.updatebreakpointValue(this.breakPointMediaMatch);
                  this.columns = this.gridFormatState.columns;
                  this.requestUpdate();
                break;
            }
        }

    }) as EventListener)
  }

  handleToolbarItemSelection() {

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
        grid.push(html`<cwc-grid-cell .backgroundColor=${this.gridFormatState.color}
        id="debug-cell-${i}"
      >
        ${i}
      </cwc-grid-cell>
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
      <grid-layout-format-toolbar></grid-layout-format-toolbar>
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
      ${this.renderToolbar()}
    `;
  }
}
