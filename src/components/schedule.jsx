import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({});
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  // Fungsi untuk mendapatkan 7 hari ke depan
  const getNextSevenDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      return date;
    });
  };

  // Fungsi untuk mengambil data jadwal dari server
  const fetchScheduleData = async () => {
    // Ganti URL ini dengan endpoint API yang sesuai
    const response = await fetch('/api/schedule');
    const data = await response.json();
    setScheduleData(data);
  };

  useEffect(() => {
    // Update selectedDate setiap kali komponen di-mount
    setSelectedDate(new Date());
    
    // Ambil data jadwal saat pertama kali komponen di-mount
    fetchScheduleData();

    // Polling setiap 30 detik untuk mendapatkan data terbaru
    const intervalId = setInterval(fetchScheduleData, 30000);

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  const isBooked = (court, hour) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return scheduleData[court]?.[dateString]?.includes(hour) || false;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-open-sans" style={{ marginTop: '60px' }}>
      {/* Margin atas tambahan */}
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-center text-green-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Jadwal Lapangan
        </motion.h1>

        <div className="mb-6 flex justify-center space-x-2 overflow-x-auto">
          {getNextSevenDays().map((date) => (
            <motion.button
              key={date.toISOString()}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedDate.toDateString() === date.toDateString() ? 'bg-green-500 text-white' : 'bg-white text-green-700'
              }`}
              onClick={() => setSelectedDate(date)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formatDate(date)}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['Lapangan A', 'Lapangan B'].map((court) => (
            <motion.div 
              key={court}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold bg-green-500 text-white p-4">{court}</h2>
              <div className="p-4">
                {hours.map((hour) => (
                  <div key={hour} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span>{hour}</span>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm ${
                        isBooked(court, hour) ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {isBooked(court, hour) ? 'Terisi' : 'Tersedia'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
