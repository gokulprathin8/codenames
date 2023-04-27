import styled from "@emotion/styled";

const LoginContainer = styled.div`
  display: flex;
`;

const LoginPageImage = styled.img`
    width: auto;
    height: auto;
`;

const CredentialContainer = styled.div`
  margin-top: 40px;
`;

const UserEmailInput = styled.input`
  padding: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 5px;

  &:hover {
    border: 1px solid var("--g-green");
  }

  &:focus {
    border-radius: 1px solid var("--g-green");
  }
`;

export default function AuthLogin() {
    return (
        <LoginContainer>
            <div style={{ flex: 1, backgroundColor: "black", height: "100vh" }}>

            </div>

            <div style={{ flex: 1 }}>
                <div style={{ padding: "calc(30% - 100px)", fontFamily: "Roboto" }}>
                    <h1 style={{ marginBottom: "5px" }}>Get's Started.</h1>
                    <p style={{ color: "grey", marginTop: 0 }}>Already have a account?
                        <a href="#" style={{ textDecoration: "none", color: "var(--g-green)" }}> Login</a>
                    </p>

                    <CredentialContainer>
                        <p style={{ color: "var(--g-silver)" }}>Email address</p>
                        <UserEmailInput
                            type="email"
                            id="user-email"
                            required={true}
                            minLength={5}
                        />
                    </CredentialContainer>
                </div>
            </div>
        </LoginContainer>
    )
}
