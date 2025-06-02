import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from '@mui/icons-material/AddCard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ClassIcon from '@mui/icons-material/Class';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { 
  Box, 
  IconButton, 
  ListItemIcon, 
  Menu, 
  MenuItem, 
  Tooltip, 
  useMediaQuery, 
  useTheme,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Chip,
  Avatar,
  Grid,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fab
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
  },
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

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
  },
}));

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  const adminID = currentUser._id;

  // State management
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteAddress, setDeleteAddress] = useState("");

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const handleDeleteClick = (deleteID, address) => {
    setDeleteId(deleteID);
    setDeleteAddress(address);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    dispatch(deleteUser(deleteId, deleteAddress))
      .then(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
        setMessage("Class deleted successfully");
        setShowPopup(true);
      })
      .catch((err) => {
        setMessage("Failed to delete class. Please try again.");
        setShowPopup(true);
      });
  };

  // Filter classes based on search term
  const filteredClasses = sclassesList?.filter(sclass =>
    sclass.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Mobile Class Card Component
  const ClassCard = ({ sclass }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const actions = [
      { 
        icon: <PostAddIcon />, 
        name: 'Add Subjects', 
        action: () => {
          navigate("/Admin/addsubject/" + sclass._id);
          handleMenuClose();
        }
      },
      { 
        icon: <PersonAddAlt1Icon />, 
        name: 'Add Student', 
        action: () => {
          navigate("/Admin/class/addstudents/" + sclass._id);
          handleMenuClose();
        }
      },
    ];

    return (
      <StyledCard>
        <CardContent sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              <ClassIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" noWrap>
                {sclass.sclassName}
              </Typography>
              <Chip 
                label="Active Class" 
                color="success" 
                size="small" 
                variant="outlined"
                sx={{ mt: 0.5 }}
              />
            </Box>
            <IconButton
              onClick={handleMenuClick}
              size="small"
              sx={{ 
                bgcolor: open ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </CardContent>
        
        <CardActions sx={{ pt: 0, justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => navigate("/Admin/classes/class/" + sclass._id)}
              sx={{ borderRadius: 2 }}
            >
              View
            </Button>
            <Tooltip title="Delete Class">
              <IconButton 
                onClick={() => handleDeleteClick(sclass._id, "Sclass")} 
                color="error" 
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 180
            }
          }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action}>
              <ListItemIcon>
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </StyledCard>
    );
  };

  // Desktop Table Actions Component
  const TableActions = ({ sclass }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const actions = [
      { 
        icon: <PostAddIcon />, 
        name: 'Add Subjects', 
        action: () => {
          navigate("/Admin/addsubject/" + sclass._id);
          handleClose();
        }
      },
      { 
        icon: <PersonAddAlt1Icon />, 
        name: 'Add Student', 
        action: () => {
          navigate("/Admin/class/addstudents/" + sclass._id);
          handleClose();
        }
      },
    ];

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="View Details">
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/Admin/classes/class/" + sclass._id)}
            sx={{ borderRadius: 2 }}
          >
            View Details
          </Button>
        </Tooltip>
        
        <Tooltip title="Add Options">
          <IconButton onClick={handleClick} size="small">
            <AddCardIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Delete Class">
          <IconButton 
            onClick={() => handleDeleteClick(sclass._id, "Sclass")} 
            color="error" 
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: { borderRadius: 2, mt: 1 }
          }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action}>
              <ListItemIcon>
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  // Table columns for desktop view
  const tableColumns = [
    {
      field: 'name',
      headerName: 'Class Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
            <ClassIcon fontSize="small" />
          </Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <TableActions sclass={params.row} />
    }
  ];

  // Prepare table rows
  const tableRows = filteredClasses.map(sclass => ({
    id: sclass._id,
    name: sclass.sclassName,
    _id: sclass._id
  }));

  const speedDialActions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />,
      name: 'Delete All Classes',
      action: () => handleDeleteClick(adminID, "Sclasses")
    },
  ];

  const mobileMenuItems = [
    {
      icon: <AddCardIcon color="primary" />,
      text: 'Add New Class',  
      action: () => {
        navigate("/Admin/addclass");
        setMobileMenuOpen(false);
      }
    },
    {
      icon: <DeleteIcon color="error" />,
      text: 'Delete All Classes',
      action: () => {
        handleDeleteClick(adminID, "Sclasses");
        setMobileMenuOpen(false);
      }
    }
  ];

  if (error) {
    console.log(error);
  }

  return (
    <Box sx={{ 
      p: isMobile ? 1 : isTablet ? 2 : 3,
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '60vh',
          flexDirection: 'column',
          gap: 2
        }}>
          <CircularProgress size={48} />
          <Typography variant="h6" color="text.secondary">
            Loading classes...
          </Typography>
        </Box>
      ) : getresponse ? (
        // Empty state when no classes exist
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '60vh',
          gap: 3,
          textAlign: 'center'
        }}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'primary.main',
            mb: 2
          }}>
            <ClassIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            No Classes Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            Get started by creating your first class. You can then add subjects and students to it.
          </Typography>
          <GreenButton 
            variant="contained" 
            onClick={() => navigate("/Admin/addclass")}
            size="large"
            sx={{ borderRadius: 3, px: 4, py: 1.5 }}
          >
            Add Your First Class
          </GreenButton>
        </Box>
      ) : (
        <>
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
              Class Management
            </Typography>
            
            {/* Desktop/Tablet Controls */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  variant="outlined"
                  placeholder="Search classes..."
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
                  onClick={() => navigate("/Admin/addclass")}
                  startIcon={<AddCardIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Add Class
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
                    onClick={() => navigate("/Admin/addclass")}
                    size="small"
                    sx={{ borderRadius: 2, flex: 1 }}
                  >
                    Add Class
                  </GreenButton>
                </Stack>
                
                <Collapse in={searchExpanded}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search classes..."
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
          {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
            isMobile ? (
              // Mobile Card View
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((sclass) => (
                    <ClassCard key={sclass._id} sclass={sclass} />
                  ))
                ) : (
                  <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
                    <Typography color="text.secondary">
                      No classes match your search
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
                  height: 'calc(100vh - 200px)',
                  minHeight: 400
                }}
              >
                <StyledDataGrid
                  rows={tableRows}
                  columns={tableColumns}
                  pageSize={isMobile ? 5 : isTablet ? 8 : 10}
                  rowsPerPageOptions={[5, 10, 20]}
                  disableSelectionOnClick
                  sx={{
                    '& .MuiDataGrid-virtualScroller': {
                      minHeight: 200,
                    }
                  }}
                />
              </Paper>
            )
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No classes found
              </Typography>
              <GreenButton 
                variant="contained" 
                onClick={() => navigate("/Admin/addclass")}
                startIcon={<AddCardIcon />}
              >
                Add Your First Class
              </GreenButton>
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
          {!isMobile && <SpeedDialTemplate actions={speedDialActions} />}
        </>
      )}

      {/* Delete Confirmation Dialog */}
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
            {deleteAddress === "Sclasses" 
              ? "Are you sure you want to delete ALL classes? This action cannot be undone and will remove all associated data."
              : "Are you sure you want to delete this class? This action cannot be undone and will remove all associated students and subjects."}
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

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default ShowClasses;