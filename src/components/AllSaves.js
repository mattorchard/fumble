import { h } from "preact";
import usePromise from "../hooks/usePromise";
import { getSaveMetas, getSavesCount } from "../repositories/text-repository";
import SaveSummary from "./SaveSummary";
import usePagination from "../hooks/usePagination";
import { useEffect } from "preact/hooks";

const AllSaves = () => {
  const [{ start, pageSize, total }, actions] = usePagination({
    pageSize: 50,
    start: 0,
  });
  useEffect(() => {
    let cancelled = false;
    getSavesCount().then(total => cancelled || actions.setTotal(total));
    return () => (cancelled = true);
  }, [actions, actions.setTotal]);
  const handleQuantityChange = event => {
    const value = parseInt(event.target.value);
    actions.setPageSize(isNaN(value) ? null : value);
  };

  const { loading, error, result: saves } = usePromise(getSaveMetas, [
    pageSize,
    start,
  ]);

  return (
    <main>
      {saves && (
        <ol>
          {saves.map(saveMeta => (
            <li key={saveMeta.key}>
              <SaveSummary saveMeta={saveMeta} />
            </li>
          ))}
        </ol>
      )}
      <select onChange={handleQuantityChange} value={pageSize}>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="">All</option>
      </select>
      <button type="button" onClick={actions.firstPage} disabled={start === 0}>
        First
      </button>
      <button type="button" onClick={actions.prevPage} disabled={start === 0}>
        Prev
      </button>
      <button
        type="button"
        onClick={actions.nextPage}
        disabled={total && start + pageSize > total}
      >
        Next
      </button>
      <button
        type="button"
        onClick={actions.lastPage}
        disabled={total && start + pageSize > total}
      >
        Last
      </button>
      viewing {start + 1}-{start + pageSize}
    </main>
  );
};

export default AllSaves;
