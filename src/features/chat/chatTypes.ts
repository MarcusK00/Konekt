export type Message = {
  id: string;
  text: string;
  senderId: string;
  createdAt: number;
  translations?: Record<string, string>; // e.g. { en: "Hello", it: "Ciao" }
};

