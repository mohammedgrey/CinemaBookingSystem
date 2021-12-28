import { useState, useRef, useEffect } from 'react';
import forms from '../../config/forms';
interface inputObj {
  name: string;

  //returns true if there is an error and false if the check is ok
  //optional: if not provided a valid check for the type is used or an empty check for rare types
  errorCallback?: (value: any) => boolean;
  required?: boolean;
  validationErrorMessage?: string;
}

//Takes in an array of objects each obj has a name and callback error function
// and returns form obj, error obj, handle submit function, and handle form change function
// RESTRICTION: input fields in the calling component of this hook should have name parameters equal to
// the value given here and value parameters equal to form[name] and onChange parameters equal to
// handleFormChange and they all must be wrapped inside a form that has a onSubmit equal to handleFormSubmit
const useForm = (
  keys: Array<inputObj>,
  onSubmitHandler: (data: any) => Promise<void>,
  excuteHandlerBySettingDataToNullOnError?: boolean
) => {
  const getInitialValues = () => {
    const formObj: any = {};
    const errorObj: any = {};
    const validationObj: any = {};
    for (const [_, value] of Object.entries(keys)) {
      formObj[value.name] = '';
      errorObj[value.name] = false;
      validationObj[value.name] = '';
    }
    return {
      form: formObj,
      error: errorObj,
      validationErrorMessage: validationObj,
    };
  };

  //for clean up
  const stillMounted = useRef(true);
  useEffect(() => {
    return () => {
      stillMounted.current = false;
    };
  }, []);

  //Error messages "Translation coupled"
  const errorMessages: any = forms.validationErrorMessage;
  //End of Error messages

  const initialValues = getInitialValues();
  const [form, setForm] = useState<any>(() => initialValues.form);
  const [error, setError] = useState<any>(() => initialValues.error);
  const [validationErrorMessage, setValidationErrorMessage] = useState<any>(() => initialValues.validationErrorMessage);
  const [isSubmitingForm, setIsSubmitingForm] = useState<boolean>(false);

  const invalidInput = (key: any, value: any, currentField: any): boolean => {
    const errorCallBack = currentField?.errorCallback;

    if (errorCallBack) return errorCallBack(value);

    if (theInputFieldIs(key, 'email')) return !validateEmail(value);
    if (theInputFieldIs(key, 'password')) return !validatePassword(value);
    if (theInputFieldIs(key, 'oldPassword')) return !validatePassword(value);
    if (theInputFieldIs(key, 'phone')) return !validatePhone(value);
    if (theInputFieldIs(key, 'name')) return !validateName(value);
    if (theInputFieldIs(key, 'firstName')) return !validateName(value);
    if (theInputFieldIs(key, 'lastName')) return !validateName(value);
    if (theInputFieldIs(key, 'username')) return !validateName(value);
    if (theInputFieldIs(key, 'confirmPassword')) return !validateConfirmPassword(value, form.password);
    //For rare fields
    if (currentField?.required) return value === '';
    return false;
  };

  const theInputFieldIs = (key: string, potentialKey: string) => {
    return JSON.stringify(key) === JSON.stringify(potentialKey);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    let okToSumbit = true;
    setError(initialValues.error);
    setValidationErrorMessage(initialValues.validationErrorMessage);

    for (const [key, value] of Object.entries(form)) {
      const currentField = keys.find((el: any) => el.name === key);
      if (invalidInput(key, value, currentField)) {
        setError((prevError: any) => {
          return { ...prevError, [key]: true };
        });
        setValidationErrorMessage((prevMessage: any) => {
          return {
            ...prevMessage,
            [key]: errorMessages[key] ?? (currentField?.required ? errorMessages.required : ''),
          };
        });
        okToSumbit = false;
      }
    }
    if (okToSumbit) {
      setIsSubmitingForm(true);
      await onSubmitHandler(form);
    } else {
      if (excuteHandlerBySettingDataToNullOnError) {
        setIsSubmitingForm(true);
        await onSubmitHandler(null);
      }
    }
    if (stillMounted.current) setIsSubmitingForm(false);
  };
  const handleFormChange = (e: any) => {
    setForm((prevForm: any) => {
      return { ...prevForm, [e.target.name]: e.target.value };
    });
    const currentField = keys.find((el: any) => el.name === e.target.name);
    if (!invalidInput(e.target.name, e.target.value, currentField)) {
      setError((prevError: any) => {
        return { ...prevError, [e.target.name]: false };
      });
      setValidationErrorMessage((prevMessage: any) => {
        return {
          ...prevMessage,
          [e.target.name]: '',
        };
      });
    }
  };

  return {
    form,
    error,
    handleFormSubmit,
    handleFormChange,
    validationErrorMessage,
    isSubmitingForm,
    setForm,
    setError,
  };
};
export default useForm;

//reference: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//Should be more than 8 chars and contain at least 1 char and 1 digit
export function validatePassword(password: string) {
  if (!password) return false;
  return Boolean(password.match('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{8,50}$'));
}

function validateConfirmPassword(confirmPassword: string, password: string) {
  return confirmPassword === password;
}

function validatePhone(phone: string) {
  return phone.length >= 11;
}
function validateName(name: string) {
  //name is at least 3 characters and doesn't have whitespace
  return name.length >= 3 && !(name.indexOf(' ') >= 0);
}
