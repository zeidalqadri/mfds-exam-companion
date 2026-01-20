import React, { useState } from 'react';

const stationsData = {
  day1: [
    {
      id: 's1d1',
      station: 'Station 1',
      name: 'Bobby Cross',
      age: 'Middle-aged',
      role: 'Office clerk',
      summary: 'Implant placed 2 years ago (£2000+) now failing with blood, pus, redness. Bite always felt high.',
      medicalHistory: 'None relevant',
      allergies: 'None',
      smoking: 'Not mentioned',
      alcohol: 'Not mentioned',
      emotionalArc: {
        start: 'ANGRY & UPSET',
        trigger: 'Once given clear explanations and options',
        end: 'Calms down, becomes constructive'
      },
      keyPoints: [
        'Not sure if crown loose or whole implant',
        'Mentioned high bite but was reassured',
        'Believes dentist is at fault',
        'Spent £2000+ on this'
      ],
      questions: [
        { id: 1, text: 'Why has this failed so quickly?', prompt: 'I spent over two thousand pounds on this just two years ago. Why has it failed?' },
        { id: 2, text: 'Did I do something wrong — or did the dentist?', prompt: 'I maintained it properly. Is this MY fault or the dentist\'s?' },
        { id: 3, text: 'Why did the bite always feel high?', prompt: 'It always felt high when I bit down. I told the dentist but they said it was fine.' },
        { id: 4, text: 'What does the x-ray show?', prompt: 'Can you explain what\'s going on? What does the x-ray show me?' },
        { id: 5, text: 'Risks of removing the implant?', prompt: 'What are the risks if you have to take this implant out? What could go wrong?' },
        { id: 6, text: 'What treatment options do I have?', prompt: 'So what are my options now? What can be done?' },
        { id: 7, text: 'What can you do for me TODAY?', prompt: 'What are you going to do to help me right now, today?' }
      ]
    },
    {
      id: 's2d1',
      station: 'Station 2',
      name: 'Chris Jones',
      age: 'Parent',
      role: 'Parent of Betty (15yo)',
      summary: 'Daughter needs extra tooth removed before orthodontic treatment. Wants to avoid surgery and start braces ASAP.',
      medicalHistory: 'Daughter has asthma',
      allergies: 'None',
      smoking: 'N/A',
      alcohol: 'N/A',
      emotionalArc: {
        start: 'ANXIOUS & RESISTANT',
        trigger: 'When surgery necessity is explained clearly',
        end: 'Accepts if well justified'
      },
      keyPoints: [
        'Extra tooth found on x-ray (no pain)',
        'Must be removed before braces',
        'Very concerned about general anaesthetic',
        'Wants to leave tooth and just do braces'
      ],
      questions: [
        { id: 1, text: 'Can the buried tooth be left alone?', prompt: 'Can\'t you just leave the extra tooth and start the braces anyway?' },
        { id: 2, text: 'Why must it be removed first?', prompt: 'Why does this tooth HAVE to come out before orthodontic treatment?' },
        { id: 3, text: 'Can we avoid general anaesthetic?', prompt: 'I\'m really worried about general anaesthetic. Is there any way to avoid it?' },
        { id: 4, text: 'What are the risks of surgery?', prompt: 'What could go wrong with this surgery?' },
        { id: 5, text: 'When can braces start after surgery?', prompt: 'How soon after the surgery can she start her brace treatment?' }
      ]
    },
    {
      id: 's3d1',
      station: 'Station 3',
      name: 'Mr/Mrs Smith',
      age: '54',
      role: 'Community nurse',
      summary: 'Mid-filling, saw nurse touch drawer with dirty gloves. Water tastes stagnant. VERY unhappy — knows cross-infection protocols.',
      medicalHistory: 'Not relevant',
      allergies: 'Not mentioned',
      smoking: 'Not mentioned',
      alcohol: 'Not mentioned',
      emotionalArc: {
        start: 'APPALLED & DEMANDING',
        trigger: 'Throughout — keep pressing',
        end: 'Wants formal complaint process'
      },
      keyPoints: [
        'YOU ARE A NURSE — you know protocols',
        'Nurse touched drawer with dirty gloves',
        'Dentist saw it and said nothing',
        'Water tastes stagnant',
        'Want to make a formal complaint'
      ],
      questions: [
        { id: 1, text: 'Why did nurse touch things with dirty gloves?', prompt: 'Why is the nurse touching everything with her dirty gloves?' },
        { id: 2, text: 'Why didn\'t the dentist say anything?', prompt: 'The dentist SAW her do it and didn\'t say a word. Why?' },
        { id: 3, text: 'What are the water supply checks?', prompt: 'What do you do to check the water is fresh? Daily? Weekly? Monthly?' },
        { id: 4, text: 'Temperature checks? Flushing? Disinfection?', prompt: 'What about temperature checks? How long do you flush the water? What do you disinfect with?' },
        { id: 5, text: 'What will you do about this?', prompt: 'So what are you going to do about what I just witnessed?' },
        { id: 6, text: 'How do I make a formal complaint?', prompt: 'I want to make a complaint. This is serious. How do I do that?' },
        { id: 7, text: 'What about my unfinished filling?', prompt: 'And what about my filling that\'s not finished? I don\'t want that same nurse back in here.' }
      ]
    },
    {
      id: 's6d1',
      station: 'Station 6',
      name: 'Stephen Barlow',
      age: '68',
      role: 'Retired accountant',
      summary: 'Floor of mouth swelling for 2 months, growing larger and more painful. On blood thinners. Wants to go to Spain in 3 weeks!',
      medicalHistory: 'AF, high BP — takes Apixaban, Simvastatin, Ramipril',
      allergies: 'None mentioned',
      smoking: 'Ex-smoker (30/day for 30 years), now vapes',
      alcohol: '2 pints/day + 1-2 whiskeys nightly',
      emotionalArc: {
        start: 'DISMISSIVE',
        trigger: 'When urgency of investigation explained',
        end: 'May resist if wants to delay for Spain trip'
      },
      keyPoints: [
        'Swelling 2 months, getting larger & painful',
        'On APIXABAN (blood thinner)',
        'Heavy alcohol intake',
        'Ex-heavy smoker (now vapes)',
        'Flight to Spain in 3 weeks — may want to delay',
        'Happy to leave it 6 months if "too complicated"'
      ],
      questions: [
        { id: 1, text: 'What could this lump be?', prompt: 'What do you think this lump is?' },
        { id: 2, text: 'Is it serious?', prompt: 'Is this something I should be worried about?' },
        { id: 3, text: 'Can it wait until I\'m back from Spain?', prompt: 'I\'ve got a flight to Spain in 3 weeks. Can\'t this wait until I\'m back in 6 months?' },
        { id: 4, text: 'What tests/investigations are needed?', prompt: 'What do you need to do to find out what it is?' },
        { id: 5, text: 'Does my heart medication matter?', prompt: 'Does it matter that I\'m on blood thinners for my heart?' }
      ]
    },
    {
      id: 's11d1',
      station: 'Station 11',
      name: 'Peter Collins',
      age: '26',
      role: 'Receptionist at medical practice',
      summary: 'Lower right wisdom tooth pain for 3 days. Had similar issue last month. Struggling to work. Wants extraction ASAP.',
      medicalHistory: 'Asthma (Salbutamol, Beclometasone)',
      allergies: 'PENICILLIN',
      smoking: 'Social, up to 10/day',
      alcohol: '20 units/week',
      emotionalArc: {
        start: 'STRESSED & IN PAIN',
        trigger: 'Needs to work, can\'t cope',
        end: 'Wants quick resolution'
      },
      keyPoints: [
        'Pain 8/10, can\'t sleep or eat',
        'Same problem LAST MONTH — given mouthwash',
        'Foul taste, can\'t open mouth fully',
        'Job requires talking on phone',
        'PENICILLIN ALLERGY'
      ],
      questions: [
        { id: 1, text: 'Why does my wisdom tooth keep getting infected?', prompt: 'Why does this keep happening? This is the second time!' },
        { id: 2, text: 'Why wasn\'t it removed last month?', prompt: 'Why didn\'t they just take it out last month when I had this problem?' },
        { id: 3, text: 'What are the risks of extraction?', prompt: 'What could go wrong if you take it out?' },
        { id: 4, text: 'Will I need time off work?', prompt: 'Will I need to take time off work afterwards? My job needs me talking all day.' }
      ]
    },
    {
      id: 's12d1',
      station: 'Station 12',
      name: 'Darcy Bateman',
      age: '40',
      role: 'Office worker',
      summary: 'Double vision after elbow to right cheek playing football. Sees double looking up/down. Right cheek numb. In A&E.',
      medicalHistory: 'Fit and well, perfect eyesight normally',
      allergies: 'None',
      smoking: 'Non-smoker',
      alcohol: 'Non-drinker',
      emotionalArc: {
        start: 'WORRIED',
        trigger: 'Concerned about work (needs to look at keyboard)',
        end: 'Needs reassurance about prognosis'
      },
      keyPoints: [
        'Double vision when looking UP or DOWN',
        'Normal vision looking straight/left/right',
        'Right cheek numb up to nose',
        'Nose feels blocked, had small nosebleed',
        'Feels a little sick especially looking up',
        'NO headache, NO loss of consciousness',
        'Has NOT had formal eye assessment yet'
      ],
      questions: [
        { id: 1, text: 'What\'s wrong with me?', prompt: 'What\'s causing the double vision?' },
        { id: 2, text: 'Why is my cheek numb?', prompt: 'Why can\'t I feel my right cheek?' },
        { id: 3, text: 'Will this get better?', prompt: 'Is this going to be permanent?' },
        { id: 4, text: 'What treatment do I need?', prompt: 'What do you need to do to fix this?' },
        { id: 5, text: 'When can I go back to work?', prompt: 'I need to look at a keyboard for my job. When can I work again?' }
      ]
    }
  ],
  day2: [
    {
      id: 's1d2',
      station: 'Station 1',
      name: 'Jason Jones',
      age: '28',
      role: 'Nervous patient',
      summary: 'WRONG TOOTH EXTRACTED! Consented for LEFT wisdom tooth, but RIGHT was removed. Still numb, sitting in chair, furious.',
      medicalHistory: 'None mentioned',
      allergies: 'None mentioned',
      smoking: 'Not mentioned',
      alcohol: 'Not mentioned',
      emotionalArc: {
        start: 'FURIOUS & CONFUSED',
        trigger: 'Take a LONG time to calm down',
        end: 'Eventually accepts explanation but wants answers'
      },
      keyPoints: [
        'LEFT tooth had 4 infections in 6 months',
        'Signed consent for LEFT extraction',
        'RIGHT tooth was extracted (no problems with it)',
        'Was too nervous to notice during procedure',
        'Barely slept night before',
        'Still sitting in dental chair, numb on right'
      ],
      questions: [
        { id: 1, text: 'What just happened?!', prompt: 'What the hell just happened? Explain this to me!' },
        { id: 2, text: 'Was anything wrong with the right tooth?', prompt: 'Was there even anything wrong with the tooth you just took out?' },
        { id: 3, text: 'Why did this happen? What procedures failed?', prompt: 'WHY did this happen? What procedures are supposed to stop this? Were they followed?' },
        { id: 4, text: 'Can you do the correct side today?', prompt: 'Can you take out the correct tooth now? Today?' },
        { id: 5, text: 'Can I have general anaesthetic instead?', prompt: 'I\'m too nervous now. Can I have a general anaesthetic for the other side?' },
        { id: 6, text: 'Can I get urgent/priority referral?', prompt: 'If I need hospital referral, I should get priority — you made the mistake!' },
        { id: 7, text: 'How will you prevent this happening again?', prompt: 'How will you make sure this doesn\'t happen to anyone else?' },
        { id: 8, text: 'What compensation will I receive?', prompt: 'What compensation am I going to get for this?' }
      ]
    },
    {
      id: 's6d2',
      station: 'Station 6',
      name: 'Casey Byrne',
      age: '55',
      role: 'Primary school teacher',
      summary: 'Tongue ulcer for 1 month, now very painful with numbness. Has Crohn\'s (on Humira) — used to oral ulcers but this is different.',
      medicalHistory: 'Crohn\'s disease (on Adalimumab/Humira), well controlled',
      allergies: 'None',
      smoking: 'Ex-smoker (quit 5 years ago, was 20/day)',
      alcohol: '2 bottles wine/week',
      emotionalArc: {
        start: 'CONCERNED',
        trigger: 'When differences from usual ulcers highlighted',
        end: 'Needs clear explanation of next steps'
      },
      keyPoints: [
        'Ulcer RIGHT side of tongue, 1 month',
        'Recently became PAINFUL with NUMBNESS',
        'Sharp tooth in lower right — unsure if related',
        'Usually gets clusters of 1-5 ulcers that heal in 10-14 days',
        'THIS ulcer is different — single, persistent, painful',
        'On immunosuppressant (Humira)',
        'Can only eat pureed food/liquids'
      ],
      questions: [
        { id: 1, text: 'Is this related to my Crohn\'s?', prompt: 'I get ulcers because of my Crohn\'s. Is this just another one of those?' },
        { id: 2, text: 'Why is this one so different?', prompt: 'My usual ulcers heal in 2 weeks. This has been here a month. Why?' },
        { id: 3, text: 'Is the sharp tooth causing it?', prompt: 'I have a sharp tooth there. Could that be causing it?' },
        { id: 4, text: 'Why is my tongue numb?', prompt: 'Why has my tongue gone numb on that side?' },
        { id: 5, text: 'What tests do I need?', prompt: 'What do you need to do to find out what this is?' },
        { id: 6, text: 'Could this be cancer?', prompt: 'Is this something serious? Could it be cancer?' }
      ]
    },
    {
      id: 's11d2',
      station: 'Station 11',
      name: 'Jamie Dawson',
      age: '25',
      role: 'Office worker, lives alone',
      summary: 'Severe wisdom tooth pain for 2 days, swelling, bad taste. Diabetic on insulin. Had similar issue 1 year ago. NOT keen on surgery.',
      medicalHistory: 'Type 1 Diabetes (10 years) — Insulin detemir 10-20 units twice daily. BG 5-9.',
      allergies: 'PENICILLIN',
      smoking: '10/day',
      alcohol: '10 units/week',
      emotionalArc: {
        start: 'IN PAIN & ANXIOUS',
        trigger: 'Very worried about surgery risks with diabetes',
        end: 'Needs reassurance about nerve risks'
      },
      keyPoints: [
        'Pain 9/10, can\'t sleep or eat for 2 days',
        'Swelling, bad taste, can\'t bite together',
        'Similar problem 1 year ago — settled with antibiotics',
        'DIABETIC on insulin',
        'PENICILLIN ALLERGY',
        'NOT KEEN ON SURGERY',
        'Very worried about numbness being permanent'
      ],
      questions: [
        { id: 1, text: 'What can you do to help me NOW?', prompt: 'I\'m in agony. What can you do right now to help me?' },
        { id: 2, text: 'What shows on the x-ray?', prompt: 'What can you see on my x-ray?' },
        { id: 3, text: 'What does surgery involve?', prompt: 'If I need surgery, what does that actually involve?' },
        { id: 4, text: 'What are the surgery risks with my diabetes?', prompt: 'What are the risks of surgery? Especially because I\'m diabetic?' },
        { id: 5, text: 'Could my lip/tongue go permanently numb?', prompt: 'You mentioned numbness — could that be PERMANENT?' },
        { id: 6, text: 'Show me the nerve on the x-ray', prompt: 'Can you show me where the nerve is on the x-ray? How close is it to the tooth?' },
        { id: 7, text: 'Will I look like I\'ve had a stroke?', prompt: 'Will I end up with a droopy lip? Looking like I\'ve had a stroke?' },
        { id: 8, text: 'How common are these complications?', prompt: 'How often do these complications actually happen?' },
        { id: 9, text: 'Can complications be prevented/fixed?', prompt: 'Is there anything that can prevent it? And if it happens, can it be fixed?' }
      ]
    },
    {
      id: 's12d2',
      station: 'Station 12',
      name: 'James Ellison',
      age: '19',
      role: 'Carpenter',
      summary: 'Jaw very painful after pub fight 2 days ago. Hit on chin. Lower lip/chin numb on LEFT. Can only have liquids. Probable fracture.',
      medicalHistory: 'Fit and well, no previous surgery',
      allergies: 'None',
      smoking: '20/day',
      alcohol: '6-7 pints Fri & Sat nights',
      emotionalArc: {
        start: 'IN PAIN & SHAKEN',
        trigger: 'When told jaw is broken',
        end: 'Wants to understand treatment & smoke a cigarette'
      },
      keyPoints: [
        'Fight 2 days ago — hit on chin',
        'NOT knocked unconscious, remembers clearly',
        'Lower lip & chin NUMB on LEFT',
        'Back teeth meeting one side first',
        'Only having liquids — soft food too painful',
        'Hasn\'t seen anyone until now',
        'Thought painkillers would fix it'
      ],
      questions: [
        { id: 1, text: 'Why am I in so much pain?', prompt: 'Why does it hurt this much?' },
        { id: 2, text: 'Where is my jaw broken?', prompt: 'Where exactly is it broken?' },
        { id: 3, text: 'Why is my face numb?', prompt: 'Why can\'t I feel my lip and chin?' },
        { id: 4, text: 'Will the numbness be permanent?', prompt: 'Is this numbness going to be permanent?' },
        { id: 5, text: 'How long will I wait for hospital?', prompt: 'How long will I have to wait to be seen?' },
        { id: 6, text: 'What will hospital do?', prompt: 'What will they actually do at the hospital?' },
        { id: 7, text: 'Can I smoke a cigarette now?', prompt: 'Can I go have a cigarette to calm down? ... Why not?' },
        { id: 8, text: 'What does the surgery involve?', prompt: 'If I need surgery, what will that involve?' }
      ]
    }
  ]
};

