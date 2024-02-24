interface IEmail {
  email: string;
}

export interface ISignUp extends IEmail {
  name: string;
  password: string;
  photo: string;
}

export interface ISignIn extends IEmail {
  password: string;
}

export interface IResetPassword extends IEmail {}
