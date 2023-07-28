export interface IUser {
    address: string;
    city: string;
    country: string;
    createdAt: string;
    email: string;
    firstname: string;
    img?: IImg;
    isAdmin: boolean;
    lastname: string;
    updatedAt: string;
    username: string;
    _id: string;
  }
  
  interface IImg {
    createdAt: string;
    public_id: string;
    updatedAt: string;
    url: string;
    _id: string;
  }

  export interface AccessDecodedToken {
    details?: {
        _id : string,
        username: string,
        firstname: string,
      },
      isAdmin?: boolean,
}