const EmotionBadge = ({ arc }) => (
  <div className="bg-slate-700 rounded-lg p-3 mb-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-red-400 font-bold text-sm">START:</span>
      <span className="text-white text-sm">{arc.start}</span>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <span className="text-yellow-400 font-bold text-sm">TRIGGER:</span>
      <span className="text-slate-300 text-sm">{arc.trigger}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-400 font-bold text-sm">END:</span>
      <span className="text-white text-sm">{arc.end}</span>
    </div>
  </div>
);

const QuestionCard = ({ question, isChecked, onToggle, isExpanded, onExpand }) => (
  <div 
    className={`rounded-xl p-4 mb-3 transition-all border-2 ${
      isChecked 
        ? 'bg-green-900/30 border-green-600' 
        : 'bg-slate-700 border-slate-600'
    }`}
  >
    <div className="flex items-start gap-3">
      <button
        onClick={onToggle}
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold transition-all ${
          isChecked 
            ? 'bg-green-500 text-white' 
            : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
        }`}
      >
        {isChecked ? '✓' : question.id}
      </button>
      <div className="flex-1">
        <button 
          onClick={onExpand}
          className="text-left w-full"
        >
          <p className={`font-medium ${isChecked ? 'text-green-300 line-through' : 'text-white'}`}>
            {question.text}
          </p>
        </button>
        {isExpanded && (
          <div className="mt-3 p-3 bg-slate-800 rounded-lg border-l-4 border-amber-500">
            <p className="text-sm text-slate-400 mb-1">SAY SOMETHING LIKE:</p>
            <p className="text-amber-200 italic">"{question.prompt}"</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const StationView = ({ station, onBack }) => {
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [candidateCount, setCandidateCount] = useState(1);

  const toggleQuestion = (id) => {
    setCheckedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetForNextCandidate = () => {
    setCheckedQuestions({});
    setExpandedQuestion(null);
    setCandidateCount(prev => prev + 1);
  };

  const allAnswered = station.questions.every(q => checkedQuestions[q.id]);
  const answeredCount = station.questions.filter(q => checkedQuestions[q.id]).length;

  return (
    <div className="min-h-screen bg-slate-900 pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-white flex items-center gap-1"
          >
            ← Back
          </button>
          <div className="bg-slate-700 px-3 py-1 rounded-full">
            <span className="text-slate-400 text-sm">Candidate </span>
            <span className="text-white font-bold">#{candidateCount}</span>
          </div>
        </div>
        <h1 className="text-xl font-bold text-white">{station.station}: {station.name}</h1>
        <p className="text-slate-400 text-sm">{station.age} • {station.role}</p>
        
        {/* Progress bar */}
        <div className="mt-3 bg-slate-700 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / station.questions.length) * 100}%` }}
          />
        </div>
        <p className="text-slate-500 text-xs mt-1">{answeredCount}/{station.questions.length} questions addressed</p>
      </div>

      <div className="p-4">
        {/* Quick Summary */}
        <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
          <p className="text-white">{station.summary}</p>
        </div>

        {/* Medical Info Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {station.allergies !== 'None' && station.allergies !== 'None mentioned' && (
            <span className="bg-red-900 text-red-200 px-3 py-1 rounded-full text-sm font-medium">
              ⚠️ ALLERGY: {station.allergies}
            </span>
          )}
          {station.medicalHistory !== 'None relevant' && station.medicalHistory !== 'Not relevant' && station.medicalHistory !== 'None mentioned' && (
            <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
              {station.medicalHistory}
            </span>
          )}
          {station.smoking !== 'Not mentioned' && station.smoking !== 'N/A' && station.smoking !== 'Non-smoker' && (
            <span className="bg-orange-900 text-orange-200 px-3 py-1 rounded-full text-sm">
              🚬 {station.smoking}
            </span>
          )}
          {station.alcohol !== 'Not mentioned' && station.alcohol !== 'N/A' && station.alcohol !== 'Non-drinker' && (
            <span className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm">
              🍺 {station.alcohol}
            </span>
          )}
        </div>

        {/* Emotional Arc */}
        <EmotionBadge arc={station.emotionalArc} />

        {/* Key Points */}
        <div className="bg-amber-900/30 rounded-xl p-4 mb-4 border border-amber-700">
          <h3 className="text-amber-400 font-semibold mb-2">🔑 Key Points to Remember</h3>
          <ul className="space-y-1">
            {station.keyPoints.map((point, i) => (
              <li key={i} className="text-amber-100 text-sm">• {point}</li>
            ))}
          </ul>
        </div>

        {/* Questions */}
        <h3 className="text-white font-semibold mb-3">Questions to Ask</h3>
        {station.questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            isChecked={checkedQuestions[q.id]}
            onToggle={() => toggleQuestion(q.id)}
            isExpanded={expandedQuestion === q.id}
            onExpand={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
          />
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-4">
        {allAnswered ? (
          <button
            onClick={resetForNextCandidate}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg transition-colors"
          >
            ✓ Complete — Next Candidate
          </button>
        ) : (
          <button
            onClick={resetForNextCandidate}
            className="w-full bg-slate-600 hover:bg-slate-500 text-white py-4 rounded-xl font-medium transition-colors"
          >
            Reset for Next Candidate
          </button>
        )}
      </div>
    </div>
  );
};

