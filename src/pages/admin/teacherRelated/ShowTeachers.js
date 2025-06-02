// import DeleteIcon from '@mui/icons-material/Delete';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { GreenButton } from '../../../components/buttonStyles';
// import Popup from '../../../components/Popup';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';

// const ShowTeachers = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { teachersList, loading, error } = useSelector((state) => state.teacher);
//     const { currentUser } = useSelector((state) => state.user);

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         dispatch(getAllTeachers(currentUser._id));
//     }, [currentUser._id, dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const deleteHandler = (deleteID, address) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
//         if (!confirmDelete) {
//             return;
//         }

//         dispatch(deleteUser(deleteID, address))
//             .then(() => {
//                 dispatch(getAllTeachers(currentUser._id));
//             })
//             .catch(err => {
//                 setMessage("Failed to delete teacher. Please try again.");
//                 setShowPopup(true);
//             });
//     };

//     const filteredRows = teachersList && teachersList.length > 0 && teachersList
//         .filter((teacher) =>
//             teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             teacher.teachSubject?.subName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             teacher.teachSclass.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .map((teacher) => ({
//             id: teacher._id,
//             name: teacher.name,
//             teachSubject: teacher.teachSubject?.subName || 'N/A',
//             teachSclass: teacher.teachSclass.sclassName,
//         }));

//     const teacherColumns = [
//         { field: 'name', headerName: 'Name', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
//         { field: 'teachSubject', headerName: 'Subject', flex: 1, minWidth: 120, align: 'left', headerAlign: 'left' },
//         { field: 'teachSclass', headerName: 'Class', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
//         {
//             field: 'actions', headerName: 'Actions', flex: 1, minWidth: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
//                 <>
//                     <IconButton onClick={() => deleteHandler(params.row.id, "Student")}>
//                         <DeleteIcon color="error" fontSize="small" />
//                     </IconButton>

//                     <IconButton onClick={() => navigate(`/Admin/teachers/teacher/${params.row.id}`)}>
//                         <RemoveRedEyeIcon color="primary" fontSize="small" />

//                     </IconButton>
//                     {/* <IconButton onClick={() => deleteHandler(params.row.id, "Teacher")}>
//                         <PersonRemoveIcon color="error" fontSize="small" />
//                     </IconButton>
//                     <BlueButton
//                         variant="contained"
//                         size="small"
//                         onClick={() => navigate(`/Admin/teachers/teacher/${params.row.id}`)}
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
//             name: 'Add New Teacher',
//             action: () => navigate("/Admin/teachers/chooseclass")
//         },
//         {
//             icon: <PersonRemoveIcon color="error" />,
//             name: 'Delete All Teachers',
//             action: () => deleteHandler(currentUser._id, "Teachers")
//         },
//     ];

//     return (
//         <>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px', marginLeft: '10px' }}>
//                 <Box sx={{ width: '300px' }}>
//                     <TextField
//                         label="Search..."
//                         variant="outlined"
//                         fullWidth
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Search name, subject, etc..."
//                         size="small"
//                     />
//                 </Box>
                
//                 {/* Center: Table heading */}
//                 <Typography variant="h5" align="center" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
//                     Teachers List
//                 </Typography>

//                 <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")} style={{ marginRight: 10 }}>
//                     Add Teacher
//                 </GreenButton>
//             </Box>

//             <Paper sx={{ width: '95%', margin: 'auto', overflow: 'hidden', padding: '16px', borderRadius: '12px', backgroundColor: '#a2d2ff' }}>
//                 {!loading && Array.isArray(filteredRows) && filteredRows.length > 0 ? (
//                     <DataGrid
//                         rows={filteredRows}
//                         columns={teacherColumns}
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

// export default ShowTeachers;
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
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
  Stack,
  Badge
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
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

