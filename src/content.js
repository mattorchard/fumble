import getElementUid from "./helpers/getElementUid";

const SAVE_AFTER_DELAY = 500;
const SAVE_AFTER_LENGTH = 72;

const saveText = ({ text, elementUid, href }) => {
  if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage({
      messageType: "requestSaveText",
      text,
      elementUid,
      href,
    });
  } else {
    console.warn("Unable to send message, runtime undefined");
  }
};

const saveTextDebounced = (() => {
  let timeoutId;
  let prevElementUid;
  let prevHref;
  return ({ text, elementUid, href }) => {
    if (timeoutId && prevElementUid === elementUid && prevHref === href) {
      clearTimeout(timeoutId);
    }
    prevElementUid = elementUid;
    prevHref = href;
    timeoutId = setTimeout(
      () => saveText({ text, elementUid, href }),
      SAVE_AFTER_DELAY
    );
  };
})();

const isPasswordField = element =>
  element.tagName &&
  element.tagName.toUpperCase() === "INPUT" &&
  element.type &&
  element.type.toUpperCase() === "PASSWORD";

const globalInputHandler = event => {
  if (isPasswordField(event.target)) {
    return;
  }
  const { value } = event.target;
  if (value && value.length >= SAVE_AFTER_LENGTH) {
    saveTextDebounced({
      text: value,
      elementUid: getElementUid(event.target),
      href: window.location.href,
    });
  }
};

document.addEventListener("input", globalInputHandler);
