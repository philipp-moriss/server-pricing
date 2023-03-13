import {SpendingModel} from "../../models/spending.model";
import {ReplenishmentModel} from "../../models/replenishment.model";


const transformToChartDataHandlerForChartPie = (spendingArray: SpendingModel[]) => {
    return spendingArray.reduce((accState: { [key: string]: string }, currItem) => {
        const currCategoryKey = currItem.category
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
    }, {})
}
export const sortWalletHistory = (operations: ReplenishmentModel[], sortField: string, isUpDirection: 'increasing' | 'decreasing'): ReplenishmentModel[] => {
    const isIncreasing = isUpDirection === 'increasing'
    return operations.sort((a, b) => {
        let ret: number
        if (sortField === 'categoryName') {
            if (a.category > b.category) {
                ret = -1
            } else if(a.category < b.category) {
                ret = 1
            }
            return isIncreasing ? ret : -ret   // !isIncreasing === убывание
        }
        if (sortField === 'sum') {
            if (Number(a.amount) > Number(b.amount)) {
                return isIncreasing  ? -1 : 1;
            }
            return isIncreasing  ? 1 : -1;
        }
        if (sortField === 'date') {
            if (a.date > b.date) {
                return isIncreasing ?  1 : -1
            }
            return isIncreasing ? -1 : 1
        }
        return 0;
    });
};
const checkIsInvalidDate = (date: Date): boolean => {
    return isNaN(Date.parse(date?.toDateString()))
}

export {
    transformToChartDataHandlerForChartPie,
    checkIsInvalidDate
}
