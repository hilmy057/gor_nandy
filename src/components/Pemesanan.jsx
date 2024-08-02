import React, { useState, useEffect } from 'react';
import { supabase } from '../service/supabaseClient';
import Swal from 'sweetalert2';

const Pemesanan = () => {
  const [lapangan, setLapangan] = useState([]);

  useEffect(() => {
    fetchLapangan();
  }, []);

  const fetchLapangan = async () => {
    const { data, error } = await supabase.from('lapangan').select('*');
    if (error) console.error('Error fetching lapangan:', error);
    else setLapangan(data);
  };

  const handlePesan = async (lapanganId) => {
    // Implementasi logika pemesanan
    Swal.fire('Sukses!', 'Pemesanan berhasil', 'success');
  };

  return (
    <div>
      <h2>Pemesanan Lapangan</h2>
      {lapangan.map((lap) => (
        <div key={lap.id}>
          <h3>{lap.nama}</h3>
          <p>{lap.deskripsi}</p>
          <button onClick={() => handlePesan(lap.id)}>Pesan</button>
        </div>
      ))}
    </div>
  );
};

export default Pemesanan;