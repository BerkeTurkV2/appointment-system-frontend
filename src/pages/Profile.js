import React from 'react';
import Navbar from '../components/Navbar';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="min-vh-100 bg-dark">
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card bg-dark text-white border-light">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Profil Bilgilerim</h2>
                                <div className="mb-3">
                                    <label className="form-label">Kullanıcı Adı</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.username}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">İsim</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.firstName}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Soyisim</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.lastName}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
