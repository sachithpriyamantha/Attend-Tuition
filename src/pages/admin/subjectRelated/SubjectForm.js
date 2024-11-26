import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector((state) => state.user);
    const { status, currentUser, response } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const handleSubjectChange = (index, key) => (event) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index][key] = event.target.value;
        setSubjects(updatedSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => {
        setSubjects(subjects.filter((_, idx) => idx !== index));
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
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setMessage("Subjects saved successfully!");
            setShowPopup(true);
            setLoader(false);

            // Reset state after a delay to allow user to read the success message
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
        <Box sx={styles.container}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h5" sx={styles.header}>
                    Add Subjects
                </Typography>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={3}>
                        {subjects.map((subject, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Subject Name"
                                        variant="outlined"
                                        value={subject.subName}
                                        onChange={handleSubjectChange(index, "subName")}
                                        sx={styles.textField}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Subject Code"
                                        variant="outlined"
                                        value={subject.subCode}
                                        onChange={handleSubjectChange(index, "subCode")}
                                        sx={styles.textField}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        label="Sessions"
                                        variant="outlined"
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        value={subject.sessions}
                                        onChange={handleSubjectChange(index, "sessions")}
                                        sx={styles.textField}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="flex-end">
                                    {index === 0 ? (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleAddSubject}
                                            sx={{ minWidth: 120 }}
                                        >
                                            Add
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveSubject(index)}
                                            sx={{ minWidth: 120 }}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end" sx={styles.saveButtonContainer}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={loader}
                                    sx={styles.saveButton}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Save"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default SubjectForm;

const styles = {
    container: {
        marginTop: "82px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        width: "100%",
        maxWidth: "1500px",
        padding: "64px",
        borderRadius: "5px",
        backgroundColor: "#a8d4fc",
    },
    header: {
        textAlign: "center",
        marginBottom: "16px",
        fontWeight: "bold",
    },
    saveButtonContainer: {
        marginTop: "16px",
    },
    saveButton: {
        padding: "8px 24px",
    },
    textField: {
        "& .MuiInputBase-root": {
            backgroundColor: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
        },
    },
};
