import { LitElement } from "lit";
export const breakPoints = {
    xs: 0,
    sm: 720,
    md: 1024,
    lg: 1280,
    xl: 1920,
};
export const breakColumns = {
    xs: 4,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 12,
};
export const breakPointMediaQueries = [
    {
        breakpoint: "xs",
        value: breakColumns.xs,
        media: window.matchMedia(`(min-width: max-width(${breakPoints.xs}px) and (max-width: ${breakPoints.sm - 1}px)`),
    },
    {
        breakpoint: "sm",
        value: breakColumns.sm,
        media: window.matchMedia(`(min-width: ${breakPoints.sm}px) and (max-width: ${breakPoints.md - 1}px)`),
    },
    {
        breakpoint: "md",
        value: breakColumns.md,
        media: window.matchMedia(`(min-width: ${breakPoints.md}px) and (max-width: ${breakPoints.lg - 1}px)`),
    },
    {
        breakpoint: "lg",
        value: breakColumns.lg,
        media: window.matchMedia(`(min-width: ${breakPoints.lg}px) and (max-width: ${breakPoints.xl - 1}px)`)
    },
    {
        breakpoint: "xl",
        value: breakColumns.xl,
        media: window.matchMedia(`min-width(${breakPoints.xl}px)`),
    },
];
export const gap = "20px";
export class GridLayoutFoundation extends LitElement {
    constructor(breakPoints) {
        super();
        this.up = (BreakPointKey) => {
            //   console.log(this.breakPoints)
            return `@media (min-width: ${this.breakPoints[BreakPointKey]}px)`;
        };
        this.down = (BreakPointKey) => {
            return `@media (max-width: ${this.breakPoints[BreakPointKey]}px)`;
        };
        this.frGetter = (value) => typeof value === "number" ? `repeat(${value}, 1fr)` : `${value}`;
        this.getBreakPoints = (columnsBreakpoints, columnGap, rowGap) => {
            return `${this.up("xs")} {
              column-gap: ${`${columnGap.xs}px`};
              grid-template-columns: ${frGetter(columnsBreakpoints.xs)};
              row-gap: ${`${rowGap.xs}px`};
            }
            ${this.up("sm")} {
              column-gap: ${`${columnGap.sm}px`};
              grid-template-columns: ${frGetter(columnsBreakpoints.sm)};
              row-gap: ${`${rowGap.sm}px`};
            }
            ${this.up("md")} {
              column-gap: ${`${columnGap.md}px`};
              grid-template-columns: ${frGetter(columnsBreakpoints.md)};
              row-gap: ${`${rowGap.md}px`};
            }
            ${this.up("lg")} {
              column-gap: ${`${columnGap.lg}px`};
              grid-template-columns: ${frGetter(columnsBreakpoints.lg)};
              row-gap: ${`${rowGap.lg}px`};
            }
            ${this.up("xl")} {
              column-gap: ${`${columnGap.xl}px`};
              grid-template-columns: ${frGetter(columnsBreakpoints.lg)};
              row-gap: ${`${rowGap.xl}px`};
            }`;
        };
        this.breakPoints = breakPoints;
    }
}
export const frGetter = (value) => typeof value === "number" ? `repeat(${value}, 1fr)` : value;
//# sourceMappingURL=foundation.js.map