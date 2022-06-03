import React from 'react';
import { Global, css } from '@emotion/core';

const styles = css`
  *,
  *:after,
  *:before {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; // this is here to make 1 REM unit == 10px for easy reasoning
    scroll-behavior: smooth;
  }

  body {
    color: #404c56;
    font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 1.6em;
    font-weight: normal;
    letter-spacing: .01em;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }

  fieldset {
    border: 0;
  }

  input:not([type=checkbox]) {
    display: block;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0.2em 0;
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
