import React, { useState } from 'react';
import { User, Lock } from 'react-feather';
import './index.css'; 

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            console.log('Registration successful!');
        } catch (err: any) {
            console.error(err.message);
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
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                <div className="login-text">
                    <span>Already have an account? <strong>Login</strong></span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;