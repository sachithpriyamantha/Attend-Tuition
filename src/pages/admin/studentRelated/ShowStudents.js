// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import {
//     Box, IconButton,
//     Paper
// } from '@mui/material';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import TableTemplate from '../../../components/TableTemplate';
// import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';

// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import * as React from 'react';
// // import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import Popper from '@mui/material/Popper';
// import Popup from '../../../components/Popup';

// const ShowStudents = () => {

//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const { studentsList, loading, error, response } = useSelector((state) => state.student);
//     const { currentUser } = useSelector(state => state.user)

//     useEffect(() => {
//         dispatch(getAllStudents(currentUser._id));
//     }, [currentUser._id, dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const [showPopup, setShowPopup] = React.useState(false);
//     const [message, setMessage] = React.useState("");

//     const deleteHandler = (deleteID, address) => {
//         console.log(deleteID);
//         console.log(address);
    
        
//         const confirmDelete = window.confirm("Are you sure you want to delete this student?");
//         if (!confirmDelete) {
//             return;
//         }
    
        
//         dispatch(deleteUser(deleteID, address))
//             .then(() => {
//                 dispatch(getAllStudents(currentUser._id));
//             })
//             .catch(err => {
//                 setMessage("Failed to delete student. Please try again.");
//                 setShowPopup(true);  
//             });
//     };
    

//     const studentColumns = [
//         { id: 'rollNum', label: 'Roll Number', minWidth: 10 },
//         { id: 'name', label: 'Name', minWidth: 80 },
//         { id: 'dob', label: 'Birthday', minWidth: 50 },
//         { id: 'sclassName', label: 'Class', minWidth: 50 },
//         { id: 'address', label: 'Address', minWidth: 90 },
//         { id: 'phoneNumber', label: 'Phone Number', minWidth: 50 },
//         { id: 'guardianName', label: 'Guardian', minWidth: 50 },
//         { id: 'guardianPhone', label: 'Guardian Number', minWidth: 50 },
//     ]

//     const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
//         return {
//             name: student.name,
//             rollNum: student.rollNum,
//             dob: new Date(student.dob).toLocaleDateString(),
//             sclassName: student.sclassName.sclassName,
//             address: student.address,
//             phoneNumber: student.phoneNumber,
//             guardianName: student.guardianName,
//             guardianPhone: student.guardianPhone,
//             id: student._id,
//         };
//     });
    
//     const StudentButtonHaver = ({ row }) => {
//         const options = ['Take Attendance', 'Provide Marks'];
    
//         const [open, setOpen] = React.useState(false);
//         const anchorRef = React.useRef(null);
//         const [selectedIndex, setSelectedIndex] = React.useState(0);
    
//         const handleClick = () => {
//             if (selectedIndex === 0) {
//                 handleAttendance();
//             } else if (selectedIndex === 1) {
//                 handleMarks();
//             }
//         };
    
//         const handleAttendance = () => {
//             navigate("/Admin/students/student/attendance/" + row.id);
//         };
//         const handleMarks = () => {
//             navigate("/Admin/students/student/marks/" + row.id);
//         };
    
//         const handleMenuItemClick = (event, index) => {
//             setSelectedIndex(index); 
//             setOpen(false);
//         };
    
//         const handleToggle = () => {
//             setOpen((prevOpen) => !prevOpen);
//         };
    
//         const handleClose = (event) => {
//             if (anchorRef.current && anchorRef.current.contains(event.target)) {
//                 return;
//             }
//             setOpen(false);
//         };
    
