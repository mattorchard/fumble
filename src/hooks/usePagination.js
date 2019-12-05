import { useMemo, useReducer } from "preact/hooks";

const paginationReducer = (state, action) => {
  switch (action.type) {
    case "nextPage":
      if (!state.pageSize) {
        return state;
      }
      return {
        ...state,
        start: state.start + state.pageSize,
      };
    case "prevPage":
      if (!state.pageSize || state.start === 0) {
        return state;
      }
      return {
        ...state,
        start: Math.max(0, state.start - state.pageSize),
      };
    case "firstPage":
      return {
        ...state,
        start: 0,
      };
    case "lastPage":
      if (!state.pageSize || !state.total) {
        return state;
      }
      return {
        ...state,
        start: Math.floor(state.total / state.pageSize) * state.pageSize,
      };
    case "setPageSize":
      return {
        ...state,
        pageSize: action.pageSize,
      };
    case "setTotal":
      return {
        ...state,
        total: action.total,
      };
    default:
      return state;
  }
};

const usePagination = initialState => {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  const actions = useMemo(
    () => ({
      nextPage: () => dispatch({ type: "nextPage" }),
      prevPage: () => dispatch({ type: "prevPage" }),
      firstPage: () => dispatch({ type: "firstPage" }),
      lastPage: () => dispatch({ type: "lastPage" }),
      setPageSize: pageSize => dispatch({ type: "setPageSize", pageSize }),
      setTotal: total => dispatch({ type: "setTotal", total }),
    }),
    [dispatch]
  );

  return [state, actions];
};

export default usePagination;
