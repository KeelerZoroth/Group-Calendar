import React, { useContext, useState } from 'react';
import './styles/login.css'; 
import { User, Lock } from 'react-feather'; // Import icons
import auth from "../utils/auth";
import { login } from '../api/authAPI';
import { retrieveAllUsers } from '../api/userAPI';
import UserContext from '../components/UserContext';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showErrorP, setShowErrorP] = useState<boolean>(false);
    const { updateCurrentUser } = useContext(UserContext);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const responce = (await login({username, password}));

            auth.login(responce.token)
            updateCurrentUser((await retrieveAllUsers((auth.getProfile() as {username: string}).username))[0])
        } catch {
            setShowErrorP(true);
        }
    };

    return (
        <div className='login-container'>
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <User className="input-icon" /> {/* envelope icon for username */}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <Lock className="input-icon" /> {/* lock icon for password */}
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {showErrorP && (<p style={{color: "rgb(180, 0, 0)"}}>Incorect username or password</p>)}
                <div className="register-text">
                    <span>Don't have an account? <Link to={"/register"}><strong>Register</strong></Link></span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
