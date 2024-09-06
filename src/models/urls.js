// chaptersLinks.js
import book from "./locales/book_all.json";

const chaptersLinks = book.chapters.map((chapter) => {
  const url = chapter["en"].title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return {
    id: chapter.id,
    arTitle: chapter["ar"].title,
    enTitle: chapter["en"].title,
    url: url,
  };
});

export default chaptersLinks;
