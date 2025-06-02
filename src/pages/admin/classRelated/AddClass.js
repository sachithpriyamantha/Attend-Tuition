import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  CircularProgress, 
  Stack, 
  TextField,
  Typography,
  Paper,
  Avatar,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { GreenButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h4" fontWeight="bold" color="textPrimary">
                    Create New Class
                </Typography>
                
                <Button 
                    variant="outlined" 
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIcon />}
                    sx={{ borderRadius: 2 }}
                >
                    Go Back
                </Button>
            </Box>

            <Paper elevation={0} sx={{ 
                maxWidth: 600,
                mx: 'auto',
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper'
            }}>
                <Stack spacing={4} alignItems="center">
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'primary.main',
                            mb: 2
                        }}
                    >
                        <SchoolIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    
                    <img
                        src={Classroom}
                        alt="classroom"
                        style={{ 
                            width: '100%', 
                            maxWidth: 400,
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    />

                    <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Class Name"
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => setSclassName(event.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SchoolIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            
                            <GreenButton
                                fullWidth
                                size="large"
                                variant="contained"
                                type="submit"
                                disabled={loader}
                                sx={{ height: 48 }}
                            >
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Create Class"
                                )}
                            </GreenButton>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>

            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
                severity={message.includes("Failed") ? "error" : "success"}
            />
        </Box>
    );
};

export default AddClass;