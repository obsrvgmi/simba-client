import React, { useState } from "react";
import { SendHorizonal, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface Props {
  onSend: (message: string) => void;
  onFileUpload?: (file: File) => void;
  className?: string;
}

const UserInput: React.FC<Props> = ({ onSend, className, onFileUpload }) => {
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleSendClick = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className={twMerge("flex gap-x-2", className)}>
      <Label className="cursor-pointer p-2 hover:text-muted-foreground">
        <Paperclip className="h-5 w-5" />
        <input type="file" className="hidden" onChange={handleFileChange} />
      </Label>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        rows={1}
        style={{ minHeight: "40px", maxHeight: "200px" }}
      />
      <Button onClick={handleSendClick}>
        <SendHorizonal />
      </Button>
    </div>
  );
};

export default UserInput;
