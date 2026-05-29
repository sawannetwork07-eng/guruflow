import { useState } from 'react'
import { Users, Plus, Search, Edit2, Trash2, X, Phone, AlertCircle } from 'lucide-react'

const initialStudents = [
  { id: 1, name: 'Rahul Kumar', class: 'Class 10', fees: 1500, parent: 'Suresh Kumar', phone: '9876543210', status: 'paid' },
  { id: 2, name: 'Priya Sharma', class: 'Class 9', fees: 1200, parent: 'Amit Sharma', phone: '9876543211', status: 'pending' },
  { id: 3, name: 'Rohit Singh', class: 'Class 11', fees: 1800, parent: 'Vijay Singh', phone: '9876543212', status: 'paid' },
  { id: 4, name: 'Anita Verma', class: 'Class 10', fees: 1500, parent: 'Ravi Verma', phone: '9876543213', status: 'pending' },
  { id: 5, name: 'Amit Yadav', class: 'Class 12', fees: 2000, parent: 'Ram Yadav', phone: '9876543214', status: 'paid' },
]

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [form, setForm] = useState({ name: '', class: '', fees: '', parent: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  )

  const validate = (data) => {
    const newErrors = {}
    if (!data.name.trim()) newErrors.name = 'Student ka naam zaroori hai'
    if (!data.class.trim()) newErrors.class = 'Class zaroori hai'
    if (!data.fees) newErrors.fees = 'Fees amount zaroori hai'
    else if (isNaN(data.fees) || Number(data.fees) <= 0) newErrors.fees = 'Valid fees amount daalo'
    if (data.phone && data.phone.length !== 10) newErrors.phone = 'Phone number 10 digits ka hona chahiye'
    return newErrors
  }

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setTouched(prev => ({ ...prev, [key]: true }))
    const newErrors = validate({ ...form, [key]: value })
    setErrors(newErrors)
  }

  const openAdd = () => {
    setEditStudent(null)
    setForm({ name: '', class: '', fees: '', parent: '', phone: '' })
    setErrors({})
    setTouched({})
    setShowModal(true)
  }

  const openEdit = (student) => {
    setEditStudent(student)
    setForm({ name: student.name, class: student.class, fees: student.fees, parent: student.parent, phone: student.phone })
    setErrors({})
    setTouched({})
    setShowModal(true)
  }

  const handleSave = () => {
    const allTouched = { name: true, class: true, fees: true, phone: true }
    setTouched(allTouched)
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    if (editStudent) {
      setStudents(students.map(s => s.id === editStudent.id ? { ...s, ...form, fees: Number(form.fees) } : s))
    } else {
      setStudents([...students, { id: Date.now(), ...form, fees: Number(form.fees), status: 'pending' }])
    }
    setShowModal(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Kya aap sure hain? Yeh student delete ho jaayega.')) {
      setStudents(students.filter(s => s.id !== id))
    }
  }

  const InputField = ({ label, fieldKey, placeholder, type = 'text', required = false }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[fieldKey]}
        onChange={e => handleChange(fieldKey, e.target.value)}
        onBlur={() => setTouched(prev => ({ ...prev, [fieldKey]: true }))}
        style={{
          width: '100%',
          padding: '11px 14px',
          border: `2px solid ${touched[fieldKey] && errors[fieldKey] ? '#ef4444' : touched[fieldKey] && !errors[fieldKey] ? '#10b981' : '#e5e7eb'}`,
          borderRadius: 10,
          fontSize: 14,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
          background: touched[fieldKey] && errors[fieldKey] ? '#fff5f5' : 'white'
        }}
      />
      {touched[fieldKey] && errors[fieldKey] && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <AlertCircle size={12} color="#ef4444" />
          <span style={{ fontSize: 12, color: '#ef4444' }}>{errors[fieldKey]}</span>
        </div>
      )}
      {touched[fieldKey] && !errors[fieldKey] && form[fieldKey] && (
        <div style={{ fontSize: 12, color: '#10b981', marginTop: 4 }}>✓ Sahi hai</div>
      )}
    </div>
  )

  return (
    <div style={{ padding: 24, fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Students</h2>
          <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>Saare students ka record</p>
        </div>
        <button onClick={openAdd} style={{
          background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
          color: 'white', border: 'none', borderRadius: 10,
          padding: '10px 20px', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 12px rgba(30,64,175,0.3)'
        }}>
          <Plus size={16} /> Student Add Karo
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Students', value: students.length, color: '#dbeafe', text: '#1e40af' },
          { label: 'Fees Paid', value: students.filter(s => s.status === 'paid').length, color: '#dcfce7', text: '#059669' },
          { label: 'Fees Pending', value: students.filter(s => s.status === 'pending').length, color: '#fef3c7', text: '#d97706' },
        ].map(stat => (
          <div key={stat.label} style={{ background: stat.color, borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: stat.text }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: '#374151' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input placeholder="Student ya class dhundho..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '11px 16px 11px 40px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9ff' }}>
              {['Student', 'Class', 'Parent', 'Phone', 'Fees', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                  Koi student nahi mila
                </td>
              </tr>
            ) : filtered.map((student, i) => (
              <tr key={student.id} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                      {student.name[0]}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{student.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{student.class}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{student.parent}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, color: '#374151' }}>{student.phone}</td>
                <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: '#111827' }}>₹{student.fees.toLocaleString()}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: student.status === 'paid' ? '#dcfce7' : '#fef3c7',
                    color: student.status === 'paid' ? '#166534' : '#92400e'
                  }}>
                    {student.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(student)} style={{ background: '#dbeafe', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>
                      <Edit2 size={14} color="#1e40af" />
                    </button>
                    <button onClick={() => handleDelete(student.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>
                      <Trash2 size={14} color="#dc2626" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: 32, width: '100%', maxWidth: 460, boxShadow: '0 25px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>
                {editStudent ? '✏️ Student Edit Karo' : '➕ Naya Student Add Karo'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: '#f3f4f6', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
                <X size={18} color="#6b7280" />
              </button>
            </div>

            <InputField label="Student Ka Naam" fieldKey="name" placeholder="Jaise: Rahul Kumar" required />
            <InputField label="Class" fieldKey="class" placeholder="Jaise: Class 10" required />
            <InputField label="Monthly Fees (₹)" fieldKey="fees" placeholder="Jaise: 1500" type="number" required />
            <InputField label="Parent Ka Naam" fieldKey="parent" placeholder="Jaise: Suresh Kumar" />
            <InputField label="Parent Phone" fieldKey="phone" placeholder="10 digit number" type="tel" />

            {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
              <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10, padding: 12, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={16} color="#ef4444" />
                <span style={{ fontSize: 13, color: '#ef4444' }}>Sabse pehle zaroori fields fill karo</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', border: '2px solid #e5e7eb', borderRadius: 10, background: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
                Cancel
              </button>
              <button onClick={handleSave} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: 10, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                {editStudent ? '✓ Update Karo' : '+ Add Karo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}