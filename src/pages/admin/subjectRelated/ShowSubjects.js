// import DeleteIcon from "@mui/icons-material/Delete";
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { GreenButton } from '../../../components/buttonStyles';
// import Popup from '../../../components/Popup';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';

// const ShowSubjects = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { subjectsList, loading, error } = useSelector((state) => state.sclass);
//     const { currentUser } = useSelector(state => state.user);

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
//     }, [currentUser._id, dispatch]);

//     if (error) {
//         console.log(error);
//     }

//     const deleteHandler = (deleteID, address) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
//         if (!confirmDelete) {
//             return;
//         }

//         dispatch(deleteUser(deleteID, address))
//             .then(() => {
//                 dispatch(getSubjectList(currentUser._id, "AllSubjects"));
//             })
//             .catch(err => {
//                 setMessage("Failed to delete subject. Please try again.");
//                 setShowPopup(true);
//             });
//     };

//     const filteredRows = subjectsList && subjectsList.length > 0 && subjectsList
//         .filter((subject) =>
//             subject.subName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             subject.sclassName.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .map((subject) => ({
//             id: subject._id,
//             subName: subject.subName,
//             sessions: subject.sessions,
//             sclassName: subject.sclassName.sclassName,
//         }));

//     const subjectColumns = [
//         { field: 'subName', headerName: 'Subject Name', flex: 1.2, minWidth: 150, align: 'left', headerAlign: 'left' },
//         { field: 'sessions', headerName: 'Sessions', flex: 1, minWidth: 100, align: 'center', headerAlign: 'center' },
//         { field: 'sclassName', headerName: 'Class', flex: 1, minWidth: 100, align: 'center', headerAlign: 'center' },
//         {
//             field: 'actions', headerName: 'Actions', flex: 0.8, minWidth: 150, align: 'center', headerAlign: 'center', renderCell: (params) => (
//                 <>
//                     <IconButton onClick={() => deleteHandler(params.row.id, "Subject")}>
//                         <DeleteIcon color="error" fontSize="small" />
//                     </IconButton>

//                     <IconButton onClick={() => navigate(`/Admin/subjects/subject/${params.row.id}`)}>
//                         <RemoveRedEyeIcon color="primary" fontSize="small" />
//                     </IconButton>
//                 </>
//             )
//         }
//     ];

//     const actions = [
//         {
//             icon: <PostAddIcon color="primary" />,
//             name: 'Add New Subject',
//             action: () => navigate("/Admin/subjects/chooseclass")
//         },
//         {
//             icon: <DeleteIcon color="error" />,
//             name: 'Delete All Subjects',
//             action: () => deleteHandler(currentUser._id, "Subjects")
//         },
//     ];

//     return (
//         <>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', marginBottom: '16px' , marginLeft: '10px'}} >
//                 {/* Left side: Search bar */}
//                 <Box sx={{ width: '300px' }}>
//                     <TextField
//                         label="Search..."
//                         variant="outlined"
//                         fullWidth
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Search subject name, class, etc..."
//                         size="small"
//                     />
//                 </Box>

//                 {/* Center: Table heading */}
//                 <Typography variant="h5" align="center" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
//                     Subject List
//                 </Typography>

//                 {/* Right side: Add Subject button */}
//                 <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")} style={{ marginRight: 10 }}>
//                     Add Subject
//                 </GreenButton>
//             </Box>

//             <Paper sx={{ width: '95%', margin: 'auto', overflow: 'hidden', padding: '16px', borderRadius: '12px', backgroundColor: '#a2d2ff' }}>
//                 {!loading && Array.isArray(filteredRows) && filteredRows.length > 0 ? (
//                     <DataGrid
//                         rows={filteredRows}
//                         columns={subjectColumns}
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

// export default ShowSubjects;

import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
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
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
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

