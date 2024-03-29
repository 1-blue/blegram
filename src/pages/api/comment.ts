// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUploadCommentResponse,
  ApiUploadCommentRequest,
  ApiDeleteCommentResponse,
  ApiUpdateCommentRequest,
} from "@src/types/api";

/** 2023/04/18 - 댓글 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiUploadCommentResponse | ApiDeleteCommentResponse
> = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "로그인후에 접근해주세요!" });
  }

  try {
    // 댓글 업로드 요청
    if (req.method === "POST") {
      const { postIdx, content } = req.body as ApiUploadCommentRequest;

      // 존재하지 않는 게시글의 댓글들 요청
      const exPost = await prisma.post.findUnique({ where: { idx: +postIdx } });
      if (!exPost)
        return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

      const createdComment = await prisma.comment.create({
        data: {
          content,
          createdAt: new Date(),
          postIdx: +postIdx,
          userIdx: req.user.idx,
        },
        include: {
          user: {
            select: {
              idx: true,
              avatar: true,
              nickname: true,
            },
          },
          // 로그인한 댓글에 유저가 좋아요 눌렀는지 판단
          commentLikers: { where: { commentLikerIdx: req.user.idx } },
          _count: {
            select: {
              commentLikers: true,
            },
          },
        },
      });

      return res.status(201).json({
        message: "댓글을 업로드했습니다.",
        createdComment,
      });
    }
    // 댓글 수정 요청
    if (req.method === "PATCH") {
      const { commentIdx, content } = req.body as ApiUpdateCommentRequest;

      // 존재하지 않는 댓글에 수정 요청
      const exComment = await prisma.comment.findUnique({
        where: { idx: +commentIdx },
      });
      if (!exComment)
        return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

      await prisma.comment.update({
        where: { idx: +commentIdx },
        data: { content },
      });

      return res.status(200).json({ message: "댓글을 수정했습니다." });
    }
    // 댓글 제거 요청
    if (req.method === "DELETE") {
      const commentIdx = +(req.query.commentIdx as string);

      // 존재하지 않는 댓글에 삭제 요청
      const exComment = await prisma.comment.findUnique({
        where: { idx: commentIdx },
      });
      if (!exComment)
        return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

      await prisma.comment.delete({ where: { idx: commentIdx } });

      return res.status(200).json({ message: "댓글을 삭제했습니다." });
    }
  } catch (error) {
    console.error("/api/comment error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["POST", "PATCH", "DELETE"],
  handler,
  isAuth: true,
});
