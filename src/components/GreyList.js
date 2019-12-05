import { h } from "preact";
import { useState } from "preact/hooks";

const onEnter = callback => event => {
  if (event.key && event.key.toLowerCase() === "enter") {
    return callback(event);
  }
};

const ListInput = ({ list, onListChanged }) => {
  const removeItem = index => onListChanged(list.filter((v, i) => i !== index));
  const addItem = item => onListChanged([...list, item]);

  const handleAdd = event => {
    event.preventDefault();
    const draftInput = event.target
      .closest(".js-draft-row")
      .querySelector("[name=draft]");
    const draft = draftInput.value.trimStart().trimEnd();
    if (!draft || !draftInput.checkValidity()) {
      return;
    }
    draftInput.value = "";
    addItem(draft);
  };

  const handleClickItem = ({ target }) => {
    const item = target.closest("[data-index]");
    if (!item) {
      return;
    }
    const index = parseInt(item.dataset.index);
    if (isNaN(index)) {
      return;
    }
    removeItem(index);
  };

  return (
    <div role="group">
      <ul onClick={handleClickItem}>
        {list.map((item, index) => (
          <li key={item} data-index={index}>
            {item}
          </li>
        ))}
      </ul>
      <div className="js-draft-row" onKeyDown={onEnter(handleAdd)}>
        <input name="draft" />
        <button type="button" onClick={handleAdd}>
          +
        </button>
      </div>
    </div>
  );
};

const OPTIONS = ["everywhere", "blacklist", "whitelist"];
const GreyList = () => {
  const [mode, setMode] = useState("everywhere");
  const [list, setList] = useState([]);
  const handleModeChange = ({ target }) => setMode(target.value);

  return (
    <form>
      Where should Fumble run?
      <div role="group" onChange={handleModeChange}>
        {OPTIONS.map(option => (
          <label key={option}>
            <input
              type="radio"
              name="mode"
              value={option}
              checked={option === mode}
            />{" "}
            {option}
          </label>
        ))}
      </div>
      {mode === "everywhere" || (
        <ListInput list={list} onListChanged={setList} />
      )}
    </form>
  );
};

export default GreyList;
