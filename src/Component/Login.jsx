import React, { useEffect, useState } from 'react'
import logo from '../images/haefele_logo.png'
import user from '../images/user.png'
import group from '../images/Group 142.png'
import group22 from '../images/group_221.svg'
import group94 from '../images/Group 94.png'
import { Device } from '@capacitor/device';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [errors, setErrors] = useState({})
    const [msg, setMsg] = useState('')
    const [deviceid , setDeviceid] = useState()
    const [value, setValue] = useState({
        VehicleListNew: '',
        LoadingCode: '',
        drivername: '',
        mobileno: '',
    

    })

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.VehicleListNew) {
            isValid = false;
            newErrors.VehicleListNew = "Vehicle no is required";
        }
        if (!value.LoadingCode) {
            isValid = false;
            newErrors.LoadingCode = "Loading code is required"
        }
        if (!value.drivername) {
            isValid = false;
            newErrors.drivername = "Drivername is required"
        }

        const mobileNumberRegex = /^\d{10,15}$/;
        if (!mobileNumberRegex.test(value.mobileno)) {
            isValid = false;
            newErrors.mobileno = "Mobile number should be between 10 and 15 digits.";
        }




        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);

        return isValid;


    }

    const navigate = useNavigate()



    const logDeviceInfo = async () => {
        const info = await Device.getId();

        setDeviceid(info.identifier)
    };
    
    useEffect(()=>{
        logDeviceInfo()
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        

        if (validateForm()) {
            const formData = new FormData(e.target);
            
            formData.append('deviceID', deviceid);
            
            const queryString = new URLSearchParams(formData).toString();
            
            fetch(`https://warehouseapi.hinccms.in/ajaxfunc-app-new.php?${queryString}`)
            .then(response => {
                if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                    // console.log(response)
                })
                .then(data => {
                    
                    if (data[0].boxcount == 0) {
                        setMsg('Incorrect Login Details')
                        
                    } else if (data[0].boxcount == 1) {
                        
                        logDeviceInfo()
                        
                        console.log('Success:', data[0]);
                        localStorage.setItem('DriverName', data[0].DriverName)
                        localStorage.setItem('LoadingCode', data[0].LoadingCode)
                        localStorage.setItem('MobileNo', data[0].MobileNo)
                        localStorage.setItem('VehicleNo', data[0].VehicleNo)
                        localStorage.setItem('LoadingID', data[0].LoadingID)
                        localStorage.setItem('deviceID', deviceid)
                        
                        localStorage.setItem('BoxCount', data[0].boxcount)
                        
                        navigate('/')
                    } else if (data[0].boxcount == 2) {
                        setMsg('Vehicle number and dispatch code assigned to another driver')
                    }

                    setTimeout(() => {
                        setMsg('')
                    }, 3000);

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


    }

    const handleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    }

    return (
        <div>
            <div class="header">
                <div class="container">
                    <div class="row top-head">
                        <div class="login-wrapper">
                            <img class="logo" src={logo} alt='' />
                            <p style={{ textAlign: "right", fontSize: "12px" }}>India</p>
                        </div>
                        <div class="user-wrapper">
                            <a class="user" href="#"><img src={user} /></a>
                        </div>
                    </div>

                    <div class="login">
                        <p>Login</p>
                        <hr class="login-border" />
                    </div>

                    <form onSubmit={handleSubmit} method='GET' class="boxes">

                        <div class="box-1">
                            <input type="text" placeholder="Enter Vehicle Number :" name="VehicleListNew" id="logvehicleno" onChange={handleChange} />
                            <img src={group} alt='' />
                            <div id="logvehiclenoerror" style={{ textAlign: "left", padding: "0", display: "inline-block" }}>
                                <span className="text-danger" >{errors.VehicleListNew}</span>

                            </div>
                        </div>

                        <div class="box-2">
                            <input type="text" placeholder="Enter Loading Code :" name="LoadingCode" onChange={handleChange} id="logloadingcode" />
                            <img src={group} alt='' />

                            <span className="text-danger" >{errors.LoadingCode}</span>
                        </div>

                        <div class="box-2">
                            <input type="text" placeholder="Enter Driver Name :" name="drivername" onChange={handleChange} id="logdrivername" />
                            <img src={group} alt='' />

                            <span className="text-danger" > {errors.drivername}</span>
                        </div>

                        <div class="box-2">
                            <input type="number" placeholder="Enter Mobile No. :" name="mobileno" onChange={handleChange} id="logmobileno" />
                            <img src={group} alt='' />

                            <span className="text-danger" >{errors.mobileno}</span>
                        </div>

                        <div>
                            <p className='text-danger'>{msg}</p>
                        </div>

                        <div class="box-btn">
                            <button type="submit" id="login" class="btnbgcolor"><img src={group22} alt='' />Get delivery orders</button>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "15px", clear: "both" }}>Version 1.0</div>

                    </form>


                    <div class="input-container" id="logformerrora"></div>

                    <div class="group">
                        <img src={group94} alt='' />
                    </div>

                    <button style={{ display: "none" }} class="abc" id="cameraTakePicture">Click to open camera</button>
                </div>
            </div>
        </div>
    )
}

export default Login