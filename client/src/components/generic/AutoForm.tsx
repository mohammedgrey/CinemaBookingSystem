import { Box, Grid, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { ReactNode, useState } from 'react';
import countries from '../../config/countries';
import icons from '../../config/icons';
import useForm from '../../hooks/logic/useForm';
import useCommonStyles from '../../styles/mui/common';
import React from 'react';
import SubmitButton from './SubmitButton';
import forms from '../../config/forms';
const useStyles = makeStyles((_: any) =>
  createStyles({
    textField: {},
    fieldsWrapper: {
      marginBlock: '10px 20px',
    },
    rootTextField: {
      borderRadius: '30px',
    },
  })
);

interface AutoFormProps {
  fields: Array<string>;
  onSubmitHandler: (data: any) => Promise<void>;
  submitButtonText: string;
  buttonAlign?: 'flex-start' | 'flex-end' | 'center';
  requiredAll?: boolean;
  IWantTwoFieldsAtEachLine?: boolean;
  extraContent?: ReactNode;
  fullWidthsubmitButton?: boolean;
  notOkayToSubmit?: boolean;
}

const AutoForm: React.FC<AutoFormProps> = ({
  fields,
  onSubmitHandler,
  submitButtonText,
  buttonAlign,
  requiredAll,
  IWantTwoFieldsAtEachLine,
  extraContent,
  fullWidthsubmitButton,
  notOkayToSubmit,
}) => {
  const classes = useStyles();
  const { form, error, handleFormSubmit, handleFormChange, validationErrorMessage, isSubmitingForm } = useForm(
    fields.map((field: string) => ({
      name: field,
      required: requiredAll,
    })),
    async (data: any) => {
      await onSubmitHandler(data);
    }
  );

  const [selectedDialCode, setSelectedDialCode] = useState('+20');

  const getFieldType = (field: string): string => {
    if ((field === 'password' || field === 'confirmPassword') && !showPassword) return 'password';
    if (field === 'email') return 'email';
    return 'text';
  };

  //For password fields
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  //end of for password fields

  //Classes
  const commonClasses = useCommonStyles();

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2} className={classes.fieldsWrapper}>
          {fields.map((field: string) => {
            return (
              <Grid item key={field} xs={12} sm={IWantTwoFieldsAtEachLine ? 6 : 12}>
                <TextField
                  fullWidth
                  name={field}
                  onChange={handleFormChange}
                  value={form[field]}
                  label={forms.fields[field]}
                  helperText={validationErrorMessage[field]}
                  error={error[field]}
                  className={classes.textField}
                  type={getFieldType(field)}
                  InputProps={{
                    // startAdornment:
                    //   field === "phone" ? (
                    //     <Select
                    //       variant="standard"
                    //       value={selectedDialCode}
                    //       onChange={(e) => setSelectedDialCode(e.target.value)}
                    //     >
                    //       {countries.map((country) => {
                    //         return (
                    //           <MenuItem value={country.dial_code}>
                    //             {`${country.flag} ${country.dial_code}`}
                    //           </MenuItem>
                    //         );
                    //       })}
                    //     </Select>
                    //   ) : null,
                    endAdornment:
                      field === 'password' || field === 'confirmPassword' ? (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <icons.visibilityOff /> : <icons.visibilityOn />}
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    classes: {
                      root: classes.rootTextField,
                    },
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        {extraContent}
        <Box justifyContent={buttonAlign ?? 'flex-start'} display="flex">
          <SubmitButton
            disabled={notOkayToSubmit}
            className={commonClasses.formButton}
            fullWidth={fullWidthsubmitButton ?? false}
            loading={isSubmitingForm}
          >
            {submitButtonText}
          </SubmitButton>
        </Box>
      </form>
    </>
  );
};
export default AutoForm;
