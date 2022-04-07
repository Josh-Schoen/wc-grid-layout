import { BreakPointMediaMatch } from "../foundation";
export interface CellPoistion {
    start?: number | 'auto';
    end?: number | 'auto';
}
export interface CellSize extends CellPoistion {
    row?: CellPoistion;
}
export declare type Placement = "center" | "flex-end" | "space-between" | "space-around" | "stretch" | "flex-start";
export interface BreakPointCells {
    xs: CellSize;
    sm: CellSize;
    md: CellSize;
    lg: CellSize;
    xl: CellSize;
}
export interface BreakPointCellsString {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}
export declare const getCellPositionString: (cells: BreakPointCellsString, mediaMatch?: BreakPointMediaMatch) => string;
export declare const getCellCPosition: (cells: BreakPointCells, mediaMatch?: BreakPointMediaMatch) => CellSize;
