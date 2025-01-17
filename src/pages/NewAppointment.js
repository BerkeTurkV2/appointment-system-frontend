import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { departments, doctors } from '../data/hospitalData';

const NewAppointment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        department: '',
        doctor: '',
        date: '',
        time: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [availableDoctors, setAvailableDoctors] = useState([]);

    useEffect(() => {
        if (formData.department) {
            const filteredDoctors = doctors.filter(
                doctor => doctor.departmentId === parseInt(formData.department)
            );
            setAvailableDoctors(filteredDoctors);
        } else {
            setAvailableDoctors([]);
        }
    }, [formData.department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'department') {
            setFormData(prev => ({
                ...prev,
                doctor: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigate('/');
                return;
            }

            const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctor));
            const selectedDepartment = departments.find(d => d.id === parseInt(formData.department));
            
            const appointmentData = {
                user_id: user.id,
                department: selectedDepartment.name,
                doctor_name: selectedDoctor.name,
                appointment_date: formData.date,
                appointment_time: formData.time
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });

            if (response.ok) {
                setSuccess('Randevunuz başarıyla oluşturuldu!');
                setTimeout(() => {
                    navigate('/appointments');
                }, 2000);
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Randevu oluşturulurken bir hata oluştu');
            }
        } catch (err) {
            setError(err.message || 'Randevu oluşturulurken bir hata oluştu');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-vh-100 bg-dark">
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card bg-dark text-white border-light">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Yeni Randevu</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Bölüm</label>
                                        <select
                                            className="form-select"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Bölüm Seçiniz</option>
                                            {departments.map(dept => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Doktor</label>
                                        <select
                                            className="form-select"
                                            name="doctor"
                                            value={formData.doctor}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.department}
                                        >
                                            <option value="">Doktor Seçiniz</option>
                                            {availableDoctors.map(doctor => (
                                                <option key={doctor.id} value={doctor.id}>
                                                    {doctor.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Tarih</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={today}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Saat</label>
                                        <select
                                            className="form-select"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Saat Seçiniz</option>
                                            <option value="09:00">09:00</option>
                                            <option value="09:30">09:30</option>
                                            <option value="10:00">10:00</option>
                                            <option value="10:30">10:30</option>
                                            <option value="11:00">11:00</option>
                                            <option value="11:30">11:30</option>
                                            <option value="13:00">13:00</option>
                                            <option value="13:30">13:30</option>
                                            <option value="14:00">14:00</option>
                                            <option value="14:30">14:30</option>
                                            <option value="15:00">15:00</option>
                                            <option value="15:30">15:30</option>
                                            <option value="16:00">16:00</option>
                                            <option value="16:30">16:30</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mt-3">
                                        Randevu Oluştur
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAppointment;
