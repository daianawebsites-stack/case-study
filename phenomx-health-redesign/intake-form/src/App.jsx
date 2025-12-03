import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, ArrowLeft } from 'lucide-react';

export default function PhenomXHealthQuiz() {
  const [screen, setScreen] = useState(1);
  const [birthYear, setBirthYear] = useState('');
  const [periodsRegular, setPeriodsRegular] = useState('');
  const [lastPeriodDate, setLastPeriodDate] = useState(null);
  const [takingHRT, setTakingHRT] = useState('');
  const [hrtType, setHrtType] = useState('');
  const [healthGoals, setHealthGoals] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [ratings, setRatings] = useState({});
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(null);
  const [dietTypes, setDietTypes] = useState([]);
  const [foodAllergies, setFoodAllergies] = useState([]);
  const [drinkPreference, setDrinkPreference] = useState('');
  const [fruitPortions, setFruitPortions] = useState('');
  const [vegetablePortions, setVegetablePortions] = useState('');
  const [showMoreSymptoms, setShowMoreSymptoms] = useState(false);
  const moreSymptomsRef = useRef(null);
  const [beansFrequency, setBeansFrequency] = useState('');
  const [nutsFrequency, setNutsFrequency] = useState('');
  const [grainsFrequency, setGrainsFrequency] = useState('');
  const [redMeatFrequency, setRedMeatFrequency] = useState('');
  const [chickenFrequency, setChickenFrequency] = useState('');
  const [fishFrequency, setFishFrequency] = useState('');
  const [restaurantFrequency, setRestaurantFrequency] = useState('');
  const [alcoholFrequency, setAlcoholFrequency] = useState('');
  const [sweetsFrequency, setSweetsFrequency] = useState('');
  const [dailyActivity, setDailyActivity] = useState('');
  const [exerciseDays, setExerciseDays] = useState('');
  const [strengthDays, setStrengthDays] = useState('');
  const [activityChallenge, setActivityChallenge] = useState('');
  const [heightUnit, setHeightUnit] = useState('ft');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [weight, setWeight] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');

  const initialSymptoms = [
    'Brain fog', 'Mood swings', 'Weight gain', 'Anxiety', 'Low libido',
    'Night sweats', 'Hot flashes', 'Fatigue', 'Joint pain', 'Heavy periods',
    'Depression', 'Low energy', 'Panic attacks', 'Memory loss'
  ];

  const additionalSymptomGroups = [
    {
      title: 'Digestive',
      symptoms: ['Constipation', 'Gas', 'Diarrhea', 'Belly bloat', 'Reflux', 'Bloating']
    },
    {
      title: 'Skin & Hair',
      symptoms: ['Muscle loss', 'Sagging skin', 'Skin wrinkling', 'Skin changes', 'Age spots', 'Dry skin', 'Dry mouth', 'Hair loss', 'Hair changes']
    },
    {
      title: 'Cardiovascular',
      symptoms: ['Cold flashes', 'Heart palpitations']
    },
    {
      title: 'Reproductive',
      symptoms: ['Vaginal dryness', 'Irregular periods', 'Menstrual cramps', 'Sore breasts', 'PMS']
    },
    {
      title: 'Urinary & Other',
      symptoms: ['Urinary concerns', 'Bladder pain', 'Frequent urination', 'Incontinence']
    }
  ];

  const healthGoalOptions = [
    'Increase energy', 'Improve memory and thinking', 'Improve emotional well-being',
    'Manage stress', 'Optimize gut health', 'Reduce skin aging',
    'Support carbohydrate metabolism', 'Support heart health', 'Support bone health',
    'Control blood pressure', 'Prevent weight gain', 'Improve physical condition',
    'Improve mobility', 'Manage menstrual health', "I don't know"
  ];

  const ratingLabels = {
    1: 'Not at all', 2: 'Slightly', 3: 'Moderately', 4: 'Quite a bit', 5: 'Extremely'
  };

  const sleepLabels = {
    1: 'Very poorly', 2: 'Poorly', 3: 'Fair', 4: 'Well', 5: 'Very well'
  };

  const drinkOptions = [
    'Soda (regular or diet)',
    'Caffeinated coffee or tea',
    'Decaffeinated coffee or tea',
    'Milk or fruit juice',
    'Herbal tea or water'
  ];

  const dietTypeOptions = [
    'Vegan', 'Vegetarian', 'Lacto ovo-vegetarian', 'Pescaterian',
    'Low Carb', 'Keto', 'Paleo', 'Low Fat', 'Diabetic meal plan', 'Gluten free', 'Other'
  ];

  const allergyOptions = [
    'Milk/ Milk products', 'Peanuts', 'Tree nuts', 'Eggs', 'Sesame',
    'Wheat', 'Shellfish', 'Fish', 'Soy', 'None of the above'
  ];

  const portionOptions = ['0', '1', '2', '3-4', '4 or more'];

  useEffect(() => {
    if (screen === 41) {
      const timer = setTimeout(() => {
        setScreen(42);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const goBack = () => {
    if (screen === 11 && currentSymptomIndex > 0) {
      setCurrentSymptomIndex(currentSymptomIndex - 1);
    } else if (screen === 6 && periodsRegular === "I don't currently get periods") {
      setScreen(4);
    } else if (screen === 8 && takingHRT === 'No') {
      setScreen(6);
    } else {
      setScreen(screen - 1);
    }
  };

  const toggleHealthGoal = (goal) => {
    setHealthGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter(g => g !== goal);
      } else if (prev.length < 3) {
        return [...prev, goal];
      }
      return prev;
    });
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const toggleAllergy = (allergy) => {
    if (allergy === 'None of the above') {
      setFoodAllergies(['None of the above']);
    } else {
      setFoodAllergies(prev => {
        const filtered = prev.filter(a => a !== 'None of the above');
        if (filtered.includes(allergy)) {
          return filtered.filter(a => a !== allergy);
        } else {
          return [...filtered, allergy];
        }
      });
    }
  };

  const handleShowMore = () => {
    setShowMoreSymptoms(true);
    setTimeout(() => {
      moreSymptomsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSymptomRating = (symptom, rating) => {
    setRatings(prev => ({ ...prev, [symptom]: rating }));
    if (currentSymptomIndex < selectedSymptoms.length - 1) {
      setTimeout(() => {
        setCurrentSymptomIndex(currentSymptomIndex + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setScreen(12);
      }, 300);
    }
  };

  const handleSleepRating = (rating) => {
    setSleepQuality(rating);
    setTimeout(() => {
      setScreen(13);
    }, 300);
  };

  const handleDietSelection = (diet) => {
    setDietTypes(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handleDrinkSelection = (drink) => {
    setDrinkPreference(drink);
    setTimeout(() => {
      setScreen(17);
    }, 300);
  };

  const handleFruitSelection = (portion) => {
    setFruitPortions(portion);
    setTimeout(() => {
      setScreen(19);
    }, 300);
  };

  const handleVegetableSelection = (portion) => {
    setVegetablePortions(portion);
    setTimeout(() => {
      setScreen(20);
    }, 300);
  };

  const handleBeansSelection = (frequency) => {
    setBeansFrequency(frequency);
    setTimeout(() => setScreen(22), 300);
  };

  const handleNutsSelection = (frequency) => {
    setNutsFrequency(frequency);
    setTimeout(() => setScreen(23), 300);
  };

  const handleGrainsSelection = (frequency) => {
    setGrainsFrequency(frequency);
    setTimeout(() => setScreen(24), 300);
  };

  const handleRedMeatSelection = (frequency) => {
    setRedMeatFrequency(frequency);
    setTimeout(() => setScreen(25), 300);
  };

  const handleChickenSelection = (frequency) => {
    setChickenFrequency(frequency);
    setTimeout(() => setScreen(26), 300);
  };

  const handleFishSelection = (frequency) => {
    setFishFrequency(frequency);
    setTimeout(() => setScreen(27), 300);
  };

  const handleRestaurantSelection = (frequency) => {
    setRestaurantFrequency(frequency);
    setTimeout(() => setScreen(28), 300);
  };

  const handleAlcoholSelection = (frequency) => {
    setAlcoholFrequency(frequency);
    setTimeout(() => setScreen(29), 300);
  };

  const handleSweetsSelection = (frequency) => {
    setSweetsFrequency(frequency);
    setTimeout(() => setScreen(30), 300);
  };

  if (screen === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">[Avatar Image]</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Hi, I am Dr. Colleen Fogarty Draper</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Women in their 40s and sometimes even earlier often start noticing changes in energy, mood, sleep, or metabolism.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            I've dedicated my career to helping women understand these transitions and feel their best through personalized nutrition and science-backed solutions.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            I'll ask you a few quick questions to get to know you better and tailor recommendations to your unique needs.
          </p>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            You'll receive personalized insights for free, plus access to premium features for just $10 a year.
          </p>
          <button
            onClick={() => setScreen(2)}
            className="px-12 py-4 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-all"
            style={{ backgroundColor: '#231556' }}
          >
            Let's start
          </button>
        </div>
      </div>
    );
  }

  if (screen === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Step 1</h1>
            <p className="text-xl text-gray-600 mb-8">Let's personalize your journey together.</p>
            <button
              onClick={() => setScreen(3)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">What year were you born?</h1>
            <input
              type="text"
              maxLength="4"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value.replace(/\D/g, ''))}
              className="w-full text-4xl text-center p-6 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none mb-8"
              placeholder="YYYY"
            />
            <button
              onClick={() => birthYear.length === 4 && setScreen(4)}
              disabled={birthYear.length !== 4}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
              style={{ backgroundColor: birthYear.length === 4 ? '#231556' : undefined }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Are your periods regular?</h1>
            <div className="space-y-4">
              {['Yes', 'No', 'I am not sure', "I don't currently get periods"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPeriodsRegular(option);
                    setTimeout(() => {
                      setScreen(option === "I don't currently get periods" ? 6 : 5);
                    }, 300);
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    periodsRegular === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      periodsRegular === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {periodsRegular === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 5) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">When did your last period start?</h1>
            <p className="text-gray-600 mb-8">Not sure? That's okay, you can select an estimate</p>
            
            <div className="mb-8">
              <div className="text-center text-xl font-semibold text-gray-800 mb-4">
                {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const date = new Date(currentYear, currentMonth, day);
                  const isSelected = lastPeriodDate && lastPeriodDate.getDate() === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setLastPeriodDate(date)}
                      className={`p-3 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white font-bold'
                          : 'hover:bg-purple-50 border border-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => lastPeriodDate && setScreen(6)}
              disabled={!lastPeriodDate}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
              style={{ backgroundColor: lastPeriodDate ? '#231556' : undefined }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Are you taking any hormone replacement therapy?</h1>
            <div className="space-y-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setTakingHRT(option);
                    setTimeout(() => {
                      setScreen(option === 'No' ? 8 : 7);
                    }, 300);
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    takingHRT === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      takingHRT === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {takingHRT === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 7) {
    const hrtOptions = [
      'Birth control pill',
      'Hormone-releasing birth control device',
      'I currently take hormone replacement therapy (HRT)',
      'Other medication (related to chronic disease)',
      'None of the above'
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">What is the hormone replacement therapy you are taking?</h1>
            <div className="space-y-4">
              {hrtOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setHrtType(option);
                    setTimeout(() => setScreen(8), 300);
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    hrtType === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      hrtType === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {hrtType === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 8) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '20%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Step 2</h1>
            <p className="text-xl text-gray-600 mb-8">Tell me about your health priorities</p>
            <button
              onClick={() => setScreen(9)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 9) {
    const filteredGoals = periodsRegular === "I don't currently get periods"
      ? healthGoalOptions.filter(goal => goal !== 'Manage menstrual health')
      : healthGoalOptions;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">I want to…</h1>
            <p className="text-sm text-gray-500 mb-6">Select up to 3 goals</p>
            
            <div className="space-y-3 mb-6">
              {filteredGoals.map((goal) => (
                <label
                  key={goal}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    healthGoals.includes(goal)
                      ? 'border-purple-600 bg-purple-50'
                      : healthGoals.length >= 3
                      ? 'border-gray-200 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={healthGoals.includes(goal)}
                    onChange={() => toggleHealthGoal(goal)}
                    disabled={!healthGoals.includes(goal) && healthGoals.length >= 3}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-lg text-gray-700">{goal}</span>
                </label>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white pt-4 -mx-8 px-8 -mb-8 pb-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {healthGoals.length} of 3 goals selected
                </p>
              </div>
              <button
                onClick={() => setScreen(10)}
                disabled={healthGoals.length === 0}
                className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
                style={{ backgroundColor: healthGoals.length > 0 ? '#231556' : undefined }}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 10) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Are you experiencing any of these symptoms?
            </h1>
            <p className="text-lg font-semibold text-gray-700 mb-8">And remember… Many women experience changes like these.</p>
            
            <div className="space-y-3 mb-4">
              {initialSymptoms.map((symptom) => (
                <label
                  key={symptom}
                  className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => toggleSymptom(symptom)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-lg text-gray-700">{symptom}</span>
                </label>
              ))}
            </div>

            {!showMoreSymptoms ? (
              <button
                onClick={handleShowMore}
                className="w-full p-4 mb-6 rounded-lg border-2 border-purple-400 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition-all flex items-center justify-center gap-2"
              >
                More symptoms
                <ChevronDown className="w-5 h-5" />
              </button>
            ) : (
              <div ref={moreSymptomsRef} className="mb-6">
                {additionalSymptomGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-6">
                    <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3 mt-6">
                      {group.title}
                    </h3>
                    <div className="space-y-3">
                      {group.symptoms.map((symptom) => (
                        <label
                          key={symptom}
                          className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSymptoms.includes(symptom)}
                            onChange={() => toggleSymptom(symptom)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="ml-3 text-lg text-gray-700">{symptom}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="sticky bottom-0 bg-white pt-4 -mx-8 px-8 -mb-8 pb-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentSymptomIndex(0);
                  setScreen(11);
                }}
                disabled={selectedSymptoms.length === 0}
                className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
                style={{ backgroundColor: selectedSymptoms.length > 0 ? '#231556' : undefined }}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 11) {
    const currentSymptom = selectedSymptoms[currentSymptomIndex];
    const symptomColors = [
      'bg-purple-50 border-purple-200',
      'bg-pink-50 border-pink-200',
      'bg-blue-50 border-blue-200',
      'bg-indigo-50 border-indigo-200',
      'bg-violet-50 border-violet-200',
      'bg-fuchsia-50 border-fuchsia-200'
    ];
    const colorIndex = currentSymptomIndex % symptomColors.length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-purple-600">
                  Question {currentSymptomIndex + 1} of {selectedSymptoms.length}
                </span>
                <div className="flex gap-1">
                  {selectedSymptoms.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentSymptomIndex
                          ? 'bg-purple-600'
                          : index < currentSymptomIndex
                          ? 'bg-purple-400'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              How much did this affect you in the past month?
            </h1>
            
            <div className={`my-8 p-6 rounded-lg border-2 ${symptomColors[colorIndex]}`}>
              <h2 className="text-3xl font-bold" style={{ color: '#231556' }}>{currentSymptom}</h2>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleSymptomRating(currentSymptom, rating)}
                  className="relative p-6 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:scale-105 active:scale-95"
                >
                  <div className="text-3xl font-bold text-gray-800 mb-2">{rating}</div>
                  <div className="text-xs text-gray-600 leading-tight">{ratingLabels[rating]}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Click any rating to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 12) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              How well have you been sleeping lately?
            </h1>

            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleSleepRating(rating)}
                  className="relative p-6 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:scale-105 active:scale-95"
                >
                  <div className="text-3xl font-bold text-gray-800 mb-2">{rating}</div>
                  <div className="text-xs text-gray-600 leading-tight">{sleepLabels[rating]}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Click any rating to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 13) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '40%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Step 3</h1>
            <p className="text-xl text-gray-600 mb-4">We are what we eat.</p>
            <p className="text-lg text-gray-600 mb-6">
              There is a strong connection between how you eat, your body's metabolism, your unique genetics, and your hormonal health and aging.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              I will ask you a few questions about your nutrition. Stay with me! It won't take much
            </p>
            <button
              onClick={() => setScreen(14)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 14) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">What kind of diet do you follow?</h1>
            <div className="space-y-3 mb-6">
              {dietTypeOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={dietTypes.includes(option)}
                    onChange={() => handleDietSelection(option)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-lg text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            
            <div className="sticky bottom-0 bg-white pt-4 -mx-12 px-12 -mb-12 pb-12 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {dietTypes.length} selected
                </p>
              </div>
              <button
                onClick={() => setScreen(15)}
                disabled={dietTypes.length === 0}
                className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
                style={{ backgroundColor: dietTypes.length > 0 ? '#231556' : undefined }}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 15) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Select if you have any Food Allergies
            </h1>
            
            <div className="space-y-3 mb-6">
              {allergyOptions.map((allergy) => (
                <label
                  key={allergy}
                  className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={foodAllergies.includes(allergy)}
                    onChange={() => toggleAllergy(allergy)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-lg text-gray-700">{allergy}</span>
                </label>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white pt-4 -mx-8 px-8 -mb-8 pb-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {foodAllergies.length} selected
                </p>
              </div>
              <button
                onClick={() => setScreen(16)}
                disabled={foodAllergies.length === 0}
                className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
                style={{ backgroundColor: foodAllergies.length > 0 ? '#231556' : undefined }}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 16) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">What do you drink most often?</h1>
            <div className="space-y-4">
              {drinkOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleDrinkSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    drinkPreference === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      drinkPreference === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {drinkPreference === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 17) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '50%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">The next questions are about what you eat in a day.</h1>
            <button
              onClick={() => setScreen(18)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 18) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              How many portions of Fruit do you eat in a day?
            </h2>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-700 mb-4">1 Portion of Fruit is:</p>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center text-gray-600 italic mb-2">[Animation placeholder]</div>
                <p className="text-sm text-gray-600 text-center">
                  A medium-sized fruit • A ¼ plate with fruit • Unsweetened Juice
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {portionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFruitSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    fruitPortions === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      fruitPortions === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {fruitPortions === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 19) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              How many portions of Vegetables do you eat in a day?
            </h2>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-700 mb-4">1 Portion of vegetables is:</p>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center text-gray-600 italic mb-2">[Animation placeholder]</div>
                <p className="text-sm text-gray-600 text-center">
                  A half plate of raw, leafy greens • A ¼ plate with other veggies, raw or cooked
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {portionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleVegetableSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    vegetablePortions === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      vegetablePortions === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {vegetablePortions === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 20) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Now, what you eat in a Week</h1>
            <button
              onClick={() => setScreen(21)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 21) {
    const weeklyOptions = ['0', '1', '2', '3-4', '4 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">how many times a week did you eat</h2>
            <h3 className="text-4xl font-bold mb-8" style={{ color: '#231556' }}>Dried Beans, Peas, Legumes?</h3>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center text-gray-600 italic">
                  [Infographic placeholder for beans, peas, legumes]
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {weeklyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleBeansSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    beansFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      beansFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {beansFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 22) {
    const weeklyOptions = ['0', '1', '2', '3-4', '4 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">how many times a week did you eat</h2>
            <h3 className="text-4xl font-bold mb-8" style={{ color: '#231556' }}>Nuts or Seeds?</h3>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center text-gray-600 italic">
                  [Infographic placeholder for nuts or seeds]
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {weeklyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleNutsSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    nutsFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      nutsFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {nutsFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 23) {
    const weeklyOptions = ['0', '1', '2', '3-4', '4 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">how many times a week did you eat</h2>
            <h3 className="text-4xl font-bold mb-8" style={{ color: '#231556' }}>Whole Grains?</h3>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center text-gray-600 italic">
                  [Infographic placeholder for whole grains]
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {weeklyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleGrainsSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    grainsFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      grainsFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {grainsFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 24) {
    const weeklyOptions = ['0', '1', '2', '3-4', '4 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">how many times a week did you eat</h2>
            <h3 className="text-4xl font-bold mb-8" style={{ color: '#231556' }}>Red Meat?</h3>

            <div className="space-y-4">
              {weeklyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleRedMeatSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    redMeatFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      redMeatFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {redMeatFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 25) {
    const weeklyOptions = ['0', '1', '2', '3-4', '4 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">how many times a week did you eat</h2>
            <h3 className="text-4xl font-bold mb-8" style={{ color: '#231556' }}>Chicken?</h3>

            <div className="space-y-4">
              {weeklyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleChickenSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    chickenFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      chickenFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {chickenFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 26) {
    const weeklyOptions = ['0', '1', '2', '3-4', '4 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">On average, last month,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">how many times a week did you eat</h2>
            <h3 className="text-4xl font-bold mb-8" style={{ color: '#231556' }}>Fish?</h3>

            <div className="space-y-4">
              {weeklyOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFishSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    fishFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      fishFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {fishFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 27) {
    const restaurantOptions = ['0', '1 to 2', '3 to 4', '5 to 6', '7 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">On average, how many times a week do you eat at a restaurant, Including Fast Food?</h1>

            <div className="space-y-4">
              {restaurantOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleRestaurantSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    restaurantFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      restaurantFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {restaurantFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 28) {
    const alcoholOptions = ['0', '1 to 2', '3 to 4', '5 to 6', '7 or more'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">On average, how many glasses a week do you drink Alcohol?</h1>

            <div className="space-y-4">
              {alcoholOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAlcoholSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    alcoholFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      alcoholFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {alcoholFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 29) {
    const sweetsOptions = ['1 or more times a day', 'Every other day', 'Twice a week', 'Once a week', '2 to 3 times a month', 'Rarely'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">On average, how often do you eat Sweets, Cookies, Cakes, or Ice Cream?</h1>

            <div className="space-y-4">
              {sweetsOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSweetsSelection(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    sweetsFrequency === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      sweetsFrequency === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {sweetsFrequency === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  // NEW ACTIVITY SCREENS 30-34
  if (screen === 30) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '70%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Step 4</h1>
            <p className="text-xl text-gray-600 mb-6">Help me understand your activity habits.</p>
            <p className="text-lg text-gray-600 mb-8">
              Everything is connected, so your answers will help me create the nutrition plan that is right just for you.
            </p>
            <button
              onClick={() => setScreen(31)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 31) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Thinking about your daily routine,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Which of these best describes how you spend most of your day?</h2>
            <div className="space-y-4">
              {['Mostly sitting', 'Mostly standing or moving'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setDailyActivity(option);
                    setTimeout(() => setScreen(32), 300);
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    dailyActivity === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      dailyActivity === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {dailyActivity === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 32) {
    const exerciseOptions = ['None', '1-2 days', '3-4 days', '5 or more days'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">In a typical week,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">How many days do you do intentional exercise?</h2>
            <h3 className="text-lg text-gray-600 mb-8">Exercise that makes you breathe harder and your heart beat faster</h3>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center text-gray-600 italic">
                  [Infographic placeholder]
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {exerciseOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setExerciseDays(option);
                    setTimeout(() => setScreen(33), 300);
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    exerciseDays === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      exerciseDays === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {exerciseDays === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 33) {
    const strengthOptions = ['None', '1-2 days', '3-4 days', '5 or more days'];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">In a typical week,</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">How often do you do strength training?</h2>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center text-gray-600 italic">
                  [Infographic placeholder]
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {strengthOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStrengthDays(option);
                    setTimeout(() => setScreen(34), 300);
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    strengthDays === option
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      strengthDays === option ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {strengthDays === option && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 34) {
    const challengeOptions = [
      'Lack of time',
      'Low energy / fatigue',
      'Lack of motivation',
      "I don't find it challenging to stay active"
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              What makes it challenging to be physically active?
            </h1>
            
            <div className="space-y-4">
              {challengeOptions.map((challenge) => (
                <button
                  key={challenge}
                  onClick={() => {
                    setActivityChallenge(challenge);
                    setTimeout(() => setScreen(35), 300);
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    activityChallenge === challenge
                      ? 'border-purple-600 bg-purple-100'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      activityChallenge === challenge ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {activityChallenge === challenge && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg text-gray-700">{challenge}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              Click any option to continue
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Continue with remaining screens...
  if (screen === 35) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '90%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Step 5</h1>
            <p className="text-xl text-gray-600 mb-8">Height and weight are just one part of your health picture. I will help you keep track of it</p>
            <button
              onClick={() => setScreen(36)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 36 onwards would continue here with height, weight, birthday, email, etc.
  // For brevity, I'll indicate the pattern continues

  if (screen === 36) {
    const isValid = heightUnit === 'ft' 
      ? heightFeet && heightInches !== '' && parseInt(heightFeet) <= 8 && parseInt(heightInches) <= 11
      : heightCm && parseInt(heightCm) <= 250;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">What is your Height?</h1>
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border-2 border-gray-300 p-1">
                <button
                  onClick={() => setHeightUnit('ft')}
                  className={`px-6 py-2 rounded-md transition-all ${
                    heightUnit === 'ft'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Feet & Inches
                </button>
                <button
                  onClick={() => setHeightUnit('cm')}
                  className={`px-6 py-2 rounded-md transition-all ${
                    heightUnit === 'cm'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            {heightUnit === 'ft' ? (
              <div className="flex gap-4 mb-8">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Feet</label>
                  <input
                    type="number"
                    min="0"
                    max="8"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="w-full text-3xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Inches</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="w-full text-3xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <input
                  type="number"
                  min="0"
                  max="250"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full text-3xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                  placeholder="0"
                />
              </div>
            )}

            <button
              onClick={() => setScreen(37)}
              disabled={!isValid}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
              style={{ backgroundColor: isValid ? '#231556' : undefined }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 37) {
    const isValid = weight && parseFloat(weight) > 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">What is your Weight?</h1>
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border-2 border-gray-300 p-1">
                <button
                  onClick={() => setWeightUnit('lbs')}
                  className={`px-6 py-2 rounded-md transition-all ${
                    weightUnit === 'lbs'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Pounds (lbs)
                </button>
                <button
                  onClick={() => setWeightUnit('kg')}
                  className={`px-6 py-2 rounded-md transition-all ${
                    weightUnit === 'kg'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Kilograms (kg)
                </button>
              </div>
            </div>

            <div className="mb-8">
              <input
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full text-3xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                placeholder="0"
              />
            </div>

            <button
              onClick={() => setScreen(38)}
              disabled={!isValid}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
              style={{ backgroundColor: isValid ? '#231556' : undefined }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 38) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-purple-600">Steps 1 to 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: '95%' }}></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Step 5</h1>
            <p className="text-xl text-gray-600 mb-8">I just need the following information, and that will be it.</p>
            <button
              onClick={() => setScreen(39)}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: '#231556' }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 39) {
    const formatBirthday = (value) => {
      const numbers = value.replace(/\D/g, '');
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    };

    const handleBirthdayChange = (e) => {
      const formatted = formatBirthday(e.target.value);
      setBirthday(formatted);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">When is your birthday?</h1>
            <input
              type="text"
              value={birthday}
              onChange={handleBirthdayChange}
              maxLength="10"
              className="w-full text-3xl text-center p-6 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none mb-8"
              placeholder="DD/MM/YYYY"
            />
            <button
              onClick={() => setScreen(40)}
              disabled={birthday.length !== 10}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
              style={{ backgroundColor: birthday.length === 10 ? '#231556' : undefined }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 40) {
    const isValidEmail = email.includes('@') && email.includes('.');

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <button onClick={goBack} className="mb-4 flex items-center text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">What is your email?</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-2xl text-center p-6 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none mb-8"
              placeholder="your@email.com"
            />
            <button
              onClick={() => setScreen(41)}
              disabled={!isValidEmail}
              className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:opacity-90"
              style={{ backgroundColor: isValidEmail ? '#231556' : undefined }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 41) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Done!</h1>
          <p className="text-xl text-gray-600 mb-12">Wait while I configure your dashboard.</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 42) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Upgrade to Personalized Nutrition</h1>
          <p className="text-lg text-gray-600 mb-4 text-center">
            To get your custom nutrition recommendations and 1-year of premium app access, the standard price is $20.
          </p>
          <p className="text-2xl font-bold text-purple-600 mb-8 text-center">
            Special New Member Offer: Just $10
          </p>
          
          <div className="bg-purple-50 rounded-xl p-8 mb-8">
            <p className="text-lg font-semibold text-gray-800 mb-6">Your one-time $10 payment includes:</p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-purple-600" />
                </div>
                <p className="ml-3 text-lg text-gray-700">A nutrition plan tailored just for you</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-purple-600" />
                </div>
                <p className="ml-3 text-lg text-gray-700">Full year of premium app access</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-purple-600" />
                </div>
                <p className="ml-3 text-lg text-gray-700">All new features and masterclasses released during your subscription</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setScreen(43)}
            className="w-full p-4 rounded-lg border-2 border-purple-400 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition-all mb-4"
          >
            Continue with Free Plan
          </button>

          <button
            onClick={() => setScreen(43)}
            className="w-full px-8 py-4 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all"
            style={{ backgroundColor: '#231556' }}
          >
            Upgrade for $10
          </button>
        </div>
      </div>
    );
  }

  if (screen === 43) {
    const resetQuiz = () => {
      setBirthYear('');
      setPeriodsRegular('');
      setLastPeriodDate(null);
      setTakingHRT('');
      setHrtType('');
      setHealthGoals([]);
      setSelectedSymptoms([]);
      setRatings({});
      setCurrentSymptomIndex(0);
      setSleepQuality(null);
      setDietTypes([]);
      setFoodAllergies([]);
      setDrinkPreference('');
      setFruitPortions('');
      setVegetablePortions('');
      setBeansFrequency('');
      setNutsFrequency('');
      setGrainsFrequency('');
      setRedMeatFrequency('');
      setChickenFrequency('');
      setFishFrequency('');
      setRestaurantFrequency('');
      setAlcoholFrequency('');
      setSweetsFrequency('');
      setDailyActivity('');
      setExerciseDays('');
      setStrengthDays('');
      setActivityChallenge('');
      setHeightUnit('ft');
      setHeightFeet('');
      setHeightInches('');
      setHeightCm('');
      setWeightUnit('lbs');
      setWeight('');
      setBirthday('');
      setEmail('');
      setShowMoreSymptoms(false);
      setScreen(1);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Your Health Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">Here's a summary of all your responses</p>

            <div className="space-y-8">
              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Birth Year</p>
                    <p className="text-lg text-gray-800">{birthYear || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Birthday</p>
                    <p className="text-lg text-gray-800">{birthday || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Email</p>
                    <p className="text-lg text-gray-800">{email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Height</p>
                    <p className="text-lg text-gray-800">
                      {heightUnit === 'ft' 
                        ? `${heightFeet || 0}' ${heightInches || 0}"`
                        : `${heightCm || 0} cm`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Weight</p>
                    <p className="text-lg text-gray-800">{weight ? `${weight} ${weightUnit}` : 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Menstrual Health */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Menstrual Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Periods Regular</p>
                    <p className="text-lg text-gray-800">{periodsRegular || 'Not provided'}</p>
                  </div>
                  {lastPeriodDate && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Last Period</p>
                      <p className="text-lg text-gray-800">{lastPeriodDate.toLocaleDateString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Taking HRT</p>
                    <p className="text-lg text-gray-800">{takingHRT || 'Not provided'}</p>
                  </div>
                  {hrtType && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">HRT Type</p>
                      <p className="text-lg text-gray-800">{hrtType}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Health Goals */}
              {healthGoals.length > 0 && (
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Health Goals</h2>
                  <div className="flex flex-wrap gap-2">
                    {healthGoals.map((goal, index) => (
                      <span key={index} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Symptoms & Severity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedSymptoms.map((symptom, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-800 font-medium">{symptom}</span>
                        <span className="text-purple-600 font-bold">
                          {ratings[symptom] ? `${ratings[symptom]}/5` : 'Not rated'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sleep & Lifestyle */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Sleep & Lifestyle</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Sleep Quality</p>
                    <p className="text-lg text-gray-800">{sleepQuality ? `${sleepQuality}/5` : 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Restaurant Frequency</p>
                    <p className="text-lg text-gray-800">{restaurantFrequency || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Alcohol Frequency</p>
                    <p className="text-lg text-gray-800">{alcoholFrequency || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Sweets Frequency</p>
                    <p className="text-lg text-gray-800">{sweetsFrequency || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Nutrition */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Nutrition</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <p className="text-sm font-semibold text-gray-600">Diet Types</p>
                    {dietTypes.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {dietTypes.map((diet, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {diet}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-lg text-gray-800">Not provided</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Drink Preference</p>
                    <p className="text-lg text-gray-800">{drinkPreference || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Daily Fruit Portions</p>
                    <p className="text-lg text-gray-800">{fruitPortions || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Daily Vegetable Portions</p>
                    <p className="text-lg text-gray-800">{vegetablePortions || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Food Allergies */}
              {foodAllergies.length > 0 && (
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Food Allergies</h2>
                  <div className="flex flex-wrap gap-2">
                    {foodAllergies.map((allergy, index) => (
                      <span key={index} className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Food Frequency */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Weekly Food Frequency</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Beans/Peas/Legumes</p>
                    <p className="text-lg text-gray-800">{beansFrequency || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Nuts/Seeds</p>
                    <p className="text-lg text-gray-800">{nutsFrequency || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Whole Grains</p>
                    <p className="text-lg text-gray-800">{grainsFrequency || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Red Meat</p>
                    <p className="text-lg text-gray-800">{redMeatFrequency || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Chicken</p>
                    <p className="text-lg text-gray-800">{chickenFrequency || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Fish</p>
                    <p className="text-lg text-gray-800">{fishFrequency || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Activity & Exercise */}
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#231556' }}>Activity & Exercise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Daily Activity Level</p>
                    <p className="text-lg text-gray-800">{dailyActivity || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Intentional Exercise Days/Week</p>
                    <p className="text-lg text-gray-800">{exerciseDays || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Strength Training Days/Week</p>
                    <p className="text-lg text-gray-800">{strengthDays || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Activity Challenge</p>
                    <p className="text-lg text-gray-800">{activityChallenge || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={resetQuiz}
                className="px-12 py-4 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-all"
                style={{ backgroundColor: '#231556' }}
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Screen {screen}</h1>
        <p className="text-lg text-gray-600 mb-8">Navigation continues...</p>
        <button 
          onClick={goBack} 
          className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-all" 
          style={{ backgroundColor: '#231556' }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}