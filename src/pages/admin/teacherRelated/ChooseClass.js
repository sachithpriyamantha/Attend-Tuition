import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ]

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    })

    const SclassButtonHaver = ({ row }) => {
        return (
            <>
                <PurpleButton variant="contained"
                    onClick={() => navigateHandler(row.id)}>
                    Choose
                </PurpleButton>
            </>
        );
    };

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {getresponse ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={() => navigate("/Admin/addclass")}>
                                Add Class
                            </Button>
                        </Box>
                        :
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Choose a clas
                            </Typography>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                            }
                        </>}
                </>
            }
        </>
    )
}

export default ChooseClass













// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Box, 
//   Button, 
//   Typography, 
//   Paper,
//   CircularProgress,
//   Avatar,
//   Chip,
//   Stack,
//   TextField,
//   InputAdornment,
//   Tooltip
// } from '@mui/material';
// import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
// import { useNavigate } from 'react-router-dom';
// import { PurpleButton } from '../../../components/buttonStyles';
// import SearchIcon from '@mui/icons-material/Search';
// import ClassIcon from '@mui/icons-material/Class';
// import AddIcon from '@mui/icons-material/Add';
// import { DataGrid } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//   '& .MuiDataGrid-columnHeaders': {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     fontSize: '0.875rem',
//     fontWeight: '600',
//     borderTopLeftRadius: theme.shape.borderRadius,
//     borderTopRightRadius: theme.shape.borderRadius,
//   },
//   '& .MuiDataGrid-cell': {
//     borderBottom: `1px solid ${theme.palette.divider}`,
//   },
//   '& .MuiDataGrid-row': {
//     '&:hover': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     '&.Mui-selected': {
//       backgroundColor: theme.palette.action.selected,
//       '&:hover': {
//         backgroundColor: theme.palette.action.selected,
//       },
//     },
//   },
// }));

// const ChooseClass = ({ situation }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
//     const { currentUser } = useSelector(state => state.user);
//     const [searchTerm, setSearchTerm] = React.useState("");

//     useEffect(() => {
//         dispatch(getAllSclasses(currentUser._id, "Sclass"));
//     }, [currentUser._id, dispatch]);

//     const navigateHandler = (classID) => {
//         if (situation === "Teacher") {
//             navigate("/Admin/teachers/choosesubject/" + classID);
//         }
//         else if (situation === "Subject") {
//             navigate("/Admin/addsubject/" + classID);
//         }
//     };

//     const filteredRows = sclassesList && sclassesList.length > 0 && sclassesList
//         .filter((sclass) =>
//             sclass.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .map((sclass) => ({
//             id: sclass._id,
//             name: sclass.sclassName,
//         }));

//     const classColumns = [
//         { 
//             field: 'name', 
//             headerName: 'Class Name', 
//             flex: 1,
//             renderCell: (params) => (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                     <Avatar 
//                         sx={{ 
//                             width: 34, 
//                             height: 34, 
//                             bgcolor: 'primary.main',
//                         }}
//                     >
//                         <ClassIcon fontSize="small" />
//                     </Avatar>
//                     <Typography variant="body1" fontWeight={500}>
//                         {params.value}
//                     </Typography>
//                 </Box>
//             )
//         },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             flex: 0.5,
//             sortable: false,
//             filterable: false,
//             renderCell: (params) => (
//                 <Tooltip title={`Choose ${params.row.name}`}>
//                     <PurpleButton 
//                         variant="contained"
//                         onClick={() => navigateHandler(params.row.id)}
//                         size="small"
//                         startIcon={<AddIcon />}
//                     >
//                         Choose
//                     </PurpleButton>
//                 </Tooltip>
//             )
//         }
//     ];

//     return (
//         <Box sx={{ p: 3 }}>
//             <Box sx={{ 
//                 display: 'flex', 
//                 justifyContent: 'space-between', 
//                 alignItems: 'center',
//                 mb: 4,
//                 flexWrap: 'wrap',
//                 gap: 2
//             }}>
//                 <Typography variant="h4" fontWeight="bold" color="textPrimary">
//                     {situation === "Teacher" ? "Select Class for Teacher" : "Select Class for Subject"}
//                 </Typography>
                
//                 <Box sx={{ 
//                     display: 'flex', 
//                     gap: 2,
//                     flexWrap: 'wrap',
//                     width: { xs: '100%', sm: 'auto' }
//                 }}>
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         placeholder="Search classes..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                             sx: {
//                                 backgroundColor: 'background.paper',
//                                 borderRadius: 2,
//                                 minWidth: 250
//                             }
//                         }}
//                     />
//                     {getresponse && (
//                         <Button 
//                             variant="contained" 
//                             onClick={() => navigate("/Admin/addclass")}
//                             startIcon={<AddIcon />}
//                             sx={{ 
//                                 borderRadius: 2,
//                                 whiteSpace: 'nowrap'
//                             }}
//                         >
//                             Add New Class
//                         </Button>
//                     )}
//                 </Box>
//             </Box>

//             <Paper elevation={0} sx={{ 
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 border: '1px solid',
//                 borderColor: 'divider',
//                 height: 'calc(100vh - 200px)'
//             }}>
//                 {loading ? (
//                     <Box sx={{ 
//                         height: '100%', 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         justifyContent: 'center' 
//                     }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : error ? (
//                     <Box sx={{ 
//                         height: '100%', 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         justifyContent: 'center',
//                         flexDirection: 'column',
//                         gap: 2
//                     }}>
//                         <Typography color="error">Error loading classes</Typography>
//                         <Button 
//                             variant="outlined" 
//                             onClick={() => dispatch(getAllSclasses(currentUser._id, "Sclass"))}
//                         >
//                             Retry
//                         </Button>
//                     </Box>
//                 ) : (
//                     <StyledDataGrid
//                         rows={filteredRows || []}
//                         columns={classColumns}
//                         pageSize={10}
//                         rowsPerPageOptions={[5, 10, 20]}
//                         disableSelectionOnClick
//                         sx={{
//                             '& .MuiDataGrid-virtualScroller': {
//                                 minHeight: 200,
//                             }
//                         }}
//                     />
//                 )}
//             </Paper>
//         </Box>
//     );
// };

// export default ChooseClass;