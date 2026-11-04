import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  createMessage(data: ContactDto) {
    return this.prisma.contactMessage.create({ data });
  }
}
