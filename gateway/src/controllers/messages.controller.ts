import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, RequestClient } from 'src/infrastructure/auth/auth.guards';
import { MessagesService } from 'src/infrastructure/messages/messages.service';
import {
  CreateContentDto,
  SendMessageDto,
} from 'src/interfaces/messagesService.interface';
import { UserDto } from 'src/interfaces/usersService.interface';

@UseGuards(AuthGuard)
@Controller('message')
export class MessagesController {
  private readonly _logger: Logger;
  constructor(private readonly _messagesService: MessagesService) {
    this._logger = new Logger(MessagesController.name);
  }

  @Post('send')
  async sendMessage(
    @RequestClient() user: UserDto,
    @Body('room') room: number,
    @Body('contents') contents: CreateContentDto[],
  ) {
    try {
      const sendMessageDto = new SendMessageDto(user.id, room, contents);
      const message = await this._messagesService.sendMessage(sendMessageDto);
      if (!message) return new BadRequestException('Message not sended');
      return message;
    } catch (err) {
      this._logger.error(err);
      return err;
    }
  }
}
