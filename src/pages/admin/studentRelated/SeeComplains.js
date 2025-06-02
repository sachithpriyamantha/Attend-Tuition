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
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Tooltip,
  Stack,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Badge,
  Alert,
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
  Collapse,
  Chip
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { GreenButton } from '../../../components/buttonStyles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
    fontWeight: '600',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
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
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

// Mobile Complaint Card Component
const ComplaintCard = ({ complaint, onDelete }) => (
  <Card sx={{ mb: 2, borderRadius: 2 }}>
    <CardContent sx={{ pb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar 
          sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: 'primary.main',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {complaint.user.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" noWrap>
            {complaint.user}
          </Typography>
          <Chip 
            label={complaint.date} 
            color="secondary" 
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ 
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          lineHeight: '1.4'
        }}
      >
        {complaint.complaint}
      </Typography>
    </CardContent>
    <CardActions sx={{ pt: 0, justifyContent: 'flex-end' }}>
      <Tooltip title="Mark as resolved">
        <Checkbox 
          inputProps={{ 'aria-label': 'Mark as resolved' }} 
          color="primary"
          size="small"
        />
      </Tooltip>
      <Tooltip title="Delete complaint">
        <IconButton 
          onClick={() => onDelete(complaint.id)}
          size="small"
          color="error"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>
);

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser._id, dispatch]);

  const handleDeleteClick = (deleteID) => {
    setDeleteId(deleteID);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    // Add your delete logic here
    console.log("Delete complaint with ID:", deleteId);
  };

  const filteredRows = complainsList
    ?.filter((complain) =>
      complain.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complain.complaint.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((complain) => ({
      id: complain._id,
      user: complain.user?.name || 'Unknown User',
      complaint: complain.complaint,
      date: new Date(complain.date).toLocaleDateString() || "Invalid Date",
    })) || [];

  const getComplainColumns = () => {
    const baseColumns = [
      { 
        field: 'user', 
        headerName: 'User', 
        flex: isMobile ? 2 : 1.5,
        minWidth: isMobile ? 120 : 150,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
            <Typography variant={isMobile ? "caption" : "body1"} fontWeight={500} noWrap>
              {params.value}
            </Typography>
          </Box>
        )
      },
      { 
        field: 'complaint', 
        headerName: 'Complaint', 
        flex: isMobile ? 3 : 2,
        minWidth: isMobile ? 150 : 200,
        renderCell: (params) => (
          <Typography 
            variant={isMobile ? "caption" : "body2"} 
            color="text.secondary"
            sx={{ 
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              lineHeight: '1.4'
            }}
          >
            {params.value}
          </Typography>
        )
      },
      {
        field: 'actions', 
        headerName: 'Actions', 
        flex: isMobile ? 1 : 1,
        minWidth: isMobile ? 80 : 100,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Tooltip title="Mark as resolved">
              <Checkbox 
                inputProps={{ 'aria-label': 'Mark as resolved' }} 
                color="primary"
                size="small"
              />
            </Tooltip>
            <Tooltip title="Delete complaint">
              <IconButton 
                onClick={() => handleDeleteClick(params.row.id)}
                size="small"
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    ];

    // Add date column for larger screens
    if (!isMobile) {
      baseColumns.splice(-1, 0, { 
        field: 'date', 
        headerName: 'Date', 
        flex: 1,
        minWidth: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Badge 
            color="secondary"
            sx={{ 
              padding: '6px 12px',
              borderRadius: '16px',
              backgroundColor: 'action.selected',
              '& .MuiBadge-badge': {
                display: 'none'
              }
            }}
          >
            {params.value}
          </Badge>
        )
      });
    }

    return baseColumns;
  };

  const actions = [
    {
      icon: <DeleteIcon color="error" />,
      name: 'Delete Selected',
      action: () => {
        if (selectedRows.length > 0) {
          // Handle bulk delete
          console.log("Delete selected complaints:", selectedRows);
        }
      }
    }
  ];

  const mobileMenuItems = [
    {
      icon: <DeleteIcon color="error" />,
      text: 'Delete Selected',
      action: () => {
        if (selectedRows.length > 0) {
          // Handle bulk delete
          console.log("Delete selected complaints:", selectedRows);
        }
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
          Complaint Management
        </Typography>
        
        {/* Desktop/Tablet Controls */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  minWidth: isTablet ? 200 : 300
                }
              }}
            />
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
            </Stack>
            
            <Collapse in={searchExpanded}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search complaints..."
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
                Error loading complaints
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => dispatch(getAllComplains(currentUser._id, "Complain"))}
              >
                Retry
              </Button>
            </Paper>
          ) : filteredRows && filteredRows.length > 0 ? (
            <Box>
              {filteredRows.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onDelete={handleDeleteClick}
                />
              ))}
            </Box>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography color="text.secondary">
                {searchTerm ? "No matching complaints found" : "No complaints found"}
              </Typography>
              {searchTerm && (
                <Button 
                  variant="text" 
                  onClick={() => setSearchTerm("")}
                  sx={{ mt: 1 }}
                >
                  Clear search
                </Button>
              )}
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
              <Typography color="error">Error loading complaints</Typography>
              <Button 
                variant="outlined" 
                onClick={() => dispatch(getAllComplains(currentUser._id, "Complain"))}
              >
                Retry
              </Button>
            </Box>
          ) : filteredRows.length === 0 ? (
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
              minHeight: 200
            }}>
              <Typography variant="h6" color="textSecondary">
                {searchTerm ? "No matching complaints found" : "No complaints found"}
              </Typography>
              {searchTerm && (
                <Button 
                  variant="text" 
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </Button>
              )}
            </Box>
          ) : (
            <StyledDataGrid
              rows={filteredRows}
              columns={getComplainColumns()}
              pageSize={isMobile ? 5 : isTablet ? 8 : 10}
              rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 20]}
              disableSelectionOnClick
              checkboxSelection
              onSelectionModelChange={(ids) => setSelectedRows(ids)}
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
      {!isMobile && selectedRows.length > 0 && <SpeedDialTemplate actions={actions} />}
      
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
            Are you sure you want to delete this complaint? This action cannot be undone.
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

export default SeeComplains;