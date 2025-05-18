import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import styled from "styled-components"

const LogInPage = () => {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ showError, setShowError ] = useState("false");  //Error message to appear should there be any issues
    const [ errorMessage, setErrorMessage ] = useState("");
    const { currentUser, setCurrentUser, logIn } = useContext(UserContext); 

    const handleSubmit = async (ev) => {
        try {
            ev.preventDefault();
            setShowError("false");
            setErrorMessage("");
            setStatus("logging")
            const logInData = {
                email
            }
            const body = JSON.stringify( logInData );
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body
            };
            const response = await fetch('/logIn', options); 
            const data = await response.json();
            if (data.status !== 200) {
                setStatus("idle");
                setShowError("true")
                setErrorMessage("We could not find an account with that email...");
            } else {
            setCurrentUser( data.data);
            navigate(`/`);
            logIn(data.data)
            }

        } catch (err) {
            setStatus("idle");
            setShowError("true");
            setErrorMessage("Could not log in. Please try again.");
        }
    };

    return (
        <StyledContainer>
            <LogInSection>
            
            { currentUser? ( // If the user is already logged in.
                <section>
                    <p>You're already signed in.</p>
                    <p>Please sign out first, if you wish to log in with a different account.</p>
                </section>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h3>Log In</h3>
                    <p>Please enter your information</p>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(ev)=>{
                        setEmail(ev.target.value)
                        setShowError("false")
                        setErrorMessage("");
                        }}></input>
                    <StyledButton disabled={!email || status === "logging"}>Log In</StyledButton>
                    {
                        <ErrorMessage show={showError}>{errorMessage}</ErrorMessage>
                    }
                </form>
            )}
            </LogInSection>
            <SignUpSection>
                <h3>New Here?</h3>
                <p>Sign up to buy our Techwear!</p>
                <StyledButton onClick={()=>navigate("/signUp")}>Sign Up</StyledButton>
            </SignUpSection>
        </StyledContainer>
    )
}

export default LogInPage;

//STYLED COMPONENTS - CSS
const StyledContainer = styled.div`
    display: flex;
    height: 500px;
    width: 50vw;
    margin: 11rem auto;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

    & h3 {
        font-size: 1.5rem;
        padding: 1rem;
    }

    & p {
        padding: 1rem;
        font-size: 1rem;
        font-weight: bold;
    }

    & label {
        padding: 1rem;
    }

    & input { 
        padding: 0.25rem;
        font-size: 1rem;
    }
`;

const LogInSection = styled.section`
    width: 50%;
    height: 500px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SignUpSection = styled.section`
    width: 50%;
    height: 500px;
    border: 1px solid var(--color-red);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: var(--color-red);
    color: var(--color-white);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & button {
        background-color: var(--color-white);
        color: var(--color-black)
    }
`

const StyledButton = styled.button`
    display: block;
    margin: 1rem auto;
    background-color: var(--color-yellow);
    border-radius: 5px;
    color: var(--color-white);
    border: 2px solid var(--color-black);
    padding: 10px;
    font-weight: bold;
    font-size: 15px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 50%;
        cursor: not-allowed;
    }
`
const ErrorMessage = styled.p`
    color: var(--color-red);
    visibility: ${(props) => (props.show === "true"? "visible" : "hidden")};
`
