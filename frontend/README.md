# π² blegram - νλ‘ νΈμλ
`Next.js` + `TypeScript`λ₯Ό μ΄μ©νκ³ , μν κ΄λ¦¬λ‘λ `Redux`μ `Redux-Saga`λ₯Ό μ¬μ©νκ³ , μ€νμΌμ `styled-components`λ₯Ό μ΄μ©ν΄μ μ²λ¦¬ν©λλ€.
λν λ°°ν¬λ `AWS-EC2`λ₯Ό μ΄μ©ν΄μ λ¬΄λ£λ‘ λ°°ν¬νμ΅λλ€.

<section align="center">
  <h2 style="text-align: center; margin: 0;">π οΈ μ¬μ© λΌμ΄λΈλ¬λ¦¬ π οΈ</h2>
  <img src="https://img.shields.io/badge/Next.js-818CF8?style=flat-square&logo=Next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/styledComponents-DB7093?style=flat-square&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" />
  <img src="https://img.shields.io/badge/ReduxSaga-999999?style=flat-square&logo=Redux-Saga&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white" />
  <img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />
</section>

<section align="center">
  <h2 style="text-align: center; margin: 0;">πββοΈ μ¬μ© ν΄ πββοΈ</h2>
  <a href="https://trello.com/b/AT4Z2NOe/blemarket">
    <img src="https://img.shields.io/badge/Trello-0052CC?style=flat-square&logo=Trello&logoColor=white" />
  </a>
  <a href="https://velog.io/@1-blue/series/blemarket">
    <img src="https://img.shields.io/badge/Velog-20C997?style=flat-square&logo=Velog&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white" />
  <a href="https://github.com/1-blue/blemarket">
    <img src="https://img.shields.io/badge/GitHub-609926?style=flat-square&logo=GitHub&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=flat-square&logo=Sourcetree&logoColor=white" />
  <img src="https://img.shields.io/badge/VsCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white" />
</section>

# π κ°μ΄λλΌμΈ
- μ’μμ± μ€μΉ
```bash
cd frontend
npm install

# npx κ°λ₯νλ€λ©΄ μ€μΉ μ ν΄λ λ¨
sudo npm install -g pm2
```

- `.env.development`, `.env.production` μμ±
```
NEXT_PUBLIC_SERVER_URL=<μμ±>
NEXT_PUBLIC_PHOTO_URL=<μμ±>
NEXT_PUBLIC_FRONT_URL=<μμ±>
```

- λΉλ
```bash
npm run build
```

- μ€ν
```bash
# κ°λ° μ
npm run dev

# λ°°ν¬ μ
pm2 start npm -- start
```