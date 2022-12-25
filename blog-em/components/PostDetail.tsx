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

const PostDetail: FC<Props> = ({ post }) => {
  const data: CommentInterface[] = [];

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
