import React, { useContext } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools'
import { lightTheme, DarkTheme } from './theme';
import ModeContext from './store/mode-context';

// Reset CSS
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
  color: inherit;
}
`;

const ModeToggleBtn = styled.button`
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px #ccc;
  border-radius: 20px;
  padding: 5px;
  font-size: 25px;
  position: fixed;
  top: 2rem;
  right: 5rem;
  z-index: 2;
`;

function App() {
  const modeCtx = useContext(ModeContext);

  return (
    <ThemeProvider theme={modeCtx.isLightMode ? lightTheme : DarkTheme}>
      <GlobalStyle />
      <ModeToggleBtn onClick={modeCtx.toggleMode}>{modeCtx.isLightMode ? "🌚" : "🌝"}</ModeToggleBtn>
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;
