import { useInfiniteQuery } from "@tanstack/react-query";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroller";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const InfinitePeople: FC = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["sw-people"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  return <InfiniteScroll loadMore={() => {}} />;
};

export default InfinitePeople;
