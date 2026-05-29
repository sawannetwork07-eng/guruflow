import { useState } from 'react'
import { IndianRupee, Search, CheckCircle, Clock, Bell, Filter, AlertCircle, TrendingUp, Users, X, Check } from 'lucide-react'

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
  const [payError, setPayError] = useState('')
  const [paySuccess, setPaySuccess] = useState(false)
  const [globalMsg, setGlobalMsg] = useState({ text: '', type: '' })
  const [reminderLoading, setReminderLoading] = useState(false)

  const filtered = fees.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.class.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || f.status === filter
    return matchSearch && matchFilter
  })

  const totalCollected = fees.reduce((sum, f) => sum + f.paid, 0)
  const totalPending = fees.reduce((sum, f) => sum + f.due, 0)
  const totalStudents = fees.length
  const paidStudents = fees.filter(f => f.status === 'paid').length
  const collectionRate = Math.round((totalCollected / (totalCollected + totalPending)) * 100)

  const showGlobalMsg = (text, type) => {
    setGlobalMsg({ text, type })
    setTimeout(() => setGlobalMsg({ text: '', type: '' }), 4000)
  }

  const sendReminder = (student) => {
    if (student.status === 'paid') {
      showGlobalMsg(`${student.name} ki fees already paid hai — reminder bhejne ki zarurat nahi`, 'error')
      return
    }
    setReminderSent(prev => ({ ...prev, [student.id]: true }))
    showGlobalMsg(`✓ ${student.name} ke parent ko reminder bhej diya gaya`, 'success')
    setTimeout(() => setReminderSent(prev => ({ ...prev, [student.id]: false })), 5000)
  }

  const sendAllReminders = async () => {
    const pending = fees.filter(f => f.status !== 'paid')
    if (pending.length === 0) {
      showGlobalMsg('Sabki fees paid hai — kisi ko reminder ki zarurat nahi', 'error')
      return
    }
    setReminderLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    const updated = {}
    pending.forEach(f => updated[f.id] = true)
    setReminderSent(updated)
    setReminderLoading(false)
    showGlobalMsg(`✓ ${pending.length} parents ko successfully reminder bhej diya gaya`, 'success')
    setTimeout(() => setReminderSent({}), 5000)
  }

  const validatePayment = (value) => {
    if (!value || value === '') return 'Payment amount daalna zaroori hai'
    if (isNaN(value)) return 'Sirf number daalo'
    if (Number(value) <= 0) return 'Amount 0 se zyada hona chahiye'
    if (showPayModal && Number(value) > showPayModal.due) return `Maximum Rs ${showPayModal.due} hi de sakte hain`
    return ''
  }

  const handlePayAmountChange = (value) => {
    setPayAmount(value)
    const err = validatePayment(value)
    setPayError(err)
    setPaySuccess(false)
  }

  const markPaid = () => {
    const err = validatePayment(payAmount)
    if (err) { setPayError(err); return }

    setFees(fees.map(f => {
      if (f.id === showPayModal.id) {
        const newPaid = f.paid + Number(payAmount)
        const newDue = f.amount - newPaid
        return {
          ...f, paid: newPaid,
          due: Math.max(0, newDue),
          status: newDue <= 0 ? 'paid' : 'partial',
          paidDate: new Date().toISOString().split('T')[0]
        }
      }
      return f
    }))

    setPaySuccess(true)
    showGlobalMsg(`✓ ${showPayModal.name} ka Rs ${Number(payAmount).toLocaleString()} payment record ho gaya`, 'success')
    setTimeout(() => {
      setShowPayModal(null)
      setPayAmount('')
      setPayError('')
      setPaySuccess(false)
    }, 1500)
  }

  const statusConfig = {
    paid: { bg: '#dcfce7', text: '#166534', label: '✓ Paid', dot: '#059669' },
    partial: { bg: '#dbeafe', text: '#1e40af', label: '◑ Partial', dot: '#3b82f6' },
    pending: { bg: '#fef3c7', text: '#92400e', label: '⏳ Pending', dot: '#d97706' },
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Georgia, serif', background: '#f8f9ff', minHeight: '100vh' }}>

      {/* Global Message Toast */}
      {globalMsg.text && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: globalMsg.type === 'success' ? '#059669' : '#dc2626',
          color: 'white', padding: '14px 20px', borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 14, fontWeight: 600, maxWidth: 380,
          animation: 'slideIn 0.3s ease'
        }}>
          {globalMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {globalMsg.text}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', margin: 0 }}>💰 Fees Management</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>
            Saari fees ka complete record — payments, reminders, aur reports
          </p>
        </div>
        <button onClick={sendAllReminders} disabled={reminderLoading} style={{
          background: reminderLoading ? '#9ca3af' : 'linear-gradient(135deg, #d97706, #f59e0b)',
          color: 'white', border: 'none', borderRadius: 12,
          padding: '12px 24px', fontSize: 14, fontWeight: 700,
          cursor: reminderLoading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 12px rgba(217,119,6,0.3)',
          transition: 'all 0.2s'
        }}>
          <Bell size={16} />
          {reminderLoading ? 'Bhej rahe hain...' : 'Sab Ko Reminder Bhejo'}
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          {
            label: 'Total Collected',
            value: `₹${totalCollected.toLocaleString()}`,
            sub: 'Is mahine',
            bg: 'linear-gradient(135deg, #059669, #10b981)',
            icon: <IndianRupee size={22} color="white" />
          },
          {
            label: 'Total Pending',
            value: `₹${totalPending.toLocaleString()}`,
            sub: `${fees.filter(f => f.status !== 'paid').length} students`,
            bg: 'linear-gradient(135deg, #d97706, #f59e0b)',
            icon: <Clock size={22} color="white" />
          },
          {
            label: 'Paid Students',
            value: `${paidStudents}/${totalStudents}`,
            sub: 'Fees complete',
            bg: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            icon: <Users size={22} color="white" />
          },
          {
            label: 'Collection Rate',
            value: `${collectionRate}%`,
            sub: collectionRate >= 80 ? '🔥 Bahut achha!' : '📈 Improve karo',
            bg: collectionRate >= 80 ? 'linear-gradient(135deg, #7c3aed, #8b5cf6)' : 'linear-gradient(135deg, #dc2626, #ef4444)',
            icon: <TrendingUp size={22} color="white" />
          },
        ].map(stat => (
          <div key={stat.label} style={{
            background: stat.bg, borderRadius: 16, padding: 20,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 8 }}>{stat.icon}</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 13, opacity: 0.9, fontWeight: 600 }}>{stat.label}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{ background: 'white', borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Monthly Collection Progress</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#059669' }}>{collectionRate}% Complete</span>
        </div>
        <div style={{ background: '#f3f4f6', borderRadius: 10, height: 12, overflow: 'hidden' }}>
          <div style={{
            width: `${collectionRate}%`, height: '100%',
            background: collectionRate >= 80 ? 'linear-gradient(90deg, #059669, #10b981)' : 'linear-gradient(90deg, #d97706, #f59e0b)',
            borderRadius: 10, transition: 'width 0.5s ease'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>₹{totalCollected.toLocaleString()} collected</span>
          <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>₹{totalPending.toLocaleString()} pending</span>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input placeholder="Student ya class se dhundho..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '11px 16px 11px 40px',
              border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14,
              outline: 'none', boxSizing: 'border-box', background: 'white'
            }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'Sab', count: fees.length },
            { key: 'paid', label: '✓ Paid', count: fees.filter(f => f.status === 'paid').length },
            { key: 'pending', label: '⏳ Pending', count: fees.filter(f => f.status === 'pending').length },
            { key: 'partial', label: '◑ Partial', count: fees.filter(f => f.status === 'partial').length },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: '2px solid', cursor: 'pointer', transition: 'all 0.2s',
              borderColor: filter === f.key ? '#1e40af' : '#e5e7eb',
              background: filter === f.key ? '#dbeafe' : 'white',
              color: filter === f.key ? '#1e40af' : '#6b7280',
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              {f.label}
              <span style={{
                background: filter === f.key ? '#1e40af' : '#f3f4f6',
                color: filter === f.key ? 'white' : '#6b7280',
                borderRadius: 20, padding: '1px 7px', fontSize: 11, fontWeight: 700
              }}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fees Table */}
      <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #f8f9ff, #eff6ff)' }}>
              {['Student', 'Class', 'Total Fees', 'Paid', 'Pending', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '16px', textAlign: 'left', fontSize: 12, fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '60px', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Koi result nahi mila</div>
                  <div style={{ fontSize: 14, color: '#9ca3af' }}>Search ya filter change karo</div>
                </td>
              </tr>
            ) : filtered.map((f, i) => (
              <tr key={f.id} style={{
                borderTop: '1px solid #f3f4f6',
                background: i % 2 === 0 ? 'white' : '#fafbff',
                transition: 'background 0.15s'
              }}
                onMouseOver={e => e.currentTarget.style.background = '#f0f7ff'}
                onMouseOut={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : '#fafbff'}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40,
                      background: `linear-gradient(135deg, ${f.status === 'paid' ? '#059669, #10b981' : f.status === 'partial' ? '#1e40af, #3b82f6' : '#d97706, #f59e0b'})`,
                      borderRadius: '50%', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'white', fontSize: 15, fontWeight: 800, flexShrink: 0
                    }}>
                      {f.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{f.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>📱 {f.phone}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ background: '#eff6ff', color: '#1e40af', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    {f.class}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: 15, fontWeight: 800, color: '#111827' }}>₹{f.amount.toLocaleString()}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: '#059669' }}>
                    ₹{f.paid.toLocaleString()}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  {f.due > 0 ? (
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#dc2626' }}>
                      ₹{f.due.toLocaleString()}
                    </span>
                  ) : (
                    <span style={{ fontSize: 13, color: '#059669', fontWeight: 700 }}>✓ Clear</span>
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusConfig[f.status].dot }} />
                    <span style={{
                      padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      background: statusConfig[f.status].bg, color: statusConfig[f.status].text
                    }}>
                      {statusConfig[f.status].label}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {f.status !== 'paid' && (
                      <button onClick={() => { setShowPayModal(f); setPayAmount(''); setPayError(''); setPaySuccess(false) }}
                        style={{
                          background: 'linear-gradient(135deg, #059669, #10b981)',
                          border: 'none', borderRadius: 8,
                          padding: '7px 14px', cursor: 'pointer',
                          fontSize: 12, fontWeight: 700, color: 'white',
                          boxShadow: '0 2px 6px rgba(5,150,105,0.3)'
                        }}>
                        💳 Pay
                      </button>
                    )}
                    <button onClick={() => sendReminder(f)}
                      style={{
                        background: reminderSent[f.id] ? '#dcfce7' : f.status === 'paid' ? '#f3f4f6' : '#fef3c7',
                        border: 'none', borderRadius: 8, padding: '7px 12px',
                        cursor: 'pointer', fontSize: 12, fontWeight: 700,
                        color: reminderSent[f.id] ? '#059669' : f.status === 'paid' ? '#9ca3af' : '#d97706',
                        transition: 'all 0.2s'
                      }}>
                      {reminderSent[f.id] ? '✓ Bheja' : '🔔 Remind'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 24, padding: 36, width: '100%', maxWidth: 440, boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111827', margin: 0 }}>💳 Payment Record Karo</h3>
              <button onClick={() => setShowPayModal(null)}
                style={{ background: '#f3f4f6', border: 'none', borderRadius: 10, padding: 8, cursor: 'pointer' }}>
                <X size={18} color="#6b7280" />
              </button>
            </div>

            {/* Student Info */}
            <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: 14, padding: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18, fontWeight: 800 }}>
                  {showPayModal.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>{showPayModal.name}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{showPayModal.class}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                <div style={{ background: 'white', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#059669' }}>₹{showPayModal.paid.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Pehle Se Paid</div>
                </div>
                <div style={{ background: 'white', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#dc2626' }}>₹{showPayModal.due.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Abhi Pending</div>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 8 }}>
                Payment Amount (₹) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#6b7280', fontWeight: 800 }}>₹</span>
                <input
                  type="number"
                  placeholder={`Max: ${showPayModal.due}`}
                  value={payAmount}
                  onChange={e => handlePayAmountChange(e.target.value)}
                  style={{
                    width: '100%', padding: '14px 16px 14px 36px',
                    border: `2px solid ${payError ? '#ef4444' : paySuccess ? '#059669' : payAmount ? '#3b82f6' : '#e5e7eb'}`,
                    borderRadius: 12, fontSize: 18, fontWeight: 700,
                    outline: 'none', boxSizing: 'border-box',
                    background: payError ? '#fff5f5' : paySuccess ? '#f0fdf4' : 'white',
                    transition: 'all 0.2s'
                  }}
                />
              </div>

              {/* Error Message */}
              {payError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '8px 12px', background: '#fee2e2', borderRadius: 8 }}>
                  <AlertCircle size={14} color="#dc2626" />
                  <span style={{ fontSize: 13, color: '#dc2626', fontWeight: 600 }}>{payError}</span>
                </div>
              )}

              {/* Success Message */}
              {paySuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '8px 12px', background: '#dcfce7', borderRadius: 8 }}>
                  <CheckCircle size={14} color="#059669" />
                  <span style={{ fontSize: 13, color: '#059669', fontWeight: 600 }}>Payment record ho gayi!</span>
                </div>
              )}

              {/* Quick Amount Buttons */}
              {!paySuccess && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8, fontWeight: 600 }}>Quick Select:</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[showPayModal.due, Math.floor(showPayModal.due / 2), 500, 1000].filter((v, i, a) => v > 0 && a.indexOf(v) === i).map(amt => (
                      <button key={amt} onClick={() => handlePayAmountChange(String(amt))}
                        style={{
                          padding: '6px 14px', borderRadius: 8, border: '2px solid #e5e7eb',
                          background: payAmount == amt ? '#dbeafe' : 'white',
                          borderColor: payAmount == amt ? '#1e40af' : '#e5e7eb',
                          color: payAmount == amt ? '#1e40af' : '#374151',
                          fontSize: 13, fontWeight: 700, cursor: 'pointer'
                        }}>
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowPayModal(null)}
                style={{
                  flex: 1, padding: '14px', border: '2px solid #e5e7eb',
                  borderRadius: 12, background: 'white', fontSize: 15,
                  fontWeight: 700, cursor: 'pointer', color: '#374151'
                }}>
                Cancel
              </button>
              <button onClick={markPaid} disabled={!!payError || !payAmount || paySuccess}
                style={{
                  flex: 2, padding: '14px', border: 'none', borderRadius: 12,
                  background: payError || !payAmount ? '#e5e7eb' : paySuccess ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #059669, #10b981)',
                  color: payError || !payAmount ? '#9ca3af' : 'white',
                  fontSize: 15, fontWeight: 800, cursor: payError || !payAmount ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: !payError && payAmount ? '0 4px 12px rgba(5,150,105,0.3)' : 'none',
                  transition: 'all 0.2s'
                }}>
                {paySuccess ? <><Check size={18} /> Saved!</> : '💾 Payment Save Karo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}