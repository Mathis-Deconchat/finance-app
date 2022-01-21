import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { SpendingService } from './spending.service';
import { CreateSpendingDto } from './dto/create-spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) { }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Request() req, @Body() createSpendingDto: CreateSpendingDto) {
    return this.spendingService.create(req.user.id, createSpendingDto);
  }

  @Get()
  findAll() {
    return this.spendingService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.spendingService.findOne({ slug });
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateSpendingDto: UpdateSpendingDto) {
    return this.spendingService.update(slug, updateSpendingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spendingService.remove(+id);
  }
}
