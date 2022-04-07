export const getCellPositionString = (cells, mediaMatch) => {
    return mediaMatch && cells[mediaMatch.breakpoint] ? cells[mediaMatch.breakpoint] : cells.xs;
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
export const getCellCPosition = (cells, mediaMatch) => {
    let breakpoint = mediaMatch && cells[mediaMatch.breakpoint] ? cells[mediaMatch.breakpoint] : cells.xs;
    breakpoint = Object.assign(Object.assign({}, breakpoint), { row: Object.assign({}, getCellRowPoistion(breakpoint)) });
    return breakpoint;
};
const getCellRowPoistion = (value) => {
    if (value.row) {
        return {
            start: value.row.start ? value.row.start : 'auto',
            end: value.row.end ? value.row.end : 'auto'
        };
    }
    return {
        start: 'auto',
        end: 'auto'
    };
};
//# sourceMappingURL=foundation.js.map