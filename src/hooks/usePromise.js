import { useReducer, useEffect } from "preact/hooks";

const promiseReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        loading: true,
      };
    case "resolve":
      return {
        loading: false,
        error: null,
        result: action.result,
      };
    case "reject":
      return {
        loading: false,
        error: action.error,
        result: null,
      };
  }
};

const noCleanup = () => {};

const usePromise = (asyncCallback, dependencies) => {
  const [state, dispatch] = useReducer(promiseReducer, {
    loading: Boolean(asyncCallback),
    error: null,
    result: null,
  });

  useEffect(() => {
    if (!asyncCallback) {
      return noCleanup;
    }
    let cancelled = false;
    dispatch({ type: "init" });
    asyncCallback
      .apply(null, dependencies)
      .then(result => cancelled || dispatch({ type: "resolve", result }))
      .catch(error => cancelled || dispatch({ type: "reject", error }));

    return () => (cancelled = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncCallback, ...dependencies]);

  return state;
};

export default usePromise;
