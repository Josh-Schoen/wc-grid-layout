import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import {GridLayoutAdvanced} from './grid-layout-advanced.component';
import './grid-cell/gird-cell-advanced.component';

@customElement('cwc-grid-layout-debug')
export class GridLayoutDebug extends GridLayoutAdvanced {
  constructor() {
    super();
  }

  static override styles = css`
    .cwc-grid {
        height: 100%;
    }
  `

  override connectedCallback() {
    super.connectedCallback();
  }

  renderColumnArray() {
    const test = [];
    if (this.breakPointMediaMatch?.value) {
      for (let i = 1; i <= this.breakPointMediaMatch?.value; i++) {
        test.push(html`<cwc-grid-cell-advanced>${i}</cwc-grid-cell-advanced>`);
      }
      return test;
    }
      return null;

  }

  override render() {
    return html`
      ${(this.breakPointMediaMatch?.media as MediaQueryList).media}
      ${this.breakPointMediaMatch?.breakpoint}
      ${this.breakPointMediaMatch?.value}

      <div class="cwc-grid" style=${styleMap(this.customStyles)}>
        ${this.renderColumnArray()}
      </div>
    `;
  }
}
