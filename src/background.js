import { saveText } from "./repositories/text-repository";

const messageHandlers = {
  requestSaveText: saveText,
};

chrome.runtime.onMessage.addListener(message => {
  // Anything other than the message type is considered payload
  const { messageType, ...payload } = message;

  if (!(messageType in messageHandlers)) {
    console.warn(
      "No message handler for type",
      messageType,
      "With payload",
      payload
    );
    return;
  }

  try {
    messageHandlers[messageType].call(null, payload);
  } catch (error) {
    console.error("Failed to handle message", messageType, error, payload);
  }

  return true;
});
