import '@material/mwc-list/mwc-list-item';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {gridLayoutToolbarItem} from './grid-layout-toolbar-item.css.js';
import '@material/mwc-icon-button';
import {Menu} from '@material/mwc-menu';
import '@material/mwc-menu';
import '@material/mwc-icon';

declare global {
  interface HTMLElementTagNameMap {
    'grid-layout-toolbar-item': GridLayoutToolbar;
  }
}

@customElement('grid-layout-toolbar-item')
export class GridLayoutToolbar extends LitElement {
  @property({type: String})
  itemId = '0';

  @property({type: String})
  icon?: string;

  @property({type: Boolean})
  useMenu = true;

  @property({type: Number})
  onItemSelect?: (type: string, event: Event) => void;

  // @query(`#settingsMenu`)
  menu?: Menu;

  static override styles = [gridLayoutToolbarItem];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'listitem');
    // this.menu = this.shadowRoot?.getElementById(`menu${this.itemId}`) as Menu;
  }

  handleSelect() {
    console.log(this.menu);
    this.menu = this.shadowRoot?.getElementById(`menu${this.itemId}`) as Menu;
    if (this.menu) {
      this.menu.open = !this.menu.open;
      this.requestUpdate();
    }
  }

  handleItemSelect(event: Event) {
    if (this.onItemSelect) {
      this.onItemSelect('itemSelected', event);
    }
  }

  renderMenuSlot() {
    return html`
      <div>
        <mwc-icon-button
          @click=${this.handleSelect}
          id=${this.itemId}
          icon=${this.icon ? this.icon : 'settings'}
          aria-expanded=${this.menu && this.menu.open ? true : false}
          aria-controls="menu${this.itemId}"
        >
        </mwc-icon-button>
      </div>
      <mwc-menu fullWidth absolute x="36" y="0" id="menu${this.itemId}">
        <div class="settings-container">
          <slot name=${this.itemId}></slot>
        </div>
      </mwc-menu>
    `;
  }

  renderInlineSlot() {
    return html`
      <div class="inline-item">
        ${this.icon && html` <mwc-icon> ${this.icon} </mwc-icon>`}

        <slot name=${this.itemId}></slot>
      </div>
    `;
  }

  override render() {
    return html`
      ${this.useMenu ? this.renderMenuSlot() : this.renderInlineSlot()}
    `;
  }
}
