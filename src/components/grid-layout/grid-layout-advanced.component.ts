import {html} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import {customElement, property, state} from 'lit/decorators.js';
import {
  breakPoints as bp,
  GridLayoutFoundation,
  gap,
  BreakPointMediaMatch,
} from './foundation';

import {MediaMatch} from './media-match';

@customElement('cwc-grid-layout-advanced')
export class GridLayoutAdvanced extends GridLayoutFoundation {
  mediaMatch = new MediaMatch([
    {
      breakpoint: 'xs',
      value: 4,
      media: '(min-width: 0px) and (max-width: 719px)',
    },
    {
      breakpoint: 'sm',
      value: 4,
      media: '(min-width: 720px) and (max-width: 1023px)',
    },
    {
      breakpoint: 'md',
      value: 8,
      media: '(min-width: 1024px) and (max-width: 1279px)',
    },
    {
      breakpoint: 'lg',
      value: 12,
      media: '(min-width: 1280px) and (max-width: 1919px)',
    },
    {
      breakpoint: 'xl',
      value: 12,
      media: '(min-width: 1920px)',
    },
  ]);

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
      return oldVal && newVal.media && oldVal.media !== newVal.media ? true : false;
    }
  })
  breakPointMediaMatch: BreakPointMediaMatch = {
    breakpoint: 'lg',
    value: 12,
    media: '(min-width: 1280px) and (max-width: 1919px)',
  };

  override connectedCallback(): void {
    super.connectedCallback();

    try {
      this.points = JSON.parse(this.columnBreakpoints);
    } catch (e) {
      console.log(e);
    }
    this.mediaMatch.subscribe(this.fnc);
  }

  fnc = async (e: CustomEvent<BreakPointMediaMatch>) => {
    console.log(this.mediaMatch.breakpointMediaMatch, e.detail)
    this.breakPointMediaMatch = await e.detail;
    this.requestUpdate();
  };

  get customStyles() {

    const gridTemplateColumns = this.breakPointMediaMatch?.breakpoint
      ? this.breakPointMediaMatch?.value
      : this.columns;
    console.log(gridTemplateColumns, this.breakPointMediaMatch?.value)
    return {
      display: 'grid',
      // overrides CSS media queries
      'grid-template-columns': `repeat(${gridTemplateColumns}, 1fr)`,
      width: this.width,
      gap: `${this.gap}px`,
      rowGap: this.rowGap ? this.rowGap : null,
      columnGap: this.columnGap ? this.columnGap : null,
      'grid-auto-rows': this.gridAutoRows,
      background: '#efefef',
    };
  }

  override render() {
    return html`
      ${(this.breakPointMediaMatch?.media as MediaQueryList).media}
      ${this.breakPointMediaMatch?.breakpoint}
      ${this.breakPointMediaMatch?.value}

      <div class="cwc-grid" style=${styleMap(this.customStyles)}><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cwc-grid-layout-advanced': GridLayoutAdvanced;
  }
}