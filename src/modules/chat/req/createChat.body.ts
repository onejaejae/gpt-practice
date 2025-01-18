import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { GptModel } from 'src/core/gpt/gpt.interface';

export class CreateChatBody {
  @IsString()
  prompt: string;

  @IsOptional()
  @IsBoolean()
  isStreaming: boolean = false;

  @IsOptional()
  @IsEnum(GptModel)
  model: GptModel = GptModel.Gpt35_Turbo;
}
