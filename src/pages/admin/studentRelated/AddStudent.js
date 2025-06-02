import {
    Box,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    InputAdornment,
    Card,
    CardContent,
    Tooltip,
    IconButton
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { getAllSclasses, getClassStudents } from '../../../redux/sclassRelated/sclassHandle';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { GreenButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NumbersIcon from '@mui/icons-material/Numbers';
import PasswordIcon from '@mui/icons-material/Password';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import PeopleIcon from '@mui/icons-material/People';
import RefreshIcon from '@mui/icons-material/Refresh';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);
    const { studentsList } = useSelector((state) => state.student);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [guardianPhone, setguardianPhone] = useState('');
    const [dob, setDob] = useState('');

    const [errors, setErrors] = useState({}); 
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [isGeneratingRollNum, setIsGeneratingRollNum] = useState(false);

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
            const selectedClass = sclassesList.find(classItem => classItem._id === params.id);
            if (selectedClass) {
                setClassName(selectedClass.sclassName);
                dispatch(getClassStudents(params.id));
            }
        }
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch, params.id, situation, sclassesList]);

    const changeHandler = async (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
            setRollNum('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
            dispatch(getClassStudents(selectedClass._id));
            // Clear roll number when class changes
            setRollNum('');
        }
    };

    const generateRollNumber = () => {
        if (!sclassName) {
            setMessage("Please select a class first");
            setShowPopup(true);
            return;
        }

        setIsGeneratingRollNum(true);
        
        // Find all students in the selected class
        const classStudents = studentsList?.filter(student => student.sclassName === sclassName) || [];
        
        // Extract existing roll numbers and convert to integers
        const existingRollNumbers = classStudents
            .map(student => {
                // Remove any non-numeric characters and convert to integer
                const rollNum = student.rollNum?.toString().replace(/\D/g, '');
                return rollNum ? parseInt(rollNum, 10) : 0;
            })
            .filter(num => !isNaN(num) && num > 0); // Filter out invalid numbers
        
        // Find the next available roll number
        let nextRollNum = 1;
        
        if (existingRollNumbers.length > 0) {
            // Sort the existing roll numbers to find gaps or get the maximum
            existingRollNumbers.sort((a, b) => a - b);
            
            // Check for gaps in the sequence starting from 1
            for (let i = 1; i <= existingRollNumbers.length + 1; i++) {
                if (!existingRollNumbers.includes(i)) {
                    nextRollNum = i;
                    break;
                }
            }
            
            // If no gaps found, use the next number after the maximum
            if (nextRollNum === 1 && existingRollNumbers.length > 0) {
                nextRollNum = Math.max(...existingRollNumbers) + 1;
            }
        }
        
        // Format the roll number with leading zeros (3 digits: 001, 002, etc.)
        const formattedRollNum = nextRollNum.toString().padStart(3, '0');
        
        // Double-check uniqueness before setting
        const isUnique = !classStudents.some(student => 
            student.rollNum?.toString().replace(/\D/g, '').padStart(3, '0') === formattedRollNum
        );
        
        if (isUnique) {
            setRollNum(formattedRollNum);
        } else {
            // Fallback: find the absolute next available number
            let fallbackNum = Math.max(...existingRollNumbers, 0) + 1;
            setRollNum(fallbackNum.toString().padStart(3, '0'));
        }
        
        setIsGeneratingRollNum(false);
    };

    // Enhanced validation for roll number uniqueness
    const validateRollNumberUniqueness = (rollNumber) => {
        if (!rollNumber || !sclassName) return false;
        
        const classStudents = studentsList?.filter(student => student.sclassName === sclassName) || [];
        
        // Check if the roll number already exists in the class
        const isDuplicate = classStudents.some(student => {
            const existingRollNum = student.rollNum?.toString().toLowerCase().trim();
            const newRollNum = rollNumber.toString().toLowerCase().trim();
            return existingRollNum === newRollNum;
        });
        
        return !isDuplicate;
    };

    const validateFields = () => {
        const newErrors = {};
        
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!rollNum.trim()) {
            newErrors.rollNum = 'Roll Number is required';
        } else if (!validateRollNumberUniqueness(rollNum)) {
            newErrors.rollNum = 'Roll Number already exists in this class';
        }
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

    // Handle manual roll number changes
    const handleRollNumChange = (e) => {
        const value = e.target.value;
        setRollNum(value);
        
        // Clear roll number error when user starts typing
        if (errors.rollNum) {
            setErrors(prev => ({ ...prev, rollNum: '' }));
        }
    };

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
                    Add New Student
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                p: 3
            }}>
                <Card sx={{ border: 'none', boxShadow: 'none' }}>
                    <CardContent>
                        <form onSubmit={submitHandler}>
                            <Grid container spacing={3}>
                                {situation === "Student" && (
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth required error={!!errors.sclassName}>
                                            <InputLabel>Class</InputLabel>
                                            <Select
                                                value={className}
                                                onChange={changeHandler}
                                                label="Class"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <PeopleIcon color="action" />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value="Select Class">Select Class</MenuItem>
                                                {sclassesList.map((classItem, index) => (
                                                    <MenuItem key={index} value={classItem.sclassName}>
                                                        {classItem.sclassName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.sclassName && <Typography color="error" variant="caption">{errors.sclassName}</Typography>}
                                        </FormControl>
                                    </Grid>
                                )}

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Roll Number"
                                        value={rollNum}
                                        onChange={handleRollNumChange}
                                        placeholder="Click generate or enter manually"
                                        error={!!errors.rollNum}
                                        helperText={errors.rollNum || "Format: 001, 002, 003..."}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <NumbersIcon color="action" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <Tooltip title="Generate Next Available Roll Number">
                                                    <IconButton
                                                        onClick={generateRollNumber}
                                                        disabled={isGeneratingRollNum || !sclassName}
                                                        color="primary"
                                                    >
                                                        {isGeneratingRollNum ? (
                                                            <CircularProgress size={24} />
                                                        ) : (
                                                            <RefreshIcon />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter student's name"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CakeIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter address"
                                        error={!!errors.address}
                                        helperText={errors.address}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HomeIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Phone Number"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        placeholder="(123) 456-7890"
                                        error={!!errors.phoneNumber}
                                        helperText={errors.phoneNumber}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Guardian's Name"
                                        value={guardianName}
                                        onChange={(e) => setGuardianName(e.target.value)}
                                        placeholder="Enter guardian's name"
                                        error={!!errors.guardianName}
                                        helperText={errors.guardianName}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Guardian's Phone"
                                        value={guardianPhone}
                                        onChange={handleguardianPhoneChanges}
                                        placeholder="(123) 456-7890"
                                        error={!!errors.guardianPhone}
                                        helperText={errors.guardianPhone}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PasswordIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <GreenButton
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        disabled={loader}
                                        sx={{ mt: 2, height: 48 }}
                                        startIcon={<PersonAddAlt1Icon />}
                                    >
                                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student'}
                                    </GreenButton>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Paper>

            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
                severity={message.includes("Failed") || message.includes("Error") ? "error" : "success"}
            />
        </Box>
    );
};

export default AddStudent;