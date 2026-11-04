import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  getPortfolio() {
    return Promise.all([
      this.prisma.skillCategory.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { skills: { orderBy: { proficiency: 'desc' } } },
      }),
      this.prisma.project.findMany({ where: { featured: true }, orderBy: { sortOrder: 'asc' } }),
    ]).then(([skills, projects]) => ({ skills, projects }));
  }
}
