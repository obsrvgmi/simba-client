import React from "react";
import MessageWrapper from "./MessageWrapper";

interface Props {
  message: string;
}

const User = ({ message }: Props) => {
  return <MessageWrapper className="border-red-300">{message}</MessageWrapper>;
};

export default User;
