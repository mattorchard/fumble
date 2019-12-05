import { h } from "preact";
import usePromise from "../hooks/usePromise";
import { getRecentSaveMetas } from "../repositories/text-repository";
import SaveSummary from "./SaveSummary";
import "./RecentSaves.css";

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
    <ul className="recent-saves__list">
      {saveMetas.map(saveMeta => (
        <li key={saveMeta.key} className="recent-saves__list-item">
          <SaveSummary saveMeta={saveMeta} />
        </li>
      ))}
    </ul>
  );
};
export default RecentSaves;
