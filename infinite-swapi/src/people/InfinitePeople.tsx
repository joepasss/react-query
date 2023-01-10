import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, Fragment } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Person from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: ResultsInterface[];
}

interface ResultsInterface {
  name: string;
  hair_color: string;
  eye_color: string;
}

const InfinitePeople: FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    ["sw-people"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) {
    return <div className="loading">Loading ...</div>;
  }

  if (isError) {
    return <div>Error! {(error as Error).toString()}</div>;
  }

  return (
    <Fragment>
      {isFetching && <div className="loading">Loading ...</div>}
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        {data.pages.map((pageData: ApiResponse) =>
          pageData.results.map((item, index) => (
            <Person
              key={`person_${item.name}_${index}`}
              name={item.name}
              hairColor={item.hair_color}
              eyeColor={item.eye_color}
            />
          ))
        )}
      </InfiniteScroll>
    </Fragment>
  );
};

export default InfinitePeople;
