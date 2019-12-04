import { Fragment, render, h } from "preact";

const App = (
  <Fragment>
    <h1>Hello popup</h1>
    <a href="./options.html" target="_blank">
      Options
    </a>
  </Fragment>
);

render(App, document.getElementById("root"));
