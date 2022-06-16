import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";
import profile from "../assets/alison fiona.jpg";
import GlobalContext from "../context/GlobalContext";

const Header = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [isLogin, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const validateSignUp = (e) => {
    e.preventDefault();
    var user = {
      username: username,
      email: email,
      password: password,
    };
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.username[0] === "A user with that username already exists.") {
          setErrorMsg(true);
        }
      });
  };

  const validateLogin = (e) => {
    e.preventDefault();
    var user = {
      username: username,
      password: password
    }
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user),
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      if (data.expiry!==undefined  && data.token!==undefined) {
        console.log("value successfull")
        setLogin(true)
        document.querySelector('.close').click();
      }
    })

  }

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  return (
    <div className="headerWrapper">
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
                <p>Name</p>
                <p>E-mail</p>
                <p>Date of Birth</p>
                <p>Shedules this Month</p>
                <p>Shecdules for Today</p>
                <p>Upcoming Schedule</p>
                <p>Upcoming Reminder</p>
                <p>Total No of Reminders</p>
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
              <div>
                <p>
                  <label className="label">User Name</label>
                </p>
                <input
                  type="text"
                  name="user[name]"
                  value={username}
                  onChange={(e) => setUsername(() => e.target.value)}
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
            <form action="" method="get" className="sign-form" onSubmit={validateLogin}>
              <div>
                <p>
                  <label className="label">Username</label>
                </p>
                <input
                  type="test"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(() => e.target.value)}
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
