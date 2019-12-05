import { render, h } from "preact";
import AllSaves from "./AllSaves";
import ToastContainer from "./ToastContainer";

const SavesApp = (
  <div>
    <h1>Hello Saves!</h1>
    <AllSaves />
    <ToastContainer />
  </div>
);

render(SavesApp, document.getElementById("root"));
