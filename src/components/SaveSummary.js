import { h } from "preact";
import "./SaveSummary.css";
import useLiveRelativeTime from "../hooks/useLiveRelativeTime";
import { getSavedText } from "../repositories/text-repository";

const copyIntoClipboard = async compositeKey => {
  const text = await getSavedText(compositeKey);
  return navigator.clipboard.writeText(text);
};

const SaveSummary = ({ saveMeta }) => {
  const { href, summary, updatedAt, host, elementUid } = saveMeta;
  const timeSinceUpdated = useLiveRelativeTime(updatedAt);
  return (
    <button
      className="save-summary__wrapper container-button"
      onClick={() => copyIntoClipboard({ href, elementUid })}
    >
      <div className="save-summary">
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
    </button>
  );
};

export default SaveSummary;
