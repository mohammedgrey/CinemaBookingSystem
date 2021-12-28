//interfaces

export interface formDataTypeCreditCard {
  number: string | number;
  name: string;
  expiry: string | number;
  cvc: string | number;
}
export interface formErrorTypeCreditCard {
  number: boolean;
  name: boolean;
  expiry: boolean;
  cvc: boolean;
}

export interface formValidationTextTypeCreditCard {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}
