import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/haefele_logo.png'
import user from '../images/user.png'
import truck from '../images/Component 7 - 1.png'

const Thankyou = () => {

    const navigate = useNavigate()
    const drivername = localStorage.getItem('DriverName')
    const hanldelogout = () => {
        const userConfirmed = window.confirm('Are you sure you want to logout?');

        if (userConfirmed) {


            const formData = new FormData();


            formData.append('logoutLoading', localStorage.getItem('VehicleNo'));
            formData.append('LoadingCode', localStorage.getItem('LoadingCode'));
            formData.append('DriverName', localStorage.getItem('DriverName'));
            formData.append('mobileno', localStorage.getItem('MobileNo'));
            formData.append('deviceID', localStorage.getItem('deviceID'));


            const queryString = new URLSearchParams(formData).toString();

            fetch(`https://warehouseapi.hinccms.in/ajaxfunc-app.php?${queryString}`)
                .then(response => {
                    return response.text();

                })
                .then(data => {
                    localStorage.clear();
                    navigate('/log')
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
    return (
        <div>
            <div class="headertop">
                <div class="row  pad10" onClick={hanldelogout}>
                    <div class="col-xs-8">
                        <img src={logo} alt='' />
                        <div class="nameholder">Welcome <span id="drivername">{drivername}</span></div>
                    </div>
                    <div class="col-xs-4 text-right">
                        <img src={user} alt='user' />
                    </div>
                </div>
            </div>

            <section class="mainsection">


                <div class="middle-wrapper">
                    <div class="productlist">
                        <div class="inner">
                            <h5>Thank You</h5>
                            <div class="para">
                                <p>We will send you a feedback <br/> link shortly please submit your <br/> customer service feedback</p>
                                </div>
                            </div>
                            <div class="group1">
                                <img src={truck} alt='' />
                            </div>
                            <div class="back-btn">
                                <Link class="subtn" to="/">Back</Link>
                            </div>

                        </div>

                    </div>




            </section>
        </div>
    )
}

export default Thankyou