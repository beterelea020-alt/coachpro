import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnhancedClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState('ar');
  const [weight, setWeight] = useState(85);
  const [todayMeals, setTodayMeals] = useState([
    { name: 'الإفطار', calories: 450, time: '08:00' },
    { name: 'الغداء', calories: 650, time: '12:30' },
  ]);
  const [todayWorkouts, setTodayWorkouts] = useState([
    { name: 'جري', duration: 30, calories: 300, completed: true },
  ]);

  const t = lang === 'ar' ? ar : en;

  // بيانات وهمية
  const weightProgress = [
    { week: 'أسبوع 1', weight: 85 },
    { week: 'أسبوع 2', weight: 84 },
    { week: 'أسبوع 3', weight: 82 },
    { week: 'أسبوع 4', weight: 80 },
  ];

  const caloriesTarget = 2500;
  const caloriesBurned = 1150;
  const mealsLogged = 2;

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
            <button style={styles.logoutBtn}>{t.logout}</button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={styles.container}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <nav style={styles.sidebarNav}>
            <button 
              onClick={() => setActiveTab('overview')} 
              style={{...styles.navItem, ...(activeTab === 'overview' ? styles.navItemActive : {})}}
            >
              📊 {t.overview}
            </button>
            <button 
              onClick={() => setActiveTab('weight')} 
              style={{...styles.navItem, ...(activeTab === 'weight' ? styles.navItemActive : {})}}
            >
              ⚖️ {t.weight}
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
              onClick={() => setActiveTab('content')} 
              style={{...styles.navItem, ...(activeTab === 'content' ? styles.navItemActive : {})}}
            >
              📚 {t.content}
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              style={{...styles.navItem, ...(activeTab === 'messages' ? styles.navItemActive : {})}}
            >
              💬 {t.messages}
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.mainContent}>
          
          {/* ─── OVERVIEW TAB ──────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={styles.pageTitle}>{t.welcome}</h2>

              {/* Quick Stats */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>⚖️</div>
                  <div style={styles.statLabel}>{t.currentWeight}</div>
                  <div style={styles.statValue}>{weight} كجم</div>
                  <div style={styles.statSmall}>الهدف: 75 كجم</div>
                </div>

                <div style={styles.statCard}>
                  <div style={styles.statIcon}>🔥</div>
                  <div style={styles.statLabel}>{t.streak}</div>
                  <div style={styles.statValue}>12</div>
                  <div style={styles.statSmall}>يوم متتالي</div>
                </div>

                <div style={styles.statCard}>
                  <div style={styles.statIcon}>💪</div>
                  <div style={styles.statLabel}>{t.workoutsThisWeek}</div>
                  <div style={styles.statValue}>4</div>
                  <div style={styles.statSmall}>من 6 المتوقعة</div>
                </div>

                <div style={styles.statCard}>
                  <div style={styles.statIcon}>🍽️</div>
                  <div style={styles.statLabel}>{t.mealsLogged}</div>
                  <div style={styles.statValue}>{mealsLogged}</div>
                  <div style={styles.statSmall}>اليوم</div>
                </div>
              </div>

              {/* Today's Summary */}
              <div style={styles.summarySection}>
                <h3 style={styles.sectionTitle}>{t.todaysSummary}</h3>
                <div style={styles.summaryGrid}>
                  
                  {/* Calories */}
                  <div style={styles.summaryCard}>
                    <h4>{t.calories}</h4>
                    <div style={styles.caloriesMeter}>
                      <div style={styles.caloriesUsed}>{caloriesBurned}</div>
                      <div style={styles.caloriesTarget}>{caloriesTarget}</div>
                    </div>
                    <p>{caloriesBurned} / {caloriesTarget} سعرة</p>
                  </div>

                  {/* Workouts Today */}
                  <div style={styles.summaryCard}>
                    <h4>{t.workouts}</h4>
                    <div style={styles.workoutsList}>
                      {todayWorkouts.length > 0 ? (
                        todayWorkouts.map((w, idx) => (
                          <div key={idx} style={styles.workoutItem}>
                            <span>{w.name}</span>
                            <span>{w.duration} د</span>
                            <span>✓</span>
                          </div>
                        ))
                      ) : (
                        <p style={styles.noDataMsg}>{t.noWorkouts}</p>
                      )}
                    </div>
                  </div>

                  {/* Meals Today */}
                  <div style={styles.summaryCard}>
                    <h4>{t.meals}</h4>
                    <div style={styles.mealsList}>
                      {todayMeals.length > 0 ? (
                        todayMeals.map((m, idx) => (
                          <div key={idx} style={styles.mealItem}>
                            <span>{m.name}</span>
                            <span>{m.calories} سعرة</span>
                          </div>
                        ))
                      ) : (
                        <p style={styles.noDataMsg}>{t.noMeals}</p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ─── WEIGHT TAB ──────────────────────────── */}
          {activeTab === 'weight' && (
            <div>
              <h2 style={styles.pageTitle}>{t.weightTracking}</h2>

              <div style={styles.gridTwo}>
                {/* Chart */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>{t.weightHistory}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#667eea" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Log Weight */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>{t.logWeight}</h3>
                  <div style={styles.formGroup}>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      style={styles.input}
                      placeholder={t.enterWeight}
                    />
                    <button style={styles.btnPrimary}>{t.save}</button>
                  </div>
                  
                  <div style={styles.weightStats}>
                    <div>{t.currentWeight}: {weight} كجم</div>
                    <div>{t.targetWeight}: 75 كجم</div>
                    <div>{t.remaining}: {weight - 75} كجم</div>
                    <div>{t.progress}: {((85 - weight) / (85 - 75) * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── WORKOUTS TAB ──────────────────────────── */}
          {activeTab === 'workouts' && (
            <div>
              <h2 style={styles.pageTitle}>{t.workoutPlans}</h2>

              <div style={styles.workoutList}>
                {[
                  { name: 'تمرين الصدر والتراي', exercises: 8, duration: 45, status: 'مخصص' },
                  { name: 'تمرين الظهر والبايسبس', exercises: 7, duration: 50, status: 'مكتمل' },
                  { name: 'تمرين الرجل', exercises: 6, duration: 60, status: 'في التقدم' },
                ].map((workout, idx) => (
                  <div key={idx} style={styles.workoutItemCard}>
                    <h4>{workout.name}</h4>
                    <div style={styles.workoutMeta}>
                      <span>💪 {workout.exercises} تمارين</span>
                      <span>⏱️ {workout.duration} دقيقة</span>
                      <span style={styles.statusBadge}>{workout.status}</span>
                    </div>
                    <button style={styles.btnSmall}>{t.start}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── NUTRITION TAB ──────────────────────────── */}
          {activeTab === 'nutrition' && (
            <div>
              <h2 style={styles.pageTitle}>{t.mealPlans}</h2>

              <div style={styles.mealsContainer}>
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>{t.yourMealPlan}</h3>
                  <div style={styles.mealPlanList}>
                    {[
                      { meal: 'الإفطار', time: '08:00', calories: 450, foods: ['بيض', 'خبز', 'زبدة'] },
                      { meal: 'وجبة خفيفة', time: '10:30', calories: 150, foods: ['موز', 'تمر'] },
                      { meal: 'الغداء', time: '12:30', calories: 650, foods: ['دجاج', 'أرز', 'سلطة'] },
                      { meal: 'وجبة خفيفة 2', time: '15:00', calories: 200, foods: ['زبادي', 'عسل'] },
                      { meal: 'العشاء', time: '19:00', calories: 450, foods: ['سمك', 'خضار', 'بطاطا'] },
                    ].map((plan, idx) => (
                      <div key={idx} style={styles.mealPlanItem}>
                        <div style={styles.mealTime}>
                          <h4>{plan.meal}</h4>
                          <span>{plan.time}</span>
                        </div>
                        <div style={styles.mealCalories}>{plan.calories} سعرة</div>
                        <div style={styles.mealFoods}>
                          {plan.foods.join(' • ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>{t.nutritionTips}</h3>
                  <div style={styles.tipsList}>
                    <div style={styles.tip}>✓ شرب 3 لتر ماء يومياً</div>
                    <div style={styles.tip}>✓ تجنب السكريات المكررة</div>
                    <div style={styles.tip}>✓ زيادة البروتين تدريجياً</div>
                    <div style={styles.tip}>✓ تناول الطعام في أوقات محددة</div>
                    <div style={styles.tip}>✓ تجنب الطعام في الليل</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── PROGRESS TAB ──────────────────────────── */}
          {activeTab === 'progress' && (
            <div>
              <h2 style={styles.pageTitle}>{t.progressReport}</h2>

              <div style={styles.progressContainer}>
                <div style={styles.progressItem}>
                  <span>{t.weight}</span>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: '65%'}}></div>
                  </div>
                  <span>85 → 75 كجم</span>
                </div>

                <div style={styles.progressItem}>
                  <span>{t.consistency}</span>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: '40%'}}></div>
                  </div>
                  <span>12 / 30 يوم</span>
                </div>

                <div style={styles.progressItem}>
                  <span>{t.workouts}</span>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: '67%'}}></div>
                  </div>
                  <span>4 / 6 تمارين</span>
                </div>

                <div style={styles.progressItem}>
                  <span>{t.nutrition}</span>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: '75%'}}></div>
                  </div>
                  <span>75% التزام</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── CONTENT TAB ──────────────────────────── */}
          {activeTab === 'content' && (
            <div>
              <h2 style={styles.pageTitle}>{t.educationalContent}</h2>

              <div style={styles.contentGrid}>
                {[
                  { type: 'مقالة', title: 'أفضل 10 تمارين للصدر', author: 'المدرب أحمد', views: 245 },
                  { type: 'وصفة', title: 'وصفة البنجر المسلوق', author: 'خبيرة التغذية فاطمة', views: 189 },
                  { type: 'نصيحة', title: 'نصائح البقاء متحفزاً', author: 'المدرب محمود', views: 567 },
                  { type: 'فيديو', title: 'تمرين كامل للجسم', author: 'كوتش علي', views: 892 },
                ].map((content, idx) => (
                  <div key={idx} style={styles.contentCard}>
                    <div style={styles.contentType}>{content.type}</div>
                    <h4>{content.title}</h4>
                    <p style={styles.contentAuthor}>بقلم: {content.author}</p>
                    <p style={styles.contentViews}>👁️ {content.views}</p>
                    <button style={styles.btnSmall}>{t.read}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── MESSAGES TAB ──────────────────────────── */}
          {activeTab === 'messages' && (
            <div>
              <h2 style={styles.pageTitle}>{t.messages}</h2>

              <div style={styles.messagesContainer}>
                {[
                  { coach: 'المدرب أحمد', message: 'استمر في التمارين! انت في الطريق الصحيح 💪', time: 'قبل ساعة', unread: true },
                  { coach: 'خبيرة التغذية', message: 'تحسن رائع في تتبع الوجبات!', time: 'قبل يومين', unread: false },
                  { coach: 'المدرب أحمد', message: 'شاهدت صورتك، تحسن ملحوظ!', time: 'قبل 3 أيام', unread: false },
                ].map((msg, idx) => (
                  <div key={idx} style={{...styles.messageItem, ...(msg.unread ? styles.messageItemUnread : {})}}>
                    <div style={styles.messageHeader}>
                      <h4>{msg.coach}</h4>
                      <span style={styles.messageTime}>{msg.time}</span>
                    </div>
                    <p style={styles.messageText}>{msg.message}</p>
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
    width: '200px',
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
    marginBottom: '2rem',
    margin: '0 0 2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
  },
  statIcon: {
    fontSize: '36px',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '12px',
    opacity: 0.9,
    marginBottom: '0.5rem',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '0.25rem',
  },
  statSmall: {
    fontSize: '12px',
    opacity: 0.8,
  },
  summarySection: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#222',
    margin: '0 0 1.5rem',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  summaryCard: {
    background: '#f8f9fb',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #eee',
  },
  caloriesMeter: {
    fontSize: '14px',
    color: '#666',
    marginTop: '1rem',
  },
  caloriesUsed: {
    color: '#667eea',
    fontWeight: '700',
  },
  caloriesTarget: {
    color: '#999',
  },
  workoutsList: {
    marginTop: '1rem',
  },
  workoutItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    fontSize: '13px',
  },
  mealsList: {
    marginTop: '1rem',
  },
  mealItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    fontSize: '13px',
  },
  noDataMsg: {
    color: '#999',
    fontSize: '13px',
    margin: 0,
  },
  gridTwo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
    marginBottom: '1rem',
    color: '#222',
    margin: '0 0 1rem',
  },
  formGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  btnPrimary: {
    padding: '12px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  btnSmall: {
    padding: '6px 12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  weightStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '13px',
    color: '#666',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
  },
  workoutList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  workoutItemCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  workoutMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '13px',
    color: '#666',
    margin: '0.5rem 0 1rem',
  },
  statusBadge: {
    padding: '4px 8px',
    background: '#e7f3ff',
    color: '#0066cc',
    borderRadius: '4px',
    fontSize: '12px',
  },
  mealsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  mealPlanList: {},
  mealPlanItem: {
    background: '#f8f9fb',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    borderLeft: '3px solid #667eea',
  },
  mealTime: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  mealCalories: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: '13px',
    marginBottom: '0.5rem',
  },
  mealFoods: {
    fontSize: '12px',
    color: '#666',
  },
  tipsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  tip: {
    fontSize: '13px',
    color: '#666',
    padding: '8px 0',
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  progressItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  progressBar: {
    flex: 1,
    height: '8px',
    background: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  contentCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  contentType: {
    fontSize: '11px',
    background: '#667eea',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  contentAuthor: {
    fontSize: '12px',
    color: '#999',
    margin: '0.5rem 0',
  },
  contentViews: {
    fontSize: '12px',
    color: '#666',
    margin: '0.5rem 0 1rem',
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  messageItem: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    borderLeft: '3px solid #eee',
  },
  messageItemUnread: {
    borderLeftColor: '#667eea',
    background: '#f8f9fb',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  messageTime: {
    fontSize: '12px',
    color: '#999',
  },
  messageText: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
};

const ar = {
  welcome: 'مرحباً!',
  logout: 'تسجيل خروج',
  overview: 'نظرة عامة',
  weight: 'الوزن',
  workouts: 'التمارين',
  nutrition: 'التغذية',
  progress: 'التقدم',
  content: 'المحتوى',
  messages: 'الرسائل',
  currentWeight: 'الوزن الحالي',
  streak: 'التسلسل',
  workoutsThisWeek: 'التمارين هذا الأسبوع',
  mealsLogged: 'الوجبات المسجلة',
  todaysSummary: 'ملخص اليوم',
  calories: 'السعرات الحرارية',
  meals: 'الوجبات',
  noWorkouts: 'لا توجد تمارين محددة',
  noMeals: 'لا توجد وجبات مسجلة',
  weightTracking: 'تتبع الوزن',
  weightHistory: 'تاريخ الوزن',
  logWeight: 'تسجيل الوزن',
  enterWeight: 'أدخل وزنك',
  save: 'حفظ',
  targetWeight: 'الوزن المستهدف',
  remaining: 'المتبقي',
  progress: 'التقدم',
  workoutPlans: 'خطط التمارين',
  start: 'ابدأ',
  mealPlans: 'خطط الوجبات',
  yourMealPlan: 'خطتك الغذائية',
  nutrition: 'التغذية',
  nutritionTips: 'نصائح غذائية',
  consistency: 'الالتزام',
  progressReport: 'تقرير التقدم',
  educationalContent: 'محتوى تعليمي',
  read: 'اقرأ',
  messages: 'الرسائل',
};

const en = {
  welcome: 'Welcome!',
  logout: 'Logout',
  overview: 'Overview',
  weight: 'Weight',
  workouts: 'Workouts',
  nutrition: 'Nutrition',
  progress: 'Progress',
  content: 'Content',
  messages: 'Messages',
  currentWeight: 'Current Weight',
  streak: 'Streak',
  workoutsThisWeek: 'Workouts This Week',
  mealsLogged: 'Meals Logged',
  todaysSummary: "Today's Summary",
  calories: 'Calories',
  meals: 'Meals',
  noWorkouts: 'No workouts assigned',
  noMeals: 'No meals logged',
  weightTracking: 'Weight Tracking',
  weightHistory: 'Weight History',
  logWeight: 'Log Weight',
  enterWeight: 'Enter your weight',
  save: 'Save',
  targetWeight: 'Target Weight',
  remaining: 'Remaining',
  progress: 'Progress',
  workoutPlans: 'Workout Plans',
  start: 'Start',
  mealPlans: 'Meal Plans',
  yourMealPlan: 'Your Meal Plan',
  nutritionTips: 'Nutrition Tips',
  consistency: 'Consistency',
  progressReport: 'Progress Report',
  educationalContent: 'Educational Content',
  read: 'Read',
  messages: 'Messages',
};
