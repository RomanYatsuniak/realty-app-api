import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';

@Controller('realty')
export class RealtyController {
  constructor(private readonly realtyService: RealtyService) {}

  @Post()
  create(@Body() createRealtyDto: CreateRealtyDto) {
    return this.realtyService.create(createRealtyDto);
  }

  @Get()
  findAll() {
    return this.realtyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realtyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealtyDto: UpdateRealtyDto) {
    return this.realtyService.update(+id, updateRealtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realtyService.remove(+id);
  }
}
