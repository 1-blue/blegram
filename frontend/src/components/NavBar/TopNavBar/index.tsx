import React, { useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";

// common-components
import Icon from "@src/components/common/Icon";
import Menu from "@src/components/common/Menu";

// components
import Left from "./Left";
import Center from "./Center";
import Right from "./Right";

// hook
import useToastMessage from "@src/hooks/useToastMessage";
import useScrollUpDown from "@src/hooks/useScrollUpDown";

// action
import { authActions, postActions } from "@src/store/reducers";

// type
import { ICON } from "@src/type";
import type { RootState } from "@src/store/configureStore";

const Wrapper = styled.nav<{ hide: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  box-shadow: 0 0 10px gray;
  background: white;
  transform: translateY(${({ hide }) => (hide ? "-100px" : "0px")});
  transition: all 0.4s;
`;

const TopNavigationBar = () => {
  const dispatch = useDispatch();
  const { logoutDone, logoutError } = useSelector(
    ({ auth }: RootState) => auth
  );
  const { me } = useSelector(({ user }: RootState) => user);
  const profileRef = useRef<HTMLAnchorElement | null>(null);
  const bookmarkRef = useRef<HTMLAnchorElement | null>(null);

  // 2022/05/18 - 로그아웃 요청 - by 1-blue
  const onClickLogout = useCallback(
    () => dispatch(authActions.localLogOutRequest()),
    [dispatch]
  );
  // 2022/05/18 - 로그아웃 성공/실패 메시지 및 페이지 이동 - by 1-blue
  useToastMessage({
    done: logoutDone,
    error: logoutError,
    go: "/login",
  });

  // 2022/05/18 - 프로필 메뉴창 관련 변수/메서드 - by 1-blue
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const onCloseMenu = useCallback(() => setIsOpenMenu(false), [setIsOpenMenu]);

  // 2022/05/19 - 게시글 생성 모달 클릭 - by 1-blue
  const onClickWritePostModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(postActions.openWritePostModal());
    },
    [dispatch]
  );

  // 2022/05/27 - 스크롤 방향 얻기 - by 1-blue
  const [hide] = useScrollUpDown();

  return (
    <Wrapper hide={hide}>
      <Left />
      <Center />
      <Right
        setIsOpenMenu={setIsOpenMenu}
        onClickWritePostModal={onClickWritePostModal}
      />

      {/* 프로필 메뉴 */}
      {isOpenMenu && (
        <Menu onCloseMenu={onCloseMenu} $profile>
          <>
            <li onClick={() => profileRef.current?.click()}>
              <Link href={`/profile/${me?._id}`}>
                <a ref={profileRef}>
                  <Icon icon={ICON.AVATAR} width={20} height={20} />
                  <span>프로필</span>
                </a>
              </Link>
            </li>
            <li onClick={() => bookmarkRef.current?.click()}>
              <Link href={`/profile/${me?._id}?kinds=bookmark`}>
                <a ref={bookmarkRef}>
                  <Icon icon={ICON.BOOKMARK} width={20} height={20} />
                  <span>저장됨</span>
                </a>
              </Link>
            </li>
            <li onClick={onClickLogout}>
              <Icon icon={ICON.LOGOUT} width={20} height={20} />
              <span>로그아웃</span>
            </li>
          </>
        </Menu>
      )}
    </Wrapper>
  );
};

export default TopNavigationBar;
