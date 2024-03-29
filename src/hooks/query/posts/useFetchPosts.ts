import { useInfiniteQuery } from "react-query";

// api
import { apiServicePosts } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type {
  ApiFetchPostsRequest,
  ApiFetchPostsResponse,
} from "@src/types/api";
interface Props extends ApiFetchPostsRequest {
  initialData?: ApiFetchPostsResponse;
}

/** 2023/04/08 - 게시글들을 얻는 훅 - by 1-blue */
const useFetchPosts = ({ take, lastIdx = -1, initialData }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ApiFetchPostsResponse>(
      [queryKeys.posts],
      ({ pageParam = lastIdx }) =>
        apiServicePosts.apiFetchPosts({ take, lastIdx: pageParam }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.posts?.length === take
            ? lastPage.posts[lastPage.posts.length - 1].idx
            : null,
        // ssr
        ...(initialData && {
          initialData: { pageParams: [], pages: [initialData] },
        }),
      }
    );

  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchPosts;
