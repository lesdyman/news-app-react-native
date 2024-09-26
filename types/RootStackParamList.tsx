import { NewsItem } from "./NewsItem";

export type RootStackParamList = {
  Main: undefined;
  Article: {
    item: NewsItem;
  };
};
