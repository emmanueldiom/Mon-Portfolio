import { Body, Controller, Post } from '@nestjs/common';
import { ContactDto } from './contact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createMessage(@Body() data: ContactDto) {
    await this.contactService.createMessage(data);
    return { message: 'Votre message a bien été envoyé.' };
  }
}
