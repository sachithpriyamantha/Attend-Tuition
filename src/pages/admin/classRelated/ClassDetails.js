import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Box,
    Button,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton, Skeleton,
    Tab,
    Typography
} from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import TableTemplate from "../../../components/TableTemplate";
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState(null);

    const openDeleteDialog = (deleteID, address) => {
        setDeleteInfo({ id: deleteID, address });
        setOpenDialog(true);
    };

    const closeDeleteDialog = () => {
        setOpenDialog(false);
        setDeleteInfo(null);
    };

    const confirmDelete = () => {
        const { id, address } = deleteInfo;
        console.log(id, address); 
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
        closeDeleteDialog();
        // Uncomment the code below when the delete functionality is ready.
        // dispatch(deleteUser(id, address))
        //     .then(() => {
        //         dispatch(getClassStudents(classID));
        //         dispatch(resetSubjects());
        //         dispatch(getSubjectList(classID, "ClassSubjects"));
        //     });
    };

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ];

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => ({
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <>
            <IconButton onClick={() => openDeleteDialog(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
            >
                View
            </BlueButton>
        </>
    );

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => openDeleteDialog(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => (
        <>
            {response ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                    >
                        Add Subjects
                    </GreenButton>
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>
                        Subjects List:
                    </Typography>

                    <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                    <SpeedDialTemplate actions={subjectActions} />
                </>
            )}
        </>
    );

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => (
        <>
          <IconButton onClick={() => openDeleteDialog(row.id, "Student")} style={{ marginRight: 10 }}>
            <PersonRemoveIcon color="error" />
          </IconButton>
          <BlueButton variant="contained" onClick={() => navigate("/Admin/students/student/" + row.id)} style={{ marginRight: 10 }}>
            View
          </BlueButton>
          <PurpleButton variant="contained" onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}>
            Attendance
          </PurpleButton>
        </>
      );

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => openDeleteDialog(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => (
        <>
            {getresponse ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                    >
                        Add Students
                    </GreenButton>
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>
                        Students List:
                    </Typography>

                    <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                    <SpeedDialTemplate actions={studentActions} />
                </>
            )}
        </>
    );

    // const ClassTeachersSection = () => (
    //     <Card>
    //         <CardContent>
    //             <Typography variant="h6" gutterBottom>
    //                 Teachers
    //             </Typography>
    //             {/* Add Teachers data here when available */}
    //         </CardContent>
    //     </Card>
    // );

    // const ClassDetailsSection = () => {
    //     const numberOfSubjects = subjectsList.length;
    //     const numberOfStudents = sclassStudents.length;

    //     return (
    //         <Card>
    //             <CardContent>
    //                 <Typography variant="h4" align="center" gutterBottom>
    //                     Class Details
    //                 </Typography>
    //                 <Typography variant="h5" gutterBottom>
    //                     Class {sclassDetails && sclassDetails.sclassName}
    //                 </Typography><br></br>
    //                 <Typography variant="h6" gutterBottom>
    //                     Number of Subjects: {numberOfSubjects}
    //                 </Typography>
    //                 <Typography variant="h6" gutterBottom>
    //                     Number of Students: {numberOfStudents}
    //                 </Typography>
    //                 {getresponse &&
    //                     <GreenButton
    //                         variant="contained"
    //                         onClick={() => navigate("/Admin/class/addstudents/" + classID)}
    //                     >
    //                         Add Students
    //                     </GreenButton>
    //                 }
    //                 {response &&
    //                     <GreenButton
    //                         variant="contained"
    //                         onClick={() => navigate("/Admin/addsubject/" + classID)}
    //                     >
    //                         Add Subjects
    //                     </GreenButton>
    //                 }
    //             </CardContent>
    //         </Card>
    //     );
    // };

    return (
        <>
            {loading ? (
                <Container>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                </Container>
            ) : (
                <>
                    {/* Added background color using sx prop */}
                    <Box sx={{ width: '100%', minHeight: '100vh', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    {/* <Tab label="Details" value="1" /> */}
                                    <Tab label="Subjects" value="1" />
                                    <Tab label="Students" value="2" />
                                    {/* <Tab label="Teachers" value="4" /> */}
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                {/* <TabPanel value="1">
                                    <ClassDetailsSection />
                                </TabPanel> */}
                                <TabPanel value="1">
                                    <ClassSubjectsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <ClassStudentsSection />
                                </TabPanel>
                                {/* <TabPanel value="4">
                                    <ClassTeachersSection />
                                </TabPanel> */}
                            </Container>
                        </TabContext>
                    </Box>
                </>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this {deleteInfo?.address}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Popup for info messages */}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
