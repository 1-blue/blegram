import { useInfiniteQuery } from "react-query";

// api
import { apiServiceComments } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { ApiFetchCommentsResponse } from "@src/types/api";
interface Props {
  postIdx: number;
  take: number;
  lastIdx?: number;
}

/** 2023/04/19 - 댓글들을 얻는 훅 - by 1-blue ( 2023/04/10 ) */
const useComments = ({ postIdx, take, lastIdx = -1 }: Props) => {
  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ApiFetchCommentsResponse>(
      [queryKeys.comment, postIdx],
      ({ pageParam = lastIdx }) =>
        apiServiceComments.apiFetchComments({
          postIdx,
          take,
          lastIdx: pageParam,
        }),
      {
        getNextPageParam: (lastPage, allPage) => {
          if (!lastPage.comments) return null;

          if (lastPage.comments.length < take) return null;
          else return lastPage.comments[lastPage.comments.length - 1].idx;
        },
      }
    );

  return { data, fetchNextPage, hasNextPage };
};

export default useComments;
