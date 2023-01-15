import {Controller, Get, HttpException, HttpStatus, Query, UseGuards} from '@nestjs/common';
import {SpendingService} from "../spending/spending.service";
import {ChartService} from "./chart.service";
import {getChartDataDto} from "./dto/chart.dto";
import {AuthGuard} from "../../../common/guards/auth.guard";
import {User} from "../../../common/decarators/user.decarator";


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
        const currentMonth = Number(queryParams.month ?? new Date().getMonth())

        const paramsForSearchSpending = {
            createdAt: {
                $gte: new Date(currentYear, currentMonth ? currentMonth : 1, 1),
                $lt: new Date(currentYear, currentMonth ? currentMonth : 12, 31)
            },
            userId,
            walletId: queryParams.walletId
        }
        const allHistory = await this.spendingService.getSpendingByParameters(paramsForSearchSpending);
        if (!allHistory) {
            throw new HttpException('userId not correct', HttpStatus.BAD_REQUEST);
        }
        if (queryParams.isMobile) {
            if (queryParams.typeChart === 'pie') {
                return {
                    chartData: await this.chartService.getChartDatasetForMobilePie(allHistory),
                    date: paramsForSearchSpending.createdAt.$lt
                }
            }
        } else {
            return await this.chartService.getChartDataset(allHistory)
        }
    }

}
