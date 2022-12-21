import {SpendingModel} from "../spending/spending.model";

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};

const transformToChartDataHandlerForChartPie = (spendingArray: SpendingModel[]) => {
    const transformToChartData = spendingArray.reduce((accState: { [key: string]: number }, currItem) => {
        const currCategoryKey = `${currItem.category}/${currItem.currency}`;
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
    return transformToChartData
}

const transformToChartDataHandlerForChartLine = (spendingArray: SpendingModel[]) => {
    const transformToChartData = spendingArray.reduce((accState: { [key: string]: string }, currItem) => {
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
    }, {});
    return transformToChartData
}


export {
    generateColor,
    transformToChartDataHandlerForChartPie,
    transformToChartDataHandlerForChartLine
}