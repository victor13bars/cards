import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "../styles/App.css"
import myPhoto from '../assets/images/MyPhoto.jpg'
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import {authMeThunk, editAuthMeThunk} from "../redux/auth-reducer";
import {trueDate} from "../components/utils/trueDate";


const Profile = () => {
    const dispatch = useDispatch()
    const inRef = useRef(null);
    const [file, setFile] = useState()
    // const [fileData, setFileData] = useState();
    const avatar = useSelector(state => state.auth.avatar)
    const email = useSelector(state => state.auth.email)
    const name = useSelector(state => state.auth.name)
    const publicCardPacksCount = useSelector(state => state.auth.publicCardPacksCount)
    const created = useSelector(state => state.auth.created)
    const verified = useSelector(state => state.auth.verified.toString())
    const [edit, setEdit] = useState(false)
    const [newName, setNewName] = useState(name)


    const upload = (e) => {
        e.preventDefault()
        const formData = new FormData(); // for send to back
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            setFile(newFile);
            let avatarUrl = window.URL.createObjectURL(newFile)
            // setFileURL(window.URL.createObjectURL(newFile));
            // formData.append('myFile', newFile, newFile.name);
            // setFileData(formData);
            dispatch(editAuthMeThunk(newName, avatarUrl))
        }

    }
    const onBlur = (e) => {
        setEdit(false)
        dispatch(editAuthMeThunk(newName, ""))
    }


    return (
        <>
            <h2 style={{marginTop: '20px'}}> My Profile </h2>
            <div className="profileContainer">
                <div className='profileImg_wrapper'>
                    <div className='profileImg'>
                        <img  src={avatar ? avatar : myPhoto}/>
                    </div>

                    {!edit
                        ?
                        <p className='profileImg_wrapper_text'  onDoubleClick={() => setEdit(true)}>{newName} </p>
                        :
                        <MyInput
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={onBlur}
                        />}
                        <span>Front-end Developer</span>
                    <input
                        ref={inRef}
                        type="file"
                        style={{display: 'none'}}
                        accept=".jpg, .jpeg, .png"
                        multiple
                        onChange={upload}
                    />

                    <MyButton onClick={() => inRef && inRef.current && inRef.current.click()}>Upload photo</MyButton>
                    {/*<MyButton onClick={upload}>Upload photo</MyButton>*/}

                </div>
                <div className='profileInfo_wrapper'>
                    <p>E-mail : {email}</p>
                    <p>Count packs : {publicCardPacksCount}</p>
                    <p>Created : {trueDate(created)}</p>
                    <p>Verified : {verified}</p>
                </div>
            </div>
        </>
    );
};

export default Profile;