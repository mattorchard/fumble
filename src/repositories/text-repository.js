import { openDB } from "idb";

const STORE_TEXT = "STORE_TEXT";
const STORE_TEXT_META = "STORE_TEXT_META";

const dbPromise = openDB("text-repository", 1, {
  upgrade(db, oldVersion, newVersion) {
    if (newVersion === 1) {
      const keyPath = ["href", "elementUid"];

      const textStore = db.createObjectStore(STORE_TEXT, { keyPath });
      const metaStore = db.createObjectStore(STORE_TEXT_META, { keyPath });

      ["href", "elementUid"].forEach(index =>
        textStore.createIndex(index, index)
      );
      ["href", "elementUid", "updatedAt", "host"].forEach(index =>
        metaStore.createIndex(index, index)
      );
    }
  },
});

const createKey = ({ elementUid, href }) => `${elementUid}--${href}`;

const summarize = (text, summaryLength = 288) => {
  const length = text.length;
  if (length <= summaryLength / 2) {
    return {
      start: null,
      whole: text,
      end: null,
    };
  }
  return {
    start: text.substring(0, summaryLength / 2),
    whole: null,
    end: text.substring(length - summaryLength / 2, length),
  };
};

const createMeta = ({ text, href, elementUid }) => {
  const url = new URL(href);
  const summary = summarize(text);
  return {
    href,
    elementUid,
    summary,
    updatedAt: new Date(),
    host: url.host,
    search: url.search,
    hash: url.hash,
  };
};

export const saveText = async textObject => {
  if (!textObject.text) {
    return;
  }
  if (!textObject.href) {
    console.warn("Cannot save text without href");
    return;
  }
  try {
    console.log("Saving text", textObject);
    const db = await dbPromise;

    const transaction = db.transaction(
      [STORE_TEXT_META, STORE_TEXT],
      "readwrite"
    );

    transaction.objectStore(STORE_TEXT).put(textObject);

    transaction.objectStore(STORE_TEXT_META).put(createMeta(textObject));

    await transaction.done;
  } catch (error) {
    console.error("Unable to save text", error);
  }
};

export const getSaveMetas = async (quantity = 5, start = 0) => {
  const db = await dbPromise;

  const transaction = db.transaction(STORE_TEXT_META);
  const index = transaction.store.index("updatedAt");
  let cursor = await index.openCursor(null, "prev");
  if (start > 0) {
    await cursor.advance(start);
  }

  const recentSaves = [];
  while (
    cursor &&
    cursor.value &&
    (!quantity || recentSaves.length < quantity)
  ) {
    recentSaves.push({ ...cursor.value, key: createKey(cursor.value) });
    cursor = await cursor.continue();
  }

  return recentSaves;
};

export const getSavedText = async ({ href, elementUid }) => {
  const db = await dbPromise;
  const textObject = await db.get(STORE_TEXT, [href, elementUid]);
  return textObject ? textObject.text : null;
};

export const getSavesCount = async () => {
  const db = await dbPromise;
  return db.count(STORE_TEXT_META);
};
