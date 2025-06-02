import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { 
  Box, 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Grid, 
  CircularProgress,
  InputAdornment,
  Avatar,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { 
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  Subject as SubjectIcon
} from '@mui/icons-material';
import Popup from '../../../components/Popup';
import { GreenButton } from '../../../components/buttonStyles';

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id;

  const fields = { name, email, password, role, school, teachSubject, teachSclass };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate("/Admin/teachers");
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
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box sx={{ 
      p: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <Paper elevation={3} sx={{ 
        width: '100%',
        maxWidth: 800,
        p: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          gap: 2
        }}>
          <Avatar sx={{ 
            width: 56, 
            height: 56, 
            bgcolor: 'primary.main',
            fontSize: '1.5rem'
          }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            Add New Teacher
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {subjectDetails && (
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Chip
              icon={<SchoolIcon />}
              label={`Class: ${subjectDetails.sclassName?.sclassName || 'Not assigned'}`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
            <Chip
              icon={<SubjectIcon />}
              label={`Subject: ${subjectDetails.subName}`}
              color="secondary"
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </Stack>
        )}

        <form onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2
              }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Admin/teachers")}
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    py: 1
                  }}
                >
                  Cancel
                </Button>
                <GreenButton
                  variant="contained"
                  type="submit"
                  disabled={loader}
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    py: 1
                  }}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Register Teacher'
                  )}
                </GreenButton>
              </Box>
            </Grid>
          </Grid>
        </form>
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

export default AddTeacher;