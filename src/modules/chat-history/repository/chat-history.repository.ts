import { CustomRepository } from 'libs/common/typeorm.ex/typeorm-ex.decorator';
import { GenericTypeOrmRepository } from 'src/core/database/typeorm/generic-typeorm.repository';
import { ChatHistory } from 'src/entities/chat-history/chat-history.entity';

@CustomRepository(ChatHistory)
export class ChatHistoryRepository extends GenericTypeOrmRepository<ChatHistory> {}
