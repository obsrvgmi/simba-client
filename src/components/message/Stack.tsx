import React from "react";
import { Message } from "@/types/message.type";
import {
  System as SystemMessage,
  User as UserMessage,
} from "@/components/message";
import { PT_Mono as MonoFont } from "next/font/google";
import { twMerge } from "tailwind-merge";

const font = MonoFont({
  subsets: ["latin"],
  weight: "400",
});

const Stack: React.FC<{ stack: Message[] }> = ({ stack }) => {
  return (
    <div
      className={twMerge(
        "flex-1 overflow-y-auto space-y-2 mb-4",
        font.className
      )}
    >
      {stack.map((message, index) => (
        <div key={index}>
          {message.user !== "user" ? (
            <SystemMessage message={message.text} />
          ) : (
            <UserMessage message={message.text} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stack;
