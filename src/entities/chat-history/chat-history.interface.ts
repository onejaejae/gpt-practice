import { Union } from 'src/common/type/common.interface';

export const ChatHistoryRole = {
  User: 'user',
  Assistant: 'assistant',
} as const;
export type ChatHistoryRole = Union<typeof ChatHistoryRole>;
