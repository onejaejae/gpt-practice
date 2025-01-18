import { SetMetadata } from '@nestjs/common';
import { Union } from 'src/common/type/common.interface';

export const RESOURCE_TYPE_KEY = Symbol('RESOURCE_TYPE_KEY');

export const ResourceKey = (key: ResourceType) =>
  SetMetadata(RESOURCE_TYPE_KEY, key);

export const ResourceType = {
  Thread: 'THREAD',
  Feedback: 'FEEDBACK',
} as const;
export type ResourceType = Union<typeof ResourceType>;
