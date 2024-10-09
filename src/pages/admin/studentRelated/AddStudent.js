// import {
//     Box,
//     Button,
//     Card,
//     CardActions,
//     CardContent,
//     CircularProgress,
//     FormControl,
//     Grid,
//     InputLabel,
//     MenuItem,
//     Select,
//     TextField,
//     Typography
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import Popup from '../../../components/Popup';
// import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
// import { registerUser } from '../../../redux/userRelated/userHandle';
// import { underControl } from '../../../redux/userRelated/userSlice';

// const AddStudent = ({ situation }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const params = useParams();

//     const userState = useSelector(state => state.user);
//     const { status, currentUser, response, error } = userState;
//     const { sclassesList } = useSelector((state) => state.sclass);

//     const [name, setName] = useState('');
//     const [rollNum, setRollNum] = useState('');
//     const [password, setPassword] = useState('');
//     const [className, setClassName] = useState('');
//     const [sclassName, setSclassName] = useState('');

//     // New fields for student and guardian
//     const [address, setAddress] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [guardianName, setGuardianName] = useState('');
//     const [guardianPhone, setguardianPhone] = useState('');
//     const [dob, setDob] = useState('');

//     const adminID = currentUser._id;
//     const role = "Student";
//     const attendance = [];

//     useEffect(() => {
//         if (situation === "Class") {
//             setSclassName(params.id);
//         }
//     }, [params.id, situation]);

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState('');
//     const [loader, setLoader] = useState(false);

//     useEffect(() => {
//         dispatch(getAllSclasses(adminID, "Sclass"));
//     }, [adminID, dispatch]);

//     const changeHandler = (event) => {
//         if (event.target.value === 'Select Class') {
//             setClassName('Select Class');
//             setSclassName('');
//         } else {
//             const selectedClass = sclassesList.find(
//                 (classItem) => classItem.sclassName === event.target.value
//             );
//             setClassName(selectedClass.sclassName);
//             setSclassName(selectedClass._id);
//         }
//     };

//     const fields = {
//         name,
//         rollNum,
//         password,
//         sclassName,
//         adminID,
//         role,
//         attendance,
//         address,
//         phoneNumber,
//         guardianName,
//         guardianPhone,
//         dob,
//     };

//     const submitHandler = (event) => {
//         event.preventDefault();
//         if (sclassName === '') {
//             setMessage('Please select a classname');
//             setShowPopup(true);
//         } else {
//             setLoader(true);
//             dispatch(registerUser(fields, role));
//         }
//     };

//     useEffect(() => {
//         if (status === 'added') {
//             dispatch(underControl());
//             navigate(-1);
//         } else if (status === 'failed') {
//             setMessage(response);
//             setShowPopup(true);
//             setLoader(false);
//         } else if (status === 'error') {
//             setMessage('Network Error');
//             setShowPopup(true);
//             setLoader(false);
//         }
//     }, [status, navigate, error, response, dispatch]);

//     const formatPhoneNumber = (value) => {
//         if (!value) return value;
//         const phoneNumber = value.replace(/[^\d]/g, "");
//         const phoneNumberLength = phoneNumber.length;
//         if (phoneNumberLength < 4) return phoneNumber;
//         if (phoneNumberLength < 7) {
//             return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
//         }
//         return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
//     };

//     const handlePhoneNumberChange = (e) => {
//         setPhoneNumber(formatPhoneNumber(e.target.value));
//     };


//     const formatguardianPhone = (value) => {
//         if (!value) return value;
//         const guardianPhone = value.replace(/[^\d]/g, "");
//         const guardianPhoneLength = guardianPhone.length;
//         if (guardianPhoneLength < 4) return guardianPhone;
//         if (guardianPhoneLength < 7) {
//             return `(${guardianPhone.slice(0, 3)}) ${guardianPhone.slice(3)}`;
//         }
//         return `(${guardianPhone.slice(0, 3)}) ${guardianPhone.slice(3, 6)}-${guardianPhone.slice(6, 10)}`;
//     };

//     const handleguardianPhoneChanges = (e) => {
//         setguardianPhone(formatguardianPhone(e.target.value));
//     };


//     return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
//             <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 3, borderRadius: 4 }}>
//                 <CardContent>
//                     <Typography variant="h5" align="center" gutterBottom>
//                         Add New Student
//                     </Typography>

//                     <form onSubmit={submitHandler}>
//                         <Grid container spacing={2}>

//                             {/* Class selection */}
//                             {situation === "Student" && (
//                                 <Grid item xs={12}>
//                                     <FormControl fullWidth required>
//                                         <InputLabel>Class</InputLabel>
//                                         <Select
//                                             value={className}
//                                             onChange={changeHandler}
//                                             label="Class"
//                                         >
//                                             <MenuItem value="Select Class">Select Class</MenuItem>
//                                             {sclassesList.map((classItem, index) => (
//                                                 <MenuItem key={index} value={classItem.sclassName}>
//                                                     {classItem.sclassName}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             )}

//                             {/* Roll Number */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Roll Number"
//                                     type="number"
//                                     value={rollNum}
//                                     onChange={(e) => setRollNum(e.target.value)}
//                                     placeholder="Enter student's Roll Number"
//                                 />
//                             </Grid>

//                             {/* Name */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Name"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     placeholder="Enter student's name"
//                                 />
//                             </Grid>

//                             {/* Date of Birth */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Birthday"
//                                     type="date"
//                                     value={dob}
//                                     onChange={(e) => setDob(e.target.value)}
//                                     InputLabelProps={{ shrink: true }}
//                                 />
//                             </Grid>

