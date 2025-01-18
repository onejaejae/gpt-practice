import { Union } from 'src/common/type/common.interface';

export const FeedBackStatus = {
  Pending: 'pending',
  Resolved: 'resolved',
} as const;
export type FeedBackStatus = Union<typeof FeedBackStatus>;
