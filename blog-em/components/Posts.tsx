import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import PostDetail from "./PostDetail";

export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (page: number): Promise<PostInterface[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );

  return response.json();
};

const Posts = () => {
  const maxPage = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<PostInterface | null>(null);

  const { data, isError, isLoading, error } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  );

  if (isLoading) return <h3>Loading...</h3>;

  if (isError) {
    return (
      <Fragment>
        <h3>Oops, something went wrong!</h3>
        {typeof error === "string" ? <p>{error.toString()}</p> : <Fragment />}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>

      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous Page
        </button>

        <span>Page {currentPage}</span>

        <button
          disabled={currentPage > maxPage - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </Fragment>
  );
};

export default Posts;
