import { useState } from 'react'
import { GraduationCap, CheckCircle, XCircle, IndianRupee, Calendar, Bell, LogOut, User } from 'lucide-react'

const parentData = {
  name: 'Suresh Kumar',
  child: {
    name: 'Rahul Kumar',
    class: 'Class 10',
    rollNo: 'GF-2026-001',
    teacher: 'Ramesh Sir',
    photo: 'R'
  },
  fees: {
    monthly: 1500,
    paid: 1500,
    pending: 0,
    status: 'paid',
    lastPaid: '2026-05-03',
    nextDue: '2026-06-01'
  },
  attendance: {
    total: 22,
    present: 20,
    absent: 2,
    percentage: 91
  },
  recentAttendance: [
    { date: '22 May', day: 'Aaj', status: 'present' },
    { date: '21 May', day: 'Kal', status: 'present' },
    { date: '20 May', day: 'Somwar', status: 'absent' },
    { date: '19 May', day: 'Raviwar', status: null },
    { date: '18 May', day: 'Shaniwar', status: 'present' },
    { date: '17 May', day: 'Shukravar', status: 'present' },
    { date: '16 May', day: 'Guruwar', status: 'absent' },
  ],
  notices: [
    { text: 'June ki fees 1 June tak jama karein', date: '20 May', type: 'fees' },
    { text: 'Class test 25 May ko hoga', date: '18 May', type: 'exam' },
    { text: 'Rahul ki attendance is mahine 91% rahi', date: '15 May', type: 'info' },
  ]
}

export default function ParentPortal() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const d = parentData

  if (!loggedIn) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', padding: 20,
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{ background: 'white', borderRadius: 20, padding: 40, width: '100%', maxWidth: 400, boxShadow: '0 25px 60px rgba(5,150,105,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: 10, padding: 8 }}>
              <GraduationCap size={22} color="white" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#059669' }}>GuruFlow</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: '8px 0 4px' }}>Parent Portal</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>Apne bachche ki progress dekhein</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email</label>
          <input type="email" placeholder="Apna email daalen"
            value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
          <input type="password" placeholder="Password daalen"
            value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <button onClick={() => setLoggedIn(true)} style={{
          width: '100%', padding: '13px', background: 'linear-gradient(135deg, #059669, #10b981)',
          color: 'white', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer'
        }}>
          Login Karein
        </button>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#9ca3af', marginTop: 16 }}>
          Login ki zaroorat? Institute se contact karein
        </p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4', fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', padding: '0 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 6 }}>
              <GraduationCap size={18} color="white" />
            </div>
            <span style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>GuruFlow</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={16} color="white" />
              </div>
              <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{d.name}</span>
            </div>
            <button onClick={() => setLoggedIn(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '6px 12px', color: 'white', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>

        {/* Child Card */}
        <div style={{ background: 'white', borderRadius: 20, padding: 24, marginBottom: 24, boxShadow: '0 4px 16px rgba(5,150,105,0.1)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 700, flexShrink: 0 }}>
            {d.child.photo}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: '0 0 4px' }}>{d.child.name}</h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>📚 {d.child.class}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>🎫 {d.child.rollNo}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>👨‍🏫 {d.child.teacher}</span>
            </div>
          </div>
          <div style={{ background: '#dcfce7', borderRadius: 12, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669' }}>{d.attendance.percentage}%</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Attendance</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'attendance', label: '✅ Attendance' },
            { id: 'fees', label: '💰 Fees' },
            { id: 'notices', label: '🔔 Notices' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: '2px solid', cursor: 'pointer', transition: 'all 0.2s',
              borderColor: activeTab === tab.id ? '#059669' : '#e5e7eb',
              background: activeTab === tab.id ? '#dcfce7' : 'white',
              color: activeTab === tab.id ? '#059669' : '#6b7280'
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 20 }}>
              {[
                { label: 'Is Mahine Present', value: d.attendance.present, total: d.attendance.total, color: '#dcfce7', text: '#059669' },
                { label: 'Is Mahine Absent', value: d.attendance.absent, total: d.attendance.total, color: '#fee2e2', text: '#dc2626' },
                { label: 'Fees Paid', value: `₹${d.fees.paid.toLocaleString()}`, sub: 'Is mahine', color: '#dcfce7', text: '#059669' },
                { label: 'Fees Pending', value: d.fees.pending > 0 ? `₹${d.fees.pending.toLocaleString()}` : 'Kuch nahi', sub: d.fees.pending > 0 ? 'Jaldi bhejein' : 'Sab clear hai', color: d.fees.pending > 0 ? '#fef3c7' : '#f0fdf4', text: d.fees.pending > 0 ? '#d97706' : '#059669' },
              ].map((stat, i) => (
                <div key={i} style={{ background: stat.color, borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: stat.text }}>{stat.value}{stat.total ? <span style={{ fontSize: 16, fontWeight: 500, color: '#9ca3af' }}>/{stat.total}</span> : ''}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{stat.label}</div>
                  {stat.sub && <div style={{ fontSize: 12, color: '#9ca3af' }}>{stat.sub}</div>}
                </div>
              ))}
            </div>

            {/* Recent Notices */}
            <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Recent Notices</h3>
              {d.notices.map((notice, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, padding: 12, background: '#f8f9ff', borderRadius: 10 }}>
                  <span style={{ fontSize: 18 }}>{notice.type === 'fees' ? '💰' : notice.type === 'exam' ? '📝' : 'ℹ️'}</span>
                  <div>
                    <div style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{notice.text}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{notice.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Recent Attendance</h3>
            {d.recentAttendance.map((day, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < d.recentAttendance.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{day.date}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{day.day}</div>
                </div>
                {day.status === null ? (
                  <span style={{ fontSize: 13, color: '#9ca3af' }}>Chutti</span>
                ) : day.status === 'present' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#dcfce7', padding: '4px 12px', borderRadius: 20 }}>
                    <CheckCircle size={14} color="#059669" />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#059669' }}>Present</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fee2e2', padding: '4px 12px', borderRadius: 20 }}>
                    <XCircle size={14} color="#dc2626" />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#dc2626' }}>Absent</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === 'fees' && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Fees Detail</h3>
            {[
              { label: 'Monthly Fees', value: `₹${d.fees.monthly.toLocaleString()}` },
              { label: 'Paid Amount', value: `₹${d.fees.paid.toLocaleString()}`, color: '#059669' },
              { label: 'Pending Amount', value: d.fees.pending > 0 ? `₹${d.fees.pending.toLocaleString()}` : '₹0', color: d.fees.pending > 0 ? '#dc2626' : '#059669' },
              { label: 'Last Payment', value: d.fees.lastPaid },
              { label: 'Next Due Date', value: d.fees.nextDue },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 4 ? '1px solid #f3f4f6' : 'none' }}>
                <span style={{ fontSize: 14, color: '#6b7280' }}>{item.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: item.color || '#111827' }}>{item.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: 16, background: '#dcfce7', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle size={20} color="#059669" />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#059669' }}>Is mahine ki fees complete hai!</span>
            </div>
          </div>
        )}

        {/* Notices Tab */}
        {activeTab === 'notices' && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Saare Notices</h3>
            {d.notices.map((notice, i) => (
              <div key={i} style={{ padding: 16, background: '#f8f9ff', borderRadius: 12, marginBottom: 12, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: notice.type === 'fees' ? '#fef3c7' : notice.type === 'exam' ? '#dbeafe' : '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {notice.type === 'fees' ? '💰' : notice.type === 'exam' ? '📝' : 'ℹ️'}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{notice.text}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{notice.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}