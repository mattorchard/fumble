import { render, h } from "preact";
import GreyList from "./GreyList";

const OptionsApp = (
  <div>
    <h1>Hello Options!</h1>
    <GreyList />
  </div>
);

render(OptionsApp, document.getElementById("root"));
