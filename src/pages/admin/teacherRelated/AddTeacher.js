import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Button, TextField, Paper, Typography, Grid, Fade } from '@mui/material';
import Popup from '../../../components/Popup';

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
    <Box sx={styles.container}>
      <Fade in={true} timeout={800}>
        <Paper elevation={8} sx={styles.paper}>
          <Typography variant="h4" sx={styles.header}>
            Add New Teacher
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={styles.label}>
                  Subject: {subjectDetails && subjectDetails.subName}
                </Typography>
                <Typography variant="subtitle1" sx={styles.label}>
                  Class: {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  sx={styles.textField}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  sx={styles.textField}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  sx={styles.textField}
                  required
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loader}
                  sx={styles.saveButton}
                >
                  {loader ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Fade>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddTeacher;

const styles = {
  container: {
    marginTop: "-200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7fb", // Light background for the page
  },
  paper: {
    width: "90%",
    maxWidth: "600px",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "#a8d4fc", // Updated form background color
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)", // Hover effect for a more dynamic look
    },
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
    fontWeight: "600",
    color: "#333",
    fontSize: "2rem",
    letterSpacing: "1px",
    textTransform: "uppercase",
    background: "-webkit-linear-gradient(#1e88e5, #2196f3)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  label: {
    color: "#4e6b7f",
    fontWeight: "500",
    marginBottom: "10px",
  },
  textField: {
    marginBottom: "16px",
    "& .MuiInputBase-root": {
      backgroundColor: "#f0f4f7",
      borderRadius: "18px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ccc",
    },
    "&:focus-within": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#1e88e5",
      },
    },
  },
  saveButton: {
    padding: "12px 24px",
    fontWeight: "bold",
    borderRadius: "30px",
    background: "linear-gradient(135deg, #2196f3, #1e88e5)",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
};
