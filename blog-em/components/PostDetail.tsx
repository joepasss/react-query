import { useQuery } from "@tanstack/react-query";
import { FC, Fragment } from "react";
import { PostInterface } from "./Posts";

export interface CommentInterface {
  id: number;
  email: string;
  body: string;
}

interface Props {
  post: PostInterface;
}

const fetchComments = async (postId: number): Promise<CommentInterface[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );

  return response.json();
};

const deletePost = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );

  return response.json();
};

const updatePost = async (postId: number, title: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }
  );

  return response.json();
};

const PostDetail: FC<Props> = ({ post }) => {
  const { data, isError, isLoading, error } = useQuery(
    ["comment", post.id],
    () => fetchComments(post.id)
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
      <h3>{post.title}</h3>
      <button>Delete</button>
      <button>Update title</button>

      <p>{post.body}</p>

      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </Fragment>
  );
};

export default PostDetail;
