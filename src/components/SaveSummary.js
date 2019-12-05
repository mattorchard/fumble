import { h } from "preact";
import "./SaveSummary.css";
import useLiveRelativeTime from "../hooks/useLiveRelativeTime";

const copySaveIntoClipboard = async () => {};

const SaveSummary = ({ saveMeta }) => {
  const { href, summary, updatedAt, host } = saveMeta;
  const timeSinceUpdated = useLiveRelativeTime(updatedAt);
  return (
    <div
      className="save-summary"
      role="button"
      tabIndex={0}
      onClick={copySaveIntoClipboard}
    >
      <div className="save-summary__heading">
        <a
          target="_blank"
          rel="noreferer"
          href={href}
          className="save-summary__heading__link"
        >
          {host}
        </a>
        <time
          className="save-summary__heading__timestamp"
          dateTime={updatedAt.toISOString()}
        >
          {timeSinceUpdated}
        </time>
      </div>
      <p className="save-summary__summary">
        {summary.whole ? summary.whole : `${summary.start}...${summary.end}`}
      </p>
    </div>
  );
};

export default SaveSummary;
