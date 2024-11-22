import React from "react";
import TypingAnimation from "../ui/typing-animation";
import MessageWrapper from "./MessageWrapper";

interface Props {
  message: string;
}

const System = ({ message }: Props) => {
  return (
    <MessageWrapper className="border-green-300">
      <TypingAnimation
        className="text-md text-start font-medium"
        text={message}
        duration={50}
      />
    </MessageWrapper>
  );
};

export default System;
