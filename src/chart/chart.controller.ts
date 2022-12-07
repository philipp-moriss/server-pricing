import {Controller, Get, HttpException, HttpStatus, Query, UseGuards} from '@nestjs/common';
import {SpendingService} from "../spending/spending.service";
import {User} from "../decarators/user.decarator";
import {ChartDataset, ChartService} from "./chart.service";
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
    async getChartData(@User('_id') userId: string, @Query() queryParams: getChartDataDto): Promise<ChartDataset[] | null> {

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
        const dataSetForChart = await this.chartService.getChartDataset(allHistory)
        return dataSetForChart
    }

}
