import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Users, Calendar, Check, X } from 'lucide-react'

const studentsList = [
  { id: 1, name: 'Rahul Kumar', class: 'Class 10' },
  { id: 2, name: 'Priya Sharma', class: 'Class 9' },
  { id: 3, name: 'Rohit Singh', class: 'Class 11' },
  { id: 4, name: 'Anita Verma', class: 'Class 10' },
  { id: 5, name: 'Amit Yadav', class: 'Class 12' },
  { id: 6, name: 'Sneha Gupta', class: 'Class 9' },
  { id: 7, name: 'Vikram Patel', class: 'Class 11' },
  { id: 8, name: 'Kavya Mishra', class: 'Class 10' },
]

export default function AttendancePage() {
  const today = new Date().toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const [attendance, setAttendance] = useState({})
  const [saved, setSaved] = useState(false)
  const [filterClass, setFilterClass] = useState('All')

  const classes = ['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12']

  const filtered = studentsList.filter(s => filterClass === 'All' || s.class === filterClass)

  const markAll = (status) => {
    const updated = {}
    filtered.forEach(s => updated[s.id] = status)
    setAttendance(prev => ({ ...prev, ...updated }))
  }

  const mark = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const present = Object.values(attendance).filter(v => v === 'present').length
  const absent = Object.values(attendance).filter(v => v === 'absent').length
  const unmarked = studentsList.length - present - absent

  return (
    <div style={{ padding: 24, fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Attendance</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={14} /> {today}
          </p>
        </div>
        <button onClick={handleSave} style={{
          background: saved ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #1e40af, #3b82f6)',
          color: 'white', border: 'none', borderRadius: 10,
          padding: '10px 24px', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          transition: 'all 0.3s'
        }}>
          {saved ? <><Check size={16} /> Saved!</> : 'Attendance Save Karo'}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total', value: studentsList.length, bg: '#f3f4f6', text: '#374151', icon: <Users size={20} color="#374151" /> },
          { label: 'Present', value: present, bg: '#dcfce7', text: '#059669', icon: <CheckCircle size={20} color="#059669" /> },
          { label: 'Absent', value: absent, bg: '#fee2e2', text: '#dc2626', icon: <XCircle size={20} color="#dc2626" /> },
          { label: 'Unmarked', value: unmarked, bg: '#fef3c7', text: '#d97706', icon: <Clock size={20} color="#d97706" /> },
        ].map(stat => (
          <div key={stat.label} style={{ background: stat.bg, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            {stat.icon}
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: stat.text }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Mark All */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {classes.map(cls => (
            <button key={cls} onClick={() => setFilterClass(cls)} style={{
              padding: '7px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600,
              border: '2px solid', cursor: 'pointer', transition: 'all 0.2s',
              borderColor: filterClass === cls ? '#1e40af' : '#e5e7eb',
              background: filterClass === cls ? '#dbeafe' : 'white',
              color: filterClass === cls ? '#1e40af' : '#6b7280'
            }}>
              {cls}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => markAll('present')} style={{
            padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            border: 'none', background: '#dcfce7', color: '#059669', cursor: 'pointer'
          }}>
            ✓ Sab Present
          </button>
          <button onClick={() => markAll('absent')} style={{
            padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer'
          }}>
            ✗ Sab Absent
          </button>
        </div>
      </div>

      {/* Student List */}
      <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {filtered.map((student, i) => (
          <div key={student.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
            background: attendance[student.id] === 'present' ? '#f0fdf4' : attendance[student.id] === 'absent' ? '#fff5f5' : 'white',
            transition: 'background 0.2s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: attendance[student.id] === 'present' ? 'linear-gradient(135deg, #059669, #10b981)' :
                  attendance[student.id] === 'absent' ? 'linear-gradient(135deg, #dc2626, #ef4444)' :
                    'linear-gradient(135deg, #6b7280, #9ca3af)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 16, fontWeight: 700, flexShrink: 0
              }}>
                {student.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{student.name}</div>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>{student.class}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {attendance[student.id] && (
                <span style={{
                  fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                  background: attendance[student.id] === 'present' ? '#dcfce7' : '#fee2e2',
                  color: attendance[student.id] === 'present' ? '#059669' : '#dc2626'
                }}>
                  {attendance[student.id] === 'present' ? 'Present' : 'Absent'}
                </span>
              )}
              <button onClick={() => mark(student.id, 'present')} style={{
                width: 40, height: 40, borderRadius: '50%', border: '2px solid',
                borderColor: attendance[student.id] === 'present' ? '#059669' : '#e5e7eb',
                background: attendance[student.id] === 'present' ? '#059669' : 'white',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                <Check size={18} color={attendance[student.id] === 'present' ? 'white' : '#9ca3af'} />
              </button>
              <button onClick={() => mark(student.id, 'absent')} style={{
                width: 40, height: 40, borderRadius: '50%', border: '2px solid',
                borderColor: attendance[student.id] === 'absent' ? '#dc2626' : '#e5e7eb',
                background: attendance[student.id] === 'absent' ? '#dc2626' : 'white',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                <X size={18} color={attendance[student.id] === 'absent' ? 'white' : '#9ca3af'} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Alert */}
      {saved && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24,
          background: '#059669', color: 'white',
          padding: '14px 24px', borderRadius: 12,
          fontSize: 14, fontWeight: 700,
          boxShadow: '0 8px 24px rgba(5,150,105,0.4)',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Check size={18} /> Attendance successfully save ho gayi!
        </div>
      )}
    </div>
  )
}