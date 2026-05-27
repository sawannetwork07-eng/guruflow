import { useState } from 'react'
import { GraduationCap, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [isForgot, setIsForgot] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'owner' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMessage(isForgot ? 'Reset link bhej diya gaya!' : isSignup ? 'Account ban gaya!' : 'Login successful!')
    }, 1500)
  }

  if (isForgot) return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}><GraduationCap size={24} color="white" /></div>
          <span style={styles.logoText}>GuruFlow</span>
        </div>
        <h2 style={styles.title}>Password Reset</h2>
        <p style={styles.subtitle}>Apna email daalo — reset link bhej denge</p>
        {message && <div style={styles.success}>{message}</div>}
        <div style={styles.inputGroup}>
          <Mail size={16} color="#9ca3af" style={styles.inputIcon} />
          <input placeholder="Email address" type="email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            style={styles.input} />
        </div>
        <button onClick={handleSubmit} style={styles.btn} disabled={loading}>
          {loading ? 'Bhej rahe hain...' : 'Reset Link Bhejo'} {!loading && <ArrowRight size={16} />}
        </button>
        <p style={styles.link} onClick={() => setIsForgot(false)}>← Wapas Login Pe</p>
      </div>
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}><GraduationCap size={24} color="white" /></div>
          <span style={styles.logoText}>GuruFlow</span>
        </div>
        <h2 style={styles.title}>{isSignup ? 'Account Banao' : 'Wapas Aao'}</h2>
        <p style={styles.subtitle}>{isSignup ? 'GuruFlow join karo — free mein' : 'Apne account mein login karo'}</p>

        {message && <div style={styles.success}>{message}</div>}

        {isSignup && (
          <>
            <div style={styles.inputGroup}>
              <input placeholder="Poora naam" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ ...styles.input, paddingLeft: 16 }} />
            </div>
            <div style={styles.roleContainer}>
              {['owner', 'parent'].map(role => (
                <button key={role} onClick={() => setForm({ ...form, role })}
                  style={{ ...styles.roleBtn, ...(form.role === role ? styles.roleBtnActive : {}) }}>
                  {role === 'owner' ? '🏫 Institute Owner' : '👨‍👩‍👧 Parent'}
                </button>
              ))}
            </div>
          </>
        )}

        <div style={styles.inputGroup}>
          <Mail size={16} color="#9ca3af" style={styles.inputIcon} />
          <input placeholder="Email address" type="email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <Lock size={16} color="#9ca3af" style={styles.inputIcon} />
          <input placeholder="Password" type={showPassword ? 'text' : 'password'}
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ ...styles.input, paddingRight: 40 }} />
          <div onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? <EyeOff size={16} color="#9ca3af" /> : <Eye size={16} color="#9ca3af" />}
          </div>
        </div>

        {!isSignup && (
          <p style={{ ...styles.link, textAlign: 'right', marginTop: -8 }}
            onClick={() => setIsForgot(true)}>
            Password bhool gaye?
          </p>
        )}

        <button onClick={handleSubmit} style={styles.btn} disabled={loading}>
          {loading ? 'Please wait...' : isSignup ? 'Account Banao' : 'Login Karo'}
          {!loading && <ArrowRight size={16} />}
        </button>

        <div style={styles.divider}><span>ya</span></div>

        <button style={styles.googleBtn}>
          <img src="https://www.google.com/favicon.ico" width={18} height={18} alt="G" />
          Google se {isSignup ? 'Signup' : 'Login'} Karo
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#6b7280' }}>
          {isSignup ? 'Pehle se account hai? ' : 'Naya account? '}
          <span style={styles.link} onClick={() => { setIsSignup(!isSignup); setMessage('') }}>
            {isSignup ? 'Login Karo' : 'Sign Up Karo'}
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', padding: 20
  },
  card: {
    background: 'white', borderRadius: 20, padding: 40, width: '100%', maxWidth: 420,
    boxShadow: '0 25px 60px rgba(30,64,175,0.15)', border: '1px solid rgba(219,234,254,0.5)'
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 28 },
  logoIcon: { background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: 10, padding: 8 },
  logoText: { fontSize: 22, fontWeight: 700, color: '#1e40af' },
  title: { fontSize: 26, fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 28 },
  success: { background: '#dcfce7', color: '#166534', padding: '10px 16px', borderRadius: 8, fontSize: 14, marginBottom: 16, textAlign: 'center' },
  inputGroup: { position: 'relative', marginBottom: 16 },
  inputIcon: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' },
  eyeIcon: { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' },
  input: {
    width: '100%', padding: '12px 16px 12px 40px', fontSize: 15, border: '2px solid #e5e7eb',
    borderRadius: 10, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  },
  roleContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 },
  roleBtn: {
    padding: '10px', border: '2px solid #e5e7eb', borderRadius: 10, background: 'white',
    fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
  },
  roleBtnActive: { borderColor: '#1e40af', background: '#eff6ff', color: '#1e40af' },
  btn: {
    width: '100%', padding: '13px', background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
    color: 'white', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginTop: 8, boxShadow: '0 4px 12px rgba(30,64,175,0.3)'
  },
  divider: {
    textAlign: 'center', margin: '20px 0', position: 'relative',
    borderTop: '1px solid #e5e7eb', lineHeight: 0
  },
  googleBtn: {
    width: '100%', padding: '12px', background: 'white', border: '2px solid #e5e7eb',
    borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
  },
  link: { color: '#1e40af', cursor: 'pointer', fontWeight: 600, fontSize: 14 }
}