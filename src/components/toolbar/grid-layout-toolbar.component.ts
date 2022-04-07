import '@material/mwc-list/mwc-list-item';
import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {gridLayoutToolbar} from './grid-layout-toolbar.css.js';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button';
import {Menu} from '@material/mwc-menu';
import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import {TextField} from '@material/mwc-textfield';

@customElement('grid-layout-toolbar')
export class GridLayoutToolbar extends LitElement {
  @property({type: Boolean})
  open = false;

  @property({type: Number})
  columns = 12;

  @property({type: Number})
  gap = 20;

  @property()
  handler?: (type: string, event: Event) => void;

  @query('#settingsMenu')
  settingsMenu?: Menu;

  @query('#columnMenu')
  columnMenu?: Menu;

  @query('#rowMenu')
  rowMenu?: Menu;

  @query('#columnStart')
  columnStart?: TextField;

  @query('#columnEnd')
  columnEnd?: TextField;

  static override styles = [gridLayoutToolbar];

  override connectedCallback(): void {
    super.connectedCallback();
  }

  handleSettingsMenu() {
    if (this.settingsMenu) {
      this.settingsMenu.open = !this.settingsMenu.open;
      //   (this.shadowRoot?.getElementById('columns') as TextField).layout();
    }
  }

  handleColumnMenu() {
    if (this.columnMenu) {
      this.columnMenu.open = !this.columnMenu.open;
      this.requestUpdate();
    }
  }

  handleRowMenu() {
    if (this.rowMenu) {
      this.rowMenu.open = !this.rowMenu.open;
      this.requestUpdate();
    }
  }

  handleColumnsChange(event: Event) {
    if (this.handler) {
      this.handler('columns', event);
    }
  }

  handleGapChange(event: Event) {
    if (this.handler) {
      this.handler('gap', event);
    }
  }

  handleCloumnStartChange(event: Event) {
    if (this.handler) {
      this.handler('columnStart', event);
    }
  }

  handleCloumnEndChange(event: Event) {
    if (this.handler) {
        this.handler('columnEnd', event);
    }
  }

  handleRowStartChange(event: Event) {
    if (this.handler) {
      this.handler('rowStart', event);
    }
  }

  handleRowEndChange(event: Event) {
    if (this.handler) {
      this.handler('rowEnd', event);
    }
  }

  override render() {
      const columnStart = this.columnStart ? this.columnStart?.value : 1;
      const columnEnd = this.columnEnd ? this.columnEnd?.value : + columnStart + 1;

    if (this.open) {
      this.classList.add('open');
    }
    return html`
      <div>
        <ul class="gl-toolbar-list">
          <li class="gl-toolbar-list-item ">
            <!-- add Column, Row and Gap settings -->
            <mwc-icon-button
              @click=${this.handleSettingsMenu}
              id="settingsButton"
              icon="settings"
              aria-expanded=${this.settingsMenu && this.settingsMenu.open
                ? true
                : false}
              aria-controls="settingsMenu"
            >
            </mwc-icon-button>
          </li>
          <li class="gl-toolbar-list-item">
            <!-- individual column settings -->
            <mwc-icon-button
              id="columnButton"
              icon="view_column"
              @click=${this.handleColumnMenu}
              aria-expanded=${this.columnMenu && this.columnMenu.open
                ? true
                : false}
              aria-controls="columnMenu"
            >
            </mwc-icon-button>
          </li>
          <li class="gl-toolbar-list-item">
            <!-- individual row settings -->
            <mwc-icon-button
              id="rowButton"
              icon="table_rows"
              @click=${this.handleRowMenu}
              aria-expanded=${this.rowMenu && this.rowMenu.open ? true : false}
              aria-controls="rowMenu"
            >
            </mwc-icon-button>
          </li>
        </ul>
      </div>
      <!--
        Overall grid settings
    -->
      <mwc-menu fullWidth absolute x="0" y="30" id="settingsMenu">
        <div class="settings-container">
          <mwc-textfield
            id="columns"
            value=${this.columns}
            @change=${this.handleColumnsChange}
            type="number"
            helper="Number of columns"
            outlined
            label="Columns"
          ></mwc-textfield>
          <mwc-textfield
            value=${this.gap}
            @change=${this.handleGapChange}
            type="number"
            helper="Column and row gap"
            outlined
            label="Gird Gap"
          ></mwc-textfield>
        </div>
      </mwc-menu>
      <!--
        Single column settings
    -->
      <mwc-menu fullWidth absolute x="0" y="30" id="columnMenu">
        <div class="settings-container">
          <mwc-textfield
            min=${0}
            max=${this.columns}
            id="columnStart"
            value=${this.columnStart ? this.columnStart?.value : 0}
            @change=${this.handleCloumnStartChange}
            type="number"
            helper="Starting point for selected column 0 - ${this.columns}. 0 will set the start to auto."
            outlined
            label="Column start"
          ></mwc-textfield>
          <mwc-textfield
            min=${0}
            max=${this.columns + 1}
            id="columnEnd"
            value=${columnEnd}
            @change=${this.handleCloumnEndChange}
            type="number"
            helper="Starting point for selected column 0 - ${this
              .columns}, must be greater than ${this.columns}. 0 will set the end to auto."
            outlined
            label="Column end"
          ></mwc-textfield>
        </div>
      </mwc-menu>
      <!--
        Single row settings
    -->
      <mwc-menu fullWidth absolute x="0" y="30" id="rowMenu">
        <div class="settings-container">
          <mwc-textfield
            id="rowStart"
            value="1"
            @change=${this.handleRowStartChange}
            type="number"
            helper="Starting point for selected row, must be greater than 1"
            outlined
            label="Row start"
          ></mwc-textfield>
          <mwc-textfield
            id="rowEnd"
            value="2"
            @change=${this.handleRowEndChange}
            type="number"
            helper="Ending point for selected row, must be greater than 1"
            outlined
            label="Row end"
          ></mwc-textfield>
        </div>
      </mwc-menu>
    `;
  }
}
