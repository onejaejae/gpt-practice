import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationRequest } from 'libs/common/pagination/pagination.request';
import { Union } from 'src/common/type/common.interface';
import { User } from 'src/entities/user/user.entity';

export const SortOption = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
export type SortOption = Union<typeof SortOption>;

export class GetChatsQuery extends PaginationRequest {
  @IsUUID()
  userId: User['id'];

  @IsOptional()
  @IsEnum(SortOption)
  sortOption: SortOption = SortOption.DESC;
}
