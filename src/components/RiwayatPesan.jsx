import React, { useState, useEffect } from 'react';
import { supabase } from '../service/supabaseClient';
import Swal from 'sweetalert2';

const  RiwayatPesan = () => {
  const [pemesanan, setPemesanan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiwayatPemesanan();
  }, []);

  const fetchRiwayatPemesanan = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('pemesanan')
        .select(`
          *,
          lapangan (nama)
        `)
        .eq('user_id', user.id)
        .order('tanggal', { ascending: false });

      if (error) throw error;
      setPemesanan(data);
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pemesanan</h1>
      {pemesanan.length === 0 ? (
        <p>Anda belum memiliki riwayat pemesanan.</p>
      ) : (
        <div className="grid gap-4">
          {pemesanan.map((pesan) => (
            <div key={pesan.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">{pesan.lapangan.nama}</h2>
              <p>Tanggal: {new Date(pesan.tanggal).toLocaleDateString()}</p>
              <p>Jam: {pesan.jam_mulai} - {pesan.jam_selesai}</p>
              <p>Total Harga: Rp {pesan.total_harga.toLocaleString()}</p>
              <p>Status: {pesan.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatPesan;