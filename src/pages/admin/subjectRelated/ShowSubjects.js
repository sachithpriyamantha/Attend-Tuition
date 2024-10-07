// import DeleteIcon from "@mui/icons-material/Delete";
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import {
//     Box, IconButton,
//     Paper,
// } from '@mui/material';
// import { deleteUser } from '../../../redux/userRelated/userHandle';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { BlueButton, GreenButton } from '../../../components/buttonStyles';
// import Popup from '../../../components/Popup';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import TableTemplate from '../../../components/TableTemplate';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';

// const ShowSubjects = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
//     const { currentUser } = useSelector(state => state.user)

//     useEffect(() => {
//         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
//     }, [currentUser._id, dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");

//     const deleteHandler = (deleteID, address) => {
//         console.log(deleteID);
//         console.log(address);
//         // setMessage("Sorry the delete function has been disabled for now.")
//         // setShowPopup(true)

//         dispatch(deleteUser(deleteID, address))
//             .then(() => {
//                 dispatch(getSubjectList(currentUser._id, "AllSubjects"));
//             })
//     }

//     const subjectColumns = [
//         { id: 'subName', label: 'Sub Name', minWidth: 170 },
//         { id: 'sessions', label: 'Sessions', minWidth: 170 },
//         { id: 'sclassName', label: 'Class', minWidth: 170 },
//     ]

//     const subjectRows = subjectsList.map((subject) => {
//         return {
//             subName: subject.subName,
//             sessions: subject.sessions,
//             sclassName: subject.sclassName.sclassName,
//             sclassID: subject.sclassName._id,
//             id: subject._id,
//         };
//     })

//     const SubjectsButtonHaver = ({ row }) => {
//         return (
//             <>
//                 <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
//                     <DeleteIcon color="error" />
//                 </IconButton>
//                 <BlueButton variant="contained"
//                     onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
//                     View
//                 </BlueButton>
//             </>
//         );
//     };

//     const actions = [
//         {
//             icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
//             action: () => navigate("/Admin/subjects/chooseclass")
//         },
//         {
//             icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
//             action: () => deleteHandler(currentUser._id, "Subjects")
//         }
//     ];

//     return (
//         <>
//             {loading ?
//                 <div>Loading...</div>
//                 :
//                 <>
//                     {response ?
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                             <GreenButton variant="contained"
//                                 onClick={() => navigate("/Admin/subjects/chooseclass")}>
//                                 Add Subjects
//                             </GreenButton>
//                         </Box>
//                         :
//                         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                             {Array.isArray(subjectsList) && subjectsList.length > 0 &&
//                                 <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
//                             }
//                             <SpeedDialTemplate actions={actions} />
//                         </Paper>
//                     }
//                 </>
//             }
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

//         </>
//     );
// };

// export default ShowSubjects;





import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Box, IconButton, Paper, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
        if (!confirmDelete) {
            return;
        }

        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getSubjectList(currentUser._id, "AllSubjects"));
            })
            .catch(err => {
                setMessage("Failed to delete subject. Please try again.");
                setShowPopup(true);
            });
    };

    const filteredRows = subjectsList && subjectsList.length > 0 && subjectsList
        .filter((subject) =>
            subject.subName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.sclassName.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((subject) => ({
            id: subject._id,
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
        }));

    const subjectColumns = [
        { field: 'subName', headerName: 'Subject Name', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
        { field: 'sessions', headerName: 'Sessions', flex: 1, minWidth: 100, align: 'center', headerAlign: 'center' },
        { field: 'sclassName', headerName: 'Class', flex: 1, minWidth: 100, align: 'center', headerAlign: 'center' },
        {
            field: 'actions', headerName: 'Actions', flex: 0.8, minWidth: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
                <>
                    <IconButton onClick={() => deleteHandler(params.row.id, "Subject")}>
                        <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                    <BlueButton
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/Admin/subjects/subject/${params.row.id}`)}
                    >
                        View
                    </BlueButton>
                </>
            )
        }
    ];

    const actions = [
        {
            icon: <PostAddIcon color="primary" />,
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        },
    ];

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' }}>
                <Box sx={{ width: '300px' }}>
                    <TextField
                        label="Search..."
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search subject name, class, etc..."
                        size="small"
                    />
                </Box>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")}>
                    Add Subject
                </GreenButton>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {!loading && Array.isArray(filteredRows) && filteredRows.length > 0 ? (
                    <DataGrid
                        rows={filteredRows}
                        columns={subjectColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                fontSize: '1rem',
                            },
                            '& .MuiDataGrid-columnSeparator': {
                                display: 'none', 
                            },
                            '& .MuiDataGrid-cell': {
                                textAlign: 'center',
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

export default ShowSubjects;
