import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsUUID } from 'class-validator';
import { Feedback } from 'src/entities/feedback/feedback.entity';
import { FeedBackStatus } from 'src/entities/feedback/feedback.interface';

export class CreateFeedbackBody {
  @IsUUID()
  chatHistoryId: string;

  @IsEnum(FeedBackStatus)
  status: FeedBackStatus;

  @IsBoolean()
  isPositive: boolean;

  toEntity(): Feedback {
    return plainToInstance(Feedback, this);
  }
}
