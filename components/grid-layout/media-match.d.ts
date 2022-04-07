import { BreakPointMediaMatch } from "./foundation";
export declare class MediaMatch {
    mqls: MediaQueryList[];
    breakpointMediaMatch: BreakPointMediaMatch[];
    breakpoint?: BreakPointMediaMatch;
    handlerArray: EventListener[];
    constructor(mediaQueries?: BreakPointMediaMatch[]);
    getBreakpoint: () => BreakPointMediaMatch;
    mediaqueryResponse: (mql: BreakPointMediaMatch) => void;
    removeQueryEvents: () => void;
    getMediaQuery: () => void;
    subscribe: (func: Function) => void;
    ubsubscribe: (func: Function) => void;
}
