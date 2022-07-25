import React, { useEffect, useState } from 'react';
import { usersGetDate, deteteUser } from '../Redux/Redux';
import { useDispatch, useSelector } from 'react-redux';
import '../Css/Home.css'
import { Button } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Css/AddUser.css';
function AddUser() {
    const initialData = {
        first_name: "",
        last_name: "",
        email: ""
    }
    const [userData, setUserData] = useState(initialData);
    const navigate = useNavigate();
    console.log("userData", userData)

    const handleForm = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData({ ...userData, [name]: value });
    }

    const validateForm = () => {
        let isValid = true;
        if (userData.first_name === "") {
            isValid = false;
            alert("Please enter first name")
        } else if (userData.last_name === "") {
            isValid = false;
            alert("Please enter last name")
        } else if (userData.email === "") {
            isValid = false;
            alert("Please enter email")
        } else {
            const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!validator.test(userData.email)) {
                isValid = false;
                alert("Please enter valid email")
            }
        }
        return isValid
    }
    const onSubmit = () => {
        if (validateForm()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            };
            fetch('https://reqres.in/api/users', requestOptions)
                .then(response => response.json())
                .then(data => {
                    navigate("/")
                });

        }

    }



    return (
        <>
            <div className='form_container'>
                <div className='form_first_name'>
                    <input placeholder='first name' name='first_name' value={userData.first_name} onChange={handleForm} />
                </div>
                <div className='form_last_name'>
                    <input placeholder='last name' name='last_name' value={userData.last_name} onChange={handleForm} />
                </div>
                <div className='form_email'>
                    <input placeholder='email' name='email' value={userData.email} onChange={handleForm} />
                </div>
                <div className='form_btn'>
                    <button onClick={onSubmit}>submit</button>
                </div>

            </div>




        </>
    )
}

export default AddUser


