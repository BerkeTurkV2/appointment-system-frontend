import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Appointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigate('/');
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/user/${user.id}`);
            if (!response.ok) {
                throw new Error('Randevular yüklenirken bir hata oluştu');
            }
            const data = await response.json();
            setAppointments(data);
        } catch (err) {
            setError(err.message || 'Randevular yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (appointmentId) => {
        if (window.confirm('Randevuyu iptal etmek istediğinize emin misiniz?')) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    navigate('/');
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/${appointmentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.id
                    })
                });

                if (response.ok) {
                    setAppointments(appointments.filter(app => app.id !== appointmentId));
                } else {
                    const data = await response.json();
                    throw new Error(data.message || 'Randevu silinirken bir hata oluştu');
                }
            } catch (err) {
                setError(err.message || 'Randevu silinirken bir hata oluştu');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 bg-dark">
                <Navbar />
                <div className="container mt-5 text-white text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Yükleniyor...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-dark">
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-dark text-white border-light">
                            <div className="card-body">
                                <h2 className="mb-4">Randevularım</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th>Tarih</th>
                                                <th>Saat</th>
                                                <th>Bölüm</th>
                                                <th>Doktor</th>
                                                <th>İşlemler</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Henüz randevunuz bulunmamaktadır.</td>
                                                </tr>
                                            ) : (
                                                appointments.map(appointment => (
                                                    <tr key={appointment.id}>
                                                        <td>{appointment.appointment_date}</td>
                                                        <td>{appointment.appointment_time}</td>
                                                        <td>{appointment.department}</td>
                                                        <td>{appointment.doctor_name}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDelete(appointment.id)}
                                                            >
                                                                <i className="fas fa-trash"></i> İptal Et
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;
