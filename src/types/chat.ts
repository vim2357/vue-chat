export interface Message {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
  isOwn: boolean;
  reactions?: Reaction[];
}

export interface Reaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface ChatState {
  messages: Message[];
  currentUser: string;
  isTyping: boolean;
  filter: FilterType;
  theme: 'light' | 'dark'; // НОВОЕ: тема
}

export type FilterType = 'all' | 'own' | 'others';

export interface ChatStatistics {
  total: number;
  ownMessages: number;
  othersMessages: number;
  averageLength: number;
  mostActiveUser: string;
}

export interface ActionLog {
  id: number;
  action: string;
  timestamp: Date;
  details: string;
}