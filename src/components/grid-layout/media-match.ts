import { BreakPointMediaMatch, breakPointMediaQueries } from "./foundation";

export class MediaMatch {
  mqls = [
    window.matchMedia("(max-width: 1900px)"),
    window.matchMedia("(max-width: 600px)"),
    window.matchMedia("(max-height: 500px)"),
  ];

  private _breakpointMediaMatch: BreakPointMediaMatch[] = breakPointMediaQueries;

  breakpoint?: BreakPointMediaMatch;
  handlerArray: EventListener[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(mediaQueries?: BreakPointMediaMatch[]) {
    if (mediaQueries) {
      this.breakpointMediaMatch = mediaQueries;
    }
  }

  get breakpointMediaMatch(): BreakPointMediaMatch[] {
    return this._breakpointMediaMatch;
  }

  set breakpointMediaMatch(mediaQueries: BreakPointMediaMatch[]) {
    this._breakpointMediaMatch = mediaQueries.map((item) => {
      return {
        ...item,
        media: this.getMediaMinMax(item.breakpointMin, item.breakpointMax ? item.breakpointMax : null)
        // media: typeof item.media === "string" ? window.matchMedia(item.media) : item.media,
      };
    });
  }

  getMediaMinMax(min: number, max?: number | null) {
    return max ? window.matchMedia(`(min-width: ${min}px) and (max-width: ${max}px)`) : window.matchMedia(`min-width(${min}px)`);
  }

  updatebreakpointValue(mediaQuery: BreakPointMediaMatch) {
    this.breakpointMediaMatch = this.breakpointMediaMatch.map((media) => media.breakpoint === mediaQuery.breakpoint ? mediaQuery : media);
  }

  getBreakpoint = () => {
    return this.breakpoint;
  };

  mediaqueryResponse = (mql: BreakPointMediaMatch) => {
    if (mql.media && typeof mql.media !== "string" && mql.media.matches) {
      this.breakpoint = this.breakpointMediaMatch.find((q) => q.breakpoint === mql.breakpoint);
      const matchEvent: CustomEvent = new CustomEvent<BreakPointMediaMatch>(
        "mediaMatch",
        { detail: this.breakpoint }
      );

        window.dispatchEvent(matchEvent);
    }
  };

  removeQueryEvents = () => {
    for (let i = 0; i < this.breakpointMediaMatch.length; i++) {
      // loop through queries
      (this.breakpointMediaMatch[i].media as MediaQueryList).removeEventListener("change", this.handlerArray[i]);
    }
  };

  getMediaQuery = () => {
    for (let i = 0; i < this.breakpointMediaMatch.length; i++) {
      this.mediaqueryResponse(this.breakpointMediaMatch[i]);
      const boundEventHandler = this.mediaqueryResponse.bind(
        this,
        this.breakpointMediaMatch[i]
      );
      this.breakpointMediaMatch[i].media && (this.breakpointMediaMatch[i].media as MediaQueryList).addEventListener("change", boundEventHandler);
      this.handlerArray.push(boundEventHandler);
    }
  };

  subscribe = (func: Function) => {
    window.addEventListener("mediaMatch", func as EventListener);
    this.getMediaQuery();
  };

  ubsubscribe = (func: Function) => {
    window.removeEventListener("mediaMatch", func as EventListener);
  };
}
