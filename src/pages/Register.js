import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
            const response = await axios.post('http://localhost:8080/api/register', formData);
            if (response.data) {
                navigate('/');  // Login sayfasına yönlendir
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Kayıt işlemi başarısız oldu');
        }
    };

    return (
        <div className="container-fluid vh-100 bg-dark d-flex justify-content-center align-items-center">
            <div className="col-md-4">
                <h1 className="text-center text-white mb-4">Hastane Randevu Sistemi</h1>
                <div className="card bg-dark text-white shadow border-3">
                    <div className="card-body p-5">
                        <h2 className="text-center mb-4">Kayıt Ol</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">İsim</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Soyisim</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Kullanıcı Adı</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Şifre</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mt-3">
                                Kayıt Ol
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <p>Zaten hesabın var mı? <a href="/" className="text-white fw-bold fs-5 ps-2">Giriş Yap</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
