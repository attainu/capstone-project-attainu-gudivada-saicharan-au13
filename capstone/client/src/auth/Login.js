import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });

      if (res.data) {
        console.log(
          "SAVE USER RESPONSE IN REDUX AND LOCAL STORAGE THEN REDIRECT ===>"
        );
        //    console.log(res.data);
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // save user and token to redux
        // eslint-disable-next-line no-undef
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid">
        
      </div>
      <div className="container-fluid">  
            <div className="row no-gutters justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7 col-xl-6">
                    <div className="row no-gutters justify-content-md-center mg-md-top">
                            <div className="col-12 col-md-8 col-lg-7 col-xl-6 pr-md-5">
                                <h3>Login</h3>
                            </div>
                        </div>  
                        <div className="row no-gutters justify-content-md-center">
                        <div className="col-12 col-md-8 col-lg-7 col-xl-6 mt-3 pr-md-5">
                            <LoginForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            />
                        </div>
                        </div>
                    </div>  
            </div>
        
      </div>
    </>
  );
};
export default Login;
