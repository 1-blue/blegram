import { useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// api
import { apiServiceBookmark } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiDeleteBookmarkRequest,
  ApiDeleteBookmarkResponse,
  ApiFetchPostResponse,
  ApiFetchPostsResponse,
} from "@src/types/api";

/** 2023/05/02 - 게시글에 북마크 제거 훅 - by 1-blue */
const useDeleteBookmark = (): UseMutateFunction<
  ApiDeleteBookmarkResponse,
  unknown,
  ApiDeleteBookmarkRequest,
  unknown
> => {
  const hashtag = useSearchParams()?.get("hashtag");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceBookmark.apiDeleteBookmark, {
    onSuccess(data, { postIdx }, context) {
      queryClient.setQueryData<InfiniteData<ApiFetchPostsResponse> | undefined>(
        hashtag ? [queryKeys.hashtag, hashtag] : [queryKeys.posts],
        (prev) =>
          prev && {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              posts:
                page.posts &&
                page.posts.map((post) => {
                  if (post.idx !== postIdx) return post;

                  return {
                    ...post,
                    bookMarkers: post.bookMarkers.filter(
                      (bookmarker) =>
                        bookmarker.bookmarkerIdx !== data.bookmarkerIdx
                    ),
                  };
                }),
            })),
          }
      );

      /** 단일 포스트 */
      queryClient.setQueryData<ApiFetchPostResponse | undefined>(
        [queryKeys.post, postIdx],
        (prev) =>
          prev && {
            ...prev,
            post: {
              ...prev.post,
              bookMarkers: prev.post.bookMarkers.filter(
                (bookmarker) => bookmarker.bookmarkerIdx !== data.bookmarkerIdx
              ),
            },
          }
      );

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useDeleteBookmark;
