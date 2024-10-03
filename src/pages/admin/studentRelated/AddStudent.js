// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../../../redux/userRelated/userHandle';
// import Popup from '../../../components/Popup';
// import { underControl } from '../../../redux/userRelated/userSlice';
// import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
// import { CircularProgress } from '@mui/material';

// const AddStudent = ({ situation }) => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const params = useParams()

//     const userState = useSelector(state => state.user);
//     const { status, currentUser, response, error } = userState;
//     const { sclassesList } = useSelector((state) => state.sclass);

//     const [name, setName] = useState('');
//     const [rollNum, setRollNum] = useState('');
//     const [password, setPassword] = useState('')
//     const [className, setClassName] = useState('')
//     const [sclassName, setSclassName] = useState('')

//     const adminID = currentUser._id
//     const role = "Student"
//     const attendance = []

//     useEffect(() => {
//         if (situation === "Class") {
//             setSclassName(params.id);
//         }
//     }, [params.id, situation]);

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loader, setLoader] = useState(false)

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
//     }

//     const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

//     const submitHandler = (event) => {
//         event.preventDefault()
//         if (sclassName === "") {
//             setMessage("Please select a classname")
//             setShowPopup(true)
//         }
//         else {
//             setLoader(true)
//             dispatch(registerUser(fields, role))
//         }
//     }

//     useEffect(() => {
//         if (status === 'added') {
//             dispatch(underControl())
//             navigate(-1)
//         }
//         else if (status === 'failed') {
//             setMessage(response)
//             setShowPopup(true)
//             setLoader(false)
//         }
//         else if (status === 'error') {
//             setMessage("Network Error")
//             setShowPopup(true)
//             setLoader(false)
//         }
//     }, [status, navigate, error, response, dispatch]);

//     return (
//         <>
//             <div className="register">
//                 <form className="registerForm" onSubmit={submitHandler}>
//                     <span className="registerTitle">Add Student</span>
//                     <label>Name</label>
//                     <input className="registerInput" type="text" placeholder="Enter student's name..."
//                         value={name}
//                         onChange={(event) => setName(event.target.value)}
//                         autoComplete="name" required />

//                     {
//                         situation === "Student" &&
//                         <>
//                             <label>Class</label>
//                             <select
//                                 className="registerInput"
//                                 value={className}
//                                 onChange={changeHandler} required>
//                                 <option value='Select Class'>Select Class</option>
//                                 {sclassesList.map((classItem, index) => (
//                                     <option key={index} value={classItem.sclassName}>
//                                         {classItem.sclassName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </>
//                     }

//                     <label>Roll Number</label>
//                     <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
//                         value={rollNum}
//                         onChange={(event) => setRollNum(event.target.value)}
//                         required />

//                     <label>Password</label>
//                     <input className="registerInput" type="password" placeholder="Enter student's password..."
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         autoComplete="new-password" required />

//                     <button className="registerButton" type="submit" disabled={loader}>
//                         {loader ? (
//                             <CircularProgress size={24} color="inherit" />
//                         ) : (
//                             'Add'
//                         )}
//                     </button>
//                 </form>
//             </div>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     )
// }

// export default AddStudent



















// import {
//     CircularProgress,
//     Grid,
//     Card,
//     Typography,
//     Box,
//     TextField,
//     MenuItem,
//     Button,
//     InputAdornment,
//     IconButton,
//     Slide,
//   } from "@mui/material";
//   import React, { useEffect, useState, useRef } from "react";
//   import { useDispatch, useSelector } from "react-redux";
//   import { useNavigate, useParams } from "react-router-dom";
//   import Popup from "../../../components/Popup";
//   import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
//   import { registerUser } from "../../../redux/userRelated/userHandle";
//   import { underControl } from "../../../redux/userRelated/userSlice";
//   import Visibility from "@mui/icons-material/Visibility";
//   import VisibilityOff from "@mui/icons-material/VisibilityOff";
//   import PhotoCamera from "@mui/icons-material/PhotoCamera";
  
//   const AddStudent = ({ situation }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const params = useParams();
  
