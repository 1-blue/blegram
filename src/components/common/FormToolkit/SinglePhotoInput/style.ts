import styled from "styled-components";

// type
import type { Props } from ".";
interface StyledProps extends Pick<Props, "width" | "height"> {}

/** 2023/04/02 - 단일 이미지 입력받는 인풋 스타일 - by 1-blue */
const StyledSinglePhotoInput = styled.button<StyledProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  position: relative;

  padding: 0.3em;

  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.bgGray};

  overflow: hidden;

  &:hover > div {
    display: inline-block;
  }

  /** preview || 이미지 */
  & > figure {
    position: relative;
    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.gray400};

    border-radius: 50%;

    & > img {
      position: absolute;
      inset: 0;

      width: 100%;
      height: 100%;

      border-radius: 50%;
    }
  }

  /** hover 시 보여줄 전경 */
  & > div {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;

    display: none;

    & > svg {
      position: absolute;
      inset: 50%;

      transform: translate(-50%, -50%);
    }
  }
`;

/** 2023/04/02 - 이미지 업로드 확인 모달 - by 1-blue */
const StyledConfirmModal = styled.section`
  position: fixed;
  bottom: 10vh;
  margin: 0 auto;
  padding: 0.6em;
  z-index: 3;

  border-radius: 0.3em;

  color: ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme }) => theme.colors.fg};

  animation: ${({ theme }) => theme.animation.fadeUp} 1s;

  /** 프로필 이미지 수정/취소 버튼 */
  & > button[type="button"] {
    padding: 0.5em 0.8em;

    font-size: 1rem;
    font-weight: 800;

    border-radius: 0.4em;
    color: ${({ theme }) => theme.colors.bg};

    transition: all 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.fg};
      background-color: ${({ theme }) => theme.colors.bg};
    }
  }
`;

export default StyledSinglePhotoInput;

export { StyledConfirmModal };
