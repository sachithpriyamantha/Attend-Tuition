import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Button, TextField, Paper, Typography, Grid, Fade } from '@mui/material';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
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
            Add New Notice
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  sx={styles.textField}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Details"
                  variant="outlined"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  sx={styles.textField}
                  required
                />
              </Grid>

              {/* Rearranged Date Field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label=""
                  variant="outlined"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
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
                  {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Notice'}
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

export default AddNotice;

const styles = {
  container: {
    marginTop: "-80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7fb", // Light background for the page
  },
  paper: {
    width: "100%",
    maxWidth: "900px",
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
    marginBottom: "20px",
    fontWeight: "600",
    color: "#333",
    fontSize: "2rem",
    letterSpacing: "1px",
    textTransform: "uppercase",
    background: "-webkit-linear-gradient(#1e88e5, #2196f3)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  textField: {
    marginBottom: "16px",
    "& .MuiInputBase-root": {
      backgroundColor: "#f0f4f7",
      borderRadius: "8px",
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
