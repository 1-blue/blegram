import useDeletePost from "./useDeletePost";
import useUploadPost from "./useUploadPost";
import useFetchPost from "./useFetchPost";

/** 2023/05/01 - 게시글 관련 훅들 - by 1-blue */
export const usePost = {
  /** 2023/06/02 - 게시글 가져오기 훅 - by 1-blue */
  useFetchPost,
  /** 2023/04/11 - 게시글 제거 훅 - by 1-blue */
  useDeletePost,
  /** 2023/04/08 - 게시글 업로드 훅 - by 1-blue */
  useUploadPost,
};
