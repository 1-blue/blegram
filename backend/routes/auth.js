import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import axios from "axios";
import bcrypt from "bcrypt";

import db from "../models/index.js";
import { isLoggedIn, isNotLoggedIn } from "../middleware/index.js";

const router = express.Router();
const { User, Post, Photo } = db;

// 2022/07/03 - 로컬 로그인 - by 1-blue
router.post("/", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (error, user, message) => {
    // 서버측 에러 ( 조건검사 도중에 에러 )
    if (error) {
      console.error("POST /auth >> ", error);
      return res.status(500).json({
        status: { ok: false },
        data: { message: "서버에서 알 수 없는 에러가 발생했습니다. 잠시후에 다시 시도해주세요" },
      });
    }

    // 클라이언트측 에러 ( 아이디 or 비밀번호 불일치 )
    if (message) {
      console.error("message >> ", message);
      return res.status(403).json({ status: { ok: false }, data: { message } });
    }

    return req.login({ user }, async loginError => {
      if (loginError) {
        console.error("POST /user/login loginError >> ", loginError);
        return res.status(500).json({
          status: { ok: false },
          data: { message: "서버에서 알 수 없는 에러가 발생했습니다. 잠시후에 다시 시도해주세요" },
        });
      }

      // 유저와 유저와 관련된 정보까지 모아서 찾음
      const fullUser = await User.findOne({
        attributes: ["_id", "name"],
        where: { _id: user._id },
        include: [
          { model: Photo, attributes: ["_id", "name", "url"] },
          { model: Post, attributes: ["_id"] },
          { model: User, as: "Followers" },
          { model: User, as: "Followings" },
        ],
      });

      return res.status(200).json({
        status: { ok: true },
        data: { message: "로그인했습니다.\n메인 페이지로 이동됩니다.", user: fullUser },
      });
    });
  })(req, res, next);
});

// 카카오 로그인 ( 다음에 진행 )
// router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));
// router.get(
//   "/kakao/callback",
//   passport.authenticate("kakao", {
//     failureRedirect: "/",
//   }),
//   (req, res) => {
//     res.redirect("https://blegram.com");
//   },
// );

// 2022/07/03 - 로그아웃 - by 1-blue
router.delete("/", isLoggedIn, async (req, res, next) => {
  if (req.user.accessToken) {
    try {
      await axios.post("https://kapi.kakao.com/v1/user/unlink", null, {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
  req.logout();
  req.session.destroy();
  res
    .status(200)
    .clearCookie("blegram")
    .json({ status: { ok: true }, data: { message: `로그아웃했습니다.\n로그인 페이지로 이동됩니다.` } });
});

// 2022/07/03 - 회원가입 - by 1-blue
router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  const { id, password, name, email, phone, birthday, introduction, avatar } = req.body;

  try {
    const exUserByIdPromise = User.findOne({ where: { id } });
    const exUserByNamePromise = User.findOne({ where: { name } });

    const [{ value: exUserById }, { value: exUserByName }] = await Promise.allSettled([
      exUserByIdPromise,
      exUserByNamePromise,
    ]);

    if (exUserById)
      return res.status(409).json({
        status: { ok: false },
        data: { message: "이미 가입된 아이디입니다.\n다른 아이디로 다시 시도해주세요" },
      });
    if (exUserByName)
      return res.status(409).json({
        status: { ok: false },
        data: { message: "이미 사용중인 이름입니다.\n다른 이름으로 다시 시도해주세요" },
      });

    const hashedPassword = await bcrypt.hash(password, 6);

    const createdUser = await User.create({
      id,
      password: hashedPassword,
      name,
      email,
      phone,
      birthday,
      introduction,
    });

    await Photo.create({
      name: avatar,
      UserId: createdUser._id,
    });

    return res.status(200).json({
      status: { ok: true },
      data: { message: `${name}님 회원가입이 완료되었습니다.\n로그인페이지로 이동합니다.` },
    });
  } catch (error) {
    console.error("POST /user error >> ", error);
    return next(error);
  }
});

export default router;
