import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function EnhancedCoachDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [clients, setClients] = useState([
    { id: 1, name: 'أحمد محمد', weight: 85, target: 75, streak: 12, status: 'active' },
    { id: 2, name: 'فاطمة علي', weight: 65, target: 58, streak: 8, status: 'active' },
  ]);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [lang, setLang] = useState('ar');

  const t = lang === 'ar' ? ar : en;

  // بيانات وهمية للرسوم البيانية
  const weightData = [
    { date: 'أسبوع 1', value: 85 },
    { date: 'أسبوع 2', value: 84 },
    { date: 'أسبوع 3', value: 82 },
    { date: 'أسبوع 4', value: 80 },
  ];

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>⚡ CoachPro {t.dashboard}</h1>
          <div style={styles.headerRight}>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={styles.langBtn}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button style={styles.logoutBtn}>{t.logout}</button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={styles.container}>
        {/* SIDEBAR NAVIGATION */}
        <aside style={styles.sidebar}>
          <nav style={styles.sidebarNav}>
            <button 
              onClick={() => setActiveTab('overview')} 
              style={{...styles.navItem, ...(activeTab === 'overview' ? styles.navItemActive : {})}}
            >
              📊 {t.overview}
            </button>
            <button 
              onClick={() => setActiveTab('clients')} 
              style={{...styles.navItem, ...(activeTab === 'clients' ? styles.navItemActive : {})}}
            >
              👥 {t.clients}
            </button>
            <button 
              onClick={() => setActiveTab('workouts')} 
              style={{...styles.navItem, ...(activeTab === 'workouts' ? styles.navItemActive : {})}}
            >
              💪 {t.workouts}
            </button>
            <button 
              onClick={() => setActiveTab('nutrition')} 
              style={{...styles.navItem, ...(activeTab === 'nutrition' ? styles.navItemActive : {})}}
            >
              🍎 {t.nutrition}
            </button>
            <button 
              onClick={() => setActiveTab('progress')} 
              style={{...styles.navItem, ...(activeTab === 'progress' ? styles.navItemActive : {})}}
            >
              📈 {t.progress}
            </button>
            <button 
              onClick={() => setActiveTab('products')} 
              style={{...styles.navItem, ...(activeTab === 'products' ? styles.navItemActive : {})}}
            >
              🛍️ {t.products}
            </button>
            <button 
              onClick={() => setActiveTab('content')} 
              style={{...styles.navItem, ...(activeTab === 'content' ? styles.navItemActive : {})}}
            >
              📝 {t.content}
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main style={styles.mainContent}>
          
          {/* ─── OVERVIEW TAB ──────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={styles.pageTitle}>{t.dashboard}</h2>
              
              {/* Stats Cards */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>12</div>
                  <div style={styles.statLabel}>{t.totalClients}</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>89</div>
                  <div style={styles.statLabel}>{t.completedWorkouts}</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>45</div>
                  <div style={styles.statLabel}>{t.mealsLogged}</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statValue}>8.5</div>
                  <div style={styles.statLabel}>{t.avgStreak}</div>
                </div>
              </div>

              {/* Charts */}
              <div style={styles.chartsGrid}>
                <div style={styles.chartBox}>
                  <h3 style={styles.chartTitle}>{t.weightProgress}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#667eea" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div style={styles.chartBox}>
                  <h3 style={styles.chartTitle}>{t.clientsActivity}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'الأسبوع 1', workouts: 8, meals: 15 },
                      { name: 'الأسبوع 2', workouts: 10, meals: 18 },
                      { name: 'الأسبوع 3', workouts: 9, meals: 20 },
                      { name: 'الأسبوع 4', workouts: 12, meals: 22 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="workouts" fill="#667eea" />
                      <Bar dataKey="meals" fill="#764ba2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ─── CLIENTS TAB ──────────────────────────── */}
          {activeTab === 'clients' && (
            <div>
              <div style={styles.tabHeader}>
                <h2 style={styles.pageTitle}>{t.clientsManagement}</h2>
                <button style={styles.btnPrimary}>{t.addClient}</button>
              </div>

              <div style={styles.clientsGrid}>
                {clients.map((client, idx) => (
                  <div key={idx} style={styles.clientCard}>
                    <div style={styles.clientHeader}>
                      <h3 style={styles.clientName}>{client.name}</h3>
                      <span style={styles.statusBadge}>{client.status}</span>
                    </div>
                    
                    <div style={styles.clientInfo}>
                      <div style={styles.infoPair}>
                        <span>{t.currentWeight}:</span>
                        <span style={styles.infoValue}>{client.weight} كجم</span>
                      </div>
                      <div style={styles.infoPair}>
                        <span>{t.targetWeight}:</span>
                        <span style={styles.infoValue}>{client.target} كجم</span>
                      </div>
                      <div style={styles.infoPair}>
                        <span>{t.streak}:</span>
                        <span style={styles.infoValue}>🔥 {client.streak}</span>
                      </div>
                    </div>

                    <div style={styles.clientActions}>
                      <button style={styles.btnSmall}>{t.viewDetails}</button>
                      <button style={styles.btnSmall}>{t.edit}</button>
                      <button style={styles.btnSmall}>{t.message}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── WORKOUTS TAB ──────────────────────────── */}
          {activeTab === 'workouts' && (
            <div>
              <div style={styles.tabHeader}>
                <h2 style={styles.pageTitle}>{t.workoutPlans}</h2>
                <button style={styles.btnPrimary}>{t.createWorkout}</button>
              </div>

              <div style={styles.workoutsGrid}>
                {[
                  { name: 'تمرين الصدر والتراي', exercises: 8, duration: 45, difficulty: 'متوسط' },
                  { name: 'تمرين الظهر والبايسبس', exercises: 7, duration: 50, difficulty: 'صعب' },
                  { name: 'تمرين الرجل', exercises: 6, duration: 60, difficulty: 'صعب جداً' },
                  { name: 'تمرين الكتفين', exercises: 5, duration: 40, difficulty: 'سهل' },
                ].map((workout, idx) => (
                  <div key={idx} style={styles.workoutCard}>
                    <h4 style={styles.workoutName}>{workout.name}</h4>
                    <div style={styles.workoutDetails}>
                      <span>💪 {workout.exercises} تمارين</span>
                      <span>⏱️ {workout.duration} دقيقة</span>
                      <span>⭐ {workout.difficulty}</span>
                    </div>
                    <div style={styles.cardActions}>
                      <button style={styles.btnSmall}>{t.edit}</button>
                      <button style={styles.btnSmall}>{t.assign}</button>
                      <button style={styles.btnSmall}>{t.delete}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── NUTRITION TAB ──────────────────────────── */}
          {activeTab === 'nutrition' && (
            <div>
              <div style={styles.tabHeader}>
                <h2 style={styles.pageTitle}>{t.nutritionPlans}</h2>
                <button style={styles.btnPrimary}>{t.createMealPlan}</button>
              </div>

              <div style={styles.mealsGrid}>
                {[
                  { name: 'خطة الكتلة العضلية', calories: 3500, meals: 5, duration: '12 أسبوع' },
                  { name: 'خطة الحرق', calories: 2000, meals: 4, duration: '8 أسابيع' },
                  { name: 'خطة الحفاظ', calories: 2500, meals: 3, duration: 'دائم' },
                ].map((plan, idx) => (
                  <div key={idx} style={styles.mealCard}>
                    <h4 style={styles.mealName}>{plan.name}</h4>
                    <div style={styles.mealDetails}>
                      <div>📊 {plan.calories} سعرة</div>
                      <div>🍽️ {plan.meals} وجبات</div>
                      <div>📅 {plan.duration}</div>
                    </div>
                    <div style={styles.cardActions}>
                      <button style={styles.btnSmall}>{t.view}</button>
                      <button style={styles.btnSmall}>{t.edit}</button>
                      <button style={styles.btnSmall}>{t.assign}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── PROGRESS TAB ──────────────────────────── */}
          {activeTab === 'progress' && (
            <div>
              <h2 style={styles.pageTitle}>{t.progressTracking}</h2>
              
              <div style={styles.progressContainer}>
                {clients.map((client, idx) => (
                  <div key={idx} style={styles.progressCard}>
                    <h4 style={styles.progressTitle}>{client.name}</h4>
                    
                    <div style={styles.progressItem}>
                      <span>{t.weight}:</span>
                      <div style={styles.progressBar}>
                        <div style={{...styles.progressFill, width: '65%'}}></div>
                      </div>
                      <span>{client.weight} / {client.target}</span>
                    </div>

                    <div style={styles.progressItem}>
                      <span>{t.consistency}:</span>
                      <div style={styles.progressBar}>
                        <div style={{...styles.progressFill, width: `${(client.streak / 30) * 100}%`}}></div>
                      </div>
                      <span>{client.streak} / 30 يوم</span>
                    </div>

                    <div style={styles.progressStats}>
                      <div>تمارين: 12</div>
                      <div>وجبات: 25</div>
                      <div>صور: 5</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── PRODUCTS TAB ──────────────────────────── */}
          {activeTab === 'products' && (
            <div>
              <div style={styles.tabHeader}>
                <h2 style={styles.pageTitle}>{t.products}</h2>
                <button style={styles.btnPrimary}>{t.addProduct}</button>
              </div>

              <div style={styles.productsGrid}>
                {[
                  { name: 'مسحوق البروتين', price: 150, stock: 20, category: 'مكملات' },
                  { name: 'فيتامينات', price: 80, stock: 15, category: 'مكملات' },
                  { name: 'حبال القفز', price: 35, stock: 10, category: 'معدات' },
                  { name: 'حزام الرفع', price: 120, stock: 8, category: 'معدات' },
                ].map((product, idx) => (
                  <div key={idx} style={styles.productCard}>
                    <div style={styles.productImage}>📦</div>
                    <h4 style={styles.productName}>{product.name}</h4>
                    <p style={styles.productPrice}>{product.price} ج.م</p>
                    <p style={styles.productCategory}>{product.category}</p>
                    <p style={styles.productStock}>المخزون: {product.stock}</p>
                    <div style={styles.cardActions}>
                      <button style={styles.btnSmall}>{t.edit}</button>
                      <button style={styles.btnSmall}>{t.sell}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── CONTENT TAB ──────────────────────────── */}
          {activeTab === 'content' && (
            <div>
              <div style={styles.tabHeader}>
                <h2 style={styles.pageTitle}>{t.contentManagement}</h2>
                <button style={styles.btnPrimary}>{t.newPost}</button>
              </div>

              <div style={styles.contentList}>
                {[
                  { title: 'أفضل 10 تمارين للصدر', type: 'مقالة', date: '2026-05-10', views: 245 },
                  { title: 'وصفة البنجر المسلوق', type: 'وصفة', date: '2026-05-09', views: 189 },
                  { title: 'نصائح التغذية الصحية', type: 'مقالة', date: '2026-05-08', views: 567 },
                  { title: 'تمرين كامل للجسم', type: 'فيديو', date: '2026-05-07', views: 892 },
                ].map((content, idx) => (
                  <div key={idx} style={styles.contentItem}>
                    <div style={styles.contentInfo}>
                      <h4 style={styles.contentTitle}>{content.title}</h4>
                      <p style={styles.contentMeta}>{content.type} • {content.date} • 👁️ {content.views}</p>
                    </div>
                    <div style={styles.cardActions}>
                      <button style={styles.btnSmall}>{t.view}</button>
                      <button style={styles.btnSmall}>{t.edit}</button>
                      <button style={styles.btnSmall}>{t.delete}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "'Cairo', 'Inter', sans-serif",
    background: '#f8f9fb',
    minHeight: '100vh',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1.5rem 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
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
  logoutBtn: {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    display: 'flex',
    gap: '2rem',
  },
  sidebar: {
    width: '250px',
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    height: 'fit-content',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  navItem: {
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    transition: 'all 0.3s',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  navItemActive: {
    background: '#667eea',
    color: 'white',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#222',
    marginBottom: '1.5rem',
    margin: '0 0 1.5rem',
  },
  tabHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  btnPrimary: {
    padding: '12px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
  btnSmall: {
    padding: '6px 12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '1.5rem',
  },
  chartBox: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#222',
    margin: '0 0 1rem',
  },
  clientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  clientCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  clientHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  clientName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#222',
  },
  statusBadge: {
    padding: '4px 12px',
    background: '#d4edda',
    color: '#155724',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  clientInfo: {
    marginBottom: '1rem',
  },
  infoPair: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  infoValue: {
    fontWeight: '600',
    color: '#667eea',
  },
  clientActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  workoutsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  workoutCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  workoutName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#222',
    margin: '0 0 1rem',
  },
  workoutDetails: {
    display: 'flex',
    gap: '1rem',
    fontSize: '13px',
    color: '#666',
    marginBottom: '1rem',
  },
  mealsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  mealCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  mealName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#222',
    margin: '0 0 1rem',
  },
  mealDetails: {
    display: 'flex',
    gap: '1rem',
    fontSize: '13px',
    color: '#666',
    marginBottom: '1rem',
  },
  cardActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  progressContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  progressCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  progressTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#222',
    margin: '0 0 1.5rem',
  },
  progressItem: {
    marginBottom: '1.5rem',
  },
  progressBar: {
    height: '8px',
    background: '#eee',
    borderRadius: '4px',
    margin: '8px 0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
  },
  progressStats: {
    display: 'flex',
    gap: '1rem',
    fontSize: '13px',
    color: '#666',
    padding: '1rem 0',
    borderTop: '1px solid #eee',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  productCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  productImage: {
    fontSize: '48px',
    marginBottom: '1rem',
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0.5rem 0',
    color: '#222',
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#667eea',
    margin: '0.5rem 0',
  },
  productCategory: {
    fontSize: '12px',
    color: '#999',
    margin: '0.25rem 0',
  },
  productStock: {
    fontSize: '13px',
    color: '#666',
    margin: '0.5rem 0 1rem',
  },
  contentList: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  contentItem: {
    padding: '1.5rem',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 0.5rem',
    color: '#222',
  },
  contentMeta: {
    fontSize: '13px',
    color: '#999',
    margin: 0,
  },
};

const ar = {
  dashboard: 'لوحة التحكم',
  logout: 'تسجيل خروج',
  overview: 'نظرة عامة',
  clients: 'العملاء',
  workouts: 'التمارين',
  nutrition: 'التغذية',
  progress: 'التقدم',
  products: 'المنتجات',
  content: 'المحتوى',
  totalClients: 'إجمالي العملاء',
  completedWorkouts: 'تمارين مكتملة',
  mealsLogged: 'وجبات مسجلة',
  avgStreak: 'متوسط التسلسل',
  weightProgress: 'تطور الوزن',
  clientsActivity: 'نشاط العملاء',
  clientsManagement: 'إدارة العملاء',
  addClient: 'إضافة عميل',
  currentWeight: 'الوزن الحالي',
  targetWeight: 'الوزن المستهدف',
  streak: 'التسلسل',
  viewDetails: 'عرض التفاصيل',
  edit: 'تعديل',
  message: 'رسالة',
  workoutPlans: 'خطط التمارين',
  createWorkout: 'إنشاء تمرين',
  assign: 'تعيين',
  delete: 'حذف',
  nutritionPlans: 'خطط التغذية',
  createMealPlan: 'إنشاء خطة وجبات',
  view: 'عرض',
  progressTracking: 'تتبع التقدم',
  weight: 'الوزن',
  consistency: 'الالتزام',
  addProduct: 'إضافة منتج',
  sell: 'بيع',
  contentManagement: 'إدارة المحتوى',
  newPost: 'منشور جديد',
};

const en = {
  dashboard: 'Dashboard',
  logout: 'Logout',
  overview: 'Overview',
  clients: 'Clients',
  workouts: 'Workouts',
  nutrition: 'Nutrition',
  progress: 'Progress',
  products: 'Products',
  content: 'Content',
  totalClients: 'Total Clients',
  completedWorkouts: 'Completed Workouts',
  mealsLogged: 'Meals Logged',
  avgStreak: 'Average Streak',
  weightProgress: 'Weight Progress',
  clientsActivity: 'Clients Activity',
  clientsManagement: 'Manage Clients',
  addClient: 'Add Client',
  currentWeight: 'Current Weight',
  targetWeight: 'Target Weight',
  streak: 'Streak',
  viewDetails: 'View Details',
  edit: 'Edit',
  message: 'Message',
  workoutPlans: 'Workout Plans',
  createWorkout: 'Create Workout',
  assign: 'Assign',
  delete: 'Delete',
  nutritionPlans: 'Meal Plans',
  createMealPlan: 'Create Meal Plan',
  view: 'View',
  progressTracking: 'Track Progress',
  weight: 'Weight',
  consistency: 'Consistency',
  addProduct: 'Add Product',
  sell: 'Sell',
  contentManagement: 'Manage Content',
  newPost: 'New Post',
};
