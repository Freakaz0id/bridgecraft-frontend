import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  SynthwaveLayout, 
  SynthwaveCard, 
  SynthwaveInput, 
  SynthwaveButton, 
  SynthwaveText, 
  SynthwaveMessage 
} from './components';

function MainPage() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/health')
      .then(res => setHealth(res.data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <SynthwaveLayout>
      <SynthwaveCard borderColor="blue" width="max-w-2xl">
        <div className="text-center">
          <img 
            src={logo} 
            className="w-20 h-20 mx-auto mb-8 animate-spin-slow filter drop-shadow-[0_0_20px_#00ffff]" 
            alt="logo" 
          />
          
          <SynthwaveText variant="blue" size="5xl" as="h1" className="mb-4" orbitron>
            BRIDGECRAFT
          </SynthwaveText>
          
          <SynthwaveText variant="pink" size="lg" className="mb-8 tracking-wide">
            FastAPI + Supabase Authentication Platform
          </SynthwaveText>
          
          {/* Health Status */}
          <div className="mb-8">
            {health && (
              <SynthwaveMessage type="success" className="mb-4">
                <h3 className="font-bold mb-2 tracking-wide">Backend Status</h3>
                <pre className="text-sm overflow-auto font-mono">
                  {JSON.stringify(health, null, 2)}
                </pre>
              </SynthwaveMessage>
            )}
            {error && (
              <SynthwaveMessage type="error">
                Backend Error: {error}
              </SynthwaveMessage>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link to="/register">
              <SynthwaveButton variant="pink" size="lg" className="tracking-wider w-full">
                GET STARTED →
              </SynthwaveButton>
            </Link>
            
            <Link to="/login">
              <SynthwaveButton variant="blue" size="lg" className="tracking-wider w-full">
                SIGN IN →
              </SynthwaveButton>
            </Link>
          </div>
        </div>
      </SynthwaveCard>
    </SynthwaveLayout>
  );
}

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/register', {
        email: formData.email,
        password: formData.password,
        full_name: formData.name
      });
      setMessage('Registration successful! Please check your email to confirm your account.');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SynthwaveLayout>
      <SynthwaveCard borderColor="pink">
        {/* Header */}
        <div className="text-center mb-8">
          <SynthwaveText variant="pink" size="4xl" as="h1" className="mb-2" orbitron>
            CREATE ACCOUNT
          </SynthwaveText>
          <SynthwaveText variant="blue" size="lg">
            Join us and start your journey
          </SynthwaveText>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <SynthwaveInput
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <SynthwaveInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="arnd.struve@3dspark.de"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <SynthwaveInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* Submit Button */}
          <div className="pt-8">
            <SynthwaveButton
              type="submit"
              variant="pink"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              CREATE ACCOUNT
            </SynthwaveButton>
          </div>

          {/* Messages */}
          {message && (
            <SynthwaveMessage type="success">
              {message}
            </SynthwaveMessage>
          )}
          {error && (
            <SynthwaveMessage type="error">
              {error}
            </SynthwaveMessage>
          )}

          {/* Navigation Links */}
          <div className="text-center pt-4 space-y-2">
            <div>
              <Link to="/login" className="neon-text-blue hover:text-cyan-300 transition-colors duration-300 text-lg">
                Already have an account? Sign In →
              </Link>
            </div>
            <div>
              <Link to="/" className="neon-text-blue hover:text-cyan-300 transition-colors duration-300 text-sm opacity-75">
                ← Back to Home
              </Link>
            </div>
          </div>
        </form>
      </SynthwaveCard>
    </SynthwaveLayout>
  );
}

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login response:', res.data); // Debug log
      
      // Store the access token
      localStorage.setItem('access_token', res.data.access_token);
      
      setMessage('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error('Login error:', err.response?.data); // Debug log
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SynthwaveLayout>
      <SynthwaveCard borderColor="blue">
        {/* Header */}
        <div className="text-center mb-8">
          <SynthwaveText variant="blue" size="4xl" as="h1" className="mb-2" orbitron>
            SIGN IN
          </SynthwaveText>
          <SynthwaveText variant="pink" size="lg">
            Welcome back to the future
          </SynthwaveText>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <SynthwaveInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="arnd.struve@3dspark.de"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <SynthwaveInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* Submit Button */}
          <div className="pt-8">
            <SynthwaveButton
              type="submit"
              variant="blue"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              SIGN IN
            </SynthwaveButton>
          </div>

          {/* Messages */}
          {message && (
            <SynthwaveMessage type="success">
              {message}
            </SynthwaveMessage>
          )}
          {error && (
            <SynthwaveMessage type="error">
              {error}
            </SynthwaveMessage>
          )}

          {/* Navigation Links */}
          <div className="text-center pt-4 space-y-2">
            <div>
              <Link to="/register" className="neon-text-pink hover:text-pink-300 transition-colors duration-300 text-lg">
                Don't have an account? Create One →
              </Link>
            </div>
            <div>
              <Link to="/" className="neon-text-blue hover:text-cyan-300 transition-colors duration-300 text-sm opacity-75">
                ← Back to Home
              </Link>
            </div>
          </div>
        </form>
      </SynthwaveCard>
    </SynthwaveLayout>
  );
}

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data
    axios.get('http://localhost:8080/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setIsLoading(false);
    })
    .catch(err => {
      setError('Failed to fetch user data');
      setIsLoading(false);
      // If token is invalid, redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.post('http://localhost:8080/api/v1/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('access_token');
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <SynthwaveLayout>
        <SynthwaveCard borderColor="blue">
          <div className="text-center">
            <SynthwaveText variant="blue" size="xl">
              Loading...
            </SynthwaveText>
          </div>
        </SynthwaveCard>
      </SynthwaveLayout>
    );
  }

  return (
    <SynthwaveLayout>
      <SynthwaveCard borderColor="pink">
        {/* Header */}
        <div className="text-center mb-8">
          <SynthwaveText variant="pink" size="4xl" as="h1" className="mb-2" orbitron>
            DASHBOARD
          </SynthwaveText>
          <SynthwaveText variant="blue" size="lg">
            Welcome to your control center
          </SynthwaveText>
        </div>

        {/* User Info */}
        {user && (
          <div className="mb-8">
            <SynthwaveMessage type="success" className="mb-4">
              <h3 className="font-bold mb-2 tracking-wide">User Information</h3>
              <div className="text-left space-y-1">
                <p><strong>Name:</strong> {user.full_name || 'Not provided'}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
              </div>
            </SynthwaveMessage>
          </div>
        )}

        {error && (
          <SynthwaveMessage type="error" className="mb-6">
            {error}
          </SynthwaveMessage>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <SynthwaveButton
            variant="pink"
            size="lg"
            className="w-full"
            onClick={handleLogout}
          >
            LOGOUT
          </SynthwaveButton>

          <div className="text-center">
            <Link to="/" className="neon-text-blue hover:text-cyan-300 transition-colors duration-300 text-lg">
              ← Back to Home
            </Link>
          </div>
        </div>
      </SynthwaveCard>
    </SynthwaveLayout>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
