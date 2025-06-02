import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { 
  Box, 
  IconButton, 
  Paper, 
  Typography,
  TextField,
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
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Stack,
  Badge
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GreenButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
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

// Mobile Class Card Component
const ClassCard = ({ sclass, onView, onDelete }) => (
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
          {sclass.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" noWrap>
            {sclass.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`${sclass.studentCount} students`} 
              color="primary" 
              size="small"
              variant="outlined"
            />
            <Chip 
              label={`${sclass.subjectCount} subjects`} 
              color="secondary" 
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </CardContent>
    <CardActions sx={{ pt: 0, justifyContent: 'flex-end' }}>
      <Tooltip title="View Class">
        <IconButton onClick={() => onView(sclass.id)} color="primary" size="small">
          <RemoveRedEyeIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Class">
        <IconButton onClick={() => onDelete(sclass.id, "Sclass")} color="error" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>
);

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { sclassesList, loading, error } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);
  const adminID = currentUser._id;

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteAddress, setDeleteAddress] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

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
      .catch(err => {
        setMessage("Failed to delete class. Please try again.");
        setShowPopup(true);
      });
  };

  const filteredRows = sclassesList && sclassesList.length > 0 
    ? sclassesList
        .filter(sclass => 
          sclass.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((sclass) => ({
          id: sclass._id,
          name: sclass.sclassName,
          studentCount: sclass.students ? sclass.students.length : 0,
          subjectCount: sclass.subjects ? sclass.subjects.length : 0,
        }))
    : [];

  const getClassColumns = () => {
    const baseColumns = [
      { 
        field: 'name', 
        headerName: 'Class', 
        flex: isMobile ? 2 : 1.5,
        minWidth: isMobile ? 150 : 180,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ 
              width: isMobile ? 24 : 32, 
              height: isMobile ? 24 : 32, 
              bgcolor: 'primary.main',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: 'bold'
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
        field: 'studentCount', 
        headerName: 'Students', 
        flex: 0.8,
        minWidth: isMobile ? 80 : 100,
        align: 'center', 
        headerAlign: 'center',
        renderCell: (params) => (
          <Badge 
            badgeContent={params.value} 
            color="primary"
            max={999}
            sx={{ '& .MuiBadge-badge': { right: -5 } }}
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
            <Tooltip title="View Class">
              <IconButton 
                onClick={() => navigate(`/Admin/classes/class/${params.row.id}`)}
                color="primary"
                size="small"
              >
                <RemoveRedEyeIcon fontSize={isMobile ? "small" : "small"} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Class">
              <IconButton 
                onClick={() => handleDeleteClick(params.row.id, "Sclass")}
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

    // Add subjects column for larger screens
    if (!isMobile) {
      baseColumns.splice(-1, 0, { 
        field: 'subjectCount', 
        headerName: 'Subjects', 
        flex: 0.8,
        minWidth: 100,
        align: 'center', 
        headerAlign: 'center',
        renderCell: (params) => (
          <Badge 
            badgeContent={params.value} 
            color="secondary"
            max={999}
            sx={{ '& .MuiBadge-badge': { right: -5 } }}
          />
        )
      });
    }

    return baseColumns;
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, 
      name: 'Add New Class',
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />, 
      name: 'Delete All Classes',
      action: () => handleDeleteClick(adminID, "Sclasses"),
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
                Error loading classes
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => dispatch(getAllSclasses(adminID, "Sclass"))}
              >
                Retry
              </Button>
            </Paper>
          ) : filteredRows && filteredRows.length > 0 ? (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {filteredRows.length} classes found
              </Typography>
              {filteredRows.map((sclass) => (
                <ClassCard
                  key={sclass.id}
                  sclass={sclass}
                  onView={(id) => navigate(`/Admin/classes/class/${id}`)}
                  onDelete={handleDeleteClick}
                />
              ))}
            </Box>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                No classes found
              </Typography>
              {searchTerm && (
                <Button 
                  variant="text" 
                  onClick={() => setSearchTerm("")}
                  size="small"
                  sx={{ mb: 2 }}
                >
                  Clear search
                </Button>
              )}
              <GreenButton 
                variant="contained" 
                onClick={() => navigate("/Admin/addclass")}
                startIcon={<AddCardIcon />}
              >
                Add Your First Class
              </GreenButton>
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
              <Typography color="error">Error loading classes</Typography>
              <Button 
                variant="outlined" 
                onClick={() => dispatch(getAllSclasses(adminID, "Sclass"))}
              >
                Retry
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {filteredRows?.length || 0} classes found
                </Typography>
              </Box>
              <StyledDataGrid
                rows={filteredRows || []}
                columns={getClassColumns()}
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
            </>
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
            {deleteAddress === "Sclasses" 
              ? "Are you sure you want to delete ALL classes? This action cannot be undone."
              : "Are you sure you want to delete this class? This action cannot be undone."}
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

export default ShowClasses;