//         return (
//             <>
//                 <IconButton onClick={() => deleteHandler(row.id, "Student")}>
//                     <PersonRemoveIcon color="error" fontSize="small" />
//                 </IconButton>
//                 <BlueButton
//                     variant="contained"
//                     size="small" 
//                     onClick={() => navigate("/Admin/students/student/" + row.id)}
//                 >
//                     View
//                 </BlueButton>
//                 <React.Fragment>
//                     <ButtonGroup variant="contained" size="small" ref={anchorRef} aria-label="split button">
//                         <Button onClick={handleClick}>{options[selectedIndex]}</Button>
//                         <BlackButton
//                             size="small" 
//                             aria-controls={open ? 'split-button-menu' : undefined}
//                             aria-expanded={open ? 'true' : undefined}
//                             aria-label="select merge strategy"
//                             aria-haspopup="menu"
//                             onClick={handleToggle}
//                         >
//                             {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                         </BlackButton>
//                     </ButtonGroup>
//                     <Popper
//                         sx={{ zIndex: 1 }}
//                         open={open}
//                         anchorEl={anchorRef.current}
//                         role={undefined}
//                         transition
//                         disablePortal
//                     >
//                         {({ TransitionProps, placement }) => (
//                             <Grow
//                                 {...TransitionProps}
//                                 style={{
//                                     transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
//                                 }}
//                             >
//                                 <Paper>
//                                     <ClickAwayListener onClickAway={handleClose}>
//                                         <MenuList id="split-button-menu" autoFocusItem>
//                                             {options.map((option, index) => (
//                                                 <MenuItem
//                                                     key={option}
//                                                     disabled={index === 2}
//                                                     selected={index === selectedIndex}
//                                                     onClick={(event) => handleMenuItemClick(event, index)}
//                                                 >
//                                                     {option}
//                                                 </MenuItem>
//                                             ))}
//                                         </MenuList>
//                                     </ClickAwayListener>
//                                 </Paper>
//                             </Grow>
//                         )}
//                     </Popper>
//                 </React.Fragment>
//             </>
//         );
//     };
    


//     const actions = [
//         {
//             icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
//             action: () => navigate("/Admin/addstudents")
//         },
//         {
//             icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
//             action: () => deleteHandler(currentUser._id, "Students")
//         },
//     ];

//     return (
//         <>
//             {loading ?
//                 <div>Loading...</div>
//                 :
//                 <>
//                     {response ?
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                             <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
//                                 Add Students
//                             </GreenButton>
//                         </Box>
//                         :
//                         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                             {Array.isArray(studentsList) && studentsList.length > 0 &&
//                                 <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
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

// export default ShowStudents;


















import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';


const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) {
            return;
        }

        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllStudents(currentUser._id));
            })
            .catch(err => {
                setMessage("Failed to delete student. Please try again.");
                setShowPopup(true);
            });
    };

    const filteredRows = studentsList && studentsList.length > 0 && studentsList
        .filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
            student.rollNum.toString().includes(searchTerm) ||
            student.sclassName.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((student) => ({
            id: student._id,
            name: student.name,
            rollNum: student.rollNum,
            dob: new Date(student.dob).toLocaleDateString(),
            sclassName: student.sclassName.sclassName,
            address: student.address,
            phoneNumber: student.phoneNumber,
            guardianName: student.guardianName,
            guardianPhone: student.guardianPhone,
        }));

    const studentColumns = [
        { field: 'rollNum', headerName: 'Roll Number', flex: 1, minWidth: 100, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Name', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
        { field: 'dob', headerName: 'Birthday', flex: 1, minWidth: 120, align: 'right', headerAlign: 'right' },
        { field: 'sclassName', headerName: 'Class', flex: 0.8, minWidth: 100, align: 'center', headerAlign: 'center' },
        { field: 'address', headerName: 'Address', flex: 1.3, minWidth: 200, align: 'left', headerAlign: 'left' },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150, align: 'center', headerAlign: 'center' },
        { field: 'guardianName', headerName: 'Guardian', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
        { field: 'guardianPhone', headerName: 'Guardian Number', flex: 1, minWidth: 150, align: 'center', headerAlign: 'center' },
        {
            field: 'actions', headerName: 'Actions', flex: 0.8, minWidth: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
                <>
                    <IconButton onClick={() => deleteHandler(params.row.id, "Student")}>
                        <DeleteIcon color="error" fontSize="small" />
                    </IconButton>

                    <IconButton onClick={() => navigate(`/Admin/students/student/${params.row.id}`)}>
                        <RemoveRedEyeIcon color="primary" fontSize="small" />
                        
                    </IconButton>


                    {/* <BlueButton
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/Admin/students/student/${params.row.id}`)}
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
            name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' , marginLeft: '10px'}}>
                <Box sx={{ width: '300px' }}>
                    <TextField
                        label="Search..."
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search roll no, name , etc..."
                        size="small" 
                    />
                </Box>
                
                {/* Center: Table heading */}
                <Typography variant="h5" align="center" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
                    Students List
                </Typography>

                <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")} style={{ marginRight: 10 }}>
                    Add Students
                </GreenButton>
            </Box>

            <Paper sx={{ width: '95%', margin: 'auto', overflow: 'hidden', padding: '16px', borderRadius: '12px', backgroundColor: '#a2d2ff' }}>
                {!loading && Array.isArray(filteredRows) && filteredRows.length > 0 ? (
                    <DataGrid
                        rows={filteredRows}
                        columns={studentColumns}
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

export default ShowStudents;
