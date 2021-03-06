import express from "express";
import { Op, Sequelize } from "sequelize";

import db from "../models/index.js";

const { Photo, Post, Comment, User, Hashtag } = db;

const router = express.Router();

// 2022/07/03 - 게시글들 정보 불러오기 - by 1-blue
router.get("/", async (req, res, next) => {
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const posts = await Post.findAll({
      where,
      attributes: ["_id", "createdAt"],
      include: [
        // 게시글의 이미지들
        {
          model: Photo,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글들 ( 댓글과 답글 모두 포함 )
        {
          model: Comment,
          attributes: ["_id"],
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "PostLikers",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
      limit,
      order: [
        ["createdAt", "DESC"],
        [Photo, "_id", "ASC"],
      ],
    });

    const message =
      lastId === -1
        ? `최신 게시글 ${posts.length}개를 불러왔습니다.`
        : `추가로 게시글 ${posts.length}개를 불러왔습니다.`;

    res.json({ status: { status: { ok: true } }, data: { message, posts, limit } });
  } catch (error) {
    console.error("GET /post error >> ", error);
    return next(error);
  }
});

// 2022/07/03 - 게시글들 상세 정보 불러오기 - by 1-blue
router.get("/detail", async (req, res, next) => {
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const posts = await Post.findAll({
      where,
      limit,
      attributes: ["_id", "createdAt", "content", "UserId"],
      include: [
        // 게시글 작성자
        {
          model: User,
          attributes: ["_id", "name"],
          include: [
            // 게시글 작성자의 프로필 이미지
            {
              model: Photo,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
        // 게시글의 이미지들
        {
          model: Photo,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글들
        {
          model: Comment,
          attributes: ["_id"],
          separate: true,
          where: {
            RecommentId: { [Op.eq]: null },
          },
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "PostLikers",
          attributes: ["_id"],
          through: {
            attributes: ["createdAt"],
          },
        },
        // 게시글을 북마크하는 유저들
        {
          model: User,
          as: "PostBookmarks",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [Photo, "_id", "ASC"],
      ],
    });

    const message =
      lastId === -1
        ? `최신 게시글 ${posts.length}개를 불러왔습니다.`
        : `추가로 게시글 ${posts.length}개를 불러왔습니다.`;

    res.json({ status: { ok: true }, data: { message, posts, limit } });
  } catch (error) {
    console.error("GET /post/detail error >> ", error);
    return next(error);
  }
});

// 2022/07/03 - 특정 유저의 게시글들 정보 불러오기 - by 1-blue
router.get("/user/:UserId", async (req, res, next) => {
  const UserId = +req.params.UserId;
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const user = await User.findByPk(UserId);

    const posts = await user.getPosts({
      where,
      limit,
      order: [["createdAt", "DESC"]],
      attributes: ["_id", "content", "createdAt"],
      include: [
        // 게시글 작성자
        {
          model: User,
          attributes: ["_id", "name"],
          include: [
            // 게시글 작성자의 프로필 이미지
            {
              model: Photo,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
        // 게시글의 이미지들
        {
          model: Photo,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글들 ( 댓글과 답글 모두 포함 )
        {
          model: Comment,
          attributes: ["_id"],
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "PostLikers",
          attributes: ["_id"],
          through: {
            attributes: ["createdAt"],
          },
        },
      ],
    });

    const message =
      lastId === -1
        ? `${user.name}님의 게시글 ${posts.length}개를 불러왔습니다.`
        : `${user.name}님의 게시글을 추가로 ${posts.length}개를 불러왔습니다.`;

    res.json({ status: { ok: true }, data: { message, posts, limit } });
  } catch (error) {
    console.error("GET /post/user/:UserId error >> ", error);
    return next(error);
  }
});

// 2022/07/03 - 특정 유저의 게시글들 상세 정보 불러오기 - by 1-blue
router.get("/user/detail/:UserId", async (req, res, next) => {
  const UserId = +req.params.UserId;
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const user = await User.findByPk(UserId);

    const posts = await user.getPosts({
      where,
      limit,
      order: [["createdAt", "DESC"]],
      attributes: ["_id", "content", "createdAt"],
      include: [
        // 게시글 작성자
        {
          model: User,
          attributes: ["_id", "name"],
          include: [
            // 게시글 작성자의 프로필 이미지
            {
              model: Photo,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
        // 게시글의 이미지들
        {
          model: Photo,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글들
        {
          model: Comment,
          attributes: ["_id"],
          separate: true,
          where: {
            RecommentId: { [Op.eq]: null },
          },
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "PostLikers",
          attributes: ["_id"],
          through: {
            attributes: ["createdAt"],
          },
        },
        // 게시글을 북마크하는 유저들
        {
          model: User,
          as: "PostBookmarks",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const message =
      lastId === -1
        ? `${user.name}님의 게시글 ${posts.length}개를 불러왔습니다.`
        : `${user.name}님의 게시글을 추가로 ${posts.length}개를 불러왔습니다.`;

    res.json({ status: { ok: true }, data: { message, posts, limit } });
  } catch (error) {
    console.error("GET /post/user/detail/:UserId error >> ", error);
    return next(error);
  }
});

// 2022/07/03 - 해시태그의 게시글들 불러오기 - by 1-blue
router.get("/hashtag/:hashtagText", async (req, res, next) => {
  const hashtagText = decodeURI(req.params.hashtagText);
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    // 특정 해시태그 찾기
    const hashtag = await Hashtag.findOne({
      where: { content: hashtagText },
    });

    if (!hashtag)
      return res.status(200).json({
        status: { ok: true },
        message: "해시태그가 존재하지 않습니다.",
        limit,
        posts: [],
        postCount: 0,
        hashtag: hashtagText,
      });

    const postsOfHashtag = await hashtag.getPostHashtaged({
      where,
      limit,
      attributes: ["_id", "createdAt", "content", "UserId"],
      include: [
        // 게시글 작성자
        {
          model: User,
          attributes: ["_id", "name"],
          include: [
            // 게시글 작성자의 프로필 이미지
            {
              model: Photo,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
        // 게시글의 이미지들
        {
          model: Photo,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글들
        {
          model: Comment,
          attributes: ["_id"],
          separate: true,
          where: {
            RecommentId: { [Op.eq]: null },
          },
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "PostLikers",
          attributes: ["_id"],
          through: {
            attributes: ["createdAt"],
          },
        },
        // 게시글을 북마크하는 유저들
        {
          model: User,
          as: "PostBookmarks",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const postsOfHashtagCount = await hashtag.countPostHashtaged();

    const message =
      lastId === -1
        ? `#${hashtagText}인 게시글을 ${postsOfHashtag.length}개를 불러왔습니다.`
        : `#${hashtagText}인 게시글을 추가로 ${postsOfHashtag.length}개를 불러왔습니다.`;

    res.status(200).json({
      status: { ok: true },
      data: {
        message,
        limit,
        postCount: postsOfHashtagCount,
        posts: postsOfHashtag,
      },
    });
  } catch (error) {
    console.error("GET /post/hashtag/:hashtagText error >> ", error);
    return next(error);
  }
});

export default router;
