# ๐ฒ blegram - ๋ฐฑ์๋
`Node.js`์ `express`๋ฅผ ์ด์ฉํ ์๋ฒ๋ฅผ ๊ตฌํํ์ต๋๋ค.

์ถ๊ฐ์ ์ผ๋ก `sequlize`๋ฅผ ์ด์ฉํด์ `DB`๋ฅผ ๊ด๋ฆฌํ๊ณ , `passport`๋ฅผ ์ด์ฉํด์ ์ธ์ฆ์ฒ๋ฆฌ๋ฅผ ํ๊ณ , `socket.io`๋ฅผ ์ด์ฉํด์ ์ฑํ์ฒ๋ฆฌ, `aws-s3`์ ์ด๋ฏธ์ง๋ฅผ ์๋ก๋ํฉ๋๋ค.

<section align="center">
  <h2 style="text-align: center; margin: 0;">๐ ๏ธ ์ฌ์ฉ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ๐ ๏ธ</h2>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=Passport&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white" />
    <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />
</section>


# ๐ ๊ฐ์ด๋ ๋ผ์ธ
- ์ข์์ฑ ์ค์น
```bash
npm install

# npx ๊ฐ๋ฅํ๋ค๋ฉด ์ค์น ์ ํด๋ ๋จ
npm install -g pm2
```

- `.env` ์์ฑ
```
NODE_ENV=<์์ฑ>
COOKIE_SECRET=<์์ฑ>
DATABASE_NAME=<์์ฑ>
DATABASE_USER_NAME=<์์ฑ>
DATABASE_PASSWORD=<์์ฑ>
DATABASE_HOST=<์์ฑ>
KAKAO_KEY=<์์ฑ>

BLEGRAM_AWS_REGION=<์์ฑ>
BLEGRAM_AWS_ACCESS_KEY=<์์ฑ>
BLEGRAM_AWS_SECRET_KEY=<์์ฑ>
```

- ์คํ
```bash
npm start
pm2 log
pm2 monit

# npx ๊ฐ๋ฅํ๋ค๋ฉด
npx pm2 start app.js
npx pm2 log
npx pm2 monit
```

# ๐ ๏ธ ๊ธฐ์  ์คํ
1. `express` ( `Node.js`๋ฅผ ์๋ฒ๋ก ์ฌ์ฉํ๊ธฐ ์ํด ์ด์ฉ )
2. `cors` ( `cors`๋ฅผ ๊ฐ๋จํ๊ฒ ํด๊ฒฐํ๊ธฐ ์ํด ์ฌ์ฉ )
3. `multer` ( `multipart/form-data`๋ฅผ ์ฒ๋ฆฌ ์ฆ, ์ด๋ฏธ์ง ์ฒ๋ฆฌ๋ฅผ ์ํด ์ฌ์ฉ )
4. `passport` ( local ๋ก๊ทธ์ธ ๋ฐ OAuth๋ฅผ ์ํด ์ฌ์ฉ ( kakao, naver, facebook ) )
5. `sequelize` ( `ORM`๋ฐฉ์์ผ๋ก `DB`๋ฅผ ์กฐ์ํ๊ธฐ ์ํด ์ฌ์ฉ )
6. `multer-s3`, `aws-sdk` ( `AWS-S3`๋ฅผ ์ด์ฉํด์ ์ ์  ์ด๋ฏธ์ง๋ฅผ ํธ์คํํ๊ธฐ ์ํด ์ฌ์ฉ )
7. `socket.io` ( 1 : 1 ์ฑํ ๊ตฌํ์ ์ํด ์ฌ์ฉ )

# ๐ passport ๋์ ๋ฐฉ์
+ local ์ ๋ต
  1. ํ๋ก ํธ์์ `id`, `pw`๋ฅผ ์ฒจ๋ถํด์ ์๋ฒ๋ก ๋ก๊ทธ์ธ ์์ฒญ ๋ณด๋
  2. ์๋ฒ์์ `id`์ `pw`๋ก ์ ํจ์ฑ ๊ฒ์ฌ
  3. ์ฑ๊ณต ์ ์๋ฒ์ ์ธ์์ ์ ์ ์ ์๋ณ์ ์ ์ฅ + ๋ธ๋ผ์ฐ์ ์๊ฒ ์ธ์์ ์๋ณ๊ฐ์ด ๋ด๊ธด ์ฟ ํค ์ ์ก ( `auth-blegram` )
  4. ์ดํ ์์ฒญ๋ง๋ค ๋ธ๋ผ์ฐ์ ์์ ์ฟ ํค๋ฅผ ๊ฐ์ด ๋ณด๋
  5. ์๋ ํฌ์ธํธ ๋ค์ด๊ฐ๊ธฐ ์ ์ ๋ฏธ๋ค์จ์ด๋ก ์ฟ ํค -> ์ธ์ -> ์ ์ ์ ์๋ณ์ ์์๋ก ์ฐพ์
  6. ์ ์ ์ ์๋ณ์๋ฅผ ์ด์ฉํด์ `DB`์์ ์ ์ฒด ์ ์  ์ ๋ณด๋ฅผ ์ฐพ๊ณ  `req.user`์ ๋ฃ์ด์ค
  7. `req.user`์ ์กด์ฌ๋ก ์ธํด์ `stateless`์ธ ์๋ฒ์์ ๋ก๊ทธ์ธ ์ ์ง๋ฅผ ํ  ์ ์๊ฒ ๋จ