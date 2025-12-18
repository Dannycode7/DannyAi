
export type Theme = 'dark-red' | 'white-blue';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
}

export enum FeatureId {
  Manipulation = 'manipulation',
  Psychology = 'psychology',
  Stoicism = 'stoicism',
  Ethics = 'ethics'
}
