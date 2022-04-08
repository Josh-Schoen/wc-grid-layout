
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
    document.addEventListener('toolbar', this.handleToolbarAction.bind(this) as EventListener)
  }

  handleToolbarAction(e: CustomEvent) {
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
            this.breakPointMediaMatch.value = this.gridFormatState.columns
              this.mediaMatch.updatebreakpointValue(this.breakPointMediaMatch);
              this.requestUpdate();
            break;
        }
        case 'gap': {
            this.gap = parseInt((event.target as TextField).value);
            break;
        }
    }
  }

  renderColumnArray() {
    const grid = [];
    
    if (this.breakPointMediaMatch?.value) {
      for (let i = 1; i <= this.breakPointMediaMatch?.value; i++) {
        grid.push(html`<cwc-grid-cell style="background-color: ${this.gridFormatState.color};"
        id="debug-cell-${i}"
      >
      </cwc-grid-cell>
        `);
      }
      return grid;
    }
    return null;
  }

  renderToolbar() {
    return html`
      <grid-layout-format-toolbar
      .breakPointLabel=${this.breakPointMediaMatch?.breakpoint}
      .columns=${this.breakPointMediaMatch?.value}
      .gap=${this.gridFormatState.gap}>
    </grid-layout-format-toolbar>
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
