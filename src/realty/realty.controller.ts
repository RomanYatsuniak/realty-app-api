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
import { CreateInfoToBuyerDto } from './dto/create-info-to-buyer.dto';
import { CreateInfoToSellerDto } from './dto/create-info-to-seller.dto';

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
  async removeFromReservations(@Request() req, @Param('id') realtyId: string) {
    return await this.realtyService.removeReservingRealty(+realtyId, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy/:id')
  async buyRealty(@Request() req, @Param('id') realtyId: string) {
    return await this.realtyService.buyRealty(+realtyId, req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/client/history')
  async getRealtyPurchasingListHistory(@Request() req) {
    return await this.realtyService.getMyPurchaseList(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/owner/history')
  async getRealtySoldListHistory(@Request() req) {
    return await this.realtyService.getMySellingList(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy/owner/:id')
  async giveInfoToBuyer(
    @Request() req,
    @Param('id') saleId: string,
    @Body() infoToBuyerDto: CreateInfoToBuyerDto,
  ) {
    return await this.realtyService.giveInfoToBuyer(
      req.user,
      +saleId,
      infoToBuyerDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy/client/:id')
  async giveInfoToSeller(
    @Request() req,
    @Param('id') saleId: string,
    @Body() infoToSellerDto: CreateInfoToSellerDto,
  ) {
    return await this.realtyService.giveInfoToSeller(
      req.user,
      +saleId,
      infoToSellerDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/client/:id')
  async getInfoFromSeller(@Request() req, @Param('id') saleId: string) {
    return await this.realtyService.getInfoFromSeller(req.user, +saleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/buy/owner/:id')
  async getInfoFromBuyer(@Request() req, @Param('id') saleId: string) {
    return await this.realtyService.getInfoFromBuyer(req.user, +saleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getRealtyById(@Request() req, @Param('id') realtyId: string) {
    return await this.realtyService.findOne(+realtyId);
  }
}
