import {SpendingModel} from "../spending/spending.model";

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


export {
    transformToChartDataHandlerForChartPie,
}