// Mobile Teacher Card Component
const TeacherCard = ({ teacher, onView, onDelete }) => (
  <Card sx={{ mb: 2, borderRadius: 2 }}>
    <CardContent sx={{ pb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar sx={{ 
          width: 40, 
          height: 40, 
          bgcolor: 'primary.main',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}>
          {teacher.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" noWrap>
            {teacher.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={teacher.teachSubject} 
              color={teacher.teachSubject === 'Not assigned' ? 'default' : 'primary'}
              size="small"
              variant={teacher.teachSubject === 'Not assigned' ? 'filled' : 'outlined'}
            />
            <Chip 
              label={teacher.teachSclass} 
              color="secondary" 
              size="small"
            />
            <Chip 
              label={`${teacher.studentCount} students`} 
              color="info" 
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </CardContent>
    <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
      <Box>
        <Tooltip title="View details">
          <IconButton 
            onClick={() => onView(teacher.id)}
            size="small"
            color="primary"
          >
            <RemoveRedEyeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete teacher">
          <IconButton 
            onClick={() => onDelete(teacher.id, "Teacher")}
            size="small"
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </CardActions>
  </Card>
);

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { teachersList, loading, error } = useSelector((state) => state.teacher);
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
        dispatch(getAllTeachers(currentUser._id));
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
                setMessage("Teacher deleted successfully");
                setShowPopup(true);
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
            teachSubject: teacher.teachSubject?.subName || 'Not assigned',
            teachSclass: teacher.teachSclass.sclassName,
            studentCount: teacher.students ? teacher.students.length : 0,
        }));

    // Responsive column configuration
    const getTeacherColumns = () => {
        const baseColumns = [
            { 
                field: 'name', 
                headerName: 'Teacher', 
                flex: isMobile ? 2 : 1.5,
                minWidth: isMobile ? 150 : 180,
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar 
                            sx={{ 
                                width: isMobile ? 24 : 32, 
                                height: isMobile ? 24 : 32, 
                                bgcolor: 'primary.main',
                                fontSize: isMobile ? '0.75rem' : '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {params.value.charAt(0)}
                        </Avatar>
                        <Typography variant={isMobile ? "caption" : "body2"} noWrap>
                            {params.value}
                        </Typography>
                    </Box>
                )
            },
            { 
                field: 'teachSubject', 
                headerName: 'Subject', 
                flex: isMobile ? 1 : 1,
                minWidth: isMobile ? 100 : 120,
                renderCell: (params) => (
                    <Chip 
                        label={params.value} 
                        color={params.value === 'Not assigned' ? 'default' : 'primary'}
                        size="small"
                        variant={params.value === 'Not assigned' ? 'filled' : 'outlined'}
                        sx={{ 
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    />
                )
            },
            {
                field: 'actions', 
                headerName: 'Actions', 
                flex: isMobile ? 0.8 : 1,
                minWidth: isMobile ? 90 : 120,
                align: 'center', 
                headerAlign: 'center', 
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', gap: isMobile ? 0.5 : 1 }}>
                        <Tooltip title="View">
                            <IconButton 
                                onClick={() => navigate(`/Admin/teachers/teacher/${params.row.id}`)}
                                color="primary"
                                size="small"
                            >
                                <RemoveRedEyeIcon fontSize={isMobile ? "small" : "small"} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton 
                                onClick={() => handleDeleteClick(params.row.id, "Teacher")}
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

        // Add class and student count columns for larger screens
        if (!isMobile) {
            baseColumns.splice(-1, 0, { 
                field: 'teachSclass', 
                headerName: 'Class', 
                flex: 1,
                minWidth: 100,
                renderCell: (params) => (
                    <Chip 
                        label={params.value} 
                        color="secondary" 
                        size="small"
                        sx={{ fontSize: '0.75rem' }}
                    />
                )
            });
            
            baseColumns.splice(-1, 0, { 
                field: 'studentCount', 
                headerName: 'Students', 
                flex: 0.8,
                minWidth: 80,
                align: 'center', 
                headerAlign: 'center',
                renderCell: (params) => (
                    <Badge 
                        badgeContent={params.value} 
                        color="secondary"
                        max={999}
                        sx={{ 
                            '& .MuiBadge-badge': { 
                                right: -3,
                                top: 8,
                                fontSize: '0.7rem',
                                height: 20,
                                minWidth: 20
                            } 
                        }}
                    />
                )
            });
        }

        return baseColumns;
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />,
            name: 'Delete All Teachers',
            action: () => handleDeleteClick(currentUser._id, "Teachers")
        },
    ];

    const mobileMenuItems = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            text: 'Add New Teacher',
            action: () => {
                navigate("/Admin/teachers/chooseclass");
                setMobileMenuOpen(false);
            }
        },
        {
            icon: <PersonRemoveIcon color="error" />,
            text: 'Delete All Teachers',
            action: () => {
                handleDeleteClick(currentUser._id, "Teachers");
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
                    Teacher Management
                </Typography>
                
                {/* Desktop/Tablet Controls */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search teachers..."
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
                            onClick={() => navigate("/Admin/teachers/chooseclass")}
                            startIcon={<PersonAddAlt1Icon />}
                            sx={{ borderRadius: 2 }}
                        >
                            Add Teacher
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
                                onClick={() => navigate("/Admin/teachers/chooseclass")}
                                size="small"
                                sx={{ borderRadius: 2, flex: 1 }}
                                startIcon={<PersonAddAlt1Icon sx={{ fontSize: '1rem' }} />}
                            >
                                Add
                            </GreenButton>
                        </Stack>
                        
                        <Collapse in={searchExpanded}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search teachers..."
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
                                Error loading teachers
                            </Typography>
                            <Button 
                                variant="outlined" 
                                onClick={() => dispatch(getAllTeachers(currentUser._id))}
                            >
                                Retry
                            </Button>
                        </Paper>
                    ) : filteredRows && filteredRows.length > 0 ? (
                        <Box>
                            {filteredRows.map((teacher) => (
                                <TeacherCard
                                    key={teacher.id}
                                    teacher={teacher}
                                    onView={(id) => navigate(`/Admin/teachers/teacher/${id}`)}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                            <Typography color="text.secondary">
                                No teachers found
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
                            <Typography color="error">Error loading teachers</Typography>
                            <Button 
                                variant="outlined" 
                                onClick={() => dispatch(getAllTeachers(currentUser._id))}
                            >
                                Retry
                            </Button>
                        </Box>
                    ) : (
                        <StyledDataGrid
                            rows={filteredRows || []}
                            columns={getTeacherColumns()}
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
                        {deleteAddress === "Teachers" 
                            ? "Are you sure you want to delete ALL teachers? This action cannot be undone."
                            : "Are you sure you want to delete this teacher? This action cannot be undone."}
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

export default ShowTeachers;