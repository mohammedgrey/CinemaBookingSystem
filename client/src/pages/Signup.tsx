import { AppRegistrationRounded, Email, HowToReg } from '@mui/icons-material';
import { Container, MenuItem, Select, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AutoForm from '../components/generic/AutoForm';
import roles, { role } from '../config/roles';
import useNotification from '../hooks/popup/useNotification';
import useUser from '../hooks/system/useUser';
import { signup } from '../requests/users';
interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const { setUserAndUserToken } = useUser();
  const { notify } = useNotification();
  const [selectedRole, setSelectedRole] = useState<role>(roles.CUSTOMER);
  return (
    <Container maxWidth="md">
      <Typography pt={2} my={2} variant="h6" fontWeight={700} align="center">
        <HowToReg color="primary" fontSize="large" sx={{ verticalAlign: 'middle', marginInlineEnd: '16px' }} />
        Sign up and become a member
      </Typography>
      <AutoForm
        IWantTwoFieldsAtEachLine
        onSubmitHandler={async (data: any) => {
          try {
            const res = await signup({ ...data, role: selectedRole });
            setUserAndUserToken(res.data.user, res.token);
          } catch (err: any) {
            console.log(err.response);
            notify(err?.response?.data?.message ?? 'Failed to sign up' + JSON.stringify(err), 'error');
          }
        }}
        submitButtonText="Register Now"
        fullWidthsubmitButton
        fields={['firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword']}
        extraContent={
          <div>
            <Container maxWidth="xs">
              <Select
                fullWidth
                sx={{ marginBlockEnd: '16px', textTransform: 'capitalize' }}
                variant="standard"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as role)}
              >
                {[roles.CUSTOMER, roles.MANAGER].map((role) => {
                  return (
                    <MenuItem sx={{ textTransform: 'capitalize' }} key={role} value={role}>
                      {role + (role === roles.MANAGER ? ' (Requires admin approval)' : '')}
                    </MenuItem>
                  );
                })}
              </Select>
            </Container>
          </div>
        }
      />
      <Typography color="GrayText" my={2} align="center">
        {'Already a member? '}{' '}
        <Link style={{ fontWeight: 500, color: 'black', cursor: 'pointer' }} to="/login">
          Sign in
        </Link>
      </Typography>
    </Container>
  );
};
export default Signup;
