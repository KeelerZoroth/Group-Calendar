import React, { useState } from 'react';
import './index.css'; 
import { User, Lock } from 'react-feather'; // Import icons

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Simulate a login API call
        try {
            // Replace this with your actual login logic
            if (email === 'test@example.com' && password === 'password') {
                console.log('Login successful!');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (err: any) {
            // Handle error (e.g., setError)
        }
    };

    return (
        <div className='login-container'>
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                <div className="register-text">
                    <span>Don't have an account? <strong>Register</strong></span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