// Mobile Subject Card Component
const SubjectCard = ({ subject, onView, onDelete }) => (
  <Card sx={{ mb: 2, borderRadius: 2 }}>
    <CardContent sx={{ pb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'secondary.main' }}>
          {subject.subName.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" noWrap>
            {subject.subName}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`${subject.sessions} Sessions`} 
              color="primary" 
              size="small"
              variant="outlined"
            />
            <Chip 
              label={subject.sclassName} 
              color="secondary" 
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </CardContent>
    <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
      <Box>
        <Tooltip title="View Subject">
          <IconButton onClick={() => onView(subject.id)} color="primary" size="small">
            <RemoveRedEyeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Subject">
          <IconButton onClick={() => onDelete(subject.id, "Subject")} color="error" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </CardActions>
  </Card>
);

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { subjectsList, loading, error } = useSelector((state) => state.sclass);
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
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
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
                dispatch(getSubjectList(currentUser._id, "AllSubjects"));
                setMessage("Subject deleted successfully");
                setShowPopup(true);
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

    // Responsive column configuration
    const getSubjectColumns = () => {
        const baseColumns = [
            { 
                field: 'subName', 
                headerName: 'Subject', 
                flex: isMobile ? 2 : 1.5,
                minWidth: isMobile ? 120 : 150,
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ 
                            width: isMobile ? 24 : 32, 
                            height: isMobile ? 24 : 32, 
                            bgcolor: 'secondary.main',
                            fontSize: isMobile ? '0.75rem' : '1rem'
                        }}>
                            {params.value.charAt(0)}
                        </Avatar>
                        <Typography variant={isMobile ? "caption" : "body2"} noWrap>
                            {params.value}
                        </Typography>
                    </Box>
                )
            },
            { 
                field: 'sessions', 
                headerName: 'Sessions', 
                flex: 0.8,
                minWidth: isMobile ? 80 : 100,
                align: 'center', 
                headerAlign: 'center',
                renderCell: (params) => (
                    <Chip 
                        label={params.value} 
                        color="primary" 
                        size={isMobile ? "small" : "small"}
                        variant="outlined"
                        sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
                    />
                )
            },
            {
                field: 'actions', 
                headerName: 'Actions', 
                flex: isMobile ? 1 : 1,
                minWidth: isMobile ? 80 : 120,
                align: 'center', 
                headerAlign: 'center', 
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', gap: isMobile ? 0.5 : 1 }}>
                        <Tooltip title="View">
                            <IconButton 
                                onClick={() => navigate(`/Admin/subjects/subject/${params.row.id}`)}
                                color="primary"
                                size="small"
                            >
                                <RemoveRedEyeIcon fontSize={isMobile ? "small" : "small"} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton 
                                onClick={() => handleDeleteClick(params.row.id, "Subject")}
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
                flex: 1,
                minWidth: 100,
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

        return baseColumns;
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />,
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Subjects',
            action: () => handleDeleteClick(currentUser._id, "Subjects")
        },
    ];

    const mobileMenuItems = [
        {
            icon: <PostAddIcon color="primary" />,
            text: 'Add New Subject',
            action: () => {
                navigate("/Admin/subjects/chooseclass");
                setMobileMenuOpen(false);
            }
        },
        {
            icon: <DeleteIcon color="error" />,
            text: 'Delete All Subjects',
            action: () => {
                handleDeleteClick(currentUser._id, "Subjects");
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
                    Subject Management
                </Typography>
                
                {/* Desktop/Tablet Controls */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search subjects..."
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
                            onClick={() => navigate("/Admin/subjects/chooseclass")}
                            startIcon={<PostAddIcon />}
                            sx={{ borderRadius: 2 }}
                        >
                            Add Subject
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
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                                size="small"
                                sx={{ borderRadius: 2, flex: 1 }}
                            >
                                Add Subject
                            </GreenButton>
                        </Stack>
                        
                        <Collapse in={searchExpanded}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search subjects..."
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
                                Error loading subjects
                            </Typography>
                            <Button 
                                variant="outlined" 
                                onClick={() => dispatch(getSubjectList(currentUser._id, "AllSubjects"))}
                            >
                                Retry
                            </Button>
                        </Paper>
                    ) : filteredRows && filteredRows.length > 0 ? (
                        <Box>
                            {filteredRows.map((subject) => (
                                <SubjectCard
                                    key={subject.id}
                                    subject={subject}
                                    onView={(id) => navigate(`/Admin/subjects/subject/${id}`)}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                            <Typography color="text.secondary">
                                No subjects found
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
                            <Typography color="error">Error loading subjects</Typography>
                            <Button 
                                variant="outlined" 
                                onClick={() => dispatch(getSubjectList(currentUser._id, "AllSubjects"))}
                            >
                                Retry
                            </Button>
                        </Box>
                    ) : (
                        <StyledDataGrid
                            rows={filteredRows || []}
                            columns={getSubjectColumns()}
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
                        {deleteAddress === "Subjects" 
                            ? "Are you sure you want to delete ALL subjects? This action cannot be undone."
                            : "Are you sure you want to delete this subject? This action cannot be undone."}
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

export default ShowSubjects;