import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/haefele_logo.png'
import user from '../images/user.png'
import plus from '../images/plus-img.png'
import { Camera, CameraResultType } from '@capacitor/camera';
import $ from 'jquery'
import Loader from './Loader'
const Processing = () => {
    const drivername = localStorage.getItem('DriverName')
    const [image1, setimage1] = useState()
    const [image2, setimage2] = useState()
    const [image3, setimage3] = useState()
    const [image4, setimage4] = useState()
    const [image5, setimage5] = useState()
    const [image6, setimage6] = useState()
    const [loader, setLoader] = useState(false)
    const [error , seterror] = useState('')

    const [img1, setimg1] = useState()
    const [img2, setimg2] = useState()
    const [img3, setimg3] = useState()
    const [img4, setimg4] = useState()
    const [img5, setimg5] = useState()
    const [img6, setimg6] = useState()

    const [pendinglisting, setpendinglisting] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    // useEffect(() => {
    //     async function getdetails() {

    //         const parcleList = localStorage.getItem('LoadingID')
    //         const currentship = localStorage.getItem('currentship')
    //         const formData = new FormData();


    //         formData.append('parcleList', parcleList);
    //         formData.append('currentship', currentship);

    //         const queryString = new URLSearchParams(formData).toString();

    //         fetch(`https://warehouseapi.hinccms.in/ajaxfunc-sri-app-new.php?${queryString}`)
    //             .then(response => {
    //                 return response.text();

    //             })
    //             .then(data => {
    //                 setLoading(false)
    //                 setpendinglisting(data)
    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //             });

    //     }

    //     getdetails()

    //     $('.clickpending').hide()


    // }, [])

    useEffect(() => {
        async function getbox() {

            const parcleList = localStorage.getItem('LoadingID')
            const currentship = localStorage.getItem('currentship')
            const formData = new FormData();


            formData.append('cparcleDetailNew', parcleList);
            formData.append('currentShip', currentship);

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

        getbox()

        $('.clickpending').hide()


        setTimeout(() => {
            var getbxcount = $('body').find('#boxcount').text();

            localStorage.setItem("Boxes", getbxcount);
            localStorage.setItem("BoxCount", getbxcount);
        }, 2000);





    }, [])

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





    const handlechange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        
        formData.append('file', file);
        setLoader(true)

        fetch('https://warehouseapi.hinccms.in/uploads.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                setimage1('https://warehouseapi.hinccms.in/image1/' + data)
                setimg1(data)
                setLoader(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handlechange2 = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        setLoader(true)

        fetch('https://warehouseapi.hinccms.in/uploads2.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                setimage2('https://warehouseapi.hinccms.in/image2/' + data)
                setimg2(data)
                setLoader(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handlechange3 = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        setLoader(true)

        fetch('https://warehouseapi.hinccms.in/uploads3.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                setimage3('https://warehouseapi.hinccms.in/image3/' + data)
                setimg3(data)
                setLoader(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handlechange4 = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();

        formData.append('file', file);

        setLoader(true)

        fetch('https://warehouseapi.hinccms.in/uploads4.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                setimage4('https://warehouseapi.hinccms.in/image4/' + data)
                setimg4(data)
                setLoader(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handlechange5 = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();

        formData.append('file', file);

        setLoader(true)

        fetch('https://warehouseapi.hinccms.in/uploads5.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                setimage5('https://warehouseapi.hinccms.in/image5/' + data)
                setimg5(data)
                setLoader(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handlechange6 = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        setLoader(true)

        fetch('https://warehouseapi.hinccms.in/uploads6.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                setimage6('https://warehouseapi.hinccms.in/image6/' + data)
                setimg6(data)
                setLoader(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }




    const onconfirm = () => {

        if (!img1 && !img2 && !img3 && !img4 && !img5 && !img6) {
            alert("Please upload at least one image before confirming.");
            seterror("Please upload at least one image before confirming.")
            return;
        }

        var logvehicleno = localStorage.getItem("VehicleNo");
        var bftcode = localStorage.getItem("LoadingCode");
        var logloadingcode = localStorage.getItem("LoadingID");
        var currentship = localStorage.getItem("currentship");


        var CustomerName = localStorage.getItem("CustomerName");
        var BoxCount = localStorage.getItem("BoxCount");


        var currlat = localStorage.getItem("currlat");
        var currlon = localStorage.getItem("currlon");
        var DeviceID = localStorage.getItem("deviceID");
        var DriverName = localStorage.getItem("DriverName");

        const formData = new FormData();


        formData.append('confirmPorcess', logvehicleno);
        formData.append('bftcode', bftcode);
        formData.append('currlat', currlat);
        formData.append('currlon', currlon);
        formData.append('LoadingCode', logloadingcode);
        formData.append('currentship', currentship);

        formData.append('DocketNo', '');
        formData.append('CustomerName', CustomerName);
        formData.append('Boxes', BoxCount);
        formData.append('BoxCount', BoxCount);
        formData.append('EDD', '');

        formData.append('image1Name', img1);
        formData.append('image2Name', img2);
        formData.append('image3Name', img3);
        formData.append('image4Name', img4);
        formData.append('image5Name', img5);
        formData.append('image6Name', img6);

        formData.append('DeviceID', DeviceID);
        formData.append('DriverName', DriverName);



        const queryString = new URLSearchParams(formData).toString();

        fetch(`https://warehouseapi.hinccms.in/ajaxfunc-app-new.php?${queryString}`)
            .then(response => {
                return response.text();

            })
            .then(data => {
                navigate('/thankyou')
            })

            .catch(error => {
                console.error('Error:', error);
            });


    }



    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64 // Change this to Base64
        });

        // image.base64String will contain the base64 representation of the image
        var imageUrl = image.base64String;

        // If you need to convert the base64 string to a binary format (Blob)
        const rawData = atob(imageUrl);
        const bytes = new Array(rawData.length);
        for (let x = 0; x < rawData.length; x++) {
            bytes[x] = rawData.charCodeAt(x);
        }
        const arr = new Uint8Array(bytes);

        const blob = new Blob([arr], { type: 'image/' + image.format });
        console.log(blob)

    };





    return (
        <div>
            {loader && <Loader/>}
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


            <div class="small-wrapper " >
                <div class="shop parcleDetail" style={{ marginTop: "15px" }}>

                    <div dangerouslySetInnerHTML={{ __html: pendinglisting }} />
                    {loading && <> <p>Please wait we are loading list</p> <div class="loader"></div> </>}
                </div>



                <div class="shop signshop" style={{ display: "block" }}>
                    <h1>Upload delivery picture here</h1>
                    <div class="uploadpic">
                        <span>Click to upload photo</span>
                        <div className='row'>
                            <div class="uploadimg " id="cameraTakePicture1">
                                <img
                                    src={image1 ? image1 : plus}
                                    id="image1"
                                    style={{
                                        width: "100%",
                                        height: image1 && image1.height > image1.width ? "100px" : "100px"
                                    }}
                                    alt=""
                                />

                                <input type="file" onChange={handlechange} accept="image/*" name='image1' id="image1Name" value="" capture />
                                <button onClick={takePicture}>click</button>
                            </div>

                            <div class="uploadimg col-4" id="cameraTakePicture2">
                                <img src={image2 ? image2 : plus} id="image2" style={{
                                    width: "100%",
                                    height: image1 && image1.height > image1.width ? "100px" : "100px"
                                }} alt="" />

                                <input type="file" onChange={handlechange2} accept="image/*" name='image2' id="image1Name" value="" capture /></div>

                            <div class="uploadimg  col-4" id="cameraTakePicture3">
                                <img src={image3 ? image3 : plus} id="image3" style={{
                                    width: "100%",
                                    height: image1 && image1.height > image1.width ? "100px" : "100px"
                                }} alt="" />
                                <input type="file" onChange={handlechange3} accept="image/*" name='image3' id="image1Name" value="" capture />
                            </div>

                        </div>
                        <div className='row'>
                            <div class="uploadimg " id="cameraTakePicture4">
                                <img src={image4 ? image4 : plus} id="image4" style={{
                                    width: "100%",
                                    height: image1 && image1.height > image1.width ? "100px" : "100px"
                                }} alt="" />
                                <input type="file" onChange={handlechange4} name='image4' accept="image/*" id="image2Name" value="" capture />
                            </div>

                            <div class="uploadimg " id="cameraTakePicture5">
                                <img src={image5 ? image5 : plus} id="image5" style={{
                                    width: "100%",
                                    height: image1 && image1.height > image1.width ? "100px" : "100px"
                                }} alt="" />
                                <input type="file" onChange={handlechange5} name='image5' accept="image/*" id="image2Name" value="" capture />
                            </div>

                            <div class="uploadimg " id="cameraTakePicture6">
                                <img src={image6 ? image6 : plus} id="image6" style={{
                                    width: "100%",
                                    height: image1 && image1.height > image1.width ? "100px" : "100px"
                                }} alt="" />
                                <input type="file" onChange={handlechange6} name='image6' accept="image/*" id="image2Name" value="" capture />
                            </div>

                        </div>

                    </div>

                    <div>
                        <input type="button" onClick={() => {
                            setimage1()
                            setimage2()
                            setimage3()
                            setimage4()
                            setimage5()
                            setimage6()
                        }} class="reset" id="reset" value="Reset" />
                        <input type="button" onClick={onconfirm} class="confirm" id="confirm" value="Confirm" />
                    </div>
                    {error && <span className='text-danger py-2'>{error}</span>}
                </div>

            </div>
        </div>
    )
}

export default Processing