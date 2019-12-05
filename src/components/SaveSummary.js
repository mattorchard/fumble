import { h } from "preact";
import "./SaveSummary.css";
import useLiveRelativeTime from "../hooks/useLiveRelativeTime";
import { getSavedText } from "../repositories/text-repository";
import { toast } from "../helpers/toast";

const copyIntoClipboard = async compositeKey => {
  try {
    const text = await getSavedText(compositeKey);
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (error) {
    toast.error("Failed to copy");
  }
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
