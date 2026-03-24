import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, ThumbsDown, Clock, CheckCircle, XCircle, Search, Filter, Star } from 'lucide-react';

const mockFeedback = [
  { id: 1, user: 'John Doe', email: 'john@university.edu', type: 'contact', subject: 'Login Issue', message: 'Having trouble logging into my account', status: 'pending', date: '2024-03-15', rating: null },
  { id: 2, user: 'Jane Smith', email: 'jane@university.edu', type: 'feedback', subject: 'Great Platform', message: 'Love the new features! Very helpful for tracking achievements.', status: 'resolved', date: '2024-03-14', rating: 5 },
  { id: 3, user: 'Mike Johnson', email: 'mike@university.edu', type: 'bug', subject: 'Mobile Responsiveness', message: 'The dashboard doesn\'t work well on mobile devices', status: 'in-progress', date: '2024-03-13', rating: null },
  { id: 4, user: 'Sarah Davis', email: 'sarah@university.edu', type: 'contact', subject: 'Account Verification', message: 'How do I get my achievements verified?', status: 'resolved', date: '2024-03-12', rating: 4 },
  { id: 5, user: 'Dr. Wilson', email: 'wilson@university.edu', type: 'feedback', subject: 'Admin Features', message: 'Need more analytics in admin panel', status: 'pending', date: '2024-03-11', rating: null },
];

export default function FeedbackPanel() {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredFeedback = mockFeedback.filter(item => {
    const matchesSearch = item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'pending': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'contact': return MessageSquare;
      case 'feedback': return Star;
      case 'bug': return XCircle;
      default: return MessageSquare;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Feedback & Contact</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-black border border-neutral-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-black border border-neutral-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: mockFeedback.length, icon: MessageSquare, color: 'text-primary' },
          { label: 'Pending', value: mockFeedback.filter(f => f.status === 'pending').length, icon: Clock, color: 'text-blue-400' },
          { label: 'In Progress', value: mockFeedback.filter(f => f.status === 'in-progress').length, icon: Filter, color: 'text-yellow-400' },
          { label: 'Resolved', value: mockFeedback.filter(f => f.status === 'resolved').length, icon: CheckCircle, color: 'text-green-400' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-black border border-neutral-800 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <span className="text-2xl font-bold">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Feedback List */}
      <div className="bg-black border border-neutral-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">User</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden md:table-cell">Type</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Subject</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground hidden lg:table-cell">Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedback.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-neutral-800 hover:bg-neutral-900 cursor-pointer transition-colors ${
                      selectedFeedback?.id === item.id ? 'bg-neutral-900' : ''
                    }`}
                    onClick={() => setSelectedFeedback(item)}
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-sm">{item.user}</div>
                        <div className="text-xs text-muted-foreground">{item.email}</div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <TypeIcon size={14} className="text-muted-foreground" />
                        <span className="text-sm capitalize">{item.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{item.subject}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.message}</div>
                    </td>
                    <td className="p-4 text-sm hidden lg:table-cell text-muted-foreground">{item.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {item.rating ? (
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Feedback Detail */}
      {selectedFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border border-neutral-800 rounded-lg p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium mb-2">{selectedFeedback.subject}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{selectedFeedback.user}</span>
                <span>{selectedFeedback.email}</span>
                <span>{selectedFeedback.date}</span>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedFeedback.status)}`}>
              {selectedFeedback.status}
            </span>
          </div>
          <p className="text-sm mb-4">{selectedFeedback.message}</p>
          {selectedFeedback.rating && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Rating:</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < selectedFeedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm">
              Mark as Resolved
            </button>
            <button className="px-4 py-2 border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors text-sm">
              Reply
            </button>
            <button className="px-4 py-2 border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors text-sm">
              Archive
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
