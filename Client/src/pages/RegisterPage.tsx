import React, { useContext, useState } from 'react';
import { User, Lock } from 'react-feather';
import './styles/register.css'; 
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import UserContext from '../components/UserContext';
import { login } from '../api/authAPI';
import { createUser, retrieveAllUsers } from '../api/userAPI';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorPText, setErrorPText] = useState<string>("");
    const { updateCurrentUser } = useContext(UserContext);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password === confirmPassword){
            const newUser = await createUser({username, password});

            if(newUser.username){
                console.log();
                const responce = (await login({username, password}));
                
                auth.login(responce.token)
                updateCurrentUser((await retrieveAllUsers((auth.getProfile() as {username: string}).username))[0])
            } else {
                setErrorPText("username is already taken");
            }
        } else {
            setErrorPText("The passwords are not equel, please try agian");
        }
    };

    return (
        <div className='register-container'>
            <div className="register-box">
                <h2>Create your account</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <User className="input-icon" />
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Lock className="input-icon" />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Lock className="input-icon" />
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
                {errorPText && (<p style={{color: "rgb(180, 0, 0)"}}>{errorPText}</p>)}
                <div className="login-text">
                    <span>Already have an account? <Link to={"/login"}><strong>Login</strong></Link></span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;