import { h } from "preact";
import usePromise from "../hooks/usePromise";
import { getRecentSaveMetas } from "../repositories/text-repository";
import SaveSummary from "./SaveSummary";

const RecentSaves = () => {
  const { error, result: saveMetas, loading } = usePromise(
    getRecentSaveMetas,
    []
  );
  if (error) {
    return "Something went wrong" + error.toString();
  }
  if (loading) {
    return "Loading...";
  }
  if (saveMetas.length === 0) {
    return "No recent saves";
  }
  return (
    <ul>
      {saveMetas.map(saveMeta => (
        <SaveSummary
          key={`${saveMeta.elementUid}-${saveMeta.href}`}
          saveMeta={saveMeta}
        />
      ))}
    </ul>
  );
};
export default RecentSaves;
