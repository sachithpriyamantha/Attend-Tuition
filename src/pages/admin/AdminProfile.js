import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Collapse, TextField, Typography, Box, IconButton, Fade, Grid, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { deleteUser, updateUser,getUserDetails  } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';

const AdminProfile = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [password, setPassword] = useState('');
    //const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserDetails(currentUser._id, 'Admin')); 
        }
    }, [dispatch, currentUser]); // React to changes in the currentUser state
    
    
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
    
            // Immediately update local state
            setName(updatedFields.name);
            setEmail(updatedFields.email);
            setSchoolName(updatedFields.schoolName);
            setPassword('');
        } catch (error) {
            console.error("Failed to update admin:", error);
        }
    };
    
    
    
    const handleDelete = () => {
        dispatch(deleteUser(currentUser._id));
        dispatch(authLogout());
        navigate('/');
    };

    return (
        <Box sx={styles.container}>
        <Typography variant="h4" sx={styles.header}>Admin Profile</Typography>
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={styles.profileCard}>
                    <Box sx={styles.profileInfo}>
                        <Typography variant="h6">Name: <span>{currentUser?.name}</span></Typography>
                        <Typography variant="h6">Email: <span>{currentUser?.email}</span></Typography>
                        <Typography variant="h6">School: <span>{currentUser?.schoolName}</span></Typography>
                    </Box>

                    <Box sx={styles.buttonGroup}>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={handleDelete} 
                            sx={styles.deleteButton}>
                            Delete Account
                        </Button>

                        <IconButton onClick={() => setShowEdit(!showEdit)} sx={styles.toggleButton}>
                            {showEdit ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>

                        <Button 
                            variant="outlined" 
                            onClick={() => setShowEdit(!showEdit)} 
                            sx={styles.editButton}>
                            {showEdit ? 'Cancel Edit' : 'Edit Profile'}
                        </Button>
                    </Box>

                    <Collapse in={showEdit} timeout="auto">
                        <Fade in={showEdit}>
                            <form onSubmit={handleUpdate} style={styles.editForm}>
                                <Typography variant="h5" sx={styles.formTitle}>Edit Profile</Typography>
                                
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    sx={styles.textField}
                                    required
                                />

                                <TextField
                                    label="School Name"
                                    variant="outlined"
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    sx={styles.textField}
                                    required
                                />

                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={styles.textField}
                                    required
                                />

                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={styles.textField}
                                />

                                <Button type="submit" variant="contained" sx={styles.submitButton}>
                                    Update
                                </Button>
                            </form>
                        </Fade>
                    </Collapse>
                </Paper>
            </Grid>
        </Grid>
    </Box>
    );
};

export default AdminProfile;

const styles = {
    container: {
        padding: '30px',
        backgroundColor: '#f0f4f8',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#3f51b5',
        marginBottom: '20px',
    },
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },
    profileInfo: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontWeight: 'bold',
        color: '#333',
        '& span': {
            fontWeight: 'normal',
        },
    },
    buttonGroup: {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        '&:hover': {
            backgroundColor: '#d32f2f',
        },
    },
    toggleButton: {
        color: '#3f51b5',
    },
    editButton: {
        borderColor: '#3f51b5',
        color: '#3f51b5',
    },
    editForm: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formTitle: {
        marginBottom: '10px',
        color: '#3f51b5',
    },
    textField: {
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#3f51b5',
        '&:hover': {
            backgroundColor: '#303f9f',
        },
    },
};
