import React, { useState, useEffect } from 'react';
import { supabase } from '../service/supabaseClient';
import Swal from 'sweetalert2';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) console.error('Error fetching user data:', error);
      else setUser(data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('users')
      .update(user)
      .eq('id', user.id);
    if (error) Swal.fire('Error!', error.message, 'error');
    else Swal.fire('Sukses!', 'Profile updated', 'success');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <form onSubmit={handleUpdate}>
      <input
        value={user.nama_lengkap}
        onChange={(e) => setUser({...user, nama_lengkap: e.target.value})}
      />
      {/* Tambahkan field lainnya */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;