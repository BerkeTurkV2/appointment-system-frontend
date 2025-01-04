import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { departments, doctors } from '../data/hospitalData';

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

    // Bölümlere göre doktorları grupla
    const getDoctorsByDepartment = (departmentId) => {
        return doctors.filter(doctor => doctor.departmentId === departmentId);
    };

    if (!user) return null;

    return (
        <div className="min-vh-100 bg-dark">
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center text-white">
                        <h1 className="mb-4">Hoş Geldin, {user.first_name} {user.last_name}</h1>
                        <p className="lead mb-5">Hastane Randevu sistemine başarıyla giriş yaptınız.</p>
                        {/* Bölümler ve Doktorlar */}
                        <div className="mt-5">
                            <h2 className="mb-4">Bölümlerimiz ve Doktorlarımız</h2>
                            <div className="row">
                                {departments.map(department => (
                                    <div key={department.id} className="col-md-6 mb-4">
                                        <div className="card bg-dark text-white border-light h-100">
                                            <div className="card-body">
                                                <h3 className="card-title h4 mb-4">{department.name}</h3>
                                                <div className="list-group list-group-flush">
                                                    {getDoctorsByDepartment(department.id).map(doctor => (
                                                        <div key={doctor.id} className="list-group-item bg-dark text-white border-light">
                                                            <i className="fas fa-user-md me-2"></i>
                                                            {doctor.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
