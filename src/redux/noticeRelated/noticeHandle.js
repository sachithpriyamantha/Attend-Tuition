import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}// Action Types
export const NOTICE_REQUEST = 'NOTICE_REQUEST';
export const NOTICE_SUCCESS = 'NOTICE_SUCCESS';
export const NOTICE_FAIL = 'NOTICE_FAIL';

export const uploadNoticeWithFiles = (formData) => async (dispatch) => {
    dispatch({ type: NOTICE_REQUEST });
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/NoticeCreate`, formData, config);
        dispatch({ type: NOTICE_SUCCESS, payload: data });
        return Promise.resolve(data);
    } catch (error) {
        dispatch({
            type: NOTICE_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
        return Promise.reject(error);
    }
};


export const downloadNoticeFile = (filename) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/notices/download/${filename}`, 
            { responseType: 'blob' }
        );
        
        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        
        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        return Promise.resolve();
    } catch (error) {
        dispatch(getError(error));
        return Promise.reject(error);
    }
};