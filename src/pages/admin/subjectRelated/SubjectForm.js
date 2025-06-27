import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Grid, 
  Typography, 
  CircularProgress, 
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Stack,
  InputAdornment
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  maxWidth: '1200px',
  width: '100%',
  margin: theme.spacing(4, 'auto'),
}));

const generateSubjectCode = (subjectName) => {
  if (!subjectName) return "";
  
  // Remove special characters and convert to uppercase
  const cleanedName = subjectName
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toUpperCase();
  
  // Take first 3 letters of the subject name
  const letters = cleanedName.replace(/\s/g, "").slice(0, 3).padEnd(3, 'X');
  
  // Generate a random 3-digit number
  const randomNum = Math.floor(100 + Math.random() * 900);
  
  // Combine letters and number
  return `${letters}${randomNum}`;
};

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [duplicateAlert, setDuplicateAlert] = useState(false);
    const [duplicateSubject, setDuplicateSubject] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector((state) => state.user);
    const { status, currentUser, response } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const handleSubjectNameChange = (index) => (event) => {
        const newName = event.target.value;
        const updatedSubjects = [...subjects];
        
        // Check for duplicate subject names (case-insensitive)
        const isDuplicate = subjects.some(
            (subject, idx) => 
                idx !== index && 
                subject.subName.trim().toLowerCase() === newName.trim().toLowerCase()
        );

        if (isDuplicate) {
            setDuplicateSubject(newName);
            setDuplicateAlert(true);
            return;
        }

        // Update subject name
        updatedSubjects[index].subName = newName;
        
        // Auto-generate code in real-time
        updatedSubjects[index].subCode = generateSubjectCode(newName);
        
        setSubjects(updatedSubjects);
    };

    const handleCloseDuplicateAlert = () => {
        setDuplicateAlert(false);
        setDuplicateSubject("");
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].subCode = event.target.value.toUpperCase();
        setSubjects(updatedSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].sessions = event.target.value;
        setSubjects(updatedSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((_, idx) => idx !== index));
        }
    };

    const handleRegenerateCode = (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].subCode = generateSubjectCode(updatedSubjects[index].subName);
        setSubjects(updatedSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        
        // Check for duplicates before submitting
        const subjectNames = subjects.map(subject => subject.subName.trim().toLowerCase());
        const hasDuplicates = new Set(subjectNames).size !== subjectNames.length;
        
        if (hasDuplicates) {
            setDuplicateSubject(subjects.find((subject, idx) => 
                subjectNames.indexOf(subject.subName.trim().toLowerCase()) !== idx
            )?.subName || "");
            setDuplicateAlert(true);
            return;
        }

        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setMessage("Subjects saved successfully!");
            setShowPopup(true);
            setLoader(false);

            setTimeout(() => {
                setShowPopup(false);
                navigate("/Admin/subjects");
                dispatch(underControl());
            }, 2000);
        } else if (status === "failed") {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === "error") {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, response, dispatch]);

    return (
        <Box sx={{ 
            p: 3,
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center'
        }}>
            <StyledPaper>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 4
                }}>
                    <Typography variant="h4" fontWeight="bold" color="textPrimary">
                        Add Subjects
                    </Typography>
                    
                    <Tooltip title="Go back">
                        <IconButton 
                            onClick={() => navigate(-1)}
                            color="primary"
                            sx={{ 
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <form onSubmit={submitHandler}>
                    <Grid container spacing={3}>
                        {subjects.map((subject, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Subject Name"
                                        variant="outlined"
                                        value={subject.subName}
                                        onChange={handleSubjectNameChange(index)}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Subject Code"
                                        variant="outlined"
                                        value={subject.subCode}
                                        onChange={handleSubjectCodeChange(index)}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Tooltip title="Regenerate code">
                                                        <IconButton
                                                            onClick={() => handleRegenerateCode(index)}
                                                            edge="end"
                                                            size="small"
                                                        >
                                                            <ContentCopyIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Sessions"
                                        variant="outlined"
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        value={subject.sessions}
                                        onChange={handleSessionsChange(index)}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        {index === 0 ? (
                                            <Tooltip title="Add subject">
                                                <IconButton
                                                    color="primary"
                                                    onClick={handleAddSubject}
                                                    sx={{
                                                        border: '1px solid',
                                                        borderColor: 'divider'
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Remove subject">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleRemoveSubject(index)}
                                                    sx={{
                                                        border: '1px solid',
                                                        borderColor: 'divider'
                                                    }}
                                                    disabled={subjects.length <= 1}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Stack>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={loader}
                                    startIcon={loader ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 500
                                    }}
                                >
                                    {loader ? 'Saving...' : 'Save Subjects'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </StyledPaper>
            
            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
                severity={message.includes("Error") ? "error" : "success"}
            />

            <Dialog
                open={duplicateAlert}
                onClose={handleCloseDuplicateAlert}
                aria-labelledby="duplicate-alert-title"
                aria-describedby="duplicate-alert-description"
            >
                <DialogTitle id="duplicate-alert-title">Duplicate Subject Name</DialogTitle>
                <DialogContent>
                    <DialogContentText id="duplicate-alert-description">
                        The subject name "{duplicateSubject}" is already used. Please use a unique subject name.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDuplicateAlert} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SubjectForm;