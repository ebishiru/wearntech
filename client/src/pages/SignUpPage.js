import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext"; 
import styled from 'styled-components';

const SignUpPage = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, logIn} = useContext(UserContext); 
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSignUp = async (ev) => {
        ev.preventDefault();
        const newUser = { email, name, address };
        try {
            const response = await fetch("/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            const result = await response.json();
            if (response.status === 201) {
                setCurrentUser(result.data);
                logIn(result.data)
                setEmail("");
                setName("");
                setAddress("");
                setError("");
                setSuccessMessage("Sign up successful!");
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Could not create account. Please try again.");
        }
    };
    return (
        <StyledContainer>
            <LogInSection>
                <h3>Already have an account?</h3>
                <p>Click here to log in!</p>
                <StyledButton onClick={()=>navigate("/logIn")}>Log In</StyledButton>
            </LogInSection>
            <SignUpSection>
                {
                    currentUser && !successMessage? ( //If user is already logged in and did not just sign up
                        <>
                            <p>You're already signed in.</p>
                            <p>Please sign out first, if you wish to sign up with a different account.</p>
                        </>
                    ) : (
                        currentUser && successMessage? (
                            <SuccessContainer>
                                <h3>{successMessage}</h3>
                                <p>Welcome to Wear n' Tech</p>
                            </SuccessContainer>
                            
                        ) : (
                            <form onSubmit={handleSignUp}>
                                <h3>Create an Account</h3>
                                <p>Please fill out all entries</p>
                                <InputContainer>
                                    <div>
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(ev) => {
                                                setEmail(ev.target.value)
                                                setError("");
                                        }}/>
                                    </div>
                                    <div>
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(ev) => {
                                                setName(ev.target.value)
                                                setError("");
                                        }}/>
                                    </div>
                                    <div>
                                        <label>Address:</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(ev) => {
                                                setAddress(ev.target.value)
                                                setError("");
                                        }}/>
                                    </div>
                                </InputContainer>
                                <StyledButton type="submit" disabled={!email || !name || !address}>Sign Up</StyledButton>
                                {
                                    <ErrorMessage show={error}>{error}</ErrorMessage>
                                }                   
                            </form>
                        )
                    )
                }
                
            </SignUpSection>
            
            
        </StyledContainer>
    );
};

export default SignUpPage;

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
        padding: 1.5rem; 
    }

    & input { 
        padding: 0.25rem;
        font-size: 1rem;
    }
`;

const LogInSection = styled.section`
    width: 50%;
    height: 500px;
    border: 1px solid var(--color-red);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: var(--color-red);
    color: var(--color-white);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & button {
        background-color: var(--color-white);
        color: var(--color-black);
    }
`

const SignUpSection = styled.section`
    width: 50%;
    height: 500px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const InputContainer = styled.div`
    text-align: right;
    padding-right: 4.5rem;

    & div {
        padding: 0.25rem 0;
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

const SuccessContainer = styled.div`
    font-weight: bold;
`

const ErrorMessage = styled.p`
    color: var(--color-red);
    visibility: ${(props) => (props.show? "visible" : "hidden")};
`


