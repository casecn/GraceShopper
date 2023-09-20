import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "./registerApi.js";

import { useNavigate } from "react-router";
// import { input } from "@material-tailwind/react";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  

  const fields = {
    username: username,
    password: password,
    email: email,
    first_name: first_name,
    last_name: last_name
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email)
  };

  const handleFirst_name = (event) => {
    setFirst_name(event.target.value);
    console.log(first_name);
  };

  const handleLast_name = (event) => {
    setLast_name(event.target.value);
    console.log(last_name);
  };
}
  
   
      if(!username || !password){
        setError("Please fill out all fields!")
      }
      else if(password.length < 8){
        setError("Passwords must be at least 8 characters!")
      console.log(`Username: ${username}, password: ${password}`);
      console.log("About to register");
      }
      try {
        const user = await registerUser(fields);
        console.log(user);
      if (user) {
       
           localStorage.setItem("password", JSON.stringify(user.password));
            console.log(localStorage.getItem("password"));
            localStorage.setItem("username", JSON.stringify(user.user.username));
            console.log(localStorage.getItem("username"));
            alert("Registration Successful!");
            navigate("/login");
         
      } else (
        window.alert("Registration failed, please try again.")
      );
      
      } catch (error) {
        console.error;
        setError("");
      }
      
  };
    return (
      <>
        <div className="flex w-full justify-center">
          <div className="bg-gray-200 w-5/12 px-5 rounded-lg shadow-lg">
            <div>
              <div className="border">
                <label className="font-bold text-xl pb-2 py-4 flex justify-center">
                  Register:
                </label>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </p>
                <form className="w-full flex m-2 flex-col py-2">
                  <label className="font-bold">Username</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Username*"
                    onChange={handleUsernameChange}
                  />
                  <label className="font-bold">Password</label>
                  <input
                    className="m-2"
                    type="password"
                    required
                    placeholder="Password*"
                    onChange={handlePasswordChange}
                  />

                  <label className="font-bold">Email</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Email*"
                    onChange={handleEmailChange}
                  ></input>

                  <label className="font-bold">First Name</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="First Name*"
                    onChange={handleFirst_name}
                  ></input>

                  <label className="font-bold">Last Name</label>
                  <input
                    className="m-2"
                    type="text"
                    required
                    placeholder="Last Name*"
                    onChange={handleLast_name}
                  ></input>

              

                  <button
                    className="bg-blue-400 flex justify-center text-gray-100 font-bold p-1.5 m-1 rounded-lg hover:bg-blue-600"
                    type="submit"
                    onClick={handleSubmitButton}
                  >
                    Register
                  </button>
                  <button className="flex justify-center bg-gray-300 rounded-lg font-bold p-1.5 m-1 hover:bg-gray-400">
                    <Link to={`/home`}>Cancel</Link>
                  </button>
                </form>
                {error && <p className="text-red-500">{setError}</p>}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  

export default Register