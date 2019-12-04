import { h } from "preact";
import "./SaveSummary.css";
const SaveSummary = ({ saveMeta }) => {
  const { href, elementUid, summary, updatedAt, host } = saveMeta;
  return (
    <div className="save-summary__heading">
      <a target="_blank" rel="noreferer" href={href}>
        {host}
      </a>
      {summary.whole ? (
        <p>{summary.whole}</p>
      ) : (
        <p>
          {summary.start}...{summary.end}
        </p>
      )}
    </div>
  );
};

export default SaveSummary;
