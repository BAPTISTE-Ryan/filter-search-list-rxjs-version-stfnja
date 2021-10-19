interface IAddress {
  street: string;
  suitable: string;
  city: string;
  zipcode: string;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  address: IAddress;
  show: boolean;
}
