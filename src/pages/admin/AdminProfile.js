// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button, Collapse, TextField, Typography, Box, IconButton, Fade, Grid, Paper } from '@mui/material';
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// import { deleteUser, updateUser,getUserDetails  } from '../../redux/userRelated/userHandle';
// import { useNavigate } from 'react-router-dom';
// import { authLogout } from '../../redux/userRelated/userSlice';

// const AdminProfile = () => {
//     const [showEdit, setShowEdit] = useState(false);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [schoolName, setSchoolName] = useState('');
//     const [password, setPassword] = useState('');
//     //const { currentUser } = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const currentUser = useSelector((state) => state.user.currentUser);

//     useEffect(() => {
//         if (currentUser) {
//             dispatch(getUserDetails(currentUser._id, 'Admin')); 
//         }
//     }, [dispatch, currentUser]); // React to changes in the currentUser state
    
    
//     useEffect(() => {
//         if (currentUser) {
//             setName(currentUser.name);
//             setEmail(currentUser.email);
//             setSchoolName(currentUser.schoolName);
//         }
//     }, [currentUser]);


//     const handleUpdate = async (event) => {
//         event.preventDefault();
//         const updatedFields = { name, email, schoolName, password: password || undefined };
    
//         try {
//             await dispatch(updateUser(updatedFields, currentUser._id));
    
//             // Immediately update local state
//             setName(updatedFields.name);
//             setEmail(updatedFields.email);
//             setSchoolName(updatedFields.schoolName);
//             setPassword('');
//         } catch (error) {
//             console.error("Failed to update admin:", error);
//         }
//     };
    
    
    
//     const handleDelete = () => {
//         dispatch(deleteUser(currentUser._id));
//         dispatch(authLogout());
//         navigate('/');
//     };

//     return (
//         <Box sx={styles.container}>
//         <Typography variant="h4" sx={styles.header}>Admin Profile</Typography>
//         <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={styles.profileCard}>
//                     <Box sx={styles.profileInfo}>
//                         <Typography variant="h6">Name: <span>{currentUser?.name}</span></Typography>
//                         <Typography variant="h6">Email: <span>{currentUser?.email}</span></Typography>
//                         <Typography variant="h6">School: <span>{currentUser?.schoolName}</span></Typography>
//                     </Box>

//                     <Box sx={styles.buttonGroup}>
//                         <Button 
//                             variant="contained" 
//                             color="error" 
//                             onClick={handleDelete} 
//                             sx={styles.deleteButton}>
//                             Delete Account
//                         </Button>

//                         <IconButton onClick={() => setShowEdit(!showEdit)} sx={styles.toggleButton}>
//                             {showEdit ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                         </IconButton>

//                         <Button 
//                             variant="outlined" 
//                             onClick={() => setShowEdit(!showEdit)} 
//                             sx={styles.editButton}>
//                             {showEdit ? 'Cancel Edit' : 'Edit Profile'}
//                         </Button>
//                     </Box>

//                     <Collapse in={showEdit} timeout="auto">
//                         <Fade in={showEdit}>
//                             <form onSubmit={handleUpdate} style={styles.editForm}>
//                                 <Typography variant="h5" sx={styles.formTitle}>Edit Profile</Typography>
                                
//                                 <TextField
//                                     label="Name"
//                                     variant="outlined"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     sx={styles.textField}
//                                     required
//                                 />

//                                 <TextField
//                                     label="School Name"
//                                     variant="outlined"
//                                     value={schoolName}
//                                     onChange={(e) => setSchoolName(e.target.value)}
//                                     sx={styles.textField}
//                                     required
//                                 />

//                                 <TextField
//                                     label="Email"
//                                     type="email"
//                                     variant="outlined"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     sx={styles.textField}
//                                     required
//                                 />

//                                 <TextField
//                                     label="Password"
//                                     type="password"
//                                     variant="outlined"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     sx={styles.textField}
//                                 />

//                                 <Button type="submit" variant="contained" sx={styles.submitButton}>
//                                     Update
//                                 </Button>
//                             </form>
//                         </Fade>
//                     </Collapse>
//                 </Paper>
//             </Grid>
//         </Grid>
//     </Box>
//     );
// };

// export default AdminProfile;

