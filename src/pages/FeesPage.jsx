import { useState } from 'react'
import { IndianRupee, Search, CheckCircle, Clock, Bell, Download, Filter } from 'lucide-react'

const initialFees = [
  { id: 1, name: 'Rahul Kumar', class: 'Class 10', amount: 1500, paid: 1500, due: 0, status: 'paid', dueDate: '2026-05-01', paidDate: '2026-05-03', phone: '9876543210' },
  { id: 2, name: 'Priya Sharma', class: 'Class 9', amount: 1200, paid: 0, due: 1200, status: 'pending', dueDate: '2026-05-01', paidDate: null, phone: '9876543211' },
  { id: 3, name: 'Rohit Singh', class: 'Class 11', amount: 1800, paid: 1800, due: 0, status: 'paid', dueDate: '2026-05-01', paidDate: '2026-05-02', phone: '9876543212' },
  { id: 4, name: 'Anita Verma', class: 'Class 10', amount: 1500, paid: 0, due: 1500, status: 'pending', dueDate: '2026-05-01', paidDate: null, phone: '9876543213' },
  { id: 5, name: 'Amit Yadav', class: 'Class 12', amount: 2000, paid: 2000, due: 0, status: 'paid', dueDate: '2026-05-01', paidDate: '2026-05-05', phone: '9876543214' },
  { id: 6, name: 'Sneha Gupta', class: 'Class 9', amount: 1200, paid: 600, due: 600, status: 'partial', dueDate: '2026-05-01', paidDate: null, phone: '9876543215' },
  { id: 7, name: 'Vikram Patel', class: 'Class 11', amount: 1800, paid: 0, due: 1800, status: 'pending', dueDate: '2026-05-01', paidDate: null, phone: '9876543216' },
  { id: 8, name: 'Kavya Mishra', class: 'Class 10', amount: 1500, paid: 1500, due: 0, status: 'paid', dueDate: '2026-05-01', paidDate: '2026-05-04', phone: '9876543217' },
]

