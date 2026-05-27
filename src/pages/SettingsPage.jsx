import { useState } from 'react'
import { User, Bell, IndianRupee, Shield, Phone, Save, Check, Building, Mail, MapPin } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Ramesh Kumar',
    email: 'ramesh@guruflow.in',
    phone: '9876543210',
    institute: 'Ramesh Coaching Center',
    city: 'Jaipur',
    address: 'C-12, Vaishali Nagar, Jaipur',
    established: '2018',
  })
  const [notifications, setNotifications] = useState({
    feesReminder: true,
    attendanceAlert: true,
    monthlyReport: true,
    whatsapp: true,
    sms: false,
    email: true,
  })
  const [pricing, setPricing] = useState({
    class9: 1200,
    class10: 1500,
    class11: 1800,
    class12: 2000,
    lateFee: 100,
    dueDate: '1',
  })
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'pricing', label: 'Fees Setup', icon: <IndianRupee size={16} /> },
    { id: 'security', label: 'Security', icon: <Shield size={16} /> },
  ]

  return (
    <div style={{ padding: 24, fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>Settings</h2>
        <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>Apni institute ki settings manage karo</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>

        {/* Sidebar Tabs */}
        <div style={{ background: 'white', borderRadius: 16, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: 'fit-content' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 14px', borderRadius: 10, border: 'none',
              background: activeTab === tab.id ? '#dbeafe' : 'transparent',
              color: activeTab === tab.id ? '#1e40af' : '#6b7280',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              marginBottom: 4, transition: 'all 0.2s', textAlign: 'left'
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 24 }}>Institute Profile</h3>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, padding: 20, background: '#f8f9ff', borderRadius: 14 }}>
                <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, fontWeight: 700 }}>
                  R
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{profile.name}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{profile.institute}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Institute Owner</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Aapka Naam', key: 'name', icon: <User size={15} />, placeholder: 'Poora naam' },
                  { label: 'Email', key: 'email', icon: <Mail size={15} />, placeholder: 'email@example.com', type: 'email' },
                  { label: 'Phone Number', key: 'phone', icon: <Phone size={15} />, placeholder: '10 digit number', type: 'tel' },
                  { label: 'Institute Ka Naam', key: 'institute', icon: <Building size={15} />, placeholder: 'Coaching ka naam' },
                  { label: 'Sheher', key: 'city', icon: <MapPin size={15} />, placeholder: 'Jaise: Jaipur' },
                  { label: 'Sthapana Varsh', key: 'established', icon: <Building size={15} />, placeholder: 'Jaise: 2018', type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                      {field.label}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                        {field.icon}
                      </div>
                      <input type={field.type || 'text'} placeholder={field.placeholder}
                        value={profile[field.key]}
                        onChange={e => setProfile({ ...profile, [field.key]: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px 10px 36px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = '#3b82f6'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Poora Address</label>
                <textarea placeholder="Institute ka poora address"
                  value={profile.address}
                  onChange={e => setProfile({ ...profile, address: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 24 }}>Notification Settings</h3>

              {/* WhatsApp Setup */}
              <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 14, padding: 20, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>📱</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#059669' }}>WhatsApp Reminders Setup</div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>Parents ko automatic reminder bhejne ke liye</div>
                  </div>
                </div>
                <input placeholder="Tumhara WhatsApp Business number"
                  style={{ width: '100%', padding: '10px 14px', border: '2px solid #bbf7d0', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' }} />
                <p style={{ fontSize: 12, color: '#6b7280', margin: '8px 0 0' }}>
                  * WhatsApp Business account hona chahiye reminder bhejne ke liye
                </p>
              </div>

              {[
                { key: 'feesReminder', label: 'Fees Reminder', desc: 'Due date se 3 din pehle parents ko reminder' },
                { key: 'attendanceAlert', label: 'Attendance Alert', desc: 'Baccha absent ho toh parent ko turant alert' },
                { key: 'monthlyReport', label: 'Monthly Report', desc: 'Har mahine end pe summary report' },
                { key: 'whatsapp', label: 'WhatsApp Notifications', desc: 'WhatsApp pe reminders bhejo' },
                { key: 'sms', label: 'SMS Notifications', desc: 'SMS pe reminders bhejo' },
                { key: 'email', label: 'Email Notifications', desc: 'Email pe reminders bhejo' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#9ca3af' }}>{item.desc}</div>
                  </div>
                  <div onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    style={{
                      width: 48, height: 26, borderRadius: 13, cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0,
                      background: notifications[item.key] ? '#1e40af' : '#d1d5db',
                      position: 'relative'
                    }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', background: 'white',
                      position: 'absolute', top: 3, transition: 'left 0.3s',
                      left: notifications[item.key] ? 25 : 3,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Fees Setup</h3>
              <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>Har class ki fees aur due date set karo</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                {[
                  { label: 'Class 9 — Monthly Fees', key: 'class9' },
                  { label: 'Class 10 — Monthly Fees', key: 'class10' },
                  { label: 'Class 11 — Monthly Fees', key: 'class11' },
                  { label: 'Class 12 — Monthly Fees', key: 'class12' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{field.label}</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#6b7280', fontWeight: 700 }}>₹</span>
                      <input type="number"
                        value={pricing[field.key]}
                        onChange={e => setPricing({ ...pricing, [field.key]: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px 10px 32px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15, fontWeight: 700, outline: 'none', boxSizing: 'border-box', color: '#1e40af' }}
                        onFocus={e => e.target.style.borderColor = '#3b82f6'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#f8f9ff', borderRadius: 14, padding: 20 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Late Fee & Due Date</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Late Fee (₹)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: '#6b7280', fontWeight: 700 }}>₹</span>
                      <input type="number" value={pricing.lateFee}
                        onChange={e => setPricing({ ...pricing, lateFee: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px 10px 32px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Due Date (Har mahine ki)</label>
                    <select value={pricing.dueDate}
                      onChange={e => setPricing({ ...pricing, dueDate: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' }}>
                      {Array.from({ length: 28 }, (_, i) => i + 1).map(d => (
                        <option key={d} value={d}>{d} tarikh</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 24 }}>Security Settings</h3>

              <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', borderRadius: 14, padding: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e40af', marginBottom: 4 }}>🔒 Password Change Karo</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>Strong password rakho — number, letter aur symbol milake</div>
              </div>

              {[
                { label: 'Current Password', key: 'currentPassword', placeholder: 'Purana password' },
                { label: 'New Password', key: 'newPassword', placeholder: 'Naya password' },
                { label: 'Confirm New Password', key: 'confirmPassword', placeholder: 'Dobara naya password' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{field.label}</label>
                  <input type="password" placeholder={field.placeholder}
                    value={security[field.key]}
                    onChange={e => setSecurity({ ...security, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#3b82f6'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
              ))}

              <div style={{ background: '#f8f9ff', borderRadius: 14, padding: 20, marginTop: 24 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Account Security</h4>
                {[
                  { label: 'Two Factor Authentication', desc: 'Extra security layer — OTP se login', enabled: false },
                  { label: 'Login Notifications', desc: 'Naye device se login pe email aayega', enabled: true },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i === 0 ? '1px solid #e5e7eb' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{item.desc}</div>
                    </div>
                    <div style={{ width: 48, height: 26, borderRadius: 13, background: item.enabled ? '#1e40af' : '#d1d5db', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: item.enabled ? 25 : 3, boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
            <button onClick={handleSave} style={{
              background: saved ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #1e40af, #3b82f6)',
              color: 'white', border: 'none', borderRadius: 10,
              padding: '12px 28px', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(30,64,175,0.3)'
            }}>
              {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Changes Save Karo</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}