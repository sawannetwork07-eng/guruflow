import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Users, IndianRupee, Bell, BarChart3, Shield, CheckCircle, ArrowRight, Menu, X, Star } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: '#f8f9ff', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease', padding: '0 5%'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: 10, padding: 8 }}>
              <GraduationCap size={22} color="white" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#1e40af', letterSpacing: '-0.5px' }}>GuruFlow</span>
          </div>

          {/* Desktop Menu */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-menu">
            {['Features', 'Pricing', 'About'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#374151', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}
                onMouseOver={e => e.target.style.color = '#1e40af'}
                onMouseOut={e => e.target.style.color = '#374151'}>
                {item}
              </a>
            ))}
            <button style={{
              background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
              color: 'white', border: 'none', borderRadius: 8,
              padding: '10px 24px', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 12px rgba(30,64,175,0.3)'
            }}
              onMouseOver={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(30,64,175,0.4)' }}
              onMouseOut={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 12px rgba(30,64,175,0.3)' }}
              onClick={() => navigate('/login')}>
              Free Trial Shuru Karein
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="mobile-menu-btn">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ background: 'white', padding: '20px 5%', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            {['Features', 'Pricing', 'About'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ display: 'block', padding: '12px 0', color: '#374151', textDecoration: 'none', fontSize: 16, borderBottom: '1px solid #f3f4f6' }}
                onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <button style={{ marginTop: 16, width: '100%', background: 'linear-gradient(135deg, #1e40af, #3b82f6)', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              Free Trial Shuru Karein
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%)',
        padding: '100px 5% 60px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, background: 'radial-gradient(circle, rgba(30,64,175,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(30,64,175,0.1)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
              <Star size={14} color="#1e40af" fill="#1e40af" />
              <span style={{ color: '#1e40af', fontSize: 13, fontWeight: 600 }}>India Ka #1 Coaching Management Tool</span>
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 800, color: '#111827', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-1px' }}>
              Coaching Institute Ko{' '}
              <span style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Smart Banao
              </span>
            </h1>
            <p style={{ fontSize: 18, color: '#6b7280', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Students manage karo, fees track karo, attendance record karo aur parents ko automatically remind karo — sab ek jagah pe. No more registers, no more confusion.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                color: 'white', border: 'none', borderRadius: 10,
                padding: '14px 32px', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 8px 24px rgba(30,64,175,0.35)',
                transition: 'transform 0.2s'
              }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => navigate('/login')}>
                14 Din Free Try Karein <ArrowRight size={18} />
              </button>
              <button style={{
                background: 'white', color: '#1e40af', border: '2px solid #dbeafe',
                borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 600,
                cursor: 'pointer', transition: 'border-color 0.2s'
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseOut={e => e.currentTarget.style.borderColor = '#dbeafe'}>
                Demo Dekhein
              </button>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
              {[['500+', 'Institutes'], ['50,000+', 'Students'], ['98%', 'Satisfaction']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#1e40af' }}>{num}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'white', borderRadius: 20, padding: 32,
              boxShadow: '0 25px 60px rgba(30,64,175,0.15)',
              border: '1px solid rgba(219,234,254,0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Dashboard Overview</h3>
                <span style={{ fontSize: 12, color: '#6b7280' }}>Aaj ka summary</span>
              </div>
              {[
                { label: 'Total Students', value: '142', color: '#dbeafe', text: '#1e40af', icon: '👨‍🎓' },
                { label: 'Fees Collected', value: '₹1,24,500', color: '#dcfce7', text: '#166534', icon: '💰' },
                { label: 'Pending Fees', value: '₹18,000', color: '#fef3c7', text: '#92400e', icon: '⏳' },
                { label: 'Attendance Today', value: '94%', color: '#ede9fe', text: '#5b21b6', icon: '✅' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: item.color, borderRadius: 10, padding: '12px 16px', marginBottom: 10
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: item.text }}>{item.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 12, background: '#eff6ff', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bell size={16} color="#1e40af" />
                <span style={{ fontSize: 13, color: '#1e40af' }}>5 parents ko fee reminder bheja gaya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 5%', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Sab Kuch Ek Jagah</h2>
            <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 500, margin: '0 auto' }}>Coaching institute chalana ab bahut aasaan ho gaya hai</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: <Users size={28} color="#1e40af" />, title: 'Student Management', desc: 'Students add karo, edit karo, aur track karo — ek simple dashboard mein sab kuch.' },
              { icon: <IndianRupee size={28} color="#059669" />, title: 'Fees Tracking', desc: 'Kon si fees aayi, kaunsi pending hai — sab clearly dikhta hai. Month-end report automatic.' },
              { icon: <Bell size={28} color="#d97706" />, title: 'Auto Reminders', desc: 'Fees due hone se pehle parents ko automatic WhatsApp/SMS reminder chala jaata hai.' },
              { icon: <CheckCircle size={28} color="#7c3aed" />, title: 'Attendance', desc: 'Daily attendance phone se mark karo. Parent ko real-time pata chalta hai baccha aaya ya nahi.' },
              { icon: <BarChart3 size={28} color="#dc2626" />, title: 'Reports & Analytics', desc: 'Monthly revenue charts, attendance trends — sab visual reports mein clearly dikhta hai.' },
              { icon: <Shield size={28} color="#0891b2" />, title: 'Secure & Private', desc: 'Har institute ka data alag aur bilkul safe. Koi doosra tumhara data nahi dekh sakta.' },
            ].map(feature => (
              <div key={feature.title} style={{
                background: '#f8f9ff', borderRadius: 16, padding: 28,
                border: '1px solid #e5e7eb', transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default'
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(30,64,175,0.12)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 10 }}>{feature.title}</h3>
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 5%', background: '#f8f9ff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#111827', marginBottom: 16 }}>Simple Pricing</h2>
            <p style={{ fontSize: 18, color: '#6b7280' }}>Koi hidden charges nahi — jo dikhta hai wahi lagta hai</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Basic', price: '699', students: '50', popular: false, color: '#f8f9ff', features: ['50 Students tak', 'Attendance Tracking', 'Fees Management', 'Basic Reports', 'Email Support'] },
              { name: 'Standard', price: '1,199', students: '150', popular: true, color: '#1e40af', features: ['150 Students tak', 'Sab Basic features', 'WhatsApp Reminders', 'Parent Portal', 'Advanced Reports', 'Priority Support'] },
              { name: 'Pro', price: '1,999', students: 'Unlimited', popular: false, color: '#f8f9ff', features: ['Unlimited Students', 'Sab Standard features', 'Multiple Branches', 'Custom Branding', 'API Access', 'Dedicated Support'] },
            ].map(plan => (
              <div key={plan.name} style={{
                background: plan.popular ? plan.color : 'white',
                borderRadius: 20, padding: 32,
                border: plan.popular ? 'none' : '2px solid #e5e7eb',
                boxShadow: plan.popular ? '0 20px 50px rgba(30,64,175,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
                position: 'relative', transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
              }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#fbbf24', color: '#78350f', padding: '4px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    ⭐ Sabse Popular
                  </div>
                )}
                <h3 style={{ fontSize: 22, fontWeight: 700, color: plan.popular ? 'white' : '#111827', marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: plan.popular ? 'white' : '#1e40af' }}>₹{plan.price}</span>
                  <span style={{ fontSize: 14, color: plan.popular ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>/month</span>
                </div>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <CheckCircle size={16} color={plan.popular ? '#93c5fd' : '#1e40af'} fill={plan.popular ? 'rgba(147,197,253,0.2)' : 'rgba(30,64,175,0.1)'} />
                    <span style={{ fontSize: 14, color: plan.popular ? 'rgba(255,255,255,0.9)' : '#374151' }}>{f}</span>
                  </div>
                ))}
                <button style={{
                  marginTop: 24, width: '100%',
                  background: plan.popular ? 'white' : 'linear-gradient(135deg, #1e40af, #3b82f6)',
                  color: plan.popular ? '#1e40af' : 'white',
                  border: 'none', borderRadius: 10, padding: '12px',
                  fontSize: 15, fontWeight: 700, cursor: 'pointer'
                }}>
                  Abhi Shuru Karein
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111827', color: 'white', padding: '40px 5%', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: 8, padding: 6 }}>
            <GraduationCap size={18} color="white" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 700 }}>GuruFlow</span>
        </div>
        <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 8 }}>India ke coaching institutes ke liye banaya gaya</p>
        <p style={{ color: '#6b7280', fontSize: 13 }}>© 2026 GuruFlow. All rights reserved.</p>
      </footer>

    </div>
  )
}