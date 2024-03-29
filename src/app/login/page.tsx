import LogIn from "./LogIn";

// ssr
import { getMetadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const metadata: Metadata = getMetadata({
  title: "로그인",
  description: "로그인 페이지입니다.",
  url: "/login",
});

/** 2023/03/24 - 로그인 페이지 - by 1-blue */
const LogInPage = () => <LogIn />;

export default LogInPage;
