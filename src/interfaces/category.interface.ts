export interface Category {
  _id: string;
  name: string;
  description: string;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
