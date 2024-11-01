"use client";

import { Box, styled } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

import CommonButton from "@/app/_components/common/Button";
import PasswordInput from "@/app/_components/common/PasswordInput";
import TextInput from "@/app/_components/common/TextInput";
import logo from "@/assets/logo/main-logo.png";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onChangeInput = (value: string, type: "id" | "pw") => {
    if (type === "id") {
      setId(value);
      return;
    }
    if (type === "pw") {
      setPw(value);
      return;
    }
  };

  const handleLogin = () => {
    console.log(id, pw);
    if (id === "") {
      return toast.error("아이디를 입력해주세요");
    }
  };
  return (
    <Wrapper>
      <TopContent>
        <LogoImg src={logo.src} alt="logo" />

        <Inputs>
          <TextInput
            lable="아이디"
            value={id}
            helperText="아이디를 입력해주세요."
            onChange={(value: string) => onChangeInput(value, "id")}
          />
          <PasswordInput
            lable="비밀번호"
            value={pw}
            helperText="비밀번호를 입력해주세요."
            onChange={(value: string) => onChangeInput(value, "pw")}
          />
        </Inputs>
      </TopContent>

      <Buttons>
        <CommonButton variant="contained" text="로그인" onClick={handleLogin} />
        <CommonButton
          variant="outlined"
          text="회원가입"
          onClick={handleLogin}
        />
      </Buttons>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "80px",
    width: "100%",
    display: "flex",
    maxWidth: "400px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };
});

const TopContent = styled(Box)(() => {
  return {
    gap: "48px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    "@media (max-width:448px)": {
      gap: "12vw",
    },
  };
});

const LogoImg = styled("img")(() => {
  return {
    width: "100%",
  };
});

const Inputs = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",

    "@media (max-width:448px)": {
      gap: "3vw",
    },
  };
});

const Buttons = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "@media (max-width:448px)": {
      gap: "3vw",
    },
  };
});
