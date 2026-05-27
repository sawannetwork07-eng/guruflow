import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GraduationCap, Users, IndianRupee, Bell, BarChart3, CheckCircle, LogOut, Menu, X, Home, UserCheck, FileText, Settings } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const monthlyData = [
  { month: 'Jan', fees: 85000 },
  { month: 'Feb', fees: 92000 },
  { month: 'Mar', fees: 78000 },
  { month: 'Apr', fees: 110000 },
  { month: 'May', fees: 124500 },
  { month: 'Jun', fees: 98000 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState('dashboard')

 const navItems = [
    { id: 'dashboard', icon: <Home size={18} />, label: 'Dashboard', path: '/dashboard' },
    { id: 'students', icon: <Users size={18} />, label: 'Students', path: '/students' },
    { id: 'attendance', icon: <UserCheck size={18} />, label: 'Attendance', path: '/attendance' },
    { id: 'fees', icon: <IndianRupee size={18} />, label: 'Fees', path: '/fees' },
    { id: 'reports', icon: <BarChart3 size={18} />, label: 'Reports', path: '/reports' },
    { id: 'settings', icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9ff', fontFamily: 'Georgia, serif' }}>

      {/* SIDEBAR */}
      <div style={{
        width: sidebarOpen ? 240 : 70, background: 'linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%)',
        transition: 'width 0.3s ease', position: 'fixed', height: '100vh',
        zIndex: 100, display: 'flex', flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 8, flexShrink: 0 }}>
            <GraduationCap size={20} color="white" />
          </div>
          {sidebarOpen && <span style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>GuruFlow</span>}
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1, padding: '16px 8px' }}>
          {navItems.map(item => (
            <div key={item.id} onClick={() => { setActivePage(item.id); navigate(item.path) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 12px', borderRadius: 10, marginBottom: 4,
                cursor: 'pointer', transition: 'all 0.2s',
                background: activePage === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white'
              }}
              onMouseOver={e => { if (activePage !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseOut={e => { if (activePage !== item.id) e.currentTarget.style.background = 'transparent' }}>
              <div style={{ flexShrink: 0 }}>{item.icon}</div>
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>}
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px', borderRadius: 10, cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
            transition: 'all 0.2s'
           }}
           onClick={() => navigate('/')}
           onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
           onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
           <LogOut size={18} />
           {sidebarOpen && <span style={{ fontSize: 14 }}>Logout</span>}
         </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: sidebarOpen ? 240 : 70, flex: 1, transition: 'margin-left 0.3s ease' }}>

        {/* TOPBAR */}
        <div style={{
          background: 'white', padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 99
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              {sidebarOpen ? <X size={20} color="#374151" /> : <Menu size={20} color="#374151" />}
            </button>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>
              {navItems.find(n => n.id === activePage)?.label}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <Bell size={20} color="#6b7280" style={{ cursor: 'pointer' }} />
              <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }} />
            </div>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700 }}>
              R
            </div>
          </div>
        </div>

        {/* DASHBOARD CONTENT */}
        <div style={{ padding: 24 }}>

          {/* Welcome */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Namaste, Ramesh Sir 👋</h2>
            <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>Aaj ka overview dekho</p>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Total Students', value: '142', icon: <Users size={22} color="#1e40af" />, bg: '#dbeafe', change: '+8 is mahine' },
              { label: 'Fees Collected', value: '₹1,24,500', icon: <IndianRupee size={22} color="#059669" />, bg: '#dcfce7', change: 'Is mahine' },
              { label: 'Pending Fees', value: '₹18,000', icon: <IndianRupee size={22} color="#d97706" />, bg: '#fef3c7', change: '12 students' },
              { label: 'Aaj Attendance', value: '94%', icon: <CheckCircle size={22} color="#7c3aed" />, bg: '#ede9fe', change: '134/142 present' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'white', borderRadius: 16, padding: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ background: stat.bg, borderRadius: 10, padding: 10 }}>{stat.icon}</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Chart + Recent */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 24 }}>

            {/* Bar Chart */}
            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Monthly Fees Collection</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={value => [`₹${value.toLocaleString()}`, 'Fees']} />
                  <Bar dataKey="fees" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activity */}
            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Recent Activity</h3>
              {[
                { text: 'Rahul Kumar ki fees aayi', time: '10 min pehle', color: '#dcfce7', dot: '#059669' },
                { text: 'Priya absent thi aaj', time: '1 ghanta pehle', color: '#fef3c7', dot: '#d97706' },
                { text: '5 parents ko reminder bheja', time: '2 ghante pehle', color: '#dbeafe', dot: '#1e40af' },
                { text: 'Amit ka new enrollment', time: 'Kal', color: '#ede9fe', dot: '#7c3aed' },
                { text: 'May ki report ready', time: 'Kal', color: '#f3f4f6', dot: '#6b7280' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{item.text}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Fees Alert */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            borderRadius: 16, padding: 20, display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid #fbbf24'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Bell size={22} color="#d97706" />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#92400e' }}>12 Students Ki Fees Pending Hai</div>
                <div style={{ fontSize: 13, color: '#b45309' }}>Total pending: ₹18,000 — Reminder bhejein?</div>
              </div>
            </div>
            <button style={{
              background: '#d97706', color: 'white', border: 'none',
              borderRadius: 8, padding: '10px 20px', fontSize: 13,
              fontWeight: 700, cursor: 'pointer'
            }}>
              Reminder Bhejo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}