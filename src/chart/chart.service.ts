import {Injectable} from '@nestjs/common';
import {SpendingModel} from "../spending/spending.model";


type DatasetData = {
    x: string,
    y: string,
}

export type ChartDataset = {
    label: string,
    data: DatasetData[]
}
export type ChartDatasetMobile = {
    name: string,
    population: number,
    color: string,
    legendFontColor: string,
}

@Injectable()
export class ChartService {

    async getChartDataset(spendingArray: SpendingModel[]): Promise<ChartDataset[]> {
        const datasets = [];
        const transformToChartData = spendingArray.reduce((accState: { [key: string]: string }, currItem) => {
            const currCategoryKey = `${currItem.category}//${currItem.walletName}//${currItem.currency}//${currItem.walletId}`;
            const currMonth = currItem.createdAt.toLocaleString('default', {month: 'long'});
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
                data.push({x: dataKey, y: transformToChartData[transformToChartDataKey][dataKey]});
            }
            const splitKey = transformToChartDataKey.split('//')
            const label = `Category: ${splitKey[0]}, "${splitKey[2]}"`
            datasets.push({label: label, data: data});
        }

        return datasets
    }

    async getChartDatasetForMobile(spendingArray: SpendingModel[]): Promise<ChartDatasetMobile[]> {
        const generateColor = () => {
            const randomColor = Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0');
            return `#${randomColor}`;
        };
        const datasetsMobile = [];
        const transformToChartData = spendingArray.reduce((accState: { [key: string]: number }, currItem) => {
            const currCategoryKey = `${currItem.category}/${currItem.currency}`;
            const currMonth = currItem.createdAt.toLocaleString('default', {month: 'long'});
            if (!accState[currCategoryKey]) {
                accState[currCategoryKey] = 0
            }
            if (accState[currCategoryKey]) {
                accState[currCategoryKey] =
                    accState[currCategoryKey] + Number(currItem.amount);
            } else {
                accState[currCategoryKey] = Number(currItem.amount)
            }
            return accState;
        }, {});

        for (const transformToChartDataKey in transformToChartData) {
            const splitKey = transformToChartDataKey.split('/')
            const label = `${splitKey[0]}, "${splitKey[1]}"`
            datasetsMobile.push({
                label: label,
                population: transformToChartData[transformToChartDataKey],
                color: generateColor(),
                legendFontColor: generateColor()
            });
        }
        return datasetsMobile
    }

}
