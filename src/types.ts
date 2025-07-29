export interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "image";
  imageUrl?: string;
}