import {html, PropertyValues} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import {customElement, property, state} from 'lit/decorators.js';
import {
  breakPoints as bp,
  GridLayoutFoundation,
  gap,
  BreakPointMediaMatch,
  breakPointMediaQueries,
} from './foundation';

import {MediaMatch} from './media-match';

@customElement('cwc-grid-layout-advanced')
export class GridLayoutAdvanced extends GridLayoutFoundation {
  mediaMatch = new MediaMatch(breakPointMediaQueries);

  @property()
  columnBreakpoints = `{"lg": 1024}`;

  @property()
  gridTemplateColumns = ``;
  @property()
  gridAutoRows = `minmax(100px, auto)`;

  @property({type: Number})
  gap = gap;

  @property({type: Number})
  rows = 1;

  @property()
  columnGap?: string;

  @property()
  rowGap?: string;

  @property({type: Number})
  columns = 12;

  @property()
  width = '100%';

  @property()
  gridTemplateAreas?: string;

  points = bp;

  constructor() {
    super(bp);
  }

  mqls = [
    // list of window.matchMedia() queries
    window.matchMedia('(max-width: 1900px)'),
    window.matchMedia('(max-width: 600px)'),
    window.matchMedia('(max-height: 500px)'),
  ];

  @state({
    hasChanged(newVal: BreakPointMediaMatch, oldVal: BreakPointMediaMatch) {
      return oldVal && newVal.media && oldVal.media !== newVal.media
        ? true
        : false;
    },
  })
  breakPointMediaMatch: BreakPointMediaMatch = {
    breakpoint: 'lg',
    value: 12,
    breakpointMin: 1280,
    breakpointMax: 1919,
  };

  override connectedCallback(): void {
    super.connectedCallback();

    try {
      this.points = JSON.parse(this.columnBreakpoints);
    } catch (e) {
      console.error(e);
    }
    this.mediaMatch.subscribe(this.fnc);

    if (this.mediaMatch.breakpoint) {
      this.mediaMatch.mediaqueryResponse(this.mediaMatch.breakpoint);
    }
  }

  fnc = async (e: CustomEvent<BreakPointMediaMatch>) => {
    this.breakPointMediaMatch = await e.detail;
    this.requestUpdate();
  };

  get customStyles() {
    const gridTemplateColumns = this.breakPointMediaMatch?.breakpoint
      ? this.breakPointMediaMatch?.value
      : this.columns;
    return {
      display: 'grid',
      // overrides CSS media queries
      'grid-template-columns': `repeat(${gridTemplateColumns}, 1fr)`,
      width: this.width,
      gap: `${this.gap}px`,
      rowGap: this.rowGap ? this.rowGap : null,
      columnGap: this.columnGap ? this.columnGap : null,
      'grid-auto-rows': this.gridAutoRows,
    };
  }

  override render() {
    return html`
      <div class="cwc-grid" style=${styleMap(this.customStyles)}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cwc-grid-layout-advanced': GridLayoutAdvanced;
  }
}
