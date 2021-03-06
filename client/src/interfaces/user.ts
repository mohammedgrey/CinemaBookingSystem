export interface signupFields {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

export interface user {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  _id?: string;
  wishesToManage?: boolean;
}
export interface loginFields {
  email: string;
  password: string;
}
export interface updatePasswordFields {
  currentPassword: string;
  newPassword: string;
}
export interface updateUserData {
  id: string;
  data: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
  };
}
