import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function CoachDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState('ar');
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  
  // Form data
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', weight: '', target: '' });
  const [newPlan, setNewPlan] = useState({ name: '', duration: '', exercises: '' });

  const t = lang === 'ar' ? ar : en;

  // ─── LOAD CLIENTS ──────────────────────────
  useEffect(() => {
    loadClients();
  }, [user?.uid]);

  const loadClients = async () => {
    try {
      setLoading(true);
      if (!user?.uid) return;
      
      const q = query(collection(db, 'users'), where('coachId', '==', user.uid), where('role', '==', 'client'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setClients(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ─── LOAD PLANS ──────────────────────────
  useEffect(() => {
    loadPlans();
  }, [user?.uid]);

  const loadPlans = async () => {
    try {
      if (!user?.uid) return;
      
      const q = query(collection(db, 'plans'), where('coachId', '==', user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setPlans(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ─── ADD CLIENT ──────────────────────────
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        name: newClient.name,
        email: newClient.email,
        phone: newClient.phone,
        weight: parseFloat(newClient.weight),
        target: parseFloat(newClient.target),
        coachId: user.uid,
        role: 'client',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      
      setNewClient({ name: '', email: '', phone: '', weight: '', target: '' });
      setShowClientForm(false);
      loadClients();
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  // ─── ADD PLAN ──────────────────────────
  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'plans'), {
        name: newPlan.name,
        duration: newPlan.duration,
        exercises: newPlan.exercises,
        coachId: user.uid,
        createdAt: new Date().toISOString(),
      });
      
      setNewPlan({ name: '', duration: '', exercises: '' });
      setShowPlanForm(false);
      loadPlans();
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  // ─── DELETE CLIENT ──────────────────────────
  const handleDeleteClient = async (clientId) => {
    try {
      await deleteDoc(doc(db, 'users', clientId));
      loadClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  // ─── DELETE PLAN ──────────────────────────
  const handleDeletePlan = async (planId) => {
    try {
      await deleteDoc(doc(db, 'plans', planId));
      loadPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>⚡ CoachPro</h1>
          <div style={styles.headerRight}>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={styles.langBtn}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div style={styles.container}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <nav>
            <button onClick={() => setActiveTab('overview')} style={{...styles.navBtn, ...(activeTab === 'overview' ? styles.navBtnActive : {})}}>📊 {t.overview}</button>
            <button onClick={() => setActiveTab('clients')} style={{...styles.navBtn, ...(activeTab === 'clients' ? styles.navBtnActive : {})}}>👥 {t.clients}</button>
            <button onClick={() => setActiveTab('plans')} style={{...styles.navBtn, ...(activeTab === 'plans' ? styles.navBtnActive : {})}}>📋 {t.plans}</button>
          </nav>
        </aside>

        {/* CONTENT */}
        <main style={styles.content}>
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={styles.title2}>{t.dashboard}</h2>
              <div style={styles.statsGrid}>
                <div style={styles.stat}>
                  <div style={styles.statNum}>{clients.length}</div>
                  <div style={styles.statLabel}>{t.totalClients}</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNum}>{plans.length}</div>
                  <div style={styles.statLabel}>{t.totalPlans}</div>
                </div>
              </div>
            </div>
          )}

          {/* CLIENTS */}
          {activeTab === 'clients' && (
            <div>
              <div style={styles.header2}>
                <h2 style={styles.title2}>{t.clients}</h2>
                <button onClick={() => setShowClientForm(!showClientForm)} style={styles.btnAdd}>+ {t.addClient}</button>
              </div>

              {/* FORM */}
              {showClientForm && (
                <form onSubmit={handleAddClient} style={styles.form}>
                  <input
                    type="text"
                    placeholder={t.name}
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    style={styles.input}
                    required
                  />
                  <input
                    type="email"
                    placeholder={t.email}
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="tel"
                    placeholder={t.phone}
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="number"
                    placeholder={t.weight}
                    value={newClient.weight}
                    onChange={(e) => setNewClient({...newClient, weight: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="number"
                    placeholder={t.targetWeight}
                    value={newClient.target}
                    onChange={(e) => setNewClient({...newClient, target: e.target.value})}
                    style={styles.input}
                  />
                  <div style={styles.formBtns}>
                    <button type="submit" style={styles.btnSave}>{t.save}</button>
                    <button type="button" onClick={() => setShowClientForm(false)} style={styles.btnCancel}>{t.cancel}</button>
                  </div>
                </form>
              )}

              {/* LIST */}
              <div style={styles.grid}>
                {loading ? (
                  <p>{t.loading}...</p>
                ) : clients.length === 0 ? (
                  <p>{t.noClients}</p>
                ) : (
                  clients.map((c) => (
                    <div key={c.id} style={styles.card}>
                      <h3 style={styles.cardTitle}>{c.name}</h3>
                      <p>📧 {c.email}</p>
                      <p>📞 {c.phone}</p>
                      <p>⚖️ {c.weight} كجم → {c.target} كجم</p>
                      <div style={styles.cardBtns}>
                        <button style={styles.btnSmall}>{t.edit}</button>
                        <button onClick={() => handleDeleteClient(c.id)} style={styles.btnSmallDel}>{t.delete}</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* PLANS */}
          {activeTab === 'plans' && (
            <div>
              <div style={styles.header2}>
                <h2 style={styles.title2}>{t.plans}</h2>
                <button onClick={() => setShowPlanForm(!showPlanForm)} style={styles.btnAdd}>+ {t.addPlan}</button>
              </div>

              {/* FORM */}
              {showPlanForm && (
                <form onSubmit={handleAddPlan} style={styles.form}>
                  <input
                    type="text"
                    placeholder={t.planName}
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                    style={styles.input}
                    required
                  />
                  <input
                    type="text"
                    placeholder={t.duration}
                    value={newPlan.duration}
                    onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder={t.exercises}
                    value={newPlan.exercises}
                    onChange={(e) => setNewPlan({...newPlan, exercises: e.target.value})}
                    style={styles.input}
                  />
                  <div style={styles.formBtns}>
                    <button type="submit" style={styles.btnSave}>{t.save}</button>
                    <button type="button" onClick={() => setShowPlanForm(false)} style={styles.btnCancel}>{t.cancel}</button>
                  </div>
                </form>
              )}

              {/* LIST */}
              <div style={styles.grid}>
                {plans.length === 0 ? (
                  <p>{t.noPlans}</p>
                ) : (
                  plans.map((p) => (
                    <div key={p.id} style={styles.card}>
                      <h3 style={styles.cardTitle}>{p.name}</h3>
                      <p>⏱️ {p.duration}</p>
                      <p>💪 {p.exercises}</p>
                      <div style={styles.cardBtns}>
                        <button style={styles.btnSmall}>{t.edit}</button>
                        <button onClick={() => handleDeletePlan(p.id)} style={styles.btnSmallDel}>{t.delete}</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// ─── STYLES ────────────────────────────
const styles = {
  wrapper: {
    fontFamily: "'Cairo', sans-serif",
    background: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1.5rem 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    gap: '1rem',
  },
  langBtn: {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    display: 'flex',
    gap: '2rem',
  },
  sidebar: {
    width: '200px',
    background: 'white',
    borderRadius: '12px',
    padding: '1rem',
    height: 'fit-content',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  navBtn: {
    width: '100%',
    padding: '12px',
    background: 'none',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    textAlign: 'left',
    marginBottom: '0.5rem',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
  },
  navBtnActive: {
    background: '#667eea',
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  title2: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222',
    margin: '0 0 1.5rem',
  },
  header2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  stat: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
  },
  statNum: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9,
  },
  btnAdd: {
    padding: '12px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  formBtns: {
    display: 'flex',
    gap: '1rem',
  },
  btnSave: {
    padding: '12px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    flex: 1,
  },
  btnCancel: {
    padding: '12px 24px',
    background: '#e0e0e0',
    color: '#666',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    flex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 1rem',
    color: '#222',
  },
  cardBtns: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  btnSmall: {
    padding: '8px 12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    flex: 1,
  },
  btnSmallDel: {
    padding: '8px 12px',
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    flex: 1,
  },
};

const ar = {
  dashboard: 'لوحة التحكم',
  overview: 'نظرة عامة',
  clients: 'العملاء',
  plans: 'الخطط',
  totalClients: 'إجمالي العملاء',
  totalPlans: 'إجمالي الخطط',
  addClient: 'إضافة عميل',
  addPlan: 'إضافة خطة',
  name: 'الاسم',
  email: 'البريد الإلكتروني',
  phone: 'الهاتف',
  weight: 'الوزن الحالي',
  targetWeight: 'الوزن المستهدف',
  planName: 'اسم الخطة',
  duration: 'المدة',
  exercises: 'التمارين',
  save: 'حفظ',
  cancel: 'إلغاء',
  edit: 'تعديل',
  delete: 'حذف',
  loading: 'جاري التحميل',
  noClients: 'لا توجد عملاء بعد',
  noPlans: 'لا توجد خطط بعد',
};

const en = {
  dashboard: 'Dashboard',
  overview: 'Overview',
  clients: 'Clients',
  plans: 'Plans',
  totalClients: 'Total Clients',
  totalPlans: 'Total Plans',
  addClient: 'Add Client',
  addPlan: 'Add Plan',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  weight: 'Current Weight',
  targetWeight: 'Target Weight',
  planName: 'Plan Name',
  duration: 'Duration',
  exercises: 'Exercises',
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  loading: 'Loading',
  noClients: 'No clients yet',
  noPlans: 'No plans yet',
};
