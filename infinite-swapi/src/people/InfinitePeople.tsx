import { FC } from "react";
import InfiniteScroll from "react-infinite-scroller";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const InfinitePeople: FC = () => {
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll loadMore={() => {}}/>;
};

export default InfinitePeople;
