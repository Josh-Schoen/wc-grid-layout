import {html} from 'lit';
import {customElement, state, query} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import '../grid-cell/gird-cell.component';
import '../../toolbar/grid-layout-format-toolbar.component';
import {GridCell} from '../grid-cell/gird-cell.component';
import {GridLayoutAdvanced} from '../grid-layout-advanced.component';
import {styles} from './grid-debug.css.js';
import {TextField} from '@material/mwc-textfield';
import {BreakPointKeys, breakPoints, BreakPointValues} from '../foundation';

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
      if (event.target.dataset.breakpoint === bp.breakpoint) {
        if (item === 'columns') {
          if (
            event.target.dataset.breakpoint ===
            this.breakPointMediaMatch.breakpoint
          ) {
            bp.value = parseInt(event.target.value);
            this.breakPointMediaMatch.value = parseInt(event.target.value);
            this.mediaMatch.updatebreakpointValue(this.breakPointMediaMatch);
            this.requestUpdate();
          }
        } else if (item === 'min') {
          // this.breakPoints[bp.breakpoint] = bp.value;
          const nextBreakPoint = Object.keys(this.breakPoints)[
            index + 1
          ] as BreakPointKeys;
          if (nextBreakPoint) {
            bp.media = window.matchMedia(
              `(min-width: ${event.target.value}px) and (max-width: ${
                this.breakPoints[nextBreakPoint] - 1
              }px)`
            );
          } else {
            bp.media = window.matchMedia(
              `(min-width: ${event.target.value}px)`
            );
          }
          if (
            event.target.dataset.breakpoint ===
            this.breakPointMediaMatch.breakpoint
          ) {
            this.breakPointMediaMatch.media = bp.media;
            this.mediaMatch.updatebreakpointValue(bp);
          }
          this.requestUpdate();
        }
      }
      return bp;
    });
    console.log(this.mediaMatch.breakpointMediaMatch);
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
