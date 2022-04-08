import '@material/mwc-list/mwc-list-item';
import './grid-layout-toolbar-item.component';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {gridLayoutToolbar} from './grid-layout-toolbar.css.js';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import {BreakPointKeys} from '../grid-layout/foundation';
// import {TextField} from '@material/mwc-textfield';

@customElement('grid-layout-format-toolbar')
export class GridLayoutToolbar extends LitElement {
  @property({type: Boolean})
  open = false;

  @property({type: Number})
  columns = 12;

  @property({type: Number})
  gap = 20;

  @property()
  breakPointLabel: BreakPointKeys = 'lg';

  static override styles = [gridLayoutToolbar];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'list');
  }

  hanleItemSelect(toolbarItem: string, event: Event) {
    const toolbarEvent = new CustomEvent('toolbar', {
      detail: {toolbarItem, event},
    });
    document.dispatchEvent(toolbarEvent);
  }

  override render() {
    return html`
      <grid-layout-toolbar-item .useMenu=${false} icon="view_column">

        <div slot="0" class="settings-container">
          <mwc-formfield label="Breakpoint: ${this.breakPointLabel}">
            <mwc-textfield
              style="height: 34px; width: 70px;"
              id="columns"
              value=${this.columns}
              @change=${(event: Event) =>
                this.hanleItemSelect('columns', event)}
              type="number"
              outlined
            ></mwc-textfield>
          </mwc-formfield>
        </div>
      </grid-layout-toolbar-item>
      <grid-layout-toolbar-item .useMenu=${false} icon="padding">
        <div slot="0" class="settings-container">
          <mwc-formfield label="Gap">
            <mwc-textfield
              style="height: 34px; width: 70px;"
              id="column gap"
              value=${this.gap}
              @change=${(event: Event) =>
                this.hanleItemSelect('gap', event)}
              type="number"
              outlined
            ></mwc-textfield>
          </mwc-formfield>
        </div>
      </grid-layout-toolbar-item>
      <grid-layout-toolbar-item .useMenu=${false}>
        <div slot="0" class="color-container">
          <input
            @change=${(event: Event) =>
              this.hanleItemSelect('backgroundColor', event)}
            type="color"
            value="#ffc0cb"
          />
        </div>
      </grid-layout-toolbar-item>
    `;
  }
}
