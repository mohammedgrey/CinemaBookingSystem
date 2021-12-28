//@ts-nocheck
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import roles, { role } from '../../config/roles';
import user from '../../interfaces/user';
import { postUser, updateUser } from '../../requests/users';
import AutoForm from '../generic/AutoForm';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { validatePassword } from '../../hooks/logic/useForm';
import useGenericModal from '../../hooks/popup/useGenericModal';
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

interface UserAddEditProps {
  user?: user;
  refetchUsers: any;
}

const UserAddEdit: React.FC<UserAddEditProps> = ({ user, refetchUsers }) => {
  //Styless
  const classes = useStyles();

  //States
  const [userEditAddFailedText, setUserEditAddFailedText] = React.useState<string>('');

  //For the role Field
  const [selectedRole, setSelectedRole] = React.useState<role | ''>(user ? user.role : '');

  //For password field
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [selectedPassword, setSelectedPassword] = React.useState('');
  const handleClickShowPassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };

  const { closeGenericModal } = useGenericModal();

  return (
    <Box sx={{ padding: '16px' }}>
      <AutoForm
        initialFieldValues={
          user
            ? {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              }
            : undefined
        }
        IWantTwoFieldsAtEachLine
        onSubmitHandler={async (data: any) => {
          console.log('updating');

          if (
            //if editing and password field is not empty and not valid
            (user && selectedPassword !== '' && !validatePassword(selectedPassword)) || ///or
            //if adding and password field is not valid
            (!user && !validatePassword(selectedPassword))
          ) {
            console.log('updating2');

            setUserEditAddFailedText(
              'Passwords should be more than 8 characters, and should contain at least 1 digit and 1 letter.'
            );
            return;
          }

          try {
            if (user) {
              if (selectedPassword !== '') data = { ...data, password: selectedPassword, role: selectedRole };
              else data = { ...data, role: selectedRole };

              const _ = await updateUser({ data, id: user._id });
            } else {
              data = { ...data, password: selectedPassword, role: selectedRole };
              const _ = await postUser(data);
            }
            refetchUsers();
            closeGenericModal();
          } catch (err: any) {
            setUserEditAddFailedText(err?.response?.data?.message ?? `${user ? 'Adding' : 'Updating'} User Failed!`);
          }
        }}
        submitButtonText={user ? 'Edit User' : 'Add User'}
        fullWidthsubmitButton
        fields={['firstName', 'lastName', 'username', 'email']}
        extraContent={
          <div>
            <Box pb={2}>
              <TextField
                fullWidth
                onChange={(e) => setSelectedPassword(e.target.value)}
                value={selectedPassword}
                placeholder={user ? 'Password (leave it blank if you do not want to update it)' : 'Password'}
                className={classes.textField}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                          event.preventDefault();
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.rootTextField,
                  },
                }}
              />
            </Box>

            <FormControl fullWidth sx={{ paddingInline: '8px' }}>
              <InputLabel>Role</InputLabel>
              <Select
                required
                fullWidth
                sx={{ marginBlockEnd: '16px', textTransform: 'capitalize' }}
                variant="standard"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as role)}
              >
                {[roles.CUSTOMER, roles.MANAGER, roles.ADMIN].map((role) => {
                  return (
                    <MenuItem sx={{ textTransform: 'capitalize' }} key={role} value={role}>
                      {role}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {Boolean(userEditAddFailedText) && (
              <Typography color="error" align="center" p={2}>
                {userEditAddFailedText}
              </Typography>
            )}
          </div>
        }
      />
    </Box>
  );
};
export default UserAddEdit;
