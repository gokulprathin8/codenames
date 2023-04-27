import styled from "@emotion/styled";

const LoginContainer = styled.div`
  display: flex;
`;

const LoginPageImage = styled.img`
    width: auto;
    height: auto;
`;

export default function AuthLogin() {
    return (
        <LoginContainer>
            <div style={{ flex: 1, backgroundColor: "black", height: "100vh" }}>

            </div>

            <div style={{ flex: 1 }}>
                <div style={{ padding: '50px', fontFamily: "Roboto" }}>
                    <h1 style={{ marginBottom: "5px" }}>Get's Started.</h1>
                    <p style={{ color: "grey", marginTop: 0 }}>Already have a account?
                        <a href="#" style={{ textDecoration: "none", color: "#54927A" }}> Login</a>
                    </p>
                </div>
            </div>
        </LoginContainer>
    )
}
