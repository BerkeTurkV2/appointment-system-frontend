import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', formData);
            if (response.data) {
                // Kullanıcı bilgilerini localStorage'a kaydet
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/main');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Giriş başarısız oldu');
        }
    };

    return (
        <div className="container-fluid vh-100 bg-dark d-flex justify-content-center align-items-center">
            <div className="col-md-4">
                <h1 className="text-center text-white mb-4">Hastane Randevu Sistemi</h1>
                <div className="card bg-dark text-white shadow border-3">
                    <div className="card-body p-5">
                        <h2 className="text-center mb-4">Giriş Yap</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    name="username" 
                                    value={formData.username} 
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Şifre</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mt-3">Giriş Yap</button>
                        </form>
                        <div className="text-center mt-3">
                            <p>Henüz hesabın yok mu? <a href="/register" className="text-white fw-bold fs-5 ps-2">Kayıt Ol</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
