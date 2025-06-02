import { useEffect, useState } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents } from "../teacher/sclassHandle";
import {
    Paper,
    Box,
    Typography,
    ButtonGroup,
    Button,
    Popper,
    Grow,
    ClickAwayListener,
    MenuList,
    MenuItem,
    CircularProgress,
    Fade,
    Zoom,
    Slide
} from '@mui/material';
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    // State for calculated attendance
    const [todayAttendance, setTodayAttendance] = useState(0);
    const [totalAttendance, setTotalAttendance] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load data only if not already loaded
        if (!sclassStudents || sclassStudents.length === 0) {
            dispatch(getClassStudents(classID));
        }
        return () => setMounted(false);
    }, [dispatch, classID]);

    // Calculate attendance when students data changes
    useEffect(() => {
        if (sclassStudents && Array.isArray(sclassStudents)) {
            const today = new Date().toISOString().split('T')[0];

            // Calculate today's attendance
            const todayCount = sclassStudents.reduce((sum, student) => {
                if (!student.attendance || !Array.isArray(student.attendance)) return sum;

                const todayRecord = student.attendance.find(record => {
                    const recordDate = record.date.split('T')[0];
                    return recordDate === today && record.status === 'Present';
                });

                return sum + (todayRecord ? 1 : 0);
            }, 0);
            setTodayAttendance(todayCount);

            // Calculate total attendance
            const totalCount = sclassStudents.reduce((sum, student) => {
                if (!student.attendance || !Array.isArray(student.attendance)) return sum;

                const presentCount = student.attendance.reduce((count, record) => {
                    return count + (record.status === 'Present' ? 1 : 0);
                }, 0);

                return sum + presentCount;
            }, 0);
            setTotalAttendance(totalCount);
        }
    }, [sclassStudents]);

    if (error) {
        console.error("Error loading class details:", error);
        return (
            <Fade in={mounted}>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography color="error" variant="h6">
                        Error loading class details. Please try again.
                    </Typography>
                </Box>
            </Fade>
        );
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents?.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    })) || [];

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
            } else if (selectedIndex === 1) {
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
            }
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
            // Immediately navigate when menu item is clicked
            if (index === 0) {
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
            } else if (index === 1) {
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
            }
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                gap: 1,
                alignItems: 'center'
            }}>
                <Zoom in={true}>
                    <BlueButton
                        variant="contained"
                        onClick={() => navigate("/Teacher/class/student/" + row.id)}
                        sx={{ minWidth: 80 }}
                    >
                        View
                    </BlueButton>
                </Zoom>

                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button
                            onClick={handleClick}
                            sx={{ minWidth: 160 }}
                        >
                            {options[selectedIndex]}
                        </Button>
                        <BlackButton
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </BlackButton>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                            boxShadow: 3,
                            borderRadius: 1,
                            overflow: 'hidden'
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper elevation={8}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'primary.light',
                                                            color: 'primary.contrastText'
                                                        }
                                                    }}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
            </Box>
        );
    };

    return (
        <Fade in={mounted}>
            <Box sx={{ p: 3 }}>
                <Slide direction="down" in={mounted} mountOnEnter unmountOnExit>
                    <Box
                        sx={{
                            padding: 3,
                            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                            borderRadius: 2,
                            boxShadow: 3,
                            color: '#fff',
                            marginBottom: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Attendance Statistics
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
                            {/* Today's Attendance */}
                            <Zoom in={mounted} style={{ transitionDelay: '100ms' }}>
                                <Box sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: 2,
                                    minWidth: 200
                                }}>
                                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                        {todayAttendance}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                                        Today's Attendance
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        {new Date().toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Typography>
                                </Box>
                            </Zoom>

                            {/* Total Attendance */}
                            <Zoom in={mounted} style={{ transitionDelay: '200ms' }}>
                                <Box sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: 2,
                                    minWidth: 200
                                }}>
                                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                        {totalAttendance}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                                        Total Attendance
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        All Time
                                    </Typography>
                                </Box>
                            </Zoom>
                        </Box>
                    </Box>
                </Slide>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress size={60} thickness={4} />
                    </Box>
                ) : (
                    <>
                        <Slide
                            direction="up"
                            in={mounted}
                            mountOnEnter
                            unmountOnExit
                            timeout={600}
                            easing={{
                                enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                exit: 'cubic-bezier(0.7, 0, 0.84, 0)'
                            }}
                        >
                            <Typography
                                variant="h4"
                                align="center"
                                gutterBottom
                                sx={{
                                    mb: 3,
                                    background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 700,
                                    letterSpacing: '0.03em',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -8,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '80px',
                                        height: '4px',
                                        background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
                                        borderRadius: '2px',
                                        opacity: 0.8
                                    }
                                }}
                            >
                                Class Details
                            </Typography>
                        </Slide>

                        {getresponse ? (
                            <Fade in={mounted}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 4,
                                    p: 3,
                                    backgroundColor: 'background.paper',
                                    borderRadius: 2,
                                    boxShadow: 1
                                }}>
                                    <Typography variant="h6">No Students Found</Typography>
                                </Box>
                            </Fade>
                        ) : (
                            <Zoom in={mounted}>
                                <Paper sx={{
                                    width: '100%',
                                    overflow: 'hidden',
                                    boxShadow: 3,
                                    borderRadius: 2
                                }}>
                                    <Box sx={{ p: 3 }}>
                                        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                                            Students List
                                        </Typography>
                                        {Array.isArray(sclassStudents) && sclassStudents.length > 0 ? (
                                            <TableTemplate
                                                buttonHaver={StudentsButtonHaver}
                                                columns={studentColumns}
                                                rows={studentRows}
                                            />
                                        ) : (
                                            <Typography variant="body1" sx={{ textAlign: 'center', p: 2 }}>
                                                No students available
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>
                            </Zoom>
                        )}
                    </>
                )}
            </Box>
        </Fade>
    );
};

export default TeacherClassDetails;