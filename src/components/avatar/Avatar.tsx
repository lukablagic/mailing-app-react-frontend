import { useState, useEffect } from 'react';

interface AvatarProps {
  name: string;
  email: string;
}

export const Avatar = ({ name, email }: AvatarProps) => {
  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (name) {
      const nameParts = name.split(' ');
      if (nameParts.length > 1) {
        setInitials(nameParts[0][0] + nameParts[1][0]);
      } else {
        setInitials(nameParts[0].substring(0, 2));
      }
    } else if (email) {
      setInitials(email.substring(0, 2));
    }
  }, [name, email]);

  return (
    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
      {initials.toUpperCase()}
    </div>
  );
};