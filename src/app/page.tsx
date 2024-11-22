"use client";

import React, { useState } from "react";
import UserInput from "@/components/UserInput";
import { Message, ImageRequest } from "@/types/message.type";
import Stack from "@/components/message/Stack";
import { stringToUuid } from "@/lib/string";
import { ApiClient } from "@/lib/request";

const Page = () => {
  const [messageStack, setMessageStack] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const apiClient = new ApiClient("Eliza");
  
  const handleSubmit = async (message: Message) => {
    setLoading(true);
    setMessageStack((prev) => [...prev, message]);

    try {
      const response = await apiClient.sendMessage({
        text: message.text,
        userId: "user",
        roomId: `default-room-${stringToUuid("Eliza")}`,
      });
      
      setMessageStack((prev) => [...prev, ...response]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      // Handle audio files
      if (file.type.startsWith('audio/')) {
        const transcription = await apiClient.transcribeAudio(file);
        setMessageStack((prev) => [...prev, { 
          user: "user", 
          text: transcription.text 
        }]);
        
        // Send transcribed message to get response
        const response = await apiClient.sendMessage({
          text: transcription.text,
          userId: "user",
          roomId: `default-room-${stringToUuid("Eliza")}`,
        });
        setMessageStack((prev) => [...prev, ...response]);
      }
    } catch (error) {
      console.error("File upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageGeneration = async (prompt: string) => {
    setLoading(true);
    const userMessage = { user: "user", text: prompt };
    setMessageStack((prev) => [...prev, userMessage]);

    try {
      const imageData: ImageRequest = {
        prompt,
      };
      
      const response = await apiClient.generateImage(imageData);
      setMessageStack((prev) => [...prev, ...response]);
    } catch (error) {
      console.error("Image generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="flex flex-col h-full relative p-4">
        <h1 className="text-2xl font-bold mb-4">AI Moshaikh</h1>
        <Stack stack={messageStack} />
        <div className="sticky bottom-0 bg-white pb-4">
          <UserInput
            onSend={(message) =>
              handleSubmit({ user: "user", text: message })
            }
            className="w-full"
            onFileUpload={handleFileUpload}
          />
        </div>
      </section>
    </main>
  );
};

export default Page;
