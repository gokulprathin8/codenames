import styled from "@emotion/styled";
import {Link} from "@remix-run/react";
import {useForm} from "react-hook-form";
import {registerUser} from "../store/auth";
import {useState} from "react";

const LoginContainer = styled.div`
  display: flex;
`;

const UserContent = styled.div`
  margin-right: auto;
  margin-left: 30%;
  margin-top: calc(100% - 70%);
  font-family: Roboto,serif;
`;

const CredentialContainer = styled.div`
  margin-top: 40px;
`;

const UserEmailInput = styled.input`
  padding: 12px;
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 5px;
  width: 40%;

  &:hover {
    border: 1px solid #54927A;
  }

  &:focus {
    border: 1px solid #54927A;
  }
`;

const RegisterButton = styled.button`
  background-color: #54927A;
  border: 0;
  border-radius: 10px;
  width: 30%;
  height: 40px;
  text-align: center;
  color: white;
  margin-top: 35px;
  margin-left: 45px;
`;

const UserPasswordInput = styled.input`
  padding: 12px;
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 5px;
  width: 40%;

  &:hover {
    border: 1px solid #54927A;
  }

  &:focus {
    border: 1px solid #54927A;
  }
`;

const LoginContainerPattern = styled.div`
  flex: 1;
  height: 100vh;
  background: -moz-radial-gradient(0% 2%, circle, rgb(255, 255, 255) 9px, #54927a 10px, rgb(84, 146, 122) 11px), -moz-radial-gradient(100% 100%, rgba(96, 16, 48, 0) 9px, #661133 10px, rgba(96, 16, 48, 0) 11px), none;
  background: -webkit-radial-gradient(0% 2%, circle, rgb(255, 255, 255) 9px, #54927a 10px, rgb(84, 146, 122) 11px), -webkit-radial-gradient(100% 100%, rgba(96, 16, 48, 0) 9px, #661133 10px, rgba(96, 16, 48, 0) 11px), none;
  background: -ms-radial-gradient(0% 2%, circle, rgb(255, 255, 255) 9px, #54927a 10px, rgb(84, 146, 122) 11px), -ms-radial-gradient(100% 100%, rgba(96, 16, 48, 0) 9px, #661133 10px, rgba(96, 16, 48, 0) 11px), none;
  background: -o-radial-gradient(0% 2%, circle, rgb(255, 255, 255) 9px, #54927a 10px, rgb(84, 146, 122) 11px), -o-radial-gradient(100% 100%, rgba(96, 16, 48, 0) 9px, #661133 10px, rgba(96, 16, 48, 0) 11px), none;
  background: radial-gradient(0% 2%, circle, rgb(255, 255, 255) 9px, #54927a 10px, rgb(84, 146, 122) 11px), radial-gradient(100% 100%, rgba(96, 16, 48, 0) 9px, #661133 10px, rgba(96, 16, 48, 0) 11px), none;
  background-size: 20px 20px;
`;

const LoginCredContainer = styled.div`
  flex: 1;
`;

export default function AuthLogin() {

    const [user, setUser] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function handleFormSubmit(data) {
        const registrationResp = await registerUser(data.email, data.password);
        console.log(registrationResp);
        setUser(registrationResp);
    }

    return (
        <LoginContainer>
            <LoginContainerPattern>

            </LoginContainerPattern>

            <LoginCredContainer>
                <UserContent>
                    <h1 style={{ marginBottom: "5px" }}>Get's Started.</h1>
                    <p style={{ color: "grey", marginTop: 0 }}>Already have a account?
                        <Link to="/auth/login" href="app/routes/auth.register#" style={{ textDecoration: "none", color: "var(--g-green)" }}> Login</Link>
                    </p>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <CredentialContainer>
                            <p style={{ color: "var(--g-silver)" }}>Email address</p>
                            <UserEmailInput
                                type="email"
                                id="user-email"
                                {...register("email", { required: true, minLength: 5 })}
                            />

                            {errors.email && <p>This field is required and must be at least 5 characters.</p>}


                            <p style={{ color: "var(--g-silver)", marginTop: "15px" }}>Password</p>
                            <UserPasswordInput
                                type="password"
                                id="user-password"
                                {...register("password", { required: true, minLength: 5 })}
                            />
                            {errors.password && <p>This field is required and must be at least 5 characters.</p>}
                        </CredentialContainer>

                        {user.detail === "User already exists" ?
                            <p style={{ background: 'red', width: 'fit-content', marginTop: '20px', padding: '5px', marginLeft: '55px', borderRadius: '5px', color: 'white' }}>
                                User Already Exists
                            </p> : null
                        }


                        <RegisterButton type="submit">Register</RegisterButton>
                    </form>


                </UserContent>
            </LoginCredContainer>
        </LoginContainer>
    )
}
