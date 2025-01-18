import { Union } from 'src/common/type/common.interface';

export const ChatHistoryRole = {
  User: 'user',
  Assistant: 'assistant',
  System: 'system',
} as const;
export type ChatHistoryRole = Union<typeof ChatHistoryRole>;
