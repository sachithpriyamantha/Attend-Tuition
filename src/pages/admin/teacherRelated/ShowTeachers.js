import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
        if (!confirmDelete) {
            return;
        }

        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllTeachers(currentUser._id));
            })
            .catch(err => {
                setMessage("Failed to delete teacher. Please try again.");
                setShowPopup(true);
            });
    };

    const filteredRows = teachersList && teachersList.length > 0 && teachersList
        .filter((teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.teachSubject?.subName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.teachSclass.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((teacher) => ({
            id: teacher._id,
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || 'N/A',
            teachSclass: teacher.teachSclass.sclassName,
        }));

    const teacherColumns = [
        { field: 'name', headerName: 'Name', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
        { field: 'teachSubject', headerName: 'Subject', flex: 1, minWidth: 120, align: 'left', headerAlign: 'left' },
        { field: 'teachSclass', headerName: 'Class', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        {
            field: 'actions', headerName: 'Actions', flex: 1, minWidth: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
                <>
                    <IconButton onClick={() => deleteHandler(params.row.id, "Student")}>
                        <DeleteIcon color="error" fontSize="small" />
                    </IconButton>

                    <IconButton onClick={() => navigate(`/Admin/teachers/teacher/${params.row.id}`)}>
                        <RemoveRedEyeIcon color="primary" fontSize="small" />

                    </IconButton>
                    {/* <IconButton onClick={() => deleteHandler(params.row.id, "Teacher")}>
                        <PersonRemoveIcon color="error" fontSize="small" />
                    </IconButton>
                    <BlueButton
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/Admin/teachers/teacher/${params.row.id}`)}
                    >
                        View
                    </BlueButton> */}
                </>
            )
        }
    ];

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />,
            name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px', marginLeft: '10px' }}>
                <Box sx={{ width: '300px' }}>
                    <TextField
                        label="Search..."
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search name, subject, etc..."
                        size="small"
                    />
                </Box>
                
                {/* Center: Table heading */}
                <Typography variant="h5" align="center" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
                    Teachers List
                </Typography>

                <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")} style={{ marginRight: 10 }}>
                    Add Teacher
                </GreenButton>
            </Box>

            <Paper sx={{ width: '95%', margin: 'auto', overflow: 'hidden', padding: '16px', borderRadius: '12px', backgroundColor: '#a2d2ff' }}>
                {!loading && Array.isArray(filteredRows) && filteredRows.length > 0 ? (
                    <DataGrid
                        rows={filteredRows}
                        columns={teacherColumns}
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

export default ShowTeachers;
