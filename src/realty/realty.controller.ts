import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RealtyService } from './realty.service';
import { CreateRealtyDto } from './dto/create-realty.dto';
import { UpdateRealtyDto } from './dto/update-realty.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('realty')
export class RealtyController {
  constructor(private readonly realtyService: RealtyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/reserve/owner')
  async getOwnerReservations(@Request() req) {
    return await this.realtyService.getOwnerReservedRealty(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/reserve/client')
  async getClientReservations(@Request() req) {
    return await this.realtyService.getUserReservedRealty(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/reserve/owner/history')
  async getHistoryOfOwnerReservations(@Request() req) {
    return await this.realtyService.getOwnerReservationHistory(req.user);
    // return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/reserve/client/history')
  async getHistoryOfClientReservations(@Request() req) {
    return await this.realtyService.getClientReservationHistory(req.user);
    // return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/reserve/owner/statistics')
  async getStatisticsOfOwnerReservations(@Request() req) {
    return await this.realtyService.getRentingStatistics(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/reserve/:id')
  async reserveRealty(
    @Request() req,
    @Body() createReservation: CreateReservationDto,
    @Param('id') realtyId: string,
  ) {
    return await this.realtyService.reserveRealty(
      createReservation,
      +realtyId,
      req.user,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/reserve/:id')
  async removeFromReservations(@Request() req) {
    this.realtyService.removeReservingRealty();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy/id')
  async buyRealty(@Request() req) {
    this.realtyService.buyRealty();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/client/history')
  async getRealtyPurchasingListHistory(@Request() req) {
    this.realtyService.getMyPurchaseList();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/owner/history')
  async getRealtySoldListHistory(@Request() req) {
    this.realtyService.getMySellingList();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy/owner')
  async giveInfoToBuyer(@Request() req) {
    this.realtyService.giveInfoToBuyer();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy/client')
  async giveInfoToSeller(@Request() req) {
    this.realtyService.giveInfoToSeller();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/client')
  async getInfoFromSeller(@Request() req) {
    this.realtyService.getInfoFromSeller();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/owner')
  async getInfoFromBuyer(@Request() req) {
    this.realtyService.getInfoFromBuyer();
    return '';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getRealtyById(@Request() req, @Param('id') realtyId: string) {
    return await this.realtyService.findOne(+realtyId);
  }
}
