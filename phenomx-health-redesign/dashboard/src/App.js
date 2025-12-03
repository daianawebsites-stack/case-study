import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, Calendar, TrendingUp, Activity, Heart, Moon, Apple, Plus, ChevronLeft, ChevronRight, Edit2, Check, X, PartyPopper, Wine, UtensilsCrossed, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export default function HealthDashboard() {
  const allSymptomsList = [
    'Brain fog', 'Mood swings', 'Weight gain', 'Anxiety', 'Low libido',
    'Night sweats', 'Hot flashes', 'Fatigue', 'Joint pain', 'Heavy periods',
    'Depression', 'Low energy', 'Panic attacks', 'Memory loss',
    'Constipation', 'Gas', 'Diarrhea', 'Belly bloat', 'Reflux', 'Bloating',
    'Muscle loss', 'Sagging skin', 'Skin wrinkling', 'Skin changes', 'Age spots',
    'Dry skin', 'Dry mouth', 'Hair loss', 'Hair changes',
    'Cold flashes', 'Heart palpitations',
    'Vaginal dryness', 'Irregular periods', 'Menstrual cramps', 'Sore breasts', 'PMS',
    'Urinary concerns', 'Bladder pain', 'Frequent urination', 'Incontinence'
  ];

  const [modules, setModules] = useState([
    'calendar',
    'motivation',
    'weight',
    'symptoms',
    'goals',
    'sleep',
    'nutrition',
    'foodIntake'
  ]);
  
  const [closedModules, setClosedModules] = useState([]);
  const [collapsedModules, setCollapsedModules] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [periodDates, setPeriodDates] = useState([5, 6, 7, 8, 9]);
  const [symptoms, setSymptoms] = useState([
    { name: 'Brain fog', severity: 3 },
    { name: 'Fatigue', severity: 4 },
    { name: 'Hot flashes', severity: 2 }
  ]);
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Brain fog', 'Fatigue', 'Hot flashes']);
  const [newSymptom, setNewSymptom] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [editingSymptom, setEditingSymptom] = useState(null);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [symptomPeriod, setSymptomPeriod] = useState('week');
  const [dailyFoodDate, setDailyFoodDate] = useState(new Date());
  const [weeklyFoodWeek, setWeeklyFoodWeek] = useState(0);
  const [weeklyFoodView, setWeeklyFoodView] = useState('weekly');
  const [weeklyFoodDate, setWeeklyFoodDate] = useState(new Date());
  const [alcoholWeek, setAlcoholWeek] = useState(0);
  const [alcoholView, setAlcoholView] = useState('weekly');
  const [alcoholDate, setAlcoholDate] = useState(new Date());
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newWeightDate, setNewWeightDate] = useState(new Date().toISOString().split('T')[0]);
  const [foodIntakeDate, setFoodIntakeDate] = useState(new Date());
  const [ateToday, setAteToday] = useState({});
  const [drankToday, setDrankToday] = useState({});
  const [visibleChartData, setVisibleChartData] = useState({
    fruits: true,
    vegetables: true,
    grains: true,
    protein: true,
    caffeine: true
  });
  const symptomInputRef = useRef(null);
  const scrollPositionRef = useRef(0);
  
  const [weightData, setWeightData] = useState([
    { month: 'May', weight: 165, bmi: 27.2 },
    { month: 'Jun', weight: 163, bmi: 26.9 },
    { month: 'Jul', weight: 161, bmi: 26.5 },
    { month: 'Aug', weight: 160, bmi: 26.4 },
    { month: 'Sep', weight: 158, bmi: 26.0 },
    { month: 'Oct', weight: 157, bmi: 25.9 }
  ]);

  const [symptomHistory] = useState({
    week: [
      { day: 'Mon', 'Brain fog': 3, 'Fatigue': 4, 'Hot flashes': 2 },
      { day: 'Tue', 'Brain fog': 2, 'Fatigue': 3, 'Hot flashes': 3 },
      { day: 'Wed', 'Brain fog': 3, 'Fatigue': 4, 'Hot flashes': 2 },
      { day: 'Thu', 'Brain fog': 2, 'Fatigue': 3, 'Hot flashes': 1 },
      { day: 'Fri', 'Brain fog': 3, 'Fatigue': 4, 'Hot flashes': 2 },
      { day: 'Sat', 'Brain fog': 1, 'Fatigue': 2, 'Hot flashes': 1 },
      { day: 'Sun', 'Brain fog': 2, 'Fatigue': 3, 'Hot flashes': 2 }
    ],
    month: [
      { week: 'Week 1', 'Brain fog': 2.5, 'Fatigue': 3.5, 'Hot flashes': 2 },
      { week: 'Week 2', 'Brain fog': 3, 'Fatigue': 4, 'Hot flashes': 2.5 },
      { week: 'Week 3', 'Brain fog': 2, 'Fatigue': 3, 'Hot flashes': 1.5 },
      { week: 'Week 4', 'Brain fog': 2.5, 'Fatigue': 3.5, 'Hot flashes': 2 }
    ],
    sixMonths: [
      { month: 'May', 'Brain fog': 3.5, 'Fatigue': 4.5, 'Hot flashes': 3 },
      { month: 'Jun', 'Brain fog': 3, 'Fatigue': 4, 'Hot flashes': 2.5 },
      { month: 'Jul', 'Brain fog': 2.5, 'Fatigue': 3.5, 'Hot flashes': 2 },
      { month: 'Aug', 'Brain fog': 2.5, 'Fatigue': 3, 'Hot flashes': 2 },
      { month: 'Sep', 'Brain fog': 2, 'Fatigue': 3, 'Hot flashes': 1.5 },
      { month: 'Oct', 'Brain fog': 2.5, 'Fatigue': 3.5, 'Hot flashes': 2 }
    ]
  });

  const [dailyFoodHistory] = useState({
    0: { fruit: 2, vegetables: 3 },
    1: { fruit: 1, vegetables: 2 },
    2: { fruit: 3, vegetables: 4 },
    3: { fruit: 2, vegetables: 3 },
    4: { fruit: 2, vegetables: 2 },
    5: { fruit: 1, vegetables: 3 },
    6: { fruit: 2, vegetables: 3 }
  });

  const [weeklyFoodDailyHistory] = useState({
    0: { beans: 1, nuts: 0, grains: 1, redMeat: 0, chicken: 0, fish: 0, sweets: 0, restaurant: 0 },
    1: { beans: 0, nuts: 1, grains: 1, redMeat: 0, chicken: 1, fish: 0, sweets: 1, restaurant: 0 },
    2: { beans: 1, nuts: 0, grains: 1, redMeat: 0, chicken: 0, fish: 1, sweets: 0, restaurant: 1 },
    3: { beans: 0, nuts: 1, grains: 0, redMeat: 1, chicken: 0, fish: 0, sweets: 0, restaurant: 0 },
    4: { beans: 1, nuts: 0, grains: 1, redMeat: 0, chicken: 1, fish: 0, sweets: 1, restaurant: 0 },
    5: { beans: 0, nuts: 0, grains: 0, redMeat: 0, chicken: 0, fish: 0, sweets: 0, restaurant: 0 },
    6: { beans: 0, nuts: 0, grains: 0, redMeat: 0, chicken: 0, fish: 0, sweets: 0, restaurant: 0 }
  });

  const [alcoholDailyHistory] = useState({
    0: 0,
    1: 1,
    2: 0,
    3: 0,
    4: 1,
    5: 0,
    6: 0
  });

  const [weeklyFoodHistory] = useState({
    0: { beans: 3, nuts: 2, grains: 4, redMeat: 1, chicken: 2, fish: 1, sweets: 2, restaurant: 1 },
    1: { beans: 2, nuts: 3, grains: 3, redMeat: 2, chicken: 2, fish: 1, sweets: 3, restaurant: 2 },
    2: { beans: 4, nuts: 2, grains: 5, redMeat: 1, chicken: 3, fish: 2, sweets: 1, restaurant: 1 },
    3: { beans: 3, nuts: 1, grains: 4, redMeat: 1, chicken: 2, fish: 1, sweets: 2, restaurant: 3 }
  });

  const [alcoholHistory] = useState({
    0: 2,
    1: 3,
    2: 1,
    3: 2
  });

  const [dailyFood, setDailyFood] = useState(dailyFoodHistory[0]);
  const [weeklyFood, setWeeklyFood] = useState(weeklyFoodHistory[0]);
  const [weeklyFoodDaily, setWeeklyFoodDaily] = useState(weeklyFoodDailyHistory[0]);
  const [alcoholIntake, setAlcoholIntake] = useState(alcoholHistory[0]);
  const [alcoholDaily, setAlcoholDaily] = useState(alcoholDailyHistory[0]);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newModules = [...modules];
    const draggedModule = newModules[draggedItem];
    newModules.splice(draggedItem, 1);
    newModules.splice(index, 0, draggedModule);
    
    setModules(newModules);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const closeModule = (moduleType) => {
    setModules(modules.filter(m => m !== moduleType));
    setClosedModules([...closedModules, moduleType]);
  };

  const openModule = (moduleType) => {
    setModules([...modules, moduleType]);
    setClosedModules(closedModules.filter(m => m !== moduleType));
  };

  const toggleCollapse = (moduleType) => {
    if (collapsedModules.includes(moduleType)) {
      setCollapsedModules(collapsedModules.filter(m => m !== moduleType));
    } else {
      setCollapsedModules([...collapsedModules, moduleType]);
    }
  };

  const getModuleRecommendation = (moduleType) => {
    const recommendations = {
      calendar: "Track your cycle phases to optimize workouts and nutrition timing for better results.",
      motivation: "Regular movement reduces symptoms by 30%. Start with just 10 minutes daily.",
      weight: "Weekly weigh-ins help track progress patterns. Consistency matters more than perfection.",
      symptoms: "Logging symptoms reveals patterns that can guide treatment and lifestyle adjustments.",
      goals: "Clear health goals increase success rates by 42%. Focus on 2-3 specific objectives.",
      sleep: "Quality sleep reduces symptoms and supports hormone balance. Aim for 7-9 hours nightly.",
      nutrition: "Balanced nutrition can reduce symptoms by up to 40%. Small changes create big impacts.",
      foodIntake: "Tracking your food and beverage intake helps identify patterns that affect your symptoms and energy."
    };
    return recommendations[moduleType];
  };

  const toggleSymptomSelection = (symptomName) => {
    if (selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomName));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    }
  };

  const handleSymptomInput = (value) => {
    const savedScrollPosition = window.scrollY;
    setNewSymptom(value);
    if (value.trim()) {
      const filtered = allSymptomsList.filter(s => 
        s.toLowerCase().includes(value.toLowerCase()) && 
        !symptoms.find(sym => sym.name === s)
      );
      setFilteredSymptoms(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSymptoms([]);
      setShowSuggestions(false);
    }
    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollPosition);
    });
  };

  const selectSymptomSuggestion = (symptom) => {
    const savedScrollPosition = window.scrollY;
    setSymptoms([...symptoms, { name: symptom, severity: 3 }]);
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setNewSymptom('');
    setShowSuggestions(false);
    setFilteredSymptoms([]);
    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollPosition);
    });
  };

  const calculateBMI = (weightLbs) => {
    const heightInches = 66;
    return ((weightLbs / (heightInches * heightInches)) * 703).toFixed(1);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMenstrualPhase = (day) => {
    if (periodDates.includes(day)) return 'menstrual';
    if (day >= periodDates[0] && day <= periodDates[0] + 13) return 'follicular';
    if (day >= periodDates[0] + 14 && day <= periodDates[0] + 16) return 'ovulation';
    return 'luteal';
  };

  const getPhaseRecommendation = (phase) => {
    const recommendations = {
      menstrual: 'Rest & gentle yoga. Light walks are perfect.',
      follicular: 'High energy! Great for cardio & strength training.',
      ovulation: 'Peak performance. Try HIIT or challenging workouts.',
      luteal: 'Moderate activity. Focus on strength & flexibility.'
    };
    return recommendations[phase];
  };

  const addSymptom = () => {
    const savedScrollPosition = window.scrollY;
    if (newSymptom.trim()) {
      setSymptoms([...symptoms, { name: newSymptom.trim(), severity: 3 }]);
      setSelectedSymptoms([...selectedSymptoms, newSymptom.trim()]);
      setNewSymptom('');
      setShowSuggestions(false);
    }
    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollPosition);
    });
  };

  const updateSymptomSeverity = (index, severity) => {
    const updated = [...symptoms];
    updated[index].severity = severity;
    setSymptoms(updated);
    setEditingSymptom(null);
  };

  const removeSymptom = (index) => {
    const symptomName = symptoms[index].name;
    setSymptoms(symptoms.filter((_, i) => i !== index));
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomName));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getWeekRange = (weeksAgo) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() - (weeksAgo * 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const getModuleName = (moduleType) => {
    const names = {
      calendar: 'Menstrual Cycle Tracker',
      motivation: 'Daily Activity Motivation',
      weight: 'Weight & BMI Progress',
      symptoms: 'Symptoms Tracker',
      goals: 'Health Goals',
      sleep: 'Sleep Program',
      nutrition: 'Nutritional Advice',
      foodIntake: 'Food Intake'
    };
    return names[moduleType];
  };

  const CalendarModule = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const isCollapsed = collapsedModules.includes('calendar');

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isPeriod = periodDates.includes(day);
      const phase = getMenstrualPhase(day);
      const isSelected = selectedDate === day;
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`aspect-square rounded flex items-center justify-center text-xs font-medium transition-all ${
            isPeriod
              ? 'bg-red-100 text-red-700 border border-red-400'
              : phase === 'follicular'
              ? 'bg-green-50 text-green-700'
              : phase === 'ovulation'
              ? 'bg-yellow-50 text-yellow-700'
              : phase === 'luteal'
              ? 'bg-purple-50 text-purple-700'
              : 'bg-gray-50 text-gray-700'
          } ${isSelected ? 'ring-2 ring-purple-600' : ''} hover:scale-105`}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => toggleCollapse('calendar')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-600" />
              Menstrual Cycle Tracker
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronUp className="w-5 h-5 text-gray-600" />}
          </button>
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-semibold text-gray-700 text-sm min-w-[100px] text-center">
                  {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => closeModule('calendar')}
              className="p-1 hover:bg-red-100 rounded text-red-500 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 mb-2">{getModuleRecommendation('calendar')}</p>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs font-semibold text-gray-600 py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-3">
              {days}
            </div>

            {selectedDate && (
              <div className="mt-4 p-5 bg-purple-50 rounded-lg border-2 border-purple-200">
                <p className="font-bold text-purple-900 mb-3 text-lg">
                  Phase: {getMenstrualPhase(selectedDate).charAt(0).toUpperCase() + getMenstrualPhase(selectedDate).slice(1)}
                </p>
                <p className="text-base text-purple-800 leading-relaxed font-medium">
                  {getPhaseRecommendation(getMenstrualPhase(selectedDate))}
                </p>
              </div>
            )}

            <div className="mt-3 flex gap-2 text-xs flex-wrap">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-red-100 border border-red-400"></div>
                <span className="text-gray-600">Menstrual</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-green-50 border border-green-200"></div>
                <span className="text-gray-600">Follicular</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-yellow-50 border border-yellow-200"></div>
                <span className="text-gray-600">Ovulation</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded bg-purple-50 border border-purple-200"></div>
                <span className="text-gray-600">Luteal</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const MotivationModule = () => {
    const quotes = [
      "Movement is medicine. Every step counts toward better health!",
      "Your body is capable of amazing things. Start today!",
      "Consistency beats perfection. Small steps lead to big changes.",
      "Exercise is celebration of what your body can do, not punishment.",
      "You're stronger than you think. Keep going!"
    ];
    const todayQuote = quotes[new Date().getDate() % quotes.length];
    const isCollapsed = collapsedModules.includes('motivation');

    return (
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => toggleCollapse('motivation')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Daily Activity Motivation
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
          <button
            onClick={() => closeModule('motivation')}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            <div className="mb-4 p-4 bg-white/20 border-l-4 border-white/50 rounded backdrop-blur">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm mb-2">{getModuleRecommendation('motivation')}</p>
                  <button className="text-sm font-semibold hover:opacity-80 transition-opacity">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <p className="text-lg mb-4 leading-relaxed">{todayQuote}</p>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <p className="text-sm font-semibold mb-2">Today's Goal</p>
              <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-bold flex-1">
                  {activityCompleted ? "You completed your 30 minutes of movement" : "30 minutes of movement"}
                </p>
                {activityCompleted ? (
                  <PartyPopper className="w-8 h-8 flex-shrink-0" />
                ) : (
                  <button
                    onClick={() => setActivityCompleted(true)}
                    className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all flex-shrink-0"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const WeightModule = () => {
    const [weightUnit, setWeightUnit] = useState('lbs');
    const isCollapsed = collapsedModules.includes('weight');

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => toggleCollapse('weight')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Weight & BMI Progress
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronUp className="w-5 h-5 text-gray-600" />}
          </button>
          <button
            onClick={() => closeModule('weight')}
            className="p-1 hover:bg-red-100 rounded text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 mb-2">{getModuleRecommendation('weight')}</p>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weightData}>
                  <defs>
                    <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="bmiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    yAxisId="left" 
                    tick={{ fill: '#8b5cf6', fontSize: 12, fontWeight: 600 }}
                    tickLine={{ stroke: '#8b5cf6' }}
                    axisLine={{ stroke: '#8b5cf6' }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    tick={{ fill: '#ec4899', fontSize: 12, fontWeight: 600 }}
                    tickLine={{ stroke: '#ec4899' }}
                    axisLine={{ stroke: '#ec4899' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                    fill="url(#weightGradient)"
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="bmi" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                    fill="url(#bmiGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {!showWeightForm && (
                <button
                  onClick={() => setShowWeightForm(true)}
                  className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white hover:from-purple-600 hover:to-purple-700 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm opacity-90">Current Weight</p>
                    <Plus className="w-5 h-5" />
                  </div>
                  <p className="text-3xl font-bold">{weightData[weightData.length - 1].weight}</p>
                  <p className="text-xs opacity-75 mt-1">lbs - Click to add entry</p>
                </button>
              )}
              
              {showWeightForm && (
                <div className="bg-white border-2 border-purple-600 rounded-lg p-4 col-span-2">
                  <h4 className="font-semibold mb-3 text-purple-900">Add Weight Entry</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">Date</label>
                      <input
                        type="date"
                        value={newWeightDate}
                        onChange={(e) => setNewWeightDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 focus:border-purple-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">Unit</label>
                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={() => setWeightUnit('lbs')}
                          className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                            weightUnit === 'lbs'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          lbs
                        </button>
                        <button
                          onClick={() => setWeightUnit('kg')}
                          className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                            weightUnit === 'kg'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          kg
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1 text-gray-700">Weight ({weightUnit})</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        placeholder={`Enter weight in ${weightUnit}`}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (newWeight && newWeightDate) {
                            const date = new Date(newWeightDate);
                            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
                            let weightInLbs = parseFloat(newWeight);
                            
                            if (weightUnit === 'kg') {
                              weightInLbs = weightInLbs * 2.20462;
                            }
                            
                            const bmi = parseFloat(calculateBMI(weightInLbs));
                            
                            const updatedData = [...weightData];
                            const existingIndex = updatedData.findIndex(d => d.month === monthName);
                            
                            if (existingIndex >= 0) {
                              updatedData[existingIndex] = { month: monthName, weight: Math.round(weightInLbs * 10) / 10, bmi };
                            } else {
                              updatedData.push({ month: monthName, weight: Math.round(weightInLbs * 10) / 10, bmi });
                            }
                            
                            setWeightData(updatedData.sort((a, b) => {
                              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                              return months.indexOf(a.month) - months.indexOf(b.month);
                            }));
                            
                            setNewWeight('');
                            setNewWeightDate(new Date().toISOString().split('T')[0]);
                            setShowWeightForm(false);
                            setWeightUnit('lbs');
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setShowWeightForm(false);
                          setNewWeight('');
                          setNewWeightDate(new Date().toISOString().split('T')[0]);
                          setWeightUnit('lbs');
                        }}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {!showWeightForm && (
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 text-white">
                  <p className="text-sm mb-1 opacity-90">Current BMI</p>
                  <p className="text-3xl font-bold">{weightData[weightData.length - 1].bmi}</p>
                  <p className="text-xs opacity-75 mt-1">Body Mass Index</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-600 font-medium">Weight</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-gray-600 font-medium">BMI</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const SymptomsModule = () => {
    const symptomColors = ['#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6', '#10b981'];
    const xAxisKey = symptomPeriod === 'week' ? 'day' : symptomPeriod === 'month' ? 'week' : 'month';
    const isCollapsed = collapsedModules.includes('symptoms');

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => toggleCollapse('symptoms')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Heart className="w-6 h-6 text-purple-600" />
              Symptoms Tracker
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronUp className="w-5 h-5 text-gray-600" />}
          </button>
          <button
            onClick={() => closeModule('symptoms')}
            className="p-1 hover:bg-red-100 rounded text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCollapsed && (
          <>
            <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 mb-2">{getModuleRecommendation('symptoms')}</p>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {['week', 'month', 'sixMonths'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSymptomPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    symptomPeriod === period
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === 'sixMonths' ? '6 Months' : period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Select symptoms to visualize:</p>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.name}
                    onClick={() => toggleSymptomSelection(symptom.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      selectedSymptoms.includes(symptom.name)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {symptom.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={symptomHistory[symptomPeriod]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey={xAxisKey}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 5]}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  {selectedSymptoms.map((symptomName, index) => (
                    <Bar 
                      key={symptomName}
                      dataKey={symptomName}
                      fill={symptomColors[index % symptomColors.length]}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mb-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{symptom.name}</h4>
                    <button
                      onClick={() => removeSymptom(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {editingSymptom === index ? (
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => updateSymptomSeverity(index, level)}
                          className={`flex-1 py-2 rounded text-sm font-semibold transition-all ${
                            symptom.severity === level
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingSymptom(index)}
                      className="w-full flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      <span className="text-sm text-gray-600">Severity Level</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-600">{symptom.severity}/5</span>
                        <Edit2 className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="flex gap-2">
                <input
                  ref={symptomInputRef}
                  type="text"
                  value={newSymptom}
                  onChange={(e) => handleSymptomInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                  onFocus={() => newSymptom.trim() && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Add new symptom..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                />
                <button
                  onClick={addSymptom}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>
              
              {showSuggestions && filteredSymptoms.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredSymptoms.map((symptom, index) => (
                    <button
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectSymptomSuggestion(symptom);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50 transition-all"
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  const GoalsModule = () => {
    const isCollapsed = collapsedModules.includes('goals');
    
    return (
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => toggleCollapse('goals')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Health Goals
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
          <button
            onClick={() => closeModule('goals')}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            <div className="mb-4 p-4 bg-white/20 border-l-4 border-white/50 rounded backdrop-blur">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm mb-2">{getModuleRecommendation('goals')}</p>
                  <button className="text-sm font-semibold hover:opacity-80 transition-opacity">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-4 backdrop-blur mb-4">
              <p className="text-sm font-semibold mb-2">Your Top Goals</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Increase energy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Improve emotional well-being</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Support heart health</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">Today's Insight</p>
              <p className="text-sm leading-relaxed">
                Small consistent actions compound over time. Focus on adding one serving of vegetables to your meals today for better energy levels!
              </p>
            </div>
          </>
        )}
      </div>
    );
  };

  const SleepModule = () => {
    const isCollapsed = collapsedModules.includes('sleep');
    
    return (
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => toggleCollapse('sleep')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Moon className="w-6 h-6" />
              Sleep Program
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
          <button
            onClick={() => closeModule('sleep')}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            <div className="mb-4 p-4 bg-white/20 border-l-4 border-white/50 rounded backdrop-blur">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm mb-2">{getModuleRecommendation('sleep')}</p>
                  <button className="text-sm font-semibold hover:opacity-80 transition-opacity">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold mb-2">Tonight's Wind-Down Routine</p>
              <ul className="space-y-2 text-sm">
                <li>• Dim lights 1 hour before bed</li>
                <li>• No screens 30 minutes before sleep</li>
                <li>• Try gentle stretching or meditation</li>
                <li>• Keep bedroom cool (65-68°F)</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-xs mb-1 opacity-90">Target Sleep</p>
                <p className="text-xl font-bold">7-9 hours</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-xs mb-1 opacity-90">Sleep Quality</p>
                <p className="text-xl font-bold">Good</p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const NutritionModule = () => {
    const isCollapsed = collapsedModules.includes('nutrition');
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => toggleCollapse('nutrition')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Apple className="w-6 h-6 text-purple-600" />
              Nutritional Advice
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronUp className="w-5 h-5 text-gray-600" />}
          </button>
          <button
            onClick={() => closeModule('nutrition')}
            className="p-1 hover:bg-red-100 rounded text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCollapsed && (
          <>
            <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 mb-2">{getModuleRecommendation('nutrition')}</p>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
                <p className="text-sm font-semibold text-red-900 mb-2">Try to eat less</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Processed foods
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Refined sugar
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Red meat
                  </span>
                </div>
              </div>

              <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded">
                <p className="text-sm font-semibold text-green-900 mb-2">Try to eat more</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Leafy greens
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Omega-3 rich fish
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Nuts & seeds
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Whole grains
                  </span>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-900">
                  💡 <strong>Tip:</strong> These recommendations are based on your health goals and current dietary habits. Small changes make a big difference!
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const FoodIntakeModule = () => {
    const isCollapsed = collapsedModules.includes('foodIntake');
    
    const foodItems = [
      { key: 'beans', label: 'Beans/Legumes' },
      { key: 'nuts', label: 'Nuts/Seeds' },
      { key: 'grains', label: 'Whole Grains' },
      { key: 'redMeat', label: 'Red Meat' },
      { key: 'chicken', label: 'Chicken' },
      { key: 'fish', label: 'Fish' },
      { key: 'sweets', label: 'Sweets' },
      { key: 'restaurant', label: 'Restaurant' }
    ];

    const drinkItems = [
      { key: 'alcohol', label: 'Alcohol' },
      { key: 'soda', label: 'Soda (regular or diet)' },
      { key: 'caffeinatedCoffee', label: 'Caffeinated coffee or tea' },
      { key: 'decafCoffee', label: 'Decaffeinated coffee or tea' },
      { key: 'milk', label: 'Milk' },
      { key: 'fruitJuice', label: 'Fruit juice' },
      { key: 'herbalTea', label: 'Herbal tea' },
      { key: 'water', label: 'Water' }
    ];

    // Mock data for charts
    const weeklyData = [
      { day: 'Mon', fruits: 2, vegetables: 3, grains: 1, protein: 2, caffeine: 2 },
      { day: 'Tue', fruits: 1, vegetables: 2, grains: 0, protein: 3, caffeine: 3 },
      { day: 'Wed', fruits: 3, vegetables: 4, grains: 1, protein: 2, caffeine: 2 },
      { day: 'Thu', fruits: 2, vegetables: 3, grains: 0, protein: 2, caffeine: 2 },
      { day: 'Fri', fruits: 2, vegetables: 2, grains: 1, protein: 3, caffeine: 3 },
      { day: 'Sat', fruits: 1, vegetables: 3, grains: 0, protein: 2, caffeine: 1 },
      { day: 'Sun', fruits: 2, vegetables: 3, grains: 0, protein: 2, caffeine: 2 }
    ];

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => toggleCollapse('foodIntake')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-purple-600" />
              Food Intake
            </h3>
            {isCollapsed ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronUp className="w-5 h-5 text-gray-600" />}
          </button>
          <button
            onClick={() => closeModule('foodIntake')}
            className="p-1 hover:bg-red-100 rounded text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCollapsed && (
          <>
            {/* Statistics Chart */}
            <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <h4 className="text-lg font-bold text-gray-800 mb-3">This Week's Overview</h4>
              
              {/* Chart Data Toggles */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setVisibleChartData({...visibleChartData, fruits: !visibleChartData.fruits})}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    visibleChartData.fruits
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border-2 border-gray-300'
                  }`}
                >
                  🍎 Fruits
                </button>
                <button
                  onClick={() => setVisibleChartData({...visibleChartData, vegetables: !visibleChartData.vegetables})}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    visibleChartData.vegetables
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border-2 border-gray-300'
                  }`}
                >
                  🥗 Vegetables
                </button>
                <button
                  onClick={() => setVisibleChartData({...visibleChartData, grains: !visibleChartData.grains})}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    visibleChartData.grains
                      ? 'bg-yellow-400 text-white shadow-md'
                      : 'bg-white text-gray-600 border-2 border-gray-300'
                  }`}
                >
                  🌾 Whole Grains
                </button>
                <button
                  onClick={() => setVisibleChartData({...visibleChartData, protein: !visibleChartData.protein})}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    visibleChartData.protein
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border-2 border-gray-300'
                  }`}
                >
                  🥩 Protein
                </button>
                <button
                  onClick={() => setVisibleChartData({...visibleChartData, caffeine: !visibleChartData.caffeine})}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    visibleChartData.caffeine
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-white text-gray-600 border-2 border-gray-300'
                  }`}
                >
                  ☕ Caffeine
                </button>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="day"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  {visibleChartData.fruits && <Bar dataKey="fruits" fill="#f59e0b" name="Fruits" radius={[4, 4, 0, 0]} />}
                  {visibleChartData.vegetables && <Bar dataKey="vegetables" fill="#10b981" name="Vegetables" radius={[4, 4, 0, 0]} />}
                  {visibleChartData.grains && <Bar dataKey="grains" fill="#fbbf24" name="Whole Grains" radius={[4, 4, 0, 0]} />}
                  {visibleChartData.protein && <Bar dataKey="protein" fill="#3b82f6" name="Protein" radius={[4, 4, 0, 0]} />}
                  {visibleChartData.caffeine && <Bar dataKey="caffeine" fill="#a855f7" name="Caffeine" radius={[4, 4, 0, 0]} />}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recommendations */}
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900">
                    You haven't eaten whole grains last week. Try incorporating brown rice or oats these days.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-purple-900">
                    You are in the follicular phase, try to increase lean protein and complex carbs to manage cravings.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-900">
                    Last week you drank caffeine every day. Try reducing the amount this week.
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Food Intake - Fruits & Vegetables */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Daily Food Intake</h4>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-semibold text-gray-800">Fruit Portions</h5>
                    <span className="text-2xl font-bold text-purple-600">{dailyFood.fruit}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDailyFood({...dailyFood, fruit: Math.max(0, dailyFood.fruit - 1)})}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded font-semibold text-gray-700"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setDailyFood({...dailyFood, fruit: dailyFood.fruit + 1})}
                      className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-semibold text-gray-800">Vegetable Portions</h5>
                    <span className="text-2xl font-bold text-green-600">{dailyFood.vegetables}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDailyFood({...dailyFood, vegetables: Math.max(0, dailyFood.vegetables - 1)})}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded font-semibold text-gray-700"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setDailyFood({...dailyFood, vegetables: dailyFood.vegetables + 1})}
                      className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* What did I eat today */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-800">What did I eat today</h4>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-purple-50 rounded-lg">
                <button
                  onClick={() => {
                    const newDate = new Date(foodIntakeDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setFoodIntakeDate(newDate);
                  }}
                  className="p-1 hover:bg-purple-100 rounded"
                >
                  <ChevronLeft className="w-5 h-5 text-purple-600" />
                </button>
                <div className="text-center">
                  <p className="text-sm font-semibold text-purple-900">{formatDate(foodIntakeDate)}</p>
                  <p className="text-xs text-purple-600">
                    {foodIntakeDate.toDateString() === new Date().toDateString() ? 'Today' : `${Math.floor((new Date() - foodIntakeDate) / (1000 * 60 * 60 * 24))} days ago`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newDate = new Date(foodIntakeDate);
                    newDate.setDate(newDate.getDate() + 1);
                    if (newDate <= new Date()) {
                      setFoodIntakeDate(newDate);
                    }
                  }}
                  disabled={foodIntakeDate.toDateString() === new Date().toDateString()}
                  className={`p-1 rounded ${foodIntakeDate.toDateString() === new Date().toDateString() ? 'opacity-30 cursor-not-allowed' : 'hover:bg-purple-100'}`}
                >
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              <div className="space-y-2">
                {foodItems.map(item => (
                  <label 
                    key={item.key}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={ateToday[item.key] || false}
                      onChange={(e) => setAteToday({...ateToday, [item.key]: e.target.checked})}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-gray-800 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* What did I drink today */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-800">What did I drink today</h4>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-purple-50 rounded-lg">
                <button
                  onClick={() => {
                    const newDate = new Date(foodIntakeDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setFoodIntakeDate(newDate);
                  }}
                  className="p-1 hover:bg-purple-100 rounded"
                >
                  <ChevronLeft className="w-5 h-5 text-purple-600" />
                </button>
                <div className="text-center">
                  <p className="text-sm font-semibold text-purple-900">{formatDate(foodIntakeDate)}</p>
                  <p className="text-xs text-purple-600">
                    {foodIntakeDate.toDateString() === new Date().toDateString() ? 'Today' : `${Math.floor((new Date() - foodIntakeDate) / (1000 * 60 * 60 * 24))} days ago`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newDate = new Date(foodIntakeDate);
                    newDate.setDate(newDate.getDate() + 1);
                    if (newDate <= new Date()) {
                      setFoodIntakeDate(newDate);
                    }
                  }}
                  disabled={foodIntakeDate.toDateString() === new Date().toDateString()}
                  className={`p-1 rounded ${foodIntakeDate.toDateString() === new Date().toDateString() ? 'opacity-30 cursor-not-allowed' : 'hover:bg-purple-100'}`}
                >
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              <div className="space-y-2">
                {drinkItems.map(item => (
                  <label 
                    key={item.key}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={drankToday[item.key] || false}
                      onChange={(e) => setDrankToday({...drankToday, [item.key]: e.target.checked})}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-800 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderModule = (moduleType) => {
    switch (moduleType) {
      case 'calendar': return <CalendarModule />;
      case 'motivation': return <MotivationModule />;
      case 'weight': return <WeightModule />;
      case 'symptoms': return <SymptomsModule />;
      case 'goals': return <GoalsModule />;
      case 'sleep': return <SleepModule />;
      case 'nutrition': return <NutritionModule />;
      case 'foodIntake': return <FoodIntakeModule />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Health Dashboard</h1>
          <p className="text-gray-600">Drag modules to reorder them</p>
        </div>

        <div className="space-y-4 mb-8">
          {modules.map((module, index) => (
            <div
              key={module}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative transition-all duration-200 ${
                draggedItem === index ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 cursor-move">
                <GripVertical className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </div>
              {renderModule(module)}
            </div>
          ))}
        </div>

        {closedModules.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Closed Modules</h3>
            <p className="text-sm text-gray-600 mb-4">Click to restore any module:</p>
            <div className="flex flex-wrap gap-3">
              {closedModules.map((module) => (
                <button
                  key={module}
                  onClick={() => openModule(module)}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {getModuleName(module)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}