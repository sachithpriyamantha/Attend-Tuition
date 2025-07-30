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


















// import DeleteIcon from '@mui/icons-material/Delete';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { GreenButton } from '../../../components/buttonStyles';
// import Popup from '../../../components/Popup';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';


// const ShowStudents = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { studentsList, loading, error } = useSelector((state) => state.student);
//     const { currentUser } = useSelector(state => state.user);

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         dispatch(getAllStudents(currentUser._id));
//     }, [currentUser._id, dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const deleteHandler = (deleteID, address) => {
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

//     const filteredRows = studentsList && studentsList.length > 0 && studentsList
//         .filter((student) =>
//             student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
//             student.rollNum.toString().includes(searchTerm) ||
//             student.sclassName.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .map((student) => ({
//             id: student._id,
//             name: student.name,
//             rollNum: student.rollNum,
//             dob: new Date(student.dob).toLocaleDateString(),
//             sclassName: student.sclassName.sclassName,
//             address: student.address,
//             phoneNumber: student.phoneNumber,
//             guardianName: student.guardianName,
//             guardianPhone: student.guardianPhone,
//         }));

//     const studentColumns = [
//         { field: 'rollNum', headerName: 'Roll Number', flex: 1, minWidth: 100, align: 'center', headerAlign: 'center' },
//         { field: 'name', headerName: 'Name', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
//         { field: 'dob', headerName: 'Birthday', flex: 1, minWidth: 120, align: 'right', headerAlign: 'right' },
//         { field: 'sclassName', headerName: 'Class', flex: 0.8, minWidth: 100, align: 'center', headerAlign: 'center' },
//         { field: 'address', headerName: 'Address', flex: 1.3, minWidth: 200, align: 'left', headerAlign: 'left' },
//         { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150, align: 'center', headerAlign: 'center' },
//         { field: 'guardianName', headerName: 'Guardian', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
//         { field: 'guardianPhone', headerName: 'Guardian Number', flex: 1, minWidth: 150, align: 'center', headerAlign: 'center' },
//         {
//             field: 'actions', headerName: 'Actions', flex: 0.8, minWidth: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
//                 <>
//                     <IconButton onClick={() => deleteHandler(params.row.id, "Student")}>
//                         <DeleteIcon color="error" fontSize="small" />
//                     </IconButton>

//                     <IconButton onClick={() => navigate(`/Admin/students/student/${params.row.id}`)}>
//                         <RemoveRedEyeIcon color="primary" fontSize="small" />
                        
//                     </IconButton>


//                     {/* <BlueButton
//                         variant="contained"
//                         size="small"
//                         onClick={() => navigate(`/Admin/students/student/${params.row.id}`)}
//                     >
//                         View
//                     </BlueButton> */}
//                 </>
//             )
//         }
//     ];

//     const actions = [
//         {
//             icon: <PersonAddAlt1Icon color="primary" />,
//             name: 'Add New Student',
//             action: () => navigate("/Admin/addstudents")
//         },
        
//         {
//             icon: <DeleteIcon color="error" />,
//             name: 'Delete All Students',
//             action: () => deleteHandler(currentUser._id, "Students")
//         },
//     ];

//     return (
//         <>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' , marginLeft: '10px'}}>
//                 <Box sx={{ width: '300px' }}>
//                     <TextField
//                         label="Search..."
//                         variant="outlined"
//                         fullWidth
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Search roll no, name , etc..."
//                         size="small" 
//                     />
//                 </Box>
                
//                 {/* Center: Table heading */}
//                 <Typography variant="h5" align="center" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
//                     Students List
//                 </Typography>

//                 <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")} style={{ marginRight: 10 }}>
//                     Add Students
//                 </GreenButton>
//             </Box>

//             <Paper sx={{ width: '95%', margin: 'auto', overflow: 'hidden', padding: '16px', borderRadius: '12px', backgroundColor: '#a2d2ff' }}>
//                 {!loading && Array.isArray(filteredRows) && filteredRows.length > 0 ? (
//                     <DataGrid
//                         rows={filteredRows}
//                         columns={studentColumns}
//                         pageSize={5}
//                         rowsPerPageOptions={[5, 10, 20]}
//                         autoHeight
//                         sx={{
//                             '& .MuiDataGrid-columnHeaders': {
//                                 backgroundColor: '#1976d2',
//                                 color: '#fff',
//                                 fontSize: '1rem',
//                                 fontWeight: 'bold',
//                             },
//                             '& .MuiDataGrid-columnSeparator': {
//                                 display: 'none',
//                             },
//                             '& .MuiDataGrid-cell': {
//                                 textAlign: 'center',
//                             },
//                             '& .MuiDataGrid-row:hover': {
//                                 backgroundColor: '#f5f5f5',
//                             }
//                         }}
//                     />
//                 ) : (
//                     <div>Loading...</div>
//                 )}
//             </Paper>

//             <SpeedDialTemplate actions={actions} />
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

// export default ShowStudents;

import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { 
  Box, 
  IconButton, 
  Paper, 
  TextField, 
  Typography,
  InputAdornment,
  CircularProgress,
  Tooltip,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Grid,
  Collapse,
  Stack
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
    },
  },
  '& .MuiDataGrid-toolbarContainer': {
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
  },
}));

// Mobile Student Card Component
const StudentCard = ({ student, onView, onDelete }) => (
  <Card sx={{ mb: 2, borderRadius: 2 }}>
    <CardContent sx={{ pb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
          {student.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" noWrap>
            {student.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Roll No: {student.rollNum}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={student.sclassName} 
              color="secondary" 
              size="small"
            />
            {student.phoneNumber && (
              <Chip 
                label={student.phoneNumber} 
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      </Box>
    </CardContent>
    <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
      <Box>
        <Tooltip title="View Student">
          <IconButton onClick={() => onView(student.id)} color="primary" size="small">
            <RemoveRedEyeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Student">
          <IconButton onClick={() => onDelete(student.id, "Student")} color="error" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </CardActions>
  </Card>
);

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { studentsList, loading, error } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    // Responsive breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteAddress, setDeleteAddress] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    const handleDeleteClick = (deleteID, address) => {
        setDeleteId(deleteID);
        setDeleteAddress(address);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        setDeleteDialogOpen(false);
        dispatch(deleteUser(deleteId, deleteAddress))
            .then(() => {
                dispatch(getAllStudents(currentUser._id));
                setMessage("Student deleted successfully");
                setShowPopup(true);
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

    // Responsive column configuration
    const getStudentColumns = () => {
        const baseColumns = [
            { 
                field: 'rollNum', 
                headerName: 'Roll No', 
                flex: isMobile ? 0.5 : 0.8,
                minWidth: isMobile ? 70 : undefined,
                align: 'center', 
                headerAlign: 'center',
                renderCell: (params) => (
                    <Chip 
                        label={params.value} 
                        color="primary" 
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
                    />
                )
            },
            { 
                field: 'name', 
                headerName: 'Student', 
                flex: isMobile ? 1.2 : 1.5,
                minWidth: isMobile ? 150 : undefined,
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!isMobile && (
                            <Avatar sx={{ 
                                width: 32, 
                                height: 32, 
                                bgcolor: 'primary.main',
                                fontSize: isMobile ? '0.75rem' : '1rem'
                            }}>
                                {params.value.charAt(0)}
                            </Avatar>
                        )}
                        <Typography variant={isMobile ? "caption" : "body2"} noWrap>
                            {params.value}
                        </Typography>
                    </Box>
                )
            },
            {
                field: 'actions', 
                headerName: 'Actions', 
                flex: isMobile ? 0.6 : 1,
                minWidth: isMobile ? 100 : undefined,
                align: 'center', 
                headerAlign: 'center', 
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', gap: isMobile ? 0.5 : 1 }}>
                        <Tooltip title="View Student">
                            <IconButton 
                                onClick={() => navigate(`/Admin/students/student/${params.row.id}`)}
                                color="primary"
                                size="small"
                            >
                                <RemoveRedEyeIcon fontSize={isMobile ? "small" : "small"} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Student">
                            <IconButton 
                                onClick={() => handleDeleteClick(params.row.id, "Student")}
                                color="error"
                                size="small"
                            >
                                <DeleteIcon fontSize={isMobile ? "small" : "small"} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        ];

        // Add class column for larger screens
        if (!isMobile) {
            baseColumns.splice(-1, 0, { 
                field: 'sclassName', 
                headerName: 'Class', 
                flex: isMobile ? 0.6 : 0.8,
                minWidth: isMobile ? 80 : undefined,
                align: 'center', 
                headerAlign: 'center',
                renderCell: (params) => (
                    <Chip 
                        label={params.value} 
                        color="secondary" 
                        size="small"
                    />
                )
            });
        }

        // Add additional columns for larger screens
        if (isTablet || isLarge) {
            baseColumns.splice(-1, 0, { 
                field: 'phoneNumber', 
                headerName: 'Contact', 
                flex: 1,
                minWidth: 100,
                align: 'center', 
                headerAlign: 'center',
            });
        }

        return baseColumns;
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Students',
            action: () => handleDeleteClick(currentUser._id, "Students")
        },
    ];

    const mobileMenuItems = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            text: 'Add New Student',
            action: () => {
                navigate("/Admin/addstudents");
                setMobileMenuOpen(false);
            }
        },
        {
            icon: <DeleteIcon color="error" />,
            text: 'Delete All Students',
            action: () => {
                handleDeleteClick(currentUser._id, "Students");
                setMobileMenuOpen(false);
            }
        }
    ];

    return (
        <Box sx={{ 
            p: isMobile ? 1 : isTablet ? 2 : 3,
            minHeight: '100vh',
        }}>
            {/* Header Section */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center',
                mb: isMobile ? 2 : 3,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 2 : 0
            }}>
                <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    fontWeight="bold" 
                    color="textPrimary"
                    sx={{ mb: isMobile ? 1 : 0 }}
                >
                    Student Management
                </Typography>
                
                {/* Desktop/Tablet Controls */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                sx: { 
                                    borderRadius: 2,
                                    backgroundColor: 'background.paper',
                                    minWidth: isTablet ? 200 : 300
                                }
                            }}
                        />
                        
                        <GreenButton 
                            variant="contained" 
                            onClick={() => navigate("/Admin/addstudents")}
                            startIcon={<PersonAddAlt1Icon />}
                            sx={{ borderRadius: 2 }}
                        >
                            Add Student
                        </GreenButton>
                    </Box>
                )}

                {/* Mobile Controls */}
                {isMobile && (
                    <Box sx={{ width: '100%' }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <IconButton 
                                onClick={() => setMobileMenuOpen(true)}
                                sx={{ 
                                    bgcolor: 'primary.main', 
                                    color: 'white',
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                                size="small"
                            >
                                <MenuIcon />
                            </IconButton>
                            
                            <IconButton 
                                onClick={() => setSearchExpanded(!searchExpanded)}
                                sx={{ 
                                    bgcolor: searchExpanded ? 'secondary.main' : 'grey.200', 
                                    color: searchExpanded ? 'white' : 'text.primary',
                                    '&:hover': { 
                                        bgcolor: searchExpanded ? 'secondary.dark' : 'grey.300' 
                                    }
                                }}
                                size="small"
                            >
                                <SearchIcon />
                            </IconButton>
                            
                            <GreenButton 
                                variant="contained" 
                                onClick={() => navigate("/Admin/addstudents")}
                                size="small"
                                sx={{ borderRadius: 2, flex: 1 }}
                            >
                                Add Student
                            </GreenButton>
                        </Stack>
                        
                        <Collapse in={searchExpanded}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    sx: { 
                                        borderRadius: 2,
                                        backgroundColor: 'background.paper'
                                    }
                                }}
                                sx={{ mb: 1 }}
                            />
                        </Collapse>
                    </Box>
                )}
            </Box>

            {/* Content Section */}
            {isMobile ? (
                // Mobile Card View
                <Box>
                    {loading ? (
                        <Box sx={{ 
                            height: 200, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                            <Typography color="error" sx={{ mb: 2 }}>
                                Error loading students
                            </Typography>
                            <Button 
                                variant="outlined" 
                                onClick={() => dispatch(getAllStudents(currentUser._id))}
                            >
                                Retry
                            </Button>
                        </Paper>
                    ) : filteredRows && filteredRows.length > 0 ? (
                        <Box>
                            {filteredRows.map((student) => (
                                <StudentCard
                                    key={student.id}
                                    student={student}
                                    onView={(id) => navigate(`/Admin/students/student/${id}`)}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                            <Typography color="text.secondary">
                                No students found
                            </Typography>
                        </Paper>
                    )}
                </Box>
            ) : (
                // Desktop/Tablet Table View
                <Paper 
                    elevation={0}
                    sx={{ 
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        height: isMobile ? 'auto' : 'calc(100vh - 200px)',
                        minHeight: isMobile ? 400 : 'auto'
                    }}
                >
                    {loading ? (
                        <Box sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            minHeight: 200
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 2,
                            minHeight: 200
                        }}>
                            <Typography color="error">Error loading students</Typography>
                            <Button 
                                variant="outlined" 
                                onClick={() => dispatch(getAllStudents(currentUser._id))}
                            >
                                Retry
                            </Button>
                        </Box>
                    ) : (
                        <StyledDataGrid
                            rows={filteredRows || []}
                            columns={getStudentColumns()}
                            pageSize={isMobile ? 5 : isTablet ? 8 : 10}
                            rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 20]}
                            disableSelectionOnClick
                            components={{
                                Toolbar: isTablet ? undefined : GridToolbar,
                            }}
                            componentsProps={{
                                toolbar: {
                                    showQuickFilter: !isTablet,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                            sx={{
                                '& .MuiDataGrid-virtualScroller': {
                                    minHeight: 200,
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                                },
                                '& .MuiDataGrid-cell': {
                                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                                    py: isMobile ? 0.5 : 1,
                                }
                            }}
                        />
                    )}
                </Paper>
            )}

            {/* Mobile Menu Drawer */}
            <Drawer
                anchor="bottom"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{
                    sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                        Actions
                    </Typography>
                    <List>
                        {mobileMenuItems.map((item, index) => (
                            <ListItem 
                                button 
                                key={index} 
                                onClick={item.action}
                                sx={{ borderRadius: 1, mb: 1 }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Speed Dial for larger screens */}
            {!isMobile && <SpeedDialTemplate actions={actions} />}
            
            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
            />
            
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-dialog-title"
                fullWidth={isMobile}
                maxWidth="sm"
            >
                <DialogTitle id="delete-dialog-title">
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {deleteAddress === "Students" 
                            ? "Are you sure you want to delete ALL students? This action cannot be undone."
                            : "Are you sure you want to delete this student? This action cannot be undone."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button 
                        onClick={() => setDeleteDialogOpen(false)} 
                        color="primary"
                        variant="outlined"
                        fullWidth={isMobile}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleDeleteConfirm} 
                        color="error"
                        variant="contained"
                        autoFocus
                        fullWidth={isMobile}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ShowStudents;