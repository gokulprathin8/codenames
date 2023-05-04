import styled from "@emotion/styled";
import {Link} from "@remix-run/react";
import authStore from "../store/auth";
import {useForm} from "react-hook-form";

const LoginContainer = styled.div`
  display: flex;
`;

const UserContent = styled.div`
  margin-right: auto;
  margin-left: 30%;
  margin-top: calc(100% - 70%);
  font-family: Roboto,serif;
  background: url("../../public/images/login-white-abstract.webp") no-repeat scroll left center;
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function handleFormSubmit(e) {
        // console.log(jwtToken);
    }

    return (
        <LoginContainer>
            <LoginContainerPattern>

            </LoginContainerPattern>

            <LoginCredContainer>
                <UserContent>
                    <h1 style={{ marginBottom: "5px" }}>Log into your account.</h1>
                    <p style={{ color: "grey", marginTop: 0 }}>Don't have a account?
                        <Link to="/auth/register" href="#" style={{ textDecoration: "none", color: "var(--g-green)" }}> Register</Link>
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

                        <RegisterButton type="submit">Login</RegisterButton>
                    </form>

                    {}

                </UserContent>
            </LoginCredContainer>
        </LoginContainer>
    )
}
