import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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

    if (!user) return null;

    return (
        <div className="min-vh-100 bg-dark">
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center text-white">
                        <h1 className="mb-4">Hoş Geldiniz, {user.firstName} {user.lastName}!</h1>
                        <p className="lead">Randevu sistemine başarıyla giriş yaptınız.</p>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <div className="card bg-dark text-white border-light mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Randevularım</h5>
                                        <p className="card-text">Mevcut randevularınızı görüntüleyin</p>
                                        <a href="/appointments" className="btn btn-outline-light">Görüntüle</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card bg-dark text-white border-light mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Yeni Randevu</h5>
                                        <p className="card-text">Yeni bir randevu oluşturun</p>
                                        <a href="/new-appointment" className="btn btn-outline-light">Oluştur</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card bg-dark text-white border-light mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Profil</h5>
                                        <p className="card-text">Profil bilgilerinizi görüntüleyin</p>
                                        <a href="/profile" className="btn btn-outline-light">Görüntüle</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
