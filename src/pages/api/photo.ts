// aws
import { getPresignedURL } from "@src/aws";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchPresignedURLResponse, ApiResponse } from "@src/types/api";

interface MyResponseType
  extends Partial<ApiFetchPresignedURLResponse>,
    ApiResponse {}

/** 2023/04/01 - 이미지 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<MyResponseType> = async (req, res) => {
  try {
    // "presignedURL" 요청
    if (req.method === "GET") {
      const name = req.query.name as string;

      const { preSignedURL } = await getPresignedURL({ name });

      return res
        .status(200)
        .json({ message: "presignedURL을 가져왔습니다.", preSignedURL });
    }
  } catch (error) {
    console.error("/api/photo error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["GET"],
  handler,
  isAuth: true,
});
