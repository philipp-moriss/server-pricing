export class UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  avatarImg: string;
  permission: string;
  active: boolean;
  walletsId: Array<string>;
  email: string;
  passwordHash: string;
  createDate: string;
}
