import { Fragment, render, h } from "preact";
import RecentSaves from "./components/RecentSaves";

const App = (
  <Fragment>
    <h1>Hello popup</h1>
    <a href="./options.html" target="_blank">
      Options
    </a>
    <RecentSaves />
  </Fragment>
);

render(App, document.getElementById("root"));
