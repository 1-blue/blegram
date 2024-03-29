// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchPostLikersResponse, ApiResponse } from "@src/types/api";

/** 2023/04/24 - 게시글에 좋아요를 누른 사람들 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiFetchPostLikersResponse | ApiResponse
> = async (req, res) => {
  try {
    // 게시글에 좋아요 누른 사람들 요청
    if (req.method === "GET") {
      const take = +(req.query.take as string);
      const lastIdx = +(req.query.lastIdx as string);
      const postIdx = +(req.query.postIdx as string);

      // 존재하지 않는 게시글에 요청
      const exPost = await prisma.post.findUnique({ where: { idx: +postIdx } });
      if (!exPost)
        return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

      const likers = await prisma.postLike.findMany({
        where: { postLikedIdx: postIdx },
        include: {
          postLiker: {
            select: {
              idx: true,
              nickname: true,
              avatar: true,
              name: true,
              // 로그인한 유저가 게시글 작성자를 팔로우했는지 판단
              followers: { where: { followingIdx: req.user?.idx || -1 } },
            },
          },
        },
        take,
        skip: lastIdx === -1 ? 0 : 1,
        ...(lastIdx !== -1 && {
          cursor: {
            postLikedIdx_postLikerIdx: {
              postLikedIdx: postIdx,
              postLikerIdx: lastIdx,
            },
          },
        }),
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json({
        message: "게시글에 좋아요를 누른 유저들을 가져왔습니다.",
        likers,
      });
    }
  } catch (error) {
    console.error("/api/likers/post error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["GET"],
  handler,
  isAuth: false,
});
