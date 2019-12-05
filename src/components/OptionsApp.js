import { render, h } from "preact";
import GreyList from "./GreyList";

const App = (
  <div>
    <h1>Hello Options!</h1>
    <GreyList />
  </div>
);

render(App, document.getElementById("root"));
