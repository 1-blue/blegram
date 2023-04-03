// component
import NavBar from "@src/layout/NavBar";

// router
import { getNavRouter } from "@src/router";

// hook
import useMe from "@src/hooks/query/useMe";

// style
import HeaderStyled from "./style";

/** 2023/03/23 - 헤더를 감싸는 컴포넌트 - by 1-blue */
const Header = () => {
  const { me } = useMe(true);

  return (
    <HeaderStyled>
      <NavBar routerElements={getNavRouter(me?.nickname)} />
    </HeaderStyled>
  );
};

export default Header;
