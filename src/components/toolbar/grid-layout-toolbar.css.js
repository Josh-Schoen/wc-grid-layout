import {css} from 'lit';

export const gridLayoutToolbar = css`
  :host {
    margin: 0;
    padding: 4px;
    display: flex;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0px 0px 10px #b6b5b59d;
    height: 56px;
    position: fixed;
    z-index: 9999;
    bottom: 12px;
    right: 12px;
  }

  grid-layout-toolbar-item {
    margin: 0 8px;
  }

  :host(.open) {
    visibility: visible;
    opacity: 1;
  }

  .selected {
    outline: auto 8px red;
    position: relative;
  }

  .over {
    outline: auto 1px blue;
  }

  #gridLayout {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .settings-container {
    padding: 8px;
    display: flex;
    align-items: center;
  }

  mwc-icon {
    padding-right: 4px;
  }

  mwc-textfield {
    margin: 8px 0px;
  }

  .mdc-text-field--outlined {
    height: 44px;
  }

  mwc-dialog {
    --mdc-dialog-min-width: 400px;
  }

  .color-container {
    border-radius: 50%;
    overflow: hidden;
    padding: 0;
    width: 32px;
    height: 32px;
    position: relative;
    margin: 6px;
  }

  input[type='color'] {
    background: none;
    border: none;
    outline: none;
    width: 44px;
    height: 44px;
    position: absolute;
    top: -6px;
    left: -6px;
    cursor: pointer;
  }

  .text-format-container {
    overflow: hidden;
    padding: 0;
    width: 32px;
    height: 10px;
    position: relative;
    margin: 8px;
  }

  input[type='color'].text-format,
  input[type='button'] {
    background: none;
    border: none;
    outline: none;
    width: 44px;
    height: 44px;
    position: absolute;
    bottom: -6px;
    left: -6px;
    cursor: pointer;
    color: transparent;
    border: none;
  }

  input[type='button']:hover {
    cursor: pointer;
  }

  mwc-slider {
    padding: 24px 8px 0px;
  }
  .opacity-label {
    display: flex;
    justify-content: space-between;
    padding: 0px 30px;
  }

  .color-swatches {
    margin: 20px 20px;
    display: flex;
    flex-wrap: wrap;
  }

  h3,
  h4,
  h5 {
    margin: 0;
  }

  h4.row-heading {
      margin-bottom: 8px;
  }

  .settings-field {
    height: 52px;
  }

  .header-container {
      display: flex;
      justify-content: space-between;
  }

  .header-container.success {
    color: var(--glo-success);
  }

  .divider {
    border: 1px #b6b5b59d solid;
    border-radius: 4px;
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
  }
`;
