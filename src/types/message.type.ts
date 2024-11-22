export type Message = {
  user: string;
  text: string;
  action?: string;
};

export interface MessageRequest {
  text: string;
  roomId: string;
  userId: string;
  userName?: string;
  name?: string;
}

export interface ImageRequest {
  prompt: string;
}
