import "../style/Login.css";
import "../style/App.css";
import hero from "../Images/hero.png";
import logo from "../Images/loginLOGO.svg";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Signup from "./Signup";
import axios from "axios";
import { HStack } from "@chakra-ui/layout";
import Timer from "./Timer";

const Signupemail = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
  });

  const [showTimer, setShowTimer] = useState(false);
  const [showResend, setResend] = useState(false);

  const handleTimerComplete = () => {
    setShowTimer(false);
    setResend(true);
  };

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    setShowTimer(true);
    if (!regex.test(form?.email)) {
      toast.error("Invalid Email");
    } else {
      try {
        const res = await axios.post(
          "https://sharebb-production.up.railway.app/verifyEmail",
          {
            email: form.email,
          }
        );
        const data = res.status;
        if (data === 200) {
          const changeClass1 = document.querySelector(".send");
          const changeClass2 = document.querySelector(".verify");
          changeClass1.classList.add("d-none");
          changeClass2.classList.remove("d-none");
          toast.success("OTP sent")
        }
        else if( data === 222 ){
          toast.error("Email already registered. Please Login.")
        }
      } catch (err) {
        if (err.response) {
          toast.error("Something went wrong");
        }
      }
    }
  };
  const handleResubmit = async (e) => {
    e.preventDefault();
    setShowTimer(true);
    setResend(false);
    try {
      const res = await axios.post(
        "https://sharebb-production.up.railway.app/verifyEmail",
        {
          email: form.email,
        });
        toast.success("OTP resent");
        

  }
  catch (err) {
    if (err.response) {
      console.log("Something went wrong");
      
    }
  }
}
  const handleVerifyOTP = async(e) => {

    e.preventDefault();
    if (!form.otp) {
      toast.error("OTP is required");
    } else {
      try {
        const res = await axios.post(
          "https://sharebb-production.up.railway.app/otp_verification",
          {
            email: form.email,
            otp: form.otp,
          }
        );
        const data = res.status;
        if (data === 200) {
          localStorage.setItem("email", form.email);
          navigate("/signup");
        } else if (data === 288) {
          toast.error("Incorrect OTP. Please enter again.");
        }
      } catch (err) {
        if (err.response) {
          console.log("Something went wrong");
        }
      }
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const backToSignup = () => {
    navigate("/signupwithemail");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleVerifyOTP(e);
    }
  };
  return (
    <div>
        <div className="d-none">
        <Signup email = {form.email}/>
        </div>
    <div className="signupform">
      <div className="left d-flex flex-column">
        <div className="text-header text-center mx-auto  text-white p-5">
          Predict and Visualize the stock price daily
        </div>
        <div className="hero mx-auto my-auto">
          <img className="image-hero" src={hero} />
        </div>
      </div>
      <div className="right d-flex flex-column align-items-start">
        <ToastContainer />
        <div className="detailform my-5 mx-5 w-100">
          <div className="logo">
            <img src={logo} className="logo-main" alt="" />
          </div>
          <div className="text-medium  text-black">Create account</div>
          <div className="text-small  text-black">
            For Traders and Investors
          </div>
          <form className="form-edit  g-2 mt-3">
            <div className="send">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control toClear"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSendOTP}
                  
                >
                  Send OTP
                </button>
              </div>
            </div>
            <div className="verify d-none">
              <div className="col-md-6">
                <label htmlFor="OTP" className="form-label">
                  OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="otp"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress} 
                />
              </div>
              <div className="col-12 mt-3">
                <HStack>
                <button
                  type="submit"
                  className="btn btn-primary sizing"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                    onClick={backToSignup}
                >
                  Back
                </button>

                </HStack>
                {showTimer && <Timer  onComplete={handleTimerComplete} />}

                
              </div>
              <div className="pt-3">
            {
              showResend && <span className="colorChange " style={{ cursor: 'pointer'}} onClick={handleResubmit} >
              Resend OTP
            </span>
            }
            
          </div>
            </div>
          </form>

          <div className="extras">
            <div className="mt-3">
              Already have account?
              <span className="colorChange" style={{ cursor: 'pointer'}}  onClick={() => navigate("/login")}>
                {" "}
                Log in
              </span>
            </div>
            <div className="mt-2">
              Go to
              <span className="colorChange" style={{ cursor: 'pointer'}}  onClick={() => navigate("/")}>
                {" "}
                Home
              </span>
            </div>
            <div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default Signupemail;
