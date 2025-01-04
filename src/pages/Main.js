import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/');
            return;
        }
        setUser(JSON.parse(userStr));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="container-fluid vh-100 bg-dark">
            <nav className="navbar navbar-dark bg-dark border-bottom border-light">
                <div className="container">
                    <span className="navbar-brand">Hastane Randevu Sistemi</span>
                    <button onClick={handleLogout} className="btn btn-outline-light">Çıkış Yap</button>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center text-white">
                        <h1 className="mb-4">Hoş Geldiniz, {user.firstName} {user.lastName}!</h1>
                        <p className="lead">Randevu sistemine başarıyla giriş yaptınız.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