// const styles = {
//     container: {
//         padding: '30px',
//         backgroundColor: '#f0f4f8',
//         borderRadius: '12px',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//     },
//     header: {
//         textAlign: 'center',
//         color: '#3f51b5',
//         marginBottom: '20px',
//     },
//     profileCard: {
//         backgroundColor: '#ffffff',
//         borderRadius: '10px',
//         padding: '20px',
//         boxShadow: '0 2px 15px rgba(0,0,0,0.2)',
//         transition: 'transform 0.3s',
//         '&:hover': {
//             transform: 'scale(1.02)',
//         },
//     },
//     profileInfo: {
//         marginBottom: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//         fontWeight: 'bold',
//         color: '#333',
//         '& span': {
//             fontWeight: 'normal',
//         },
//     },
//     buttonGroup: {
//         marginTop: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     deleteButton: {
//         backgroundColor: '#f44336',
//         '&:hover': {
//             backgroundColor: '#d32f2f',
//         },
//     },
//     toggleButton: {
//         color: '#3f51b5',
//     },
//     editButton: {
//         borderColor: '#3f51b5',
//         color: '#3f51b5',
//     },
//     editForm: {
//         marginTop: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '15px',
//     },
//     formTitle: {
//         marginBottom: '10px',
//         color: '#3f51b5',
//     },
//     textField: {
//         width: '100%',
//     },
//     submitButton: {
//         backgroundColor: '#3f51b5',
//         '&:hover': {
//             backgroundColor: '#303f9f',
//         },
//     },
// };
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Button, 
  Collapse, 
  TextField, 
  Typography, 
  Box, 
  IconButton, 
  Fade, 
  Grid, 
  Paper,
  Avatar,
  Divider,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { 
  KeyboardArrowDown, 
  KeyboardArrowUp,
  Edit,
  Delete,
  Save,
  Cancel,
  School,
  Email,
  Person
} from '@mui/icons-material';
import { deleteUser, updateUser, getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';

const AdminProfile = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserDetails(currentUser._id, 'Admin')); 
        }
    }, [dispatch, currentUser]);
    
    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setSchoolName(currentUser.schoolName);
        }
    }, [currentUser]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedFields = { name, email, schoolName, password: password || undefined };
    
        try {
            await dispatch(updateUser(updatedFields, currentUser._id));
            setName(updatedFields.name);
            setEmail(updatedFields.email);
            setSchoolName(updatedFields.schoolName);
            setPassword('');
            setShowEdit(false);
        } catch (error) {
            console.error("Failed to update admin:", error);
        }
    };
    
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            dispatch(deleteUser(currentUser._id));
            dispatch(authLogout());
            navigate('/');
        }
    };

    return (
        <Box sx={styles.container}>
            <Typography variant="h4" sx={styles.header}>
                Admin Dashboard
            </Typography>
            
            <Grid container justifyContent="center" spacing={4}>
                <Grid item xs={12} md={8} lg={6}>
                    <Card elevation={4} sx={styles.profileCard}>
                        <Box sx={styles.profileHeader}>
                            <Avatar 
                                sx={styles.avatar}
                                alt={currentUser?.name}
                                src="/static/images/avatar/admin-avatar.jpg"
                            />
                            <Typography variant="h5" sx={styles.profileName}>
                                {currentUser?.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                System Administrator
                            </Typography>
                        </Box>
                        
                        <Divider sx={styles.divider} />
                        
                        <CardContent>
                            <Box sx={styles.detailItem}>
                                <Person color="primary" sx={styles.detailIcon} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Full Name
                                    </Typography>
                                    <Typography>{currentUser?.name}</Typography>
                                </Box>
                            </Box>
                            
                            <Box sx={styles.detailItem}>
                                <Email color="primary" sx={styles.detailIcon} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Email Address
                                    </Typography>
                                    <Typography>{currentUser?.email}</Typography>
                                </Box>
                            </Box>
                            
                            <Box sx={styles.detailItem}>
                                <School color="primary" sx={styles.detailIcon} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        School
                                    </Typography>
                                    <Typography>{currentUser?.schoolName}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        
                        <CardActions sx={styles.cardActions}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={showEdit ? <Cancel /> : <Edit />}
                                onClick={() => setShowEdit(!showEdit)}
                                sx={styles.editButton}
                            >
                                {showEdit ? 'Cancel' : 'Edit Profile'}
                            </Button>
                            
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                onClick={handleDelete}
                                sx={styles.deleteButton}
                            >
                                Delete Account
                            </Button>
                        </CardActions>
                        
                        <Collapse in={showEdit}>
                            <Fade in={showEdit}>
                                <Box component="form" onSubmit={handleUpdate} sx={styles.editForm}>
                                    <Typography variant="h6" sx={styles.formTitle}>
                                        Update Profile
                                    </Typography>
                                    
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        variant="outlined"
                                        margin="normal"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="School Name"
                                        variant="outlined"
                                        margin="normal"
                                        value={schoolName}
                                        onChange={(e) => setSchoolName(e.target.value)}
                                        required
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        type="email"
                                        variant="outlined"
                                        margin="normal"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        variant="outlined"
                                        margin="normal"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        helperText="Leave blank to keep current password"
                                    />
                                    
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        startIcon={<Save />}
                                        sx={styles.saveButton}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Fade>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminProfile;

const styles = {
    container: {
        p: 4,
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
    },
    header: {
        mb: 4,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'primary.main',
    },
    profileCard: {
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    },
    profileHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
    },
    avatar: {
        width: 100,
        height: 100,
        mb: 2,
        border: '3px solid white',
        backgroundColor: 'primary.main',
    },
    profileName: {
        fontWeight: 'bold',
    },
    divider: {
        my: 1,
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        '&:last-child': {
            mb: 0,
        },
    },
    detailIcon: {
        fontSize: '2rem',
    },
    cardActions: {
        justifyContent: 'center',
        gap: 2,
        p: 2,
        borderTop: '1px solid rgba(0,0,0,0.12)',
    },
    editButton: {
        flexGrow: 1,
        maxWidth: 200,
    },
    deleteButton: {
        flexGrow: 1,
        maxWidth: 200,
    },
    editForm: {
        p: 3,
        backgroundColor: 'background.paper',
    },
    formTitle: {
        mb: 3,
        fontWeight: 'bold',
        color: 'primary.main',
    },
    saveButton: {
        mt: 2,
        py: 1.5,
    },
};