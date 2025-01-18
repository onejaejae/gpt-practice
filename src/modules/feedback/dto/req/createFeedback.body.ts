import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsUUID } from 'class-validator';
import { Feedback } from 'src/entities/feedback/feedback.entity';

export class CreateFeedbackBody {
  @IsUUID()
  chatHistoryId: string;

  @IsBoolean()
  isPositive: boolean;

  toEntity(): Feedback {
    return plainToInstance(Feedback, this);
  }
}
