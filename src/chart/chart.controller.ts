import {Controller, Get, HttpException, HttpStatus, Query, UseGuards} from '@nestjs/common';
import {SpendingService} from "../spending/spending.service";
import {User} from "../decarators/user.decarator";
import {ChartService} from "./chart.service";
import {AuthGuard} from "../guards/auth.guard";
import {getChartDataDto} from "./dto/chart.dto";

@Controller('chart')
@UseGuards(AuthGuard)
export class ChartController {
    constructor(
        private spendingService: SpendingService,
        private chartService: ChartService,
    ) {
    }

    @Get('/getChartData')
    async getChartData(@User('_id') userId: string, @Query() queryParams: getChartDataDto) {

        const currentYear = Number(queryParams.year ?? new Date().getFullYear())

        const paramsForSearchSpending = {
            createdAt: {
                $gte: new Date(currentYear, 1, 1),
                $lt: new Date(currentYear, 12, 31)
            },
            userId,
            walletId: queryParams.walletId
        }
        const allHistory = await this.spendingService.getSpendingByParameters(paramsForSearchSpending);
        if (!allHistory) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        if (queryParams.isMobile) {
            if (queryParams.typeChart === 'line') {
                return await this.chartService.getChartDatasetForMobileLine(allHistory)
            }
            if (queryParams.typeChart === 'pie') {
                return await this.chartService.getChartDatasetForMobilePie(allHistory)
            }
        } else {
            return await this.chartService.getChartDataset(allHistory)
        }
    }

}
