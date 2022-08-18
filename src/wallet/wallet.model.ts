import { SpendingModel } from '../spending/spending.model';

export class WalletModel {
  icon: string;
  name: string;
  balance: string;
  currency: string;
  totalSpends: number;
  myCategories: Array<ICategory>;
  history: Array<SpendingModel>;
}

export interface ICategory {
  _id: string;
  value: string;
}
