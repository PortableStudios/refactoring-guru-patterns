import { GenericNews } from "../controllers/NewsController";

import { singleLineBreak } from "../helpers/formatting";

const heading = (str: string): string => {
  return [str, "=".repeat(str.length)].join(singleLineBreak);
};

const formatDate = (date: Date): string => {
  return date.toLocaleString();
};

const view = (newsItem: GenericNews): string => {
  const { headline, tagline, publishDate } = newsItem;
  return [heading(headline), tagline, formatDate(publishDate)].join(
    singleLineBreak
  );
};

export default view;