//                             {/* Address */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Address"
//                                     value={address}
//                                     onChange={(e) => setAddress(e.target.value)}
//                                     placeholder="Enter student's address"
//                                 />
//                             </Grid>

//                             {/* Phone Number */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Phone Number"
//                                     type="tel"
//                                     value={phoneNumber}
//                                     onChange={handlePhoneNumberChange}
//                                     placeholder="Enter student's phone number"
//                                 />
//                             </Grid>

//                             {/* Guardian Name */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Guardian's Name"
//                                     value={guardianName}
//                                     onChange={(e) => setGuardianName(e.target.value)}
//                                     placeholder="Enter guardian's name"
//                                 />
//                             </Grid>

//                             {/* Guardian's Phone Number */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Guardian's Phone Number"
//                                     type="tel"
//                                     value={guardianPhone}
//                                     onChange={handleguardianPhoneChanges}
//                                     placeholder="Enter guardian's phone number"
//                                 />
//                             </Grid>

//                             {/* Password */}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     fullWidth
//                                     required
//                                     label="Password"
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="Enter student's password"
//                                     autoComplete="new-password"
//                                 />
//                             </Grid>

//                         </Grid>
//                     </form>
//                 </CardContent>
//                 <CardActions sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         disabled={loader}
//                         onClick={submitHandler}
//                         sx={{ height: 48 }}
//                     >
//                         {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student'}
//                     </Button>
//                 </CardActions>
//             </Card>

//             {/* Popup */}
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </Box>
//     );
// };

// export default AddStudent;



import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    // New fields for student and guardian
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [guardianPhone, setguardianPhone] = useState('');
    const [dob, setDob] = useState('');

    const [errors, setErrors] = useState({}); // To track errors

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!rollNum.trim()) newErrors.rollNum = 'Roll Number is required';
        if (!password.trim()) newErrors.password = 'Password is required';
        if (!address.trim()) newErrors.address = 'Address is required';
        if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        if (!guardianName.trim()) newErrors.guardianName = 'Guardian Name is required';
        if (!guardianPhone.trim()) newErrors.guardianPhone = 'Guardian Phone is required';
        if (!dob) newErrors.dob = 'Date of Birth is required';
        if (!sclassName.trim()) newErrors.sclassName = 'Class must be selected';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fields = {
        name,
        rollNum,
        password,
        sclassName,
        adminID,
        role,
        attendance,
        address,
        phoneNumber,
        guardianName,
        guardianPhone,
        dob,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (!validateFields()) {
            setMessage('Please fill in all the required fields');
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage('Network Error');
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(formatPhoneNumber(e.target.value));
    };


    const formatguardianPhone = (value) => {
        if (!value) return value;
        const guardianPhone = value.replace(/[^\d]/g, "");
        const guardianPhoneLength = guardianPhone.length;
        if (guardianPhoneLength < 4) return guardianPhone;
        if (guardianPhoneLength < 7) {
            return `(${guardianPhone.slice(0, 3)}) ${guardianPhone.slice(3)}`;
        }
        return `(${guardianPhone.slice(0, 3)}) ${guardianPhone.slice(3, 6)}-${guardianPhone.slice(6, 10)}`;
    };

    const handleguardianPhoneChanges = (e) => {
        setguardianPhone(formatguardianPhone(e.target.value));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
            <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 3, borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Add New Student
                    </Typography>

                    <form onSubmit={submitHandler}>
                        <Grid container spacing={2}>

                            {/* Class selection */}
                            {situation === "Student" && (
                                <Grid item xs={12}>
                                    <FormControl fullWidth required error={!!errors.sclassName}>
                                        <InputLabel>Class</InputLabel>
                                        <Select
                                            value={className}
                                            onChange={changeHandler}
                                            label="Class"
                                        >
                                            <MenuItem value="Select Class">Select Class</MenuItem>
                                            {sclassesList.map((classItem, index) => (
                                                <MenuItem key={index} value={classItem.sclassName}>
                                                    {classItem.sclassName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.sclassName && <Typography color="error">{errors.sclassName}</Typography>}
                                    </FormControl>
                                </Grid>
                            )}

                            {/* Roll Number */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Roll Number"
                                    type="number"
                                    value={rollNum}
                                    onChange={(e) => setRollNum(e.target.value)}
                                    placeholder="Enter student's Roll Number"
                                    error={!!errors.rollNum}
                                    helperText={errors.rollNum}
                                />
                            </Grid>

                            {/* Name */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter student's name"
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>

                            {/* Date of Birth */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Birthday"
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.dob}
                                    helperText={errors.dob}
                                />
                            </Grid>

                            {/* Address */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter student's address"
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Grid>

                            {/* Phone Number */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Phone Number"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    placeholder="Enter student's phone number"
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                />
                            </Grid>

                            {/* Guardian Name */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Guardian Name"
                                    value={guardianName}
                                    onChange={(e) => setGuardianName(e.target.value)}
                                    placeholder="Enter guardian's name"
                                    error={!!errors.guardianName}
                                    helperText={errors.guardianName}
                                />
                            </Grid>

                            {/* Guardian Phone Number */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Guardian Phone Number"
                                    value={guardianPhone}
                                    onChange={handleguardianPhoneChanges}
                                    placeholder="Enter guardian's phone number"
                                    error={!!errors.guardianPhone}
                                    helperText={errors.guardianPhone}
                                />
                            </Grid>

                            {/* Password */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>

                        </Grid>
                        <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary" disabled={loader}>
                                {loader ? <CircularProgress size={24} /> : 'Add Student'}
                            </Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>

            <Popup
                open={showPopup}
                onClose={() => setShowPopup(false)}
                title="Submission Error"
                content={message}
            />
        </Box>
    );
};

export default AddStudent;
