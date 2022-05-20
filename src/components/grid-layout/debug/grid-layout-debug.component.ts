import {html} from 'lit';
import {customElement, state, query} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import '../grid-cell/gird-cell.component';
import '../../toolbar/grid-layout-format-toolbar.component';
import {GridCell} from '../grid-cell/gird-cell.component';
import {GridLayoutAdvanced} from '../grid-layout-advanced.component';
import {styles} from './grid-debug.css.js';
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
  color: string;
  opacity: number;
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
    color: '#ffc0cb',
    opacity: 40,
  };

  @query('grid-layout-format-toolbar')
  toolbar?: Element | null;

  constructor() {
    super();
  }

  static override styles = [styles];

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      'toolbar',
      this.handleToolbarAction.bind(this) as EventListener
    );
    document.addEventListener(
      'settings',
      this.handleSettingsAction.bind(this) as EventListener
    );
  }

  handleSettingsAction(e: CustomEvent) {
    const {item, event} = e.detail;

    this.mediaMatch.breakpointMediaMatch.map((bp, index) => {
      const intValue = parseInt(event.target.value);
      if (event.target.dataset.breakpoint === bp.breakpoint) {
        if (item === 'columns') {
          bp.value = intValue;
        } else if (item === 'min') {
          bp.breakpointMin = intValue;
          const nextBreakPoint =
            this.mediaMatch.breakpointMediaMatch[index + 1];
          const prevBreakPoint =
            this.mediaMatch.breakpointMediaMatch[index - 1];

          if (prevBreakPoint) {
            this.mediaMatch.breakpointMediaMatch[index - 1] = {
              ...prevBreakPoint,
              breakpointMax: intValue - 1,
              media: this.mediaMatch.getMediaMinMax(
                prevBreakPoint.breakpointMin,
                intValue - 1
              ),
            };
          }

          if (nextBreakPoint) {
            bp.breakpointMax = nextBreakPoint.breakpointMin - 1
            bp.media = window.matchMedia(
              `(min-width: ${event.target.value}px) and (max-width: ${
                nextBreakPoint.breakpointMin - 1
              }px)`
            );
          } else {
            bp.breakpointMin = intValue;
            bp.media = window.matchMedia(
              `(min-width: ${event.target.value}px)`
            );
          }
          this.requestUpdate();
        }
      }
      return bp;
    });

    this.mediaMatch.breakpointMediaMatch.forEach((item ) => {
      if (item.media?.matches) {
        this.breakPointMediaMatch = item;
        this.mediaMatch.updatebreakpointValue(item);
        this.requestUpdate();
      }
    });
  }

  handleToolbarAction(e: CustomEvent) {
    const {toolbarItem, event} = e.detail;
    this.gridFormatState = {
      ...this.gridFormatState,
      [toolbarItem]: event.target.value,
    };

    switch (toolbarItem) {
      case 'backgroundColor': {
        this.gridFormatState = {
          ...this.gridFormatState,
          color: event.target.value,
        };
        break;
      }
      case 'columns': {
        this.breakPointMediaMatch.value = parseInt(event.target.value);
        this.mediaMatch.updatebreakpointValue(this.breakPointMediaMatch);
        break;
      }
      case 'gap': {
        this.gap = parseInt((event.target as TextField).value);
        break;
      }
      case 'opacity': {
        this.gridFormatState = {
          ...this.gridFormatState,
          opacity: parseInt(event.target.value),
        };
        break;
      }
    }
  }

  renderColumnArray() {
    const grid = [];

    if (this.breakPointMediaMatch?.value) {
      for (let i = 1; i <= this.breakPointMediaMatch?.value; i++) {
        grid.push(html`<cwc-grid-cell
          style="background-color: ${this.gridFormatState
            .color}; opacity: ${this.gridFormatState.opacity * 0.01}"
          id="debug-cell-${i}"
        >
        </cwc-grid-cell> `);
      }
      return grid;
    }
    return null;
  }

  renderToolbar() {
    return html`
      <grid-layout-format-toolbar
        .breakPointMediaMatch=${this.breakPointMediaMatch}
        .breakpoints=${this.mediaMatch.breakpointMediaMatch}
        .breakPointLabel=${this.breakPointMediaMatch?.breakpoint}
        .columns=${this.breakPointMediaMatch?.value}
        .gap=${this.gap}
        .opacity=${this.gridFormatState.opacity}
      >
      </grid-layout-format-toolbar>
    `;
  }

  override render() {
    return html`
      <div class="cwc-grid" style=${styleMap(this.customStyles)}>
        ${this.renderColumnArray()}
      </div>
      ${this.renderToolbar()}
    `;
  }
}
