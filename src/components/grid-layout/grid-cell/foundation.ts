import { BreakPointMediaMatch } from "../foundation";


export interface CellPoistion {
    start?: number | 'auto';
    end?: number | 'auto';
}

export interface CellSize extends CellPoistion  {
    row?: CellPoistion;
  }

  export type Placement =
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "stretch"
  | "flex-start";

  export interface BreakPointCells {
      xs: CellSize;
      sm: CellSize;
      md: CellSize;
      lg: CellSize
      xl: CellSize
  }

  export interface BreakPointCellsString {
    xs: string;
    sm: string;
    md: string;
    lg: string
    xl: string
}

  export const getCellPositionString = (
    cells: BreakPointCellsString,
    mediaMatch?: BreakPointMediaMatch,
  ): string => {
    return  mediaMatch && cells[mediaMatch.breakpoint] ? cells[mediaMatch.breakpoint] : cells.xs;
  };

  // const getCellRowPoistion = (value: CellSize): CellPoistion | undefined => {
  //   if (value.row) {
  //     return {
  //       start: value.row.start ? value.row.start : 'auto',
  //       end: value.row.end ? value.row.end : 'auto'
  //     }

  //   }
  //   return {
  //     start: 'auto',
  //     end: 'auto'
  //   };
  // };


  export const getCellCPosition = (
    cells: BreakPointCells,
    mediaMatch?: BreakPointMediaMatch,
  ): CellSize => {
    let breakpoint  = mediaMatch && cells[mediaMatch.breakpoint] ? cells[mediaMatch.breakpoint] : cells.xs
      breakpoint = {
        ...breakpoint,
        row : {...getCellRowPoistion(breakpoint) }
    }

    return breakpoint;
  };

  const getCellRowPoistion = (value: CellSize): CellPoistion | undefined => {
    if (value.row) {
      return {
        start: value.row.start ? value.row.start : 'auto',
        end: value.row.end ? value.row.end : 'auto'
      }

    }
    return {
      start: 'auto',
      end: 'auto'
    };
  };