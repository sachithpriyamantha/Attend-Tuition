import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { sclassesList, loading, error } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
      })
      .catch(err => {
        setMessage("Failed to delete class. Please try again.");
        setShowPopup(true);
      });
  };

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => ({
    id: sclass._id,
    name: sclass.sclassName,
  }));

  const sclassColumns = [
    { field: 'name', headerName: 'Class Name', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
    {
      field: 'actions', headerName: 'Actions', flex: 1, minWidth: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
        <>
          <IconButton onClick={() => deleteHandler(params.row.id, "Sclass")}>
            <DeleteIcon color="error" fontSize="small" />
          </IconButton>
          <IconButton onClick={() => navigate(`/Admin/classes/class/${params.row.id}`)}>
            <RemoveRedEyeIcon color="primary" fontSize="small" />
          </IconButton>
        </>
      )
    }
  ];

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, 
      name: 'Add New Class',
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />, 
      name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses"),
    },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px', marginLeft: '10px' }}>
        {/* Table heading */}
        <Typography variant="h5" align="center" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
          Classes List
        </Typography>

        <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")} style={{ marginRight: 10 }}>
          Add Class
        </GreenButton>
      </Box>

      <Paper sx={{ width: '80%', margin: 'auto', overflow: 'hidden', padding: '16px', borderRadius: '12px', backgroundColor: '#a2d2ff' }}>
        {!loading && Array.isArray(sclassRows) && sclassRows.length > 0 ? (
          <DataGrid
            rows={sclassRows}
            columns={sclassColumns}
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
              }
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Paper>

      <SpeedDialTemplate actions={actions} />
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;
