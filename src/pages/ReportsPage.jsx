import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, TrendingDown, IndianRupee, Users, Download } from 'lucide-react'

const monthlyFees = [
  { month: 'Jan', collected: 85000, pending: 15000 },
  { month: 'Feb', collected: 92000, pending: 8000 },
  { month: 'Mar', collected: 78000, pending: 22000 },
  { month: 'Apr', collected: 110000, pending: 10000 },
  { month: 'May', collected: 124500, pending: 18000 },
  { month: 'Jun', collected: 98000, pending: 12000 },
]

const attendanceData = [
  { month: 'Jan', percentage: 88 },
  { month: 'Feb', percentage: 91 },
  { month: 'Mar', percentage: 85 },
  { month: 'Apr', percentage: 93 },
  { month: 'May', percentage: 94 },
  { month: 'Jun', percentage: 89 },
]

const classData = [
  { name: 'Class 9', students: 28, color: '#3b82f6' },
  { name: 'Class 10', students: 42, color: '#059669' },
  { name: 'Class 11', students: 35, color: '#d97706' },
  { name: 'Class 12', students: 37, color: '#7c3aed' },
]

const topStudents = [
  { name: 'Rahul Kumar', attendance: 98, fees: 'Paid', class: 'Class 10' },
  { name: 'Amit Yadav', attendance: 96, fees: 'Paid', class: 'Class 12' },
  { name: 'Rohit Singh', attendance: 95, fees: 'Paid', class: 'Class 11' },
  { name: 'Kavya Mishra', attendance: 94, fees: 'Paid', class: 'Class 10' },
  { name: 'Sneha Gupta', attendance: 92, fees: 'Partial', class: 'Class 9' },
]

export default function ReportsPage() {
  const [activeMonth, setActiveMonth] = useState('May')

  const totalCollected = monthlyFees.reduce((sum, m) => sum + m.collected, 0)
  const totalPending = monthlyFees.reduce((sum, m) => sum + m.pending, 0)
  const avgAttendance = Math.round(attendanceData.reduce((sum, m) => sum + m.percentage, 0) / attendanceData.length)
  const totalStudents = classData.reduce((sum, c) => sum + c.students, 0)

  return (
    <div style={{ padding: 24, fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Reports & Analytics</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>January — June 2026 ka data</p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
          color: 'white', border: 'none', borderRadius: 10,
          padding: '10px 20px', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Download size={16} /> Report Download Karo
        </button>
      </div>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Collected (6 months)', value: `₹${(totalCollected / 100000).toFixed(1)}L`, trend: '+12%', up: true, bg: '#dcfce7', text: '#059669', icon: <IndianRupee size={20} color="#059669" /> },
          { label: 'Total Pending (6 months)', value: `₹${totalPending.toLocaleString()}`, trend: '-8%', up: false, bg: '#fef3c7', text: '#d97706', icon: <IndianRupee size={20} color="#d97706" /> },
          { label: 'Avg Attendance', value: `${avgAttendance}%`, trend: '+3%', up: true, bg: '#dbeafe', text: '#1e40af', icon: <Users size={20} color="#1e40af" /> },
          { label: 'Total Students', value: totalStudents, trend: '+8', up: true, bg: '#ede9fe', text: '#7c3aed', icon: <Users size={20} color="#7c3aed" /> },
        ].map(stat => (
          <div key={stat.label} style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ background: stat.bg, borderRadius: 10, padding: 8 }}>{stat.icon}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: stat.up ? '#dcfce7' : '#fee2e2', padding: '3px 8px', borderRadius: 20 }}>
                {stat.up ? <TrendingUp size={12} color="#059669" /> : <TrendingDown size={12} color="#dc2626" />}
                <span style={{ fontSize: 11, fontWeight: 700, color: stat.up ? '#059669' : '#dc2626' }}>{stat.trend}</span>
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Fees Bar Chart */}
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Monthly Fees — Collected vs Pending</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyFees} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" tick={{ fontSize: 13 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v / 1000}k`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} />
            <Legend />
            <Bar dataKey="collected" name="Collected" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="pending" name="Pending" fill="#fbbf24" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Attendance Line + Class Pie */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* Attendance Line Chart */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 13 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={v => [`${v}%`, 'Attendance']} />
              <Line type="monotone" dataKey="percentage" stroke="#059669" strokeWidth={3} dot={{ fill: '#059669', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Class Distribution Pie */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Class Distribution</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={classData} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {classData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {classData.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#6b7280' }}>{c.name}: {c.students}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Students */}
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Top Students — Attendance ke Hisaab Se</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9ff' }}>
              {['Rank', 'Student', 'Class', 'Attendance', 'Fees Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topStudents.map((s, i) => (
              <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? '#fbbf24' : i === 1 ? '#9ca3af' : i === 2 ? '#d97706' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: i < 3 ? 'white' : '#6b7280' }}>
                    {i + 1}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>
                      {s.name[0]}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 14, color: '#6b7280' }}>{s.class}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, background: '#f3f4f6', borderRadius: 4, height: 6, maxWidth: 80 }}>
                      <div style={{ width: `${s.attendance}%`, background: 'linear-gradient(90deg, #059669, #10b981)', borderRadius: 4, height: '100%' }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#059669' }}>{s.attendance}%</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: s.fees === 'Paid' ? '#dcfce7' : '#fef3c7', color: s.fees === 'Paid' ? '#166534' : '#92400e' }}>
                    {s.fees}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}