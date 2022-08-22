import { SpendingModel } from '../spending/spending.model';

export class WalletModel {
  _id: string;
  icon: string;
  name: string;
  balance: number;
  currency: string;
  totalSpends: number;
  myCategories: Array<ICategory>;
  history: Array<SpendingModel>;
}

export interface ICategory {
  _id: string;
  value: string;
}
