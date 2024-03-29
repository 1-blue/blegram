// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiResponse, ApiFetchCommentsResponse } from "@src/types/api";

/** 2023/04/19 - 댓글들 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiFetchCommentsResponse | ApiResponse> = async (
  req,
  res
) => {
  try {
    // 특정 게시글의 댓글들 요청
    if (req.method === "GET") {
      const postIdx = +(req.query.postIdx as string);
      const take = +(req.query.take as string);
      const lastIdx = +(req.query.lastIdx as string);

      // 존재하지 않는 게시글의 댓글들 요청
      const exPost = await prisma.post.findUnique({ where: { idx: postIdx } });
      if (!exPost)
        return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

      const comments = await prisma.comment.findMany({
        where: { postIdx },
        take,
        skip: lastIdx === -1 ? 0 : 1,
        ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
        orderBy: { createdAt: "asc" },
        include: {
          user: {
            select: {
              idx: true,
              avatar: true,
              nickname: true,
            },
          },
          // 로그인한 댓글에 유저가 좋아요 눌렀는지 판단
          commentLikers: { where: { commentLikerIdx: req.user?.idx || -1 } },
          _count: {
            select: {
              commentLikers: true,
            },
          },
        },
      });

      return res.status(200).json({
        message: `댓글들을 ${comments.length}개 가져왔습니다.`,
        comments,
      });
    }
  } catch (error) {
    console.error("/api/comments error >> ", error);

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