export default function FeesPage() {
  const [fees, setFees] = useState(initialFees)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [reminderSent, setReminderSent] = useState({})
  const [showPayModal, setShowPayModal] = useState(null)
  const [payAmount, setPayAmount] = useState('')

  const filtered = fees.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.class.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || f.status === filter
    return matchSearch && matchFilter
  })

  const totalCollected = fees.reduce((sum, f) => sum + f.paid, 0)
  const totalPending = fees.reduce((sum, f) => sum + f.due, 0)
  const totalStudents = fees.length
  const paidStudents = fees.filter(f => f.status === 'paid').length

  const sendReminder = (student) => {
    setReminderSent(prev => ({ ...prev, [student.id]: true }))
    setTimeout(() => setReminderSent(prev => ({ ...prev, [student.id]: false })), 3000)
  }

  const sendAllReminders = () => {
    const pending = fees.filter(f => f.status !== 'paid')
    const updated = {}
    pending.forEach(f => updated[f.id] = true)
    setReminderSent(updated)
    setTimeout(() => setReminderSent({}), 3000)
  }

  const markPaid = () => {
    if (!payAmount || !showPayModal) return
    setFees(fees.map(f => {
      if (f.id === showPayModal.id) {
        const newPaid = f.paid + Number(payAmount)
        const newDue = f.amount - newPaid
        return { ...f, paid: newPaid, due: Math.max(0, newDue), status: newDue <= 0 ? 'paid' : 'partial', paidDate: new Date().toISOString().split('T')[0] }
      }
      return f
    }))
    setShowPayModal(null)
    setPayAmount('')
  }

  const statusColor = (status) => {
    if (status === 'paid') return { bg: '#dcfce7', text: '#166534' }
    if (status === 'partial') return { bg: '#dbeafe', text: '#1e40af' }
    return { bg: '#fef3c7', text: '#92400e' }
  }

  const statusLabel = (status) => {
    if (status === 'paid') return '✓ Paid'
    if (status === 'partial') return '◑ Partial'
    return '⏳ Pending'
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Fees Management</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>Saari fees ka record aur reminder</p>
        </div>
        <button onClick={sendAllReminders} style={{
          background: 'linear-gradient(135deg, #d97706, #f59e0b)',
          color: 'white', border: 'none', borderRadius: 10,
          padding: '10px 20px', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Bell size={16} /> Sab Ko Reminder Bhejo
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Collected', value: `₹${totalCollected.toLocaleString()}`, bg: '#dcfce7', text: '#059669', icon: <IndianRupee size={20} color="#059669" /> },
          { label: 'Total Pending', value: `₹${totalPending.toLocaleString()}`, bg: '#fef3c7', text: '#d97706', icon: <Clock size={20} color="#d97706" /> },
          { label: 'Paid Students', value: `${paidStudents}/${totalStudents}`, bg: '#dbeafe', text: '#1e40af', icon: <CheckCircle size={20} color="#1e40af" /> },
          { label: 'Collection Rate', value: `${Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%`, bg: '#ede9fe', text: '#7c3aed', icon: <Filter size={20} color="#7c3aed" /> },
        ].map(stat => (
          <div key={stat.label} style={{ background: stat.bg, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'white', borderRadius: 10, padding: 8 }}>{stat.icon}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: stat.text }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input placeholder="Student dhundho..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px 10px 40px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { key: 'all', label: 'Sab' },
            { key: 'paid', label: '✓ Paid' },
            { key: 'pending', label: '⏳ Pending' },
            { key: 'partial', label: '◑ Partial' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: '2px solid', cursor: 'pointer', transition: 'all 0.2s',
              borderColor: filter === f.key ? '#1e40af' : '#e5e7eb',
              background: filter === f.key ? '#dbeafe' : 'white',
              color: filter === f.key ? '#1e40af' : '#6b7280'
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fees Table */}
      <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9ff' }}>
              {['Student', 'Class', 'Total Fees', 'Paid', 'Pending', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => (
              <tr key={f.id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                      {f.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{f.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{f.phone}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{f.class}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: '#111827' }}>₹{f.amount.toLocaleString()}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: '#059669' }}>₹{f.paid.toLocaleString()}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: f.due > 0 ? '#dc2626' : '#059669' }}>
                  {f.due > 0 ? `₹${f.due.toLocaleString()}` : '—'}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: statusColor(f.status).bg, color: statusColor(f.status).text
                  }}>
                    {statusLabel(f.status)}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {f.status !== 'paid' && (
                      <>
                        <button onClick={() => { setShowPayModal(f); setPayAmount('') }} style={{
                          background: '#dcfce7', border: 'none', borderRadius: 8,
                          padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#059669'
                        }}>
                          Mark Paid
                        </button>
                        <button onClick={() => sendReminder(f)} style={{
                          background: reminderSent[f.id] ? '#dcfce7' : '#fef3c7',
                          border: 'none', borderRadius: 8, padding: '6px 10px',
                          cursor: 'pointer', fontSize: 12, fontWeight: 700,
                          color: reminderSent[f.id] ? '#059669' : '#d97706'
                        }}>
                          {reminderSent[f.id] ? '✓ Bheja' : '🔔 Remind'}
                        </button>
                      </>
                    )}
                    {f.status === 'paid' && (
                      <span style={{ fontSize: 12, color: '#9ca3af', padding: '6px 0' }}>
                        {f.paidDate} ko aaya
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pay Modal */}
      {showPayModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: 32, width: '100%', maxWidth: 400, boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Payment Record Karo</h3>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
              {showPayModal.name} — Pending: ₹{showPayModal.due.toLocaleString()}
            </p>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Amount (₹)</label>
            <input type="number" placeholder={`Max: ${showPayModal.due}`}
              value={payAmount} onChange={e => setPayAmount(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 16, outline: 'none', boxSizing: 'border-box', marginBottom: 24 }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowPayModal(null)} style={{ flex: 1, padding: '12px', border: '2px solid #e5e7eb', borderRadius: 10, background: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={markPaid} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: 10, background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Payment Save Karo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}