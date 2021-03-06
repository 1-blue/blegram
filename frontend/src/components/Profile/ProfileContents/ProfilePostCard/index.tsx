import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// components
import PostCard from "@src/components/Post/PostCard";

// actions
import { postActions } from "@src/store/reducers";

// type
import type { RootState } from "@src/store/configureStore";

type Props = {
  id: number;
};

const ProfilePostCard = ({ id }: Props) => {
  const dispatch = useDispatch();
  const {
    detailPosts: posts,
    hasMoreDeatailPosts,
    loadPostsDetailOfUserLoading,
  } = useSelector(({ post }: RootState) => post);

  // 2022/01/17 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 400 &&
      hasMoreDeatailPosts &&
      !loadPostsDetailOfUserLoading
    ) {
      dispatch(
        postActions.loadPostsDetailOfUserRequest({
          UserId: id,
          lastId: posts?.[posts.length - 1]._id || -1,
          limit: 8,
        })
      );
    }
  }, [dispatch, posts, hasMoreDeatailPosts, loadPostsDetailOfUserLoading, id]);

  // 2022/01/17 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  return (
    <Wrapper>
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
          더 이상 불러올 게시글이 존재하지 않습니다...
        </span>
      )}
    </Wrapper>
  );
};

export default ProfilePostCard;
