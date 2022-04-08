import { css } from 'lit';

export const styles = css`
    .cwc-grid {
        height: 100%;
    }
    cwc-grid-cell {
      background-color: pink;
      /* border: 1px dashed red; */
      opacity: 0.4;
      color: red;
      font-family: sans-serif;
    }
    cwc-grid-cell.simple:hover {
      cursor: pointer;
      opacity: 0.8;
    }
    cwc-grid-cell.selected {
      opacity: 1;
    }
    `;