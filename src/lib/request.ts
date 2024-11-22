import { stringToUuid } from "@/lib/string";
import type { MessageRequest, ImageRequest } from "@/types/message.type";
import { generateMessageResponse } from "@ai16z/eliza";

export class ApiClient {
  private baseUrl: string;
  private agentId: string;

  constructor(name: string) {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    this.agentId = stringToUuid(name);
  }

  private getEndpointUrl(endpoint: string): URL {
    return new URL(`/${this.agentId}/${endpoint}`, this.baseUrl);
  }

  async transcribeAudio(audioFile: File) {
    const formData = new FormData();
    formData.append("file", audioFile);

    const response = await fetch(this.getEndpointUrl("whisper").toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`);
    }

    return response.json();
  }

  async sendMessage(messageData: MessageRequest) {
    const response = await fetch(this.getEndpointUrl("message").toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error(`Message failed: ${response.statusText}`);
    }

    return response.json();
  }

  async generateImage(imageData: ImageRequest) {
    const response = await fetch(this.getEndpointUrl("image").toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) {
      throw new Error(`Image generation failed: ${response.statusText}`);
    }

    return response.json();
  }
}
