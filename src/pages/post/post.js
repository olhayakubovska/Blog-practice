import { useEffect, useLayoutEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../components/hooks/use-server";
import { Comments, PostContent, PostForm } from "./components";
import { loadPostaAsync } from "../../actions/load-post-async";
import { selectPost } from "../../selects";
import styled from "styled-components";
import { RESET_POST_DATA } from "../../actions/reset-post-data";
import { Content, Error } from "../../components";
import { ROLE } from "../../constants";

const PostContainer = ({ className }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = !!useMatch("/post/:id/edit");
  const isCreating = !!useMatch("/post");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }

    dispatch(loadPostaAsync(requestServer, params.id)).then((postData) => {
      setError(postData.error);
      setIsLoading(false);
    });
  }, [dispatch, requestServer, params.id, isCreating]);

  if (isLoading) {
    return null;
  }


  const SpecificPostPage =
    isEditing || isCreating ? (
      <Content access={[ROLE.ADMIN]} serverError={error}>
        <div className={className}>
          <PostForm post={post} />
        </div>
      </Content>
    ) : (
      <div className={className}>
        <PostContent post={post} />

        <Comments comments={post.comments} postId={post.id} />
      </div>
    );

  return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
  padding: 0 80px;
  margin: 40px 0;
`;
