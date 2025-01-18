import { SetMetadata } from '@nestjs/common';
import { Union } from 'src/common/type/common.interface';

export const RESOURCE_TYPE_KEY = Symbol('RESOURCE_TYPE_KEY');

export const ResourceKey = (key: ResourceType) =>
  SetMetadata(RESOURCE_TYPE_KEY, key);

export const ResourceType = {
  Thread: 'THREAD',
  CreateFeedback: 'CREATE_FEEDBACK',
  GetFeedbacks: 'GET_FEEDBACKS',
} as const;
export type ResourceType = Union<typeof ResourceType>;
