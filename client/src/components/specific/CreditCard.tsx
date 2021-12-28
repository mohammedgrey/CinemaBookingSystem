import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from 'react';
import CardOutline from 'react-credit-cards';
import React from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import {
  formDataTypeCreditCard,
  formErrorTypeCreditCard,
  formValidationTextTypeCreditCard,
} from '../../interfaces/creditCard';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../../utils/paymentHandler';
import reservation from '../../interfaces/reservation';
import { postReservation } from '../../requests/reservations';
import useGenericModal from '../../hooks/popup/useGenericModal';
import { useHistory } from 'react-router-dom';
import useNotification from '../../hooks/popup/useNotification';
import SubmitButton from '../generic/SubmitButton';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    inputRoot: {
      marginInline: 'auto',
      display: 'block',
    },
    rootTextField: {
      borderRadius: '30px',
    },
    formContainer: {
      width: '290px',
      maxWidth: '95%',
      marginInline: 'auto',
    },
    btn: {
      width: '100%',
    },
    label: {
      fontWeight: 900,
      marginBlock: theme.spacing(1),
    },
  })
);

type formKeyType = 'number' | 'name' | 'expiry' | 'cvc';

const CreditCard: React.FC<any> = ({ reservedSeats, movie, user, refetchMovieReservations, setReservedSeats }) => {
  const [reservationFailedText, setReservationFailedText] = React.useState<string>('');
  const { closeGenericModal } = useGenericModal();
  const { notify } = useNotification();
  const [submittingForm, setSubmittingForm] = React.useState(false);
  const history = useHistory();
  const fieldsText: any = {
    label: {
      number: 'Card Number',
      name: 'Name on Card',
      expiry: 'Expiration',
      cvc: 'CVC',
    },
    placeholder: {
      number: 'E.g.: 49..., 51..., 36..., 37...',
      name: 'E.g. John Doe',
      expiry: 'mm/yy',
      cvc: '1234',
    },
  };
  //A) Credit card States
  const [formData, setFormData] = useState<formDataTypeCreditCard>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [formError, setFormError] = useState<formErrorTypeCreditCard>({
    number: false,
    name: false,
    expiry: false,
    cvc: false,
  });

  const [formValidationText, setFormValidationText] = useState<formValidationTextTypeCreditCard>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const [issuer, setIssuer] = useState<string>('');

  //A.b) Credit card functions
  const validateFields = (onlyEraseError?: boolean) => {
    //if onlyEraseError is true then it only checks if the field went from being an error to being valid
    //the onlyEraseError is used with every input change
    const validNumber = /[\d| ]{16,22}/.test(`${formData.number}`);
    setFormError((prev: formErrorTypeCreditCard) => ({
      ...prev,
      number: onlyEraseError ? (validNumber ? false : prev.number) : !validNumber,
    }));
    const validExpiry = /^(0\d|1[0-2])\/\d{2}$/.test(`${formData.expiry}`);
    setFormError((prev: formErrorTypeCreditCard) => ({
      ...prev,
      expiry: onlyEraseError ? (validExpiry ? false : prev.expiry) : !validExpiry,
    }));
    const validCvc = /\d{3,4}/.test(`${formData.cvc}`);
    setFormError((prev: formErrorTypeCreditCard) => ({
      ...prev,
      cvc: onlyEraseError ? (validCvc ? false : prev.cvc) : !validCvc,
    }));

    const validName = formData.name.length >= 3;
    setFormError((prev: formErrorTypeCreditCard) => ({
      ...prev,
      name: onlyEraseError ? (validName ? false : prev.name) : !validName,
    }));

    return (
      validNumber && //test number
      validExpiry && //validate expiry
      validCvc //validate cvc
    );
  };

  const classes = useStyles();
  const [focused, setFocused] = useState<any | undefined>();

  // const formRef = useRef<HTMLFormElement>(null);

  // const handleCallback = ({ issuer }: any, isValid: boolean) => {
  const handleCallback = ({ issuer }: any, _: boolean) => {
    setIssuer(issuer);
  };

  const handleInputFocus = ({ target: { name } }: React.FocusEvent<HTMLInputElement>) => {
    setFocused(name as any);
  };

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    } else if (target.name === 'name') {
      //
    }

    setFormData({ ...formData, [target.name]: target.value });
    validateFields(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const currentFormData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    if (validateFields()) {
      try {
        setSubmittingForm(true);
        const _ = await postReservation({
          reservedSeats,
          movie,
          user,
        });
        setReservedSeats([]);
        refetchMovieReservations();
        closeGenericModal();
        notify('Reservation made successfully');
      } catch (err: any) {
        setReservationFailedText(err?.response?.data?.message ?? 'Reservation Failed!');
      } finally {
        setSubmittingForm(false);
      }
    }
  };

  useEffect(() => {
    const validationText: any = {
      number: 'Please match the requested format.',
      name: 'Should at least be 3 characters.',
      expiry: 'Please match the requested format.',
      cvc: 'Should be at least 3 numbers and at most 4 numbers.',
    };
    Object.keys(formError).forEach((key: string) => {
      setFormValidationText((prev: formValidationTextTypeCreditCard) => ({
        ...prev,
        [key]: formError[key as formKeyType] ? validationText[key as string] : '',
      }));
    });
  }, [formError]);

  const fields = [
    {
      type: 'tel',
      name: 'number',
      placeholder: fieldsText.placeholder.number,
      label: fieldsText.label.number,
    },
    {
      type: 'text',
      name: 'name',
      placeholder: fieldsText.placeholder.name,
      label: fieldsText.label.name,
    },
    {
      type: 'tel',
      name: 'expiry',
      placeholder: fieldsText.placeholder.expiry,
      label: fieldsText.label.expiry,
    },
    {
      type: 'tel',
      name: 'cvc',
      placeholder: fieldsText.placeholder.cvc,
      label: fieldsText.label.cvc,
    },
  ];

  return (
    <div key="Payment">
      <Typography py="16px" px={{ xs: '16px', sm: '16px' }} align="center" fontWeight={700} variant="h6">
        Pay using your credit Card
      </Typography>

      <CardOutline
        number={formData.number}
        name={formData.name}
        expiry={formData.expiry}
        cvc={formData.cvc}
        focused={focused}
        callback={handleCallback}
      />
      <form onSubmit={handleSubmit}>
        <div className={classes.formContainer}>
          <Grid container justifyContent="center" spacing={2}>
            {fields.map((field: any, index: number) => {
              return (
                <Grid item xs={index < 2 ? 12 : 6} key={index}>
                  <Typography className={classes.label}>{field.label}</Typography>
                  <TextField
                    fullWidth
                    type={field.type}
                    name={field.name}
                    className={classes.inputRoot}
                    placeholder={field.placeholder}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={formError[field.name as formKeyType]}
                    helperText={formValidationText[field.name as formKeyType]}
                    InputProps={{
                      classes: {
                        root: classes.rootTextField,
                      },
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <input type="hidden" name="issuer" value={issuer} />
          {Boolean(reservationFailedText) && (
            <Typography color="error" align="center" p={2} pb={0}>
              {reservationFailedText}
            </Typography>
          )}
          <SubmitButton
            loading={submittingForm}
            sx={{ borderRadius: '20px', marginBlock: '16px' }}
            variant="contained"
            className={classes.btn}
          >
            Reserve
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
export default CreditCard;
