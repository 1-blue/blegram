import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux + SSR
import wrapper from "@src/store/configureStore";
import { END } from "redux-saga";
import { axiosInstance } from "@src/store/api";

// common-components
import HeadInfo from "@src/components/common/HeadInfo";

// components
import PostCard from "@src/components/Post/PostCard";

// actions
import { postActions, userActions } from "@src/store/reducers";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import type { RootState } from "@src/store/configureStore";

const Explore: NextPage = () => {
  const dispatch = useDispatch();
  const {
    detailPosts: posts,
    hasMoreDeatailPosts,
    loadDetailPostsLoading,
  } = useSelector(({ post }: RootState) => post);

  // 2022/05/21 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 400 &&
      hasMoreDeatailPosts &&
      !loadDetailPostsLoading
    ) {
      if (!posts) {
        dispatch(
          postActions.loadDetailPostsRequest({
            lastId: 0,
            limit: 8,
          })
        );
      } else {
        dispatch(
          postActions.loadDetailPostsRequest({
            lastId: posts[posts.length - 1]._id,
            limit: 8,
          })
        );
      }
    }
  }, [dispatch, posts, hasMoreDeatailPosts, loadDetailPostsLoading]);

  // 2022/05/21 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  return (
    <>
      <HeadInfo
        title="blegram - 상세 게시글"
        description={`${posts[0].User.name}님의 게시글\n( 좋아요: ${posts[0].PostLikers.length}, 댓글: ${posts[0].Comments.length})\n\n${posts[0].content}`}
        photo={posts[0].Photos[0].name}
      />

      {/* 게시글들 ( 현재 기준은 페이지의 게시글 이후에 업로드된 게시글을 최신순으로 보여줌 ) */}
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {!hasMoreDeatailPosts && (
        <span
          style={{
            display: "block",
            textAlign: "center",
            margin: "40px 10px 80px",
            fontSize: "16px",
          }}
        >
          더 이상 불러올 게시글이 없습니다.
        </span>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) =>
      async ({ req, query }: GetServerSidePropsContext) => {
        let cookie = req?.headers?.cookie;
        cookie = cookie ? cookie : "";
        axiosInstance.defaults.headers.Cookie = cookie;

        store.dispatch(userActions.loadToMeRequest());
        store.dispatch(
          postActions.loadDetailPostsRequest({
            lastId: +query.postId! + 1,
            limit: 8,
          })
        );

        store.dispatch(END);
        await store.sagaTask?.toPromise();

        // axios의 쿠키 제거
        axiosInstance.defaults.headers.Cookie = "";

        return {
          props: {},
        };
      }
  );

export default Explore;
