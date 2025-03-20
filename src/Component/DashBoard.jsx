import React, { useEffect, useState } from 'react'
import logo from '../images/haefele_logo.png'
import user from '../images/user.png'
import group from '../images/Group 142.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'
const DashBoard = () => {


    const [pendinglisting, setpendinglisting] = useState('')
    const [loading, setLoading] = useState(true)
    const [click, setclick] = useState(false)
    const [delivery, setdeliverylisting] = useState()
    const drivername = localStorage.getItem('DriverName')
    async function getpedinglisting(e) {
        const parcleList = localStorage.getItem('LoadingID')
        const formData = new FormData();


        formData.append('parcleList', parcleList);

        const queryString = new URLSearchParams(formData).toString();

        fetch(`https://warehouseapi.hinccms.in/ajaxfunc-app-new.php?${queryString}`)
            .then(response => {
                return response.text();

            })
            .then(data => {
                setLoading(false)
                setpendinglisting(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    async function getdeliverylisting(e) {
        const parcleList = localStorage.getItem('LoadingID')
        const formData = new FormData();


        formData.append('parcleDeliveredList', parcleList);


        const queryString = new URLSearchParams(formData).toString();

        fetch(`https://warehouseapi.hinccms.in/ajaxfunc-app-new.php?${queryString}`)
            .then(response => {
                return response.text();

            })
            .then(data => {
                setLoading(false)
                setdeliverylisting(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    useEffect(() => {
        getpedinglisting()
        getdeliverylisting()
    }, [])


    const handleclick = () => {
        setclick(!click)

    }

    const navigate = useNavigate()

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


    useEffect(() => {
        $('body').on('click', '.clickpending', function () {

            var loadingid = $(this).attr('data-loadingid');
            var custname = $(this).attr('data-customername');
            
            localStorage.setItem("currentship", loadingid);
            localStorage.setItem("CustomerName", custname);
        
            window.location.assign("process");
        
        });
        

     
    }, []);





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

            <div class="small-wrapper">
                <div class="productlist">

                    <div class="searchWrapp" style={{ display: "none" }}>
                        <img src={group} alt='' id="search" />
                        <input class="customer" type="customer" placeholder="Type customer name" id="customername" name="" required />
                    </div>




                    <div class="status">
                        <button type="button" onClick={() => handleclick()} class={click ? 'pending ' : 'pending active'}>Pending</button>
                        <button type="button" onClick={() => handleclick()} class={click ? "deliverd active" : 'deliverd'}>Delivered</button>
                    </div>

                    <div className='delivered-listing'>

                    </div>
                </div>


                <div class="shop parcleList">
                    {click ? <div dangerouslySetInnerHTML={{ __html: delivery }} /> : <div dangerouslySetInnerHTML={{ __html: pendinglisting }} />}

                    {loading && <> <p>Please wait we are loading list</p> <div class="loader"></div> </>}
                </div>



            </div>
        </div>
    )
}

export default DashBoard