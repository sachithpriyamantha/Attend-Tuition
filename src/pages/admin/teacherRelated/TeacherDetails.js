import { Button, Card, CardActions, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';

const AnimatedCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    boxShadow: theme.shadows[5],
    borderRadius: '16px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {loading ? (
                <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />
            ) : (
                <AnimatedCard>
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom color="primary">
                            Teacher Details
                        </Typography>
                        <Typography variant="h6" gutterBottom color="textSecondary">
                            Teacher Name: <strong>{teacherDetails?.name}</strong>
                        </Typography>
                        <Typography variant="h6" gutterBottom color="textSecondary">
                            Class Name: <strong>{teacherDetails?.teachSclass?.sclassName}</strong>
                        </Typography>
                        {isSubjectNamePresent ? (
                            <>
                                <Typography variant="h6" gutterBottom color="textSecondary">
                                    Subject Name: <strong>{teacherDetails?.teachSubject?.subName}</strong>
                                </Typography>
                                <Typography variant="h6" gutterBottom color="textSecondary">
                                    Subject Sessions: <strong>{teacherDetails?.teachSubject?.sessions}</strong>
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="h6" gutterBottom color="error">
                                No subject assigned yet.
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        {!isSubjectNamePresent && (
                            <Button variant="contained" color="primary" onClick={handleAddSubject}>
                                Add Subject
                            </Button>
                        )}
                    </CardActions>
                </AnimatedCard>
            )}
        </Container>
    );
};

export default TeacherDetails;
