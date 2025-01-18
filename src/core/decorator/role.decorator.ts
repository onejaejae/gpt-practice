import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entities/user/user.interface';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
