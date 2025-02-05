import { setPostData } from "./set-post-data";

export const savePostAsync = (requestServer, newPostData) => (dispatch) =>
  requestServer("savePost", newPostData).then((updatePostData) => {
    dispatch(setPostData(updatePostData.res));

    return updatePostData.res;
  });
