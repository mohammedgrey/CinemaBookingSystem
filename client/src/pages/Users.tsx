import {
  AccountCircle,
  Add,
  AdminPanelSettings,
  Delete,
  Edit,
  Email,
  ManageAccounts,
  Person,
} from '@mui/icons-material';
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import ButtonWithConfirmBox from '../components/generic/ButtonWithConfirmBox';
import UserAddEdit from '../components/specific/UserAddEdit';
import roles from '../config/roles';
import useGenericModal from '../hooks/popup/useGenericModal';
import { signupFields, user } from '../interfaces/user';
import { deleteUser, getAllUsers } from '../requests/users';
import Loader from '../wrappers/Loader';

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const { data, isLoading, refetch: refetchUsers } = useQuery('users', getAllUsers);
  const { openGenericModal } = useGenericModal();

  const rolesIcons: any = {
    [roles.ADMIN]: <AdminPanelSettings />,
    [roles.MANAGER]: <ManageAccounts />,
    [roles.CUSTOMER]: <Person />,
  };
  return (
    <Loader isLoading={isLoading}>
      <Box p={2} pb={0}>
        <Card sx={{ padding: '16px', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
          <Typography fontWeight={700} variant="h5">
            Users
          </Typography>
          <Button
            onClick={() => openGenericModal(<UserAddEdit refetchUsers={refetchUsers} />, 500)}
            sx={{ borderRadius: '20px' }}
            variant="contained"
            startIcon={<Add />}
          >
            Add User
          </Button>
        </Card>
      </Box>
      <Box sx={{ padding: '8px 16px' }}>
        {data?.data?.users?.map((user: user) => {
          return (
            <Card sx={{ marginBlock: '16px' }} key={user._id}>
              <Box
                flexWrap="wrap"
                sx={{ width: '100%', padding: '16px' }}
                display="flex"
                justifyContent="space-between"
              >
                <Stack spacing={1} sx={{ paddingBlock: '16px', flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {user.firstName + ' ' + user.lastName}
                  </Typography>
                  <Box>
                    <Typography color="GrayText">
                      {' '}
                      <Email sx={{ verticalAlign: 'middle' }} /> {user.email}
                    </Typography>
                    <Typography color="GrayText">
                      <AccountCircle sx={{ verticalAlign: 'middle' }} /> {user.username}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Chip
                      icon={rolesIcons[user.role]}
                      color="success"
                      sx={{ textTransform: 'capitalize', marginInlineEnd: '16px' }}
                      label={user.role}
                    />
                    {user.wishesToManage && (
                      <Chip color="warning" sx={{ marginInlineEnd: '16px' }} label={'Wants to become a manager'} />
                    )}
                  </Box>
                </Stack>

                <Box>
                  <ButtonWithConfirmBox
                    size="small"
                    sx={{ borderRadius: '20px' }}
                    variant="contained"
                    confirmMessage="Are you sure you want to delete this user?"
                    onClick={async () => {
                      try {
                        const res = await deleteUser(user._id as string);
                        refetchUsers();
                      } catch (err: any) {
                        console.log(err);
                      }
                    }}
                    startIcon={<Delete />}
                  >
                    Delete
                  </ButtonWithConfirmBox>

                  <Button
                    size="small"
                    sx={{ borderRadius: '20px', margin: '5px' }}
                    startIcon={<Edit />}
                    variant="outlined"
                    onClick={() => {
                      openGenericModal(<UserAddEdit refetchUsers={refetchUsers} user={user} />, 500);
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Loader>
  );
};
export default Users;
