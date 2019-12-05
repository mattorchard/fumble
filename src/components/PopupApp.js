import { Fragment, render, h } from "preact";
import RecentSaves from "./RecentSaves";
import "./PopupApp.css";

const App = (
  <Fragment>
    <header className="app__header">
      <h1 className="app__header__brand">
        Fumbl<span className="app__header__brand--e">e</span>
      </h1>
      <a href="./saves.html" target="_blank" className="app__header__button">
        See All
      </a>
    </header>
    <main className="app__main">
      <RecentSaves />
    </main>
  </Fragment>
);

render(App, document.getElementById("root"));
