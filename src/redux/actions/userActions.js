import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  LOADING_DATA,
  UPDATE_POST,
  SET_USER_DETAIL
  
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// app.get('/user/:handle/addFriend',FBAuth,addFriend);

export const addFriend =(handle) => (dispatch) =>{
    axios
    .get(`/user/${handle}/addFriend`)
    .then(res =>{
      console.log(res.data);
    })
    
}
export const getUserData = () => (dispatch) => {
  dispatch(getAllUserDetail());
  
  
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      
      dispatch({
        type: SET_USER,
        payload: res.data
      });
     
      
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  dispatch({ type: LOADING_DATA });
  axios
    .post('/user/uploadProfileImage', formData)
    .then(( res ) => {
      console.log ("check updata!!!");
      console.log(res.data);
      dispatch(getUserData());
      dispatch({type : UPDATE_POST,
                payload:res.data});
      // dispatch({ type: LOADING_DATA });
    })
    
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/editUser', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

//get all user detail
export const getAllUserDetail = () =>(dispatch) => {
  // console.log("use getalluserDetail");
  axios
      .get('/users')
      .then(res => {
        // console.log(res.data);
        dispatch({
          type : SET_USER_DETAIL,
          payload : res.data
        });
      })
    }
export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
