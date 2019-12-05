import { useEffect, useState } from "preact/hooks";
import { DAY, HOUR, MINUTE, SECOND, WEEK } from "../helpers/time-constants";

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "always",
  style: "long",
  localeMatcher: "best fit",
});

const formatRelativeDate = date => {
  if (!date) {
    return null;
  }
  const delta = Date.now() - date.getTime();
  if (delta < MINUTE) {
    return `<${relativeTimeFormatter.format(-1, "minute")}`;
  } else if (delta < HOUR) {
    return relativeTimeFormatter.format(-Math.floor(delta / MINUTE), "minute");
  } else if (delta < DAY) {
    return relativeTimeFormatter.format(-Math.floor(delta / HOUR), "hour");
  } else if (delta < WEEK) {
    return relativeTimeFormatter.format(-Math.floor(delta / DAY), "day");
  } else {
    return relativeTimeFormatter.format(-Math.floor(delta / WEEK), "week");
  }
};

const useLiveRelativeTime = date => {
  const [state, setState] = useState(formatRelativeDate(date));
  useEffect(() => {
    const intervalId = setInterval(
      () => setState(formatRelativeDate(date)),
      30 * SECOND
    );
    return () => clearInterval(intervalId);
  }, [date]);
  return state;
};

export default useLiveRelativeTime;
