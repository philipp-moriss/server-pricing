import { readFile } from 'fs';
import { join } from 'path';
import { WalletModel } from '../wallet/wallet.model';
import { UserModel } from '../user/user.model';

export async function readDB(whatRead: 'wallet' | 'user') {
  let path: string;
  if (whatRead === 'wallet') {
    path = join(__dirname, 'wallet.mock.json');
  } else {
    path = join(__dirname, 'user.mock.json');
  }
  const result = await new Promise((resolve, reject) => {
    readFile(path, (error, data) => {
      if (error) {
        resolve(null);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resolve(JSON.parse(data));
      }
    });
  });
  return result;
}
