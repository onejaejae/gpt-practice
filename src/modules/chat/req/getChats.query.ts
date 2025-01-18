import { IsEnum, IsOptional } from 'class-validator';
import { PaginationRequest } from 'libs/common/pagination/pagination.request';
import { Union } from 'src/common/type/common.interface';

export const SortOption = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
export type SortOption = Union<typeof SortOption>;

export class GetChatsQuery extends PaginationRequest {
  @IsOptional()
  @IsEnum(SortOption)
  sortOption: SortOption = SortOption.DESC;
}
