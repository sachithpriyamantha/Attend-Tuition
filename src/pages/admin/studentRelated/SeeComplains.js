import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Box,
  Checkbox,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser._id, dispatch]);

  if (error) {
    console.error(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 200 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList?.map((complain) => {
    const date = new Date(complain.date);
    const dateString = !isNaN(date) ? date.toISOString().substring(0, 10) : "Invalid Date";

    return {
      user: complain.user?.name || 'Unknown User', // Safe access to avoid null reference
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  }) || [];

  const ComplainButtonHaver = ({ row }) => (
    <Checkbox {...label} />
  );

  return (
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading Complaints...</Typography>
        </Box>
      ) : error ? (
        <Alert severity="error">An error occurred while loading complaints: {error.message}</Alert>
      ) : (
        <Paper elevation={3} sx={{ padding: 3 }}>
          {response ? (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" align="center" color="textSecondary">
                  No Complaints Right Now
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <>
              {complainRows.length > 0 ? (
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                  <Typography variant="h6" color="textSecondary">No Data Available</Typography>
                </Box>
              )}
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SeeComplains;
