const getLabel = ({ labels }) => {
  if (!labels) {
    return;
  }
  if (labels.length === 0) {
    return;
  }
  return labels[0].textContent;
};

const getElementUid = element => {
  if (!element) {
    return null;
  }
  const highestPriorityAttribute = [
    "id",
    "name",
    "aria-label",
    "placeholder",
  ].find(attribute => element.getAttribute(attribute));
  if (highestPriorityAttribute) {
    return element.getAttribute(highestPriorityAttribute);
  }
  const label = getLabel(element);
  if (label) {
    return label;
  }
  return getElementUid(element.parentElement);
};

export default getElementUid;
