import React from 'react';
import Navbar from '../components/Navbar';

const Appointments = () => {
    return (
        <div className="min-vh-100 bg-dark">
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-dark text-white border-light">
                            <div className="card-body">
                                <h2 className="mb-4">Randevularım</h2>
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th>Tarih</th>
                                                <th>Saat</th>
                                                <th>Bölüm</th>
                                                <th>Doktor</th>
                                                <th>Durum</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Backend bağlantısı yapıldığında randevular burada listelenecek */}
                                            <tr>
                                                <td colSpan="5" className="text-center">Henüz randevunuz bulunmamaktadır.</td>
                                            </tr>
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
