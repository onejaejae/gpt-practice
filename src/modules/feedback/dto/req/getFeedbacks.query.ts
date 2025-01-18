import { IsEnum, IsOptional } from 'class-validator';
import { PaginationRequest } from 'libs/common/pagination/pagination.request';
import { Union } from 'src/common/type/common.interface';
import { SortOption } from 'src/modules/chat/req/getChats.query';

export const FeedbackType = {
  Positive: 'positive',
  Negative: 'negative',
} as const;
export type FeedbackType = Union<typeof FeedbackType>;

export class GetFeedbacksQuery extends PaginationRequest {
  @IsOptional()
  @IsEnum(SortOption)
  sortOption: SortOption = SortOption.DESC;

  @IsOptional()
  @IsEnum(FeedbackType)
  feedbackType?: FeedbackType;
}
