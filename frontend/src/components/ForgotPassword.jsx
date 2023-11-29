import React from 'react';
import { useState } from 'react';
import { Center } from '@chakra-ui/react';
import axios from 'axios';
import logo from '../Images/loginLOGO.svg'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import hero from '../Images/hero.png'
import '../style/Login.css'
// import '../style/ForgotPassword.css'

function Forgotpassword() {
    const navigate = useNavigate();

    const backToForgotpw = () => {
        navigate('/Forgotpassword')
      }
    const [password, setPassword] = useState({
        confirmPass: "",
        newPass: "",

    });
    const [gotOTP, setGotOTP] = useState(false);
    const [gotEmail, setGotEmail] = useState(false);
    const [form, setEmail] = useState({
        email: '',
        otp: ''
    });
    const handleChange = (e) => {
        setEmail({ ...form, [e.target.name]: e.target.value })
        setPassword({ ...password, [e.target.name]: e.target.value });
        console.log(form)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Hlel")
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const pass =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

        if (!regex.test(form?.email)) {
            toast.error('Invalid Email')
        }
        else if (!regex.test(form?.pass)) {
            toast.error("Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.");
          }
        else {
            const res = await axios
                .post("https://sharebb-production.up.railway.app/forgotPassword", {
                    email: form.email,
                })
            toast.success('Otp sent')
            setGotEmail(true)
        }
    }
    const handleOTP = async (e) => {
        e.preventDefault();
        if (!form.otp) {
            toast.error("OTP is required");
        } else {
            try {
                const res = await axios.post("https://sharebb-production.up.railway.app/otp_verification", {
                    email: form.email,
                    otp: form.otp
                });
                const data = res.status;
                if (data === 200) {

                    setGotOTP(true)
                }
                else if (data === 288) {
                    toast.error("Incorrect OTP. Please enter again.")
                }
            } catch (err) {
                if (err.response) {
                    // ✅ log status code here
                    console.log(err.response.status);
                    console.log(err.message);
                    console.log(err.response.headers); // 👉️ {... response headers here}
                    console.log(err.response.data); // 👉️ {... response data here}
                }
            }

        }
    }
    const handlePass = async (e) => {
        e.preventDefault();
        if (!password?.newPass) {
            toast.error('New Password  is required')
        }
        else if (password?.newPass.length < 4) {
            toast.error('New Password  of atleast 4 characters is required')
        }
        else if (password?.newPass.length > 10) {
            toast.error('New Password  of atmost 10 characters is required')
        }
        else if (password.newPass != password.confirmPass) {
            toast.error('New password and confirm password should be same')
        }
        else {
            try {
                const res = await axios.post("https://sharebb-production.up.railway.app/updatePassword", {
                    email: form.email,
                    newPass: password.newPass
                });

                if (res.status === 200) {
                    toast.success('Password changed succesfully')
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)
                }

            }
            catch (err) {
                if (err.response) {
                    // ✅ log status code here
                    console.log(err.response.status);
                    console.log(err.message);
                    console.log(err.response.headers); // 👉️ {... response headers here}
                    console.log(err.response.data); // 👉️ {... response data here}
                }
            }
        }
    }
    return (
        <div className='signupform'>
        <div className="left d-flex flex-column">
          <div className="text-header text-center mx-auto  text-white p-5">
            Predict and Visualize the stock price daily
          </div>
          <div className="hero mx-auto my-auto">
            <img className="image-hero" src={hero} />
          </div>
        </div>
        <div className="d-flex h-100 w-100  justify-content-center align-items-center">
            <ToastContainer />
            <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center flex-column detailform">
                    <div className="logo">
                        <img src={logo} className="logo-main" alt="" />
                    </div>
                    <div className="text-medium text-black">Forgot Password</div>

                    <form className="h-100 w-100 form-edit col justify-content-center align-items-center g-3 mt-5">
                        {!gotEmail && <><div className="col-md-12 text-center">
                            <label htmlFor="name" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder='Email'
                                onChange={handleChange}
                            />
                        </div>
                            <div className="col-md-6 mt-3 text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    onClick={handleSubmit}
                                >
                                    Send OTP
                                </button>

                            </div>
                        </>}

                        {gotEmail&& !gotOTP&& <><div className="col-md-12 text-center">
                            <label htmlFor="name" className="form-label">
                                OTP
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="otp"
                                placeholder='OTP'
                                onChange={handleChange}
                            />
                        </div>
                            <div className="row-md-6 mt-3 text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    style={{width:150, marginRight:2}}
                                    onClick={handleOTP}
                                >
                                    Submit
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    style={{width:150, marginLeft:2}}
                                    onClick={backToForgotpw}
                                >
                                    Change Email
                                </button>

                            </div>
                        </>}
                        {gotOTP && <>
                        <div className="col-md-12 text-center">
                            <label htmlFor="name" className="form-label text-lg">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="newPass"
                                placeholder='New Password'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-12 text-center mt-3">
                            <label htmlFor="name" className="form-label text-lg">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPass"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                            />
                        </div>
                            <div className="row-md-6 mt-3 text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    style={{width:150, marginLeft:2}}
                                    onClick={handlePass}
                                >
                                    Confirm 
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    style={{width:150, marginLeft:2}}
                                    onClick={backToForgotpw}
                                >
                                    Change Email
                                </button>
                            </div>
                        </>}
                    </form>

                </div>
            </div>
        </div>
        </div>
    )

}

export default Forgotpassword;