//     const userState = useSelector((state) => state.user);
//     const { status, currentUser, response, error } = userState;
//     const { sclassesList } = useSelector((state) => state.sclass);
  
//     const [name, setName] = useState("");
//     const [rollNum, setRollNum] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [className, setClassName] = useState("");
//     const [sclassName, setSclassName] = useState("");
  
//     // New fields for student and guardian
//     const [address, setAddress] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [guardianName, setGuardianName] = useState("");
//     const [guardianPhone, setGuardianPhone] = useState("");
//     const [dob, setDob] = useState("");
  
//     // New state for profile picture
//     const [profilePic, setProfilePic] = useState(null);
//     const [webcamActive, setWebcamActive] = useState(false);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
  
//     const adminID = currentUser._id;
//     const role = "Student";
//     const attendance = [];
  
//     useEffect(() => {
//       if (situation === "Class") {
//         setSclassName(params.id);
//       }
//     }, [params.id, situation]);
  
//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loader, setLoader] = useState(false);
  
//     useEffect(() => {
//       dispatch(getAllSclasses(adminID, "Sclass"));
//     }, [adminID, dispatch]);
  
//     const changeHandler = (event) => {
//       if (event.target.value === "Select Class") {
//         setClassName("Select Class");
//         setSclassName("");
//       } else {
//         const selectedClass = sclassesList.find(
//           (classItem) => classItem.sclassName === event.target.value
//         );
//         setClassName(selectedClass.sclassName);
//         setSclassName(selectedClass._id);
//       }
//     };
  
//     const handleWebcamClick = () => {
//       setWebcamActive(true);
//       navigator.mediaDevices.getUserMedia({ video: true })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         })
//         .catch((error) => {
//           console.error("Error accessing webcam:", error);
//           setMessage("Could not access webcam.");
//           setShowPopup(true);
//         });
//     };
  
//     const captureImage = () => {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;
  
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(video, 0, 0);
//       const imgData = canvas.toDataURL("image/png");
//       setProfilePic(imgData);
//       stopWebcam();
//     };
  
//     const stopWebcam = () => {
//       const stream = videoRef.current.srcObject;
//       if (stream) {
//         const tracks = stream.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//       videoRef.current.srcObject = null;
//       setWebcamActive(false);
//     };
  
//     const fields = {
//       name,
//       rollNum,
//       password,
//       sclassName,
//       adminID,
//       role,
//       attendance,
//       address,
//       phoneNumber,
//       guardianName,
//       guardianPhone,
//       dob,
//       profilePic, // Add profile picture to the fields
//     };
  
//     const submitHandler = (event) => {
//       event.preventDefault();
//       if (sclassName === "") {
//         setMessage("Please select a classname");
//         setShowPopup(true);
//       } else {
//         setLoader(true);
//         dispatch(registerUser(fields, role));
//       }
//     };
  
//     useEffect(() => {
//       if (status === "added") {
//         dispatch(underControl());
//         navigate(-1);
//       } else if (status === "failed") {
//         setMessage(response);
//         setShowPopup(true);
//         setLoader(false);
//       } else if (status === "error") {
//         setMessage("Network Error");
//         setShowPopup(true);
//         setLoader(false);
//       }
//     }, [status, navigate, error, response, dispatch]);
  
//     return (
//       <Box
//         sx={{
//           padding: "2rem",
//           display: "flex",
//           justifyContent: "center",
//           backgroundColor: "#e3f2fd",
//           minHeight: "100vh",
//         }}
//       >
//         <Slide direction="up" in timeout={1000}>
//           <Card
//             sx={{
//               padding: "2rem",
//               width: "100%",
//               maxWidth: "500px",
//               borderRadius: "20px",
//               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//               backgroundColor: "#ffffff",
//               transition: "transform 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-5px)",
//                 boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
//               },
//             }}
//           >
//             <Typography variant="h4" align="center" sx={{ marginBottom: "1rem", color: "#1976d2" }}>
//               Add Student
//             </Typography>
  
//             {/* Profile Picture Section */}
//             <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
//               {profilePic ? (
//                 <img
//                   src={profilePic}
//                   alt="Profile Preview"
//                   style={{
//                     width: "80px",
//                     height: "80px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                     border: "2px solid #1976d2",
//                   }}
//                 />
//               ) : (
//                 <video
//                   ref={videoRef}
//                   style={{
//                     width: "80px",
//                     height: "80px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                     border: "2px solid #1976d2",
//                   }}
//                 />
//               )}
//               <IconButton
//                 color="primary"
//                 component="span"
//                 sx={{ marginLeft: "10px" }}
//                 onClick={handleWebcamClick}
//               >
//                 <PhotoCamera />
//               </IconButton>
//               <canvas ref={canvasRef} style={{ display: "none" }} />
//               {webcamActive && (
//                 <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={captureImage}
//                     sx={{ marginTop: "10px" }}
//                   >
//                     Capture Photo
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={stopWebcam}
//                     sx={{ marginTop: "10px" }}
//                   >
//                     Stop Webcam
//                   </Button>
//                 </Box>
//               )}
//             </Box>
  
//             <form onSubmit={submitHandler}>
//               {situation === "Student" && (
//                 <TextField
//                   select
//                   label="Class"
//                   value={className}
//                   onChange={changeHandler}
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   required
//                   sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//                 >
//                   <MenuItem value="Select Class">Select Class</MenuItem>
//                   {sclassesList.map((classItem, index) => (
//                     <MenuItem key={index} value={classItem.sclassName}>
//                       {classItem.sclassName}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               )}
  
//               <TextField
//                 label="Roll Number"
//                 type="number"
//                 fullWidth
//                 value={rollNum}
//                 onChange={(event) => setRollNum(event.target.value)}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//               />
  
//               <TextField
//                 label="Name"
//                 fullWidth
//                 value={name}
//                 onChange={(event) => setName(event.target.value)}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//               />
  
//               <TextField
//                 label="Address"
//                 fullWidth
//                 value={address}
//                 onChange={(event) => setAddress(event.target.value)}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//               />
  
//               <TextField
//                 label="Phone Number"
//                 type="tel"
//                 fullWidth
//                 value={phoneNumber}
//                 onChange={(event) => setPhoneNumber(event.target.value)}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//               />
  
//               <TextField
//                 label="Guardian Name"
//                 fullWidth
//                 value={guardianName}
//                 onChange={(event) => setGuardianName(event.target.value)}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//               />
  
//               <TextField
//                 label="Guardian Phone"
//                 type="tel"
//                 fullWidth
//                 value={guardianPhone}
//                 onChange={(event) => setGuardianPhone(event.target.value)}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//               />
  
//               <TextField
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 fullWidth
//                 value={password}
//                 onChange={(event) => setPassword(event.target.value)}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{ borderRadius: "12px", backgroundColor: "#f1f1f1" }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
  
//               <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     width: "50%",
//                     borderRadius: "20px",
//                     backgroundColor: "#1976d2",
//                     "&:hover": {
//                       backgroundColor: "#155a8a",
//                     },
//                   }}
//                   disabled={loader}
//                 >
//                   {loader ? (
//                     <CircularProgress size={24} sx={{ color: "#fff" }} />
//                   ) : (
//                     "Add Student"
//                   )}
//                 </Button>
//               </Box>
//             </form>
//           </Card>
//         </Slide>
  
//         {/* Popup Message */}
//         <Popup
//           open={showPopup}
//           setOpen={setShowPopup}
//           message={message}
//         />
//       </Box>
//     );
//   };
  
//   export default AddStudent;
  
  
  
  
  






















// ------------------------------------------------------------------>



//   import { CircularProgress } from '@mui/material';
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
//     const [guardianPhone, setGuardianPhone] = useState('');
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

//     return (
//         <>
//             <div className="register">
//                 <form className="registerForm" onSubmit={submitHandler}>
//                     <span className="registerTitle">Add Student</span>
                    
                    

//                     {
//                         situation === "Student" &&
//                         <>
//                             <label>Class</label>
//                             <select
//                                 className="registerInput"
//                                 value={className}
//                                 onChange={changeHandler} 
//                                 required
//                             >
//                                 <option value='Select Class'>Select Class</option>
//                                 {sclassesList.map((classItem, index) => (
//                                     <option key={index} value={classItem.sclassName}>
//                                         {classItem.sclassName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </>
//                     }

//                     <label>Roll Number</label>
//                     <input 
//                         className="registerInput" 
//                         type="number" 
//                         placeholder="Enter student's Roll Number..."
//                         value={rollNum}
//                         onChange={(event) => setRollNum(event.target.value)}
//                         required 
//                     />
//                     <label>Name</label>
//                     <input 
//                         className="registerInput" 
//                         type="text" 
//                         placeholder="Enter student's name..."
//                         value={name}
//                         onChange={(event) => setName(event.target.value)}
//                         autoComplete="name" 
//                         required 
//                     />
//                     <label>Birthday</label>
//                     <input 
//                         className="registerInput" 
//                         type="date" 
//                         placeholder="Enter student's address..."
//                         value={dob}
//                         onChange={(event) => setDob(event.target.value)}
//                         required 
//                     />

//                     <label>Address</label>
//                     <input 
//                         className="registerInput" 
//                         type="text" 
//                         placeholder="Enter student's address..."
//                         value={address}
//                         onChange={(event) => setAddress(event.target.value)}
//                         required 
//                     />

//                     <label>Phone Number</label>
//                     <input 
//                         className="registerInput" 
//                         type="tel" 
//                         placeholder="Enter student's phone number..."
//                         value={phoneNumber}
//                         onChange={(event) => setPhoneNumber(event.target.value)}
//                         required 
//                     />

//                     <label>Guardian's Name</label>
//                     <input 
//                         className="registerInput" 
//                         type="text" 
//                         placeholder="Enter guardian's name..."
//                         value={guardianName}
//                         onChange={(event) => setGuardianName(event.target.value)}
//                         required 
//                     />

//                     <label>Guardian's Phone Number</label>
//                     <input 
//                         className="registerInput" 
//                         type="tel" 
//                         placeholder="Enter guardian's phone number..."
//                         value={guardianPhone}
//                         onChange={(event) => setGuardianPhone(event.target.value)}
//                         required 
//                     />

//                     <label>Password</label>
//                     <input 
//                         className="registerInput" 
//                         type="password" 
//                         placeholder="Enter student's password..."
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         autoComplete="new-password" 
//                         required 
//                     />

//                     <button className="registerButton" type="submit" disabled={loader}>
//                         {loader ? (
//                             <CircularProgress size={24} color="inherit" />
//                         ) : (
//                             'Add'
//                         )}
//                     </button>
//                 </form>
//             </div>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

// export default AddStudent;




// ________________________________________________________________________________________________________________------------------->


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem,
    CircularProgress, Typography, Card, CardContent, CardActions, Paper, Box
} from '@mui/material';
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
    const [guardianPhone, setGuardianPhone] = useState('');
    const [dob, setDob] = useState('');

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
        if (sclassName === '') {
            setMessage('Please select a classname');
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
                                    <FormControl fullWidth required>
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
                                />
                            </Grid>

                            {/* Phone Number */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Phone Number"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter student's phone number"
                                />
                            </Grid>

                            {/* Guardian Name */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Guardian's Name"
                                    value={guardianName}
                                    onChange={(e) => setGuardianName(e.target.value)}
                                    placeholder="Enter guardian's name"
                                />
                            </Grid>

                            {/* Guardian's Phone Number */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Guardian's Phone Number"
                                    type="tel"
                                    value={guardianPhone}
                                    onChange={(e) => setGuardianPhone(e.target.value)}
                                    placeholder="Enter guardian's phone number"
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
                                    placeholder="Enter student's password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
                <CardActions sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loader}
                        onClick={submitHandler}
                        sx={{ height: 48 }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student'}
                    </Button>
                </CardActions>
            </Card>

            {/* Popup */}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default AddStudent;
