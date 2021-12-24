const forms: any = {
  fields: {
    email: 'Email Address',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phone: 'Phone Number',
    message: 'Message',
    Comment: 'Comment',
    name: 'Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    address: 'Address',
    city: 'City',
    country: 'Country',
    oldPassword: 'Old Password',
    street: 'Street Name',
    building: 'Building Number',
    floor: 'Floor',
    apartment: 'Apartment',
  },
  validationErrorMessage: {
    email: 'Incorrect email format.',
    username: 'Should at least be 3 characters with no white spaces.',
    password: 'Should be at least 8 characters.',
    confirmPassword: 'Passwords do not match.',
    phone: 'Incorrect phone number',
    required: 'This field is required.',
    name: 'Should at least be 3 characters with no white spaces.',
    firstName: 'Should at least be 3 characters with no white spaces.',
    lastName: 'Should at least be 3 characters with no white spaces.',
    address: '',
    city: '',
    country: 'This field is required.',
    oldPassword: 'Should be at least 8 characters.',
    street: 'This field is required.',
    building: 'This field is required.',
    floor: 'This field is required.',
    apartment: 'This field is required.',
  },
  questions: {
    forgotPassword: 'Forgot your password?',
    noAccountYet: "Don't have an account yet?",
  },
};

export default forms;
