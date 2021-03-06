import { axiosInstance } from ".";

// type
import type {
  LoadPostsBody,
  LoadPostsResponse,
  UploadPostBody,
  UploadPostResponse,
  LoadDetailPostsBody,
  LoadDetailPostsResponse,
  RemovePostBody,
  RemovePostResponse,
  LoadPostsOfHashtagBody,
  LoadPostsOfHashtagResponse,
  LoadPostsOfUserBody,
  LoadPostsOfUserResponse,
  LoadPostsDetailOfUserResponse,
  LoadPostsDetailOfUserBody,
} from "@src/store/types";

// 2022/05/07 - 모든 게시글들 요청 - by 1-blue
export const apiLoadPosts = ({ lastId, limit }: LoadPostsBody) =>
  axiosInstance.get<LoadPostsResponse>(
    `/posts?lastId=${lastId}&limit=${limit}`
  );

// 2022/05/19 - 게시글 생성 요청 - by 1-blue
export const apiUploadPost = (body: UploadPostBody) =>
  axiosInstance.post<UploadPostResponse>(`/post`, body);

// 2022/05/21 - 게시글들 상세 정보 요청 - by 1-blue
export const apiLoadDetailPosts = ({ lastId, limit }: LoadDetailPostsBody) =>
  axiosInstance.get<LoadDetailPostsResponse>(
    `/posts/detail?lastId=${lastId}&limit=${limit}`
  );

// 2022/05/21 - 특정 게시글 제거 요청 - by 1-blue
export const apiRemovePost = ({ PostId }: RemovePostBody) =>
  axiosInstance.delete<RemovePostResponse>(`/post/${PostId}`);

// 2022/05/25 - 특정 해시태그를 포함하는 게시글들 로드 요청 - by 1-blue
export const apiLoadPostsOfHashtag = ({
  hashtag,
  lastId,
  limit,
}: LoadPostsOfHashtagBody) =>
  axiosInstance.get<LoadPostsOfHashtagResponse>(
    `/posts/hashtag/${hashtag}?lastId=${lastId}&limit=${limit}`
  );

// 2022/05/26 - 특정 유저의 게시글들 정보 요청 - by 1-blue
export const apiLoadPostsOfUser = ({
  UserId,
  lastId,
  limit,
}: LoadPostsOfUserBody) =>
  axiosInstance.get<LoadPostsOfUserResponse>(
    `/posts/user/${UserId}?lastId=${lastId}&limit=${limit}`
  );

// 2022/05/26 - 특정 유저의 게시글들 상세 정보 요청 - by 1-blue
export const apiLoadPostsDetailOfUser = ({
  UserId,
  lastId,
  limit,
}: LoadPostsDetailOfUserBody) =>
  axiosInstance.get<LoadPostsDetailOfUserResponse>(
    `/posts/user/detail/${UserId}?lastId=${lastId}&limit=${limit}`
  );
