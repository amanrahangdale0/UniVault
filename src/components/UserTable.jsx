import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Eye, Edit, Trash2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@university.edu', role: 'student', department: 'Computer Science', joinDate: '2024-01-15', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@university.edu', role: 'student', department: 'Engineering', joinDate: '2024-02-20', status: 'active' },
  { id: 3, name: 'Dr. Wilson', email: 'wilson@university.edu', role: 'admin', department: 'Administration', joinDate: '2023-08-10', status: 'active' },
  { id: 4, name: 'Mike Johnson', email: 'mike@university.edu', role: 'student', department: 'Business', joinDate: '2024-03-05', status: 'inactive' },
  { id: 5, name: 'Sarah Davis', email: 'sarah@university.edu', role: 'student', department: 'Design', joinDate: '2024-01-25', status: 'active' },
];

export default function UserTable({ onUserSelect }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    onUserSelect(user);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-800">
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">User</th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden md:table-cell">Role</th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Department</th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Join Date</th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
            <th className="text-left p-4 font-medium text-sm text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user, index) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`border-b border-neutral-800 hover:bg-neutral-900 cursor-pointer transition-colors ${
                selectedUser?.id === user.id ? 'bg-neutral-900' : ''
              }`}
              onClick={() => handleRowClick(user)}
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail size={10} />
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4 hidden md:table-cell">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-purple-500/20 text-purple-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  <Shield size={10} />
                  {user.role}
                </span>
              </td>
              <td className="p-4 text-sm hidden lg:table-cell">{user.department}</td>
              <td className="p-4 text-sm hidden lg:table-cell">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar size={12} />
                  {user.joinDate}
                </div>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  {user.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(user);
                    }}
                    className="p-1 hover:bg-neutral-800 rounded transition-colors"
                  >
                    <Eye size={14} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 hover:bg-neutral-800 rounded transition-colors"
                  >
                    <Edit size={14} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 hover:bg-neutral-800 rounded transition-colors"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
