// import {
//   Alert,
//   Box,
//   Card,
//   CardContent,
//   Checkbox,
//   CircularProgress,
//   Paper,
//   Typography,
// } from '@mui/material';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TableTemplate from '../../../components/TableTemplate';
// import { getAllComplains } from '../../../redux/complainRelated/complainHandle';

// const SeeComplains = () => {
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//   const dispatch = useDispatch();
//   const { complainsList, loading, error, response } = useSelector((state) => state.complain);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (currentUser && currentUser._id) {
//       dispatch(getAllComplains(currentUser._id, "Complain"));
//     }
//   }, [currentUser._id, dispatch]);

//   if (error) {
//     console.error(error);
//   }

//   const complainColumns = [
//     { id: 'user', label: 'User', minWidth: 170 },
//     { id: 'complaint', label: 'Complaint', minWidth: 200 },
//     { id: 'date', label: 'Date', minWidth: 170 },
//   ];

//   const complainRows = complainsList?.map((complain) => {
//     const date = new Date(complain.date);
//     const dateString = !isNaN(date) ? date.toISOString().substring(0, 10) : "Invalid Date";

//     return {
//       user: complain.user?.name || 'Unknown User',
//       complaint: complain.complaint,
//       date: dateString,
//       id: complain._id,
//     };
//   }) || [];

//   const ComplainButtonHaver = ({ row }) => (
//     <Checkbox {...label} />
//   );

//   return (
//     <Box sx={{ padding: 2 }}>
//       {loading ? (
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//           <CircularProgress />
//           <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading Complaints...</Typography>
//         </Box>
//       ) : error ? (
//         <Alert severity="error">An error occurred while loading complaints: {error.message}</Alert>
//       ) : (
//         <Paper elevation={3} sx={{ padding: 3 }}>
//           {response ? (
//             <Card variant="outlined">
//               <CardContent>
//                 <Typography variant="h6" align="center" color="textSecondary">
//                   No Complaints Right Now
//                 </Typography>
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               {complainRows.length > 0 ? (
//                 <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
//               ) : (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
//                   <Typography variant="h6" color="textSecondary">No Data Available</Typography>
//                 </Box>
//               )}
//             </>
//           )}
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default SeeComplains;



import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser._id, dispatch]);

  const complainColumns = [
    { field: 'user', headerName: 'User', flex: 1, minWidth: 170, align: 'left', headerAlign: 'left' },
    { field: 'complaint', headerName: 'Complaint', flex: 2, minWidth: 200, align: 'left', headerAlign: 'left' },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 170, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
          <IconButton>
            <DeleteIcon color="error" fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  const complainRows = complainsList?.map((complain) => ({
    id: complain._id,
    user: complain.user?.name || 'Unknown User',
    complaint: complain.complaint,
    date: new Date(complain.date).toLocaleDateString() || "Invalid Date",
  })) || [];

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
        <Paper sx={{ width: '95%', margin: 'auto', padding: '16px', borderRadius: '12px', backgroundColor: '#a2d2ff' }}>
          {complainRows.length > 0 ? (
            <DataGrid
              rows={complainRows}
              columns={complainColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              autoHeight
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                },
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
                '& .MuiDataGrid-cell': {
                  textAlign: 'center',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
              <Typography variant="h6" color="textSecondary">No Data Available</Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SeeComplains;