const StationList = ({ day, stations, onSelectStation }) => (
  <div>
    <h2 className="text-lg font-bold text-white mb-3 px-1">{day}</h2>
    <div className="space-y-3">
      {stations.map((station) => (
        <button
          key={station.id}
          onClick={() => onSelectStation(station)}
          className="w-full bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition-colors border border-slate-700"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="bg-slate-600 text-white px-2 py-1 rounded text-sm font-medium">
              {station.station}
            </span>
            <span className="text-slate-400 text-sm">{station.questions.length} questions</span>
          </div>
          <h3 className="text-white font-semibold">{station.name}</h3>
          <p className="text-slate-400 text-sm">{station.age} • {station.role}</p>
          <p className="text-slate-500 text-sm mt-2 line-clamp-2">{station.summary}</p>
        </button>
      ))}
    </div>
  </div>
);

export default function ExamCompanion() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [activeDay, setActiveDay] = useState('day1');

  if (selectedStation) {
    return <StationView station={selectedStation} onBack={() => setSelectedStation(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">RCSE Exam Companion</h1>
        <p className="text-slate-400">Select a station to begin</p>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveDay('day1')}
          className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
            activeDay === 'day1' 
              ? 'bg-white text-slate-900' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Day 1 ({stationsData.day1.length})
        </button>
        <button
          onClick={() => setActiveDay('day2')}
          className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
            activeDay === 'day2' 
              ? 'bg-white text-slate-900' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Day 2 ({stationsData.day2.length})
        </button>
      </div>

      {/* Station Lists */}
      {activeDay === 'day1' && (
        <StationList 
          day="Day 1 Stations" 
          stations={stationsData.day1} 
          onSelectStation={setSelectedStation} 
        />
      )}
      {activeDay === 'day2' && (
        <StationList 
          day="Day 2 Stations" 
          stations={stationsData.day2} 
          onSelectStation={setSelectedStation} 
        />
      )}

      {/* Quick Stats */}
      <div className="mt-8 bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-white font-semibold mb-2">📊 Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{stationsData.day1.length + stationsData.day2.length}</p>
            <p className="text-slate-400 text-sm">Total Stations</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {stationsData.day1.reduce((a, s) => a + s.questions.length, 0) + 
               stationsData.day2.reduce((a, s) => a + s.questions.length, 0)}
            </p>
            <p className="text-slate-400 text-sm">Total Questions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
