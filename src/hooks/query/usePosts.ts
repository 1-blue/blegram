import { useInfiniteQuery } from "react-query";

// api
import { apiServicePosts } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { ApiFetchPostsResponse } from "@src/types/api";

/** 2023/04/08 - 게시글들을 얻는 훅 - by 1-blue ( 2023/04/10 ) */
const usePosts = ({ take }: { take: number }) => {
  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ApiFetchPostsResponse>(
      queryKeys.post,
      ({ pageParam = -1 }) =>
        apiServicePosts.apiFetchPosts({ take, lastIdx: pageParam }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.posts?.length === take
            ? lastPage.posts[lastPage.posts.length - 1].idx
            : null,
      }
    );

  return { data, fetchNextPage, hasNextPage };
};

export default usePosts;
