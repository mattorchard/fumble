import { useEffect, useMemo, useReducer } from "preact/hooks";

const toastEventManager = {
  listeners: new Map(),
  nextListenerId: 0,

  addListener(callback) {
    const listenerId = this.nextListenerId;
    this.nextListenerId++;
    this.listeners.set(listenerId, callback);
    return () => this.removeEventListener(listenerId);
  },

  removeEventListener(listenerId) {
    this.listeners.delete(listenerId);
  },

  emit(...args) {
    [...this.listeners.values()].forEach(callback =>
      setTimeout(() => callback.apply(null, args))
    );
  },
};

const sendToastMessage = (type, toast) => {
  if (typeof toast === "string") {
    return toastEventManager.emit({ text: toast, type });
  } else {
    toastEventManager.emit({ ...toast, type });
  }
};

const success = toast => sendToastMessage("success", toast);
const warn = toast => sendToastMessage("warn", toast);
const error = toast => sendToastMessage("error", toast);

export const toast = { success, warn, error };

const removeProperty = (object, keyToRemove) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => key !== keyToRemove)
  );

const toastReducer = (state, action) => {
  switch (action.type) {
    case "deleteToast": {
      return {
        ...state,
        toasts: removeProperty(state.toasts, action.toastId),
      };
    }
    case "newToast": {
      const toastId = state.nextToastId;
      return {
        nextToastId: toastId + 1,
        toasts: {
          ...state.toasts,
          [toastId]: action.toast,
        },
      };
    }
    default:
      return state;
  }
};

export const useToasts = () => {
  const [state, dispatch] = useReducer(toastReducer, {
    nextToastId: 0,
    toasts: {},
  });

  const actions = useMemo(
    () => ({
      newToast: toast => dispatch({ type: "newToast", toast }),
      deleteToast: toastId => dispatch({ type: "deleteToast", toastId }),
    }),
    [dispatch]
  );

  useEffect(() => toastEventManager.addListener(actions.newToast), [dispatch]);

  return [state.toasts, actions];
};
