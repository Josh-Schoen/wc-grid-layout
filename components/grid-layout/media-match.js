import { breakPointMediaQueries } from "./foundation";
export class MediaMatch {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(mediaQueries) {
        this.mqls = [
            window.matchMedia("(max-width: 1900px)"),
            window.matchMedia("(max-width: 600px)"),
            window.matchMedia("(max-height: 500px)"),
        ];
        this.breakpointMediaMatch = breakPointMediaQueries;
        this.handlerArray = [];
        this.getBreakpoint = () => {
            return this.breakpoint;
        };
        this.mediaqueryResponse = (mql) => {
            if (typeof mql.media !== "string" && mql.media.matches) {
                this.breakpoint = mql;
                const matchEvent = new CustomEvent("mediaMatch", { detail: this.breakpoint });
                window.dispatchEvent(matchEvent);
            }
        };
        this.removeQueryEvents = () => {
            for (let i = 0; i < this.breakpointMediaMatch.length; i++) {
                // loop through queries
                this.breakpointMediaMatch[i].media.removeEventListener("change", this.handlerArray[i]);
            }
        };
        this.getMediaQuery = () => {
            for (let i = 0; i < this.breakpointMediaMatch.length; i++) {
                this.mediaqueryResponse(this.breakpointMediaMatch[i]);
                const boundEventHandler = this.mediaqueryResponse.bind(this, this.breakpointMediaMatch[i]);
                this.breakpointMediaMatch[i].media.addEventListener("change", boundEventHandler);
                this.handlerArray.push(boundEventHandler);
            }
        };
        this.subscribe = (func) => {
            window.addEventListener("mediaMatch", func);
            this.getMediaQuery();
        };
        this.ubsubscribe = (func) => {
            window.removeEventListener("mediaMatch", func);
        };
        if (mediaQueries) {
            this.breakpointMediaMatch = mediaQueries.map((item) => {
                return Object.assign(Object.assign({}, item), { media: typeof item.media === "string" ? window.matchMedia(item.media) : item.media });
            });
        }
    }
}
//# sourceMappingURL=media-match.js.map