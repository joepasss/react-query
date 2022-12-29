import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, Fragment } from "react";
import { updateParameter } from "typescript";
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

interface UpdatePostVariables {
  postId: number;
  title: string;
}

const updatePost = async ({ postId, title }: UpdatePostVariables) => {
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

  const deleteMutation = useMutation((postId: number) => deletePost(postId));
  const updateMutation = useMutation(({ postId, title }: UpdatePostVariables) =>
    updatePost({ postId, title })
  );

  if (isLoading) return <h3>Loading ...</h3>;

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
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button
        onClick={() => updateMutation.mutate({ postId: post.id, title: "ASD" })}
      >
        Update title
      </button>

      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}

      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting the post</p>
      )}

      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has been deleted!</p>
      )}

      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error update the post</p>
      )}

      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Updating the post</p>
      )}

      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Post has been updated!</p>
      )}

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
