import { Email } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AutoForm from '../components/generic/AutoForm';
import useNotification from '../hooks/popup/useNotification';
import useUser from '../hooks/system/useUser';
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { loginUser } = useUser();
  const { notify } = useNotification();
  return (
    <Container maxWidth="sm">
      <Typography pt={2} my={2} variant="h6" fontWeight={700} align="center">
        <Email color="primary" fontSize="large" sx={{ verticalAlign: 'middle', marginInlineEnd: '16px' }}></Email>
        Login to your account
      </Typography>
      <AutoForm
        onSubmitHandler={async (data: any) => {
          try {
            await loginUser(data); //this function has its own try and catch so no need to notify
            //the user if an error occurs
          } catch (err) {
            console.log(err);
          }
        }}
        submitButtonText="Sign in"
        fullWidthsubmitButton
        fields={['email', 'password']}
      />
      <Typography color="GrayText" my={2} align="center">
        {"Don't have an account yet? "}{' '}
        <Link style={{ fontWeight: 500, color: 'black', cursor: 'pointer' }} to="/signup">
          Sign up
        </Link>
      </Typography>
    </Container>
  );
};
export default Login;
