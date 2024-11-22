import React from "react";
import { twMerge } from "tailwind-merge";

interface MessageProps {
  children: React.ReactNode;
  className?: string;
}

const MessageWrapper = ({ children, className }: MessageProps) => {
  return (
    <div
      className={twMerge("p-2 px-4 bg-gray-100 rounded-md border-2", className)}
    >
      {children}
    </div>
  );
};

export default MessageWrapper;
