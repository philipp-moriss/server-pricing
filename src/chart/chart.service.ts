import { Injectable } from '@nestjs/common';
import {SpendingModel} from "../spending/spending.model";


type DatasetData = {
    x : string,
    y : string,
}

export type ChartDataset = {
    label : string,
    data : DatasetData[]
}


@Injectable()
export class ChartService {

    async getChartDataset (spendingArray : SpendingModel[]) : Promise<ChartDataset[]> {
        const datasets = [];
        const transformToChartData = spendingArray.reduce((accState: { [key: string] : string}, currItem) => {
            const currCategoryKey = `${currItem.category}//${currItem.walletName}//${currItem.currency}//${currItem.walletId}`;
            const currMonth = currItem.createdAt.toLocaleString('default', { month: 'long' });
            if (!accState[currCategoryKey]) {
                accState[currCategoryKey] = <string>{};
            }
            if (accState[currCategoryKey][currMonth]) {
                accState[currCategoryKey][currMonth] =
                    accState[currCategoryKey][currMonth] + Number(currItem.amount);
            } else {
                accState[currCategoryKey][currMonth] = Number(currItem.amount);
            }
            return accState;
        }, {});

        for (const transformToChartDataKey in transformToChartData) {
            const data = [];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            for (const dataKey in transformToChartData[transformToChartDataKey]) {
                data.push({ x: dataKey, y: transformToChartData[transformToChartDataKey][dataKey] });
            }
            const splitKey = transformToChartDataKey.split('//')
            const label = `Category: ${splitKey[0]}, "${splitKey[2]}"`
            datasets.push({ label: label, data: data });
        }

        return datasets
    }

}
