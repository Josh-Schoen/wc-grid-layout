import '@material/mwc-icon-button';
import '@material/mwc-button';
import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import '@material/mwc-slider';
import '@material/mwc-dialog';
import {Slider} from '@material/mwc-slider';
import './grid-layout-toolbar-item.component';
import {html, LitElement} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {gridLayoutToolbar} from './grid-layout-toolbar.css.js';
import {BreakPointKeys, BreakPointMediaMatch} from '../grid-layout/foundation';
import {colors} from './foundation';
import {Dialog} from '@material/mwc-dialog';
import {TextField} from '@material/mwc-textfield';
import {classMap} from 'lit/directives/class-map.js';

@customElement('grid-layout-format-toolbar')
export class GridLayoutToolbar extends LitElement {
  @property({type: Boolean})
  open = false;

  @property({type: Number})
  columns = 12;

  @property({type: Number})
  gap = 20;

  @property({type: Number})
  opacity = 40;

  @property()
  breakPointLabel: BreakPointKeys = 'lg';

  @property({type: Array})
  colors: string[] = colors;

  @property({type: Array})
  breakpoints?: BreakPointMediaMatch[] = [];

  @property({type: Object})
  breakPointMediaMatch?: BreakPointMediaMatch;

  @query('#dialog1')
  settingsDialog?: Dialog;

  @state()
  color = '#000';

  slider?: Slider;

  static override styles = [gridLayoutToolbar];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'list');
    this.color = this.colors[0];
    console.log();
  }

  handleItemSelect(toolbarItem: string, event: Event) {
    if (toolbarItem === 'backgroundColor') {
      this.color = (event.target as TextField).value;
    }
    const toolbarEvent = new CustomEvent('toolbar', {
      detail: {toolbarItem, event},
    });
    document.dispatchEvent(toolbarEvent);
  }

  handleMenuOpen() {
    this.slider = this.querySelector('mwc-slider') as Slider;
    setTimeout(() => {
      this.slider?.layout();
    }, 100);
  }

  toggleDialog() {
    if (this.settingsDialog) {
      this.settingsDialog.open = !this.settingsDialog.open;
    }
  }

  handleSettingsUpdate(item: string, event: Event) {
    const settingsEvent = new CustomEvent('settings', {
      detail: {item, event},
    });
    document.dispatchEvent(settingsEvent);
  }

  override render() {
    return html`
      <grid-layout-toolbar-item .useMenu=${false}>
        <div slot="0" class="settings-container">
          <mwc-icon
            title="Number of columns at ${this.breakPointLabel} breakpoint"
          >
            view_column
          </mwc-icon>
          <mwc-formfield label="columns">
            <mwc-textfield
              style="height: 34px; width: 70px;"
              id="columns"
              min="1"
              value=${this.columns}
              @change=${(event: Event) =>
                this.handleItemSelect('columns', event)}
              type="number"
              outlined
            ></mwc-textfield>
          </mwc-formfield>
        </div>
      </grid-layout-toolbar-item>
      <grid-layout-toolbar-item .useMenu=${false}>
        <div slot="0" class="settings-container">
          <mwc-icon title="Column gap in pixels"> padding </mwc-icon>
          <mwc-formfield label="gap">
            <mwc-textfield
              style="height: 34px; width: 70px;"
              id="gap"
              min="0"
              value=${this.gap}
              @change=${(event: Event) => this.handleItemSelect('gap', event)}
              type="number"
              outlined
            ></mwc-textfield>
          </mwc-formfield>
        </div>
      </grid-layout-toolbar-item>
      <grid-layout-toolbar-item
        title="Column background color and opacity"
        icon="format_color_fill"
        color=${this.color}
        .onMenuOpen=${this.handleMenuOpen}
      >
        <div slot="0">
          <mwc-slider
            @change=${(event: Event) => this.handleItemSelect('opacity', event)}
            discrete
            withTickMarks
            step="10"
            max="100"
            value="${this.opacity}"
          >
          </mwc-slider>
          <div class="opacity-label">
            <span>Opacity</span> <span>${this.opacity}%</span>
          </div>
          <div class="color-swatches">
            ${this.colors.map((color) => {
              return html`
                <div class="color-container">
                  <input
                    @click=${(event: Event) =>
                      this.handleItemSelect('backgroundColor', event)}
                    type="button"
                    value=${color}
                    style="background-color: ${color};"
                  />
                </div>
              `;
            })}
          </div>
        </div>
      </grid-layout-toolbar-item>
      <grid-layout-toolbar-item class="settings" .useMenu=${false}>
        <div slot="0" class="settings-container">
          <mwc-icon-button
            @click=${this.toggleDialog}
            data-num="1"
            title="Grid breakpoint configuration ${this
              .breakPointMediaMatch?.media &&
            (this.breakPointMediaMatch?.media as MediaQueryList).media}"
            icon="settings"
          ></mwc-icon-button>
          <div class="media-query">
            <div>
              <h5 class="query-header">Breakpoint: ${this.breakPointLabel}</h5>
              <div class="query-subheader">
                <div>
                Min: ${this.breakPointMediaMatch?.breakpointMin}px
            </div>
            <div>
                Max: ${this.breakPointMediaMatch?.breakpointMax ? `${this.breakPointMediaMatch?.breakpointMax}px` : 'N/A'}
                </div>
              </div>
            </div>
          </div>
          <h5></h5>
        </div>
      </grid-layout-toolbar-item>
      <mwc-dialog id="dialog1" heading="Breakpoint settings">
        <div class="grid-container">
          ${this.breakpoints?.map((breakpoint) => {
            return html`
              <div
                class="settings-card ${classMap({
                  current: breakpoint.breakpoint === this.breakPointLabel,
                })}"
              >
                <div class="divider">
                  <div class="header-container">
                    <div class="header">
                      ${breakpoint.breakpoint === this.breakPointLabel
                        ? html` <mwc-icon>check_circle</mwc-icon>`
                        : null}
                      <h4 class="row-heading">
                        Breakpoint: ${breakpoint.breakpoint}
                      </h4>
                    </div>
                  </div>
                  <h5>Columns</h5>
                  <mwc-textfield
                    class="settings-field"
                    id="columns-${breakpoint.breakpoint}"
                    data-breakpoint=${breakpoint.breakpoint}
                    value=${breakpoint.value}
                    min="1"
                    @change=${(event: Event) =>
                      this.handleSettingsUpdate('columns', event)}
                    type="number"
                    outlined
                  ></mwc-textfield>
                  <h5>Breakpoint</h5>
                  <mwc-textfield
                    class="settings-field"
                    data-breakpoint=${breakpoint.breakpoint}
                    id="min-${breakpoint.breakpoint}"
                    value=${breakpoint.breakpointMin}
                    min="0"
                    @change=${(event: Event) =>
                      this.handleSettingsUpdate('min', event)}
                    type="number"
                    outlined
                  ></mwc-textfield>
                </div>
              </div>
            `;
          })}
        </div>
        <mwc-button @click=${this.toggleDialog} slot="primaryAction" raised
          >Close</mwc-button
        >
      </mwc-dialog>
    `;
  }
}
