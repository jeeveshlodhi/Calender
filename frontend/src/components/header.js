import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaRegCalendarAlt,
} from "react-icons/fa";
import profile from "../assets/avatar_female.png";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

const Header = () => {
  const {
    monthIndex,
    setMonthIndex,
    isLogin,
    setLogin,
    loginEmail,
    setLoginEmail,
  } = useContext(GlobalContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  useEffect(() => {
    let checkLogin = localStorage.getItem("isLogin");
    let checkEmail = localStorage.getItem("email");
    console.log(checkLogin, checkEmail)
    if (checkLogin === "true") {
      setLogin(true);
      setLoginEmail(checkEmail);
      axios
        .get("http://127.0.0.1:3000/api/checkName?email=" + checkEmail)
        .then((res) => {
          console.log(res.data[0]);
          setFirstName(() => res.data[0].fname);
          setLastName(() => res.data[0].lname);
        });
    }
  }, []);

  const validateSignUp = async (e) => {
    e.preventDefault();
    var user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    try {
      let url = "http://127.0.0.1:3000/api/createUser";
      let checkUrl = "http://127.0.0.1:3000/api/checkUser?email=" + email;
      axios.get(checkUrl).then((res) => {
        if (res.data === "notFound") {
          axios.post(url, user).then((res) => {
            console.log("User added");
          });

          let element = document.getElementById("signUpMsg");
          element.innerHTML = "User Registration Successful";
          element.classList.remove("red");
          element.classList.add("green");
          setTimeout(() => {
            document.querySelector(".close").click();
            element.innerHTML = "";
          }, 2000);
        } else {
          let element = document.getElementById("signUpMsg");
          element.innerHTML = "User Already Exists";
          element.classList.remove("green");
          element.classList.add("red");
          setTimeout(() => {
            element.innerHTML = "";
          }, 3000);
        }
      });

      // console.log(res.message);
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        setErrorMsg(error.response.data.message);
      }
    }
  };

  const validateLogin = (e) => {
    e.preventDefault();
    var user = {
      email: email,
      password: password,
    };
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      console.log(user);
      let url =
        "http://127.0.0.1:3000/api/checkLogin?email=" +
        email +
        "&password=" +
        password;
      let checkUrl = "http://127.0.0.1:3000/api/checkUser?email=" + email;
      console.log(url);
      axios.get(checkUrl).then((res) => {
        console.log(res.data);
        if (res.data === "notFound") {
          let element = document.getElementById("loginMsg");
          element.innerHTML = "User Does not Exists";
          element.classList.remove("green");
          element.classList.add("red");
          setTimeout(() => {
            element.innerHTML = "";
            element.classList.remove("red");
          }, 3000);
        } else {
          axios.post(url, user).then((res) => {
            if (res.data === "password matched successfully") {
              let element = document.getElementById("loginMsg");
              element.innerHTML = "Login Successful";
              element.classList.remove("red");
              element.classList.add("green");
              setLogin(true);
              setLoginEmail(email);
              localStorage.setItem("isLogin", true);
              localStorage.setItem("email", email);
              setTimeout(() => {
                document.querySelector(".close").click();
                element.innerHTML = "";
              }, 1000);
            }
          });
        }
      });
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        setErrorMsg(error.response.data.message);
      }
    }
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  const handleLogout = () =>{
    document.querySelector('.close').click()
    localStorage.setItem('isLogin', false)
    localStorage.removeItem('email')
    localStorage.removeItem('savedEvents')
    setLogin(false)
    
  }

  return (
    <div className="headerWrapper">
      <div className="logo">
        <FaRegCalendarAlt />
        Calender
      </div>
      <div className="leftMenu">
        <input
          type="button"
          value="Today"
          className="todayButton"
          onClick={handleReset}
        />
        <div className="headArrow">
          <FaAngleLeft onClick={handlePrevMonth} />
          <FaAngleRight onClick={handleNextMonth} />
        </div>
        <div className="dateWrapper">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </div>
      </div>
      <div className="rightMenu">
        <FaSearch className="headSearch" />
        {isLogin === true ? (
          <a className="button" href="#popup1">
            <div className="profileImageWrapper">
              <img src={profile} alt="" className="profileImage" />
            </div>
          </a>
        ) : (
          <div className="signUpWrapper">
            <a href="#popup2" className="button">
              <input type="button" value="Sign Up" className="signBtn" />
            </a>
            <a href="#popup3" className="button">
              <input type="button" value="Log In" className="signBtn" />
            </a>
          </div>
        )}
        <div id="popup1" className="overlay">
          <div className="popup profile-width">
            <h2 className="heading">Profile</h2>
            <a className="close" href="#">
              &times;
            </a>
            <div className="content">
              <div className="popupImage">
                <img src={profile} alt="" />
              </div>
              <div className="popupDesc">
                <p>Name : </p>
                <p>{firstName + " " + lastName}</p>
                <p>E-mail : </p>
                <p>{loginEmail}</p>
                <div className="logoutWrapper">
                  <input
                    type="button"
                    value="Logout"
                    className="logout"
                    onClick={() => handleLogout()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="popup2" className="overlay">
          <div className="popup sign-width">
            <h2 className="heading">Sign Up</h2>
            <a className="close" href="#">
              &times;
            </a>
            <form
              action=""
              method="post"
              className="sign-form"
              onSubmit={validateSignUp}
            >
              <div id="signUpMsg" className="msg"></div>
              <div>
                <p>
                  <label className="label">First Name</label>
                </p>
                <input
                  type="text"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(() => e.target.value)}
                  required
                  autoComplete="off"
                  className="userinput"
                />
              </div>
              <div>
                <p>
                  <label className="label">Last Name</label>
                </p>
                <input
                  type="text"
                  name="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(() => e.target.value)}
                  required
                  autoComplete="off"
                  className="userinput"
                />
              </div>
              <div>
                <p>
                  <label className="label">Email Address</label>
                </p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(() => e.target.value)}
                  required
                  autoComplete="off"
                  className="userinput"
                />
              </div>
              <div>
                <p>
                  <label className="label">Password</label>
                </p>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(() => e.target.value)}
                  required
                  className="userinput password "
                />
              </div>
              <input type="submit" className="sign-btn" value="Sign Up" />
              {errorMsg === true ? (
                <div className="errorMsg">Error occured here</div>
              ) : (
                <div className="errorMsg"></div>
              )}
              <p>
                Already a member? <a href="#popup3">Log in</a>
              </p>
            </form>
          </div>
        </div>
        <div id="popup3" className="overlay">
          <div className="popup sign-width">
            <h2 className="heading">Login</h2>
            <a className="close" href="#">
              &times;
            </a>
            <form
              action=""
              method="get"
              className="sign-form"
              onSubmit={validateLogin}
            >
              <div id="loginMsg" className="msg"></div>
              <div>
                <p>
                  <label className="label">Email</label>
                </p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(() => e.target.value)}
                  required
                  className="userinput"
                />
              </div>
              <div>
                <p>
                  <label className="label">Password</label>
                </p>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(() => e.target.value)}
                  required
                  className="userinput password"
                />
              </div>
              <input type="submit" className="sign-btn" value="Log In" />

              <p>
                Not a register user? <a href="#popup2">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
