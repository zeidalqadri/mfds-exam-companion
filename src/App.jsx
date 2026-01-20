import React, { useState, useCallback, useRef } from 'react';

const stationsData = {
  day1: [
    {
      id: 's1d1',
      station: 'Station 1',
      name: 'Bobby Cross',
      age: 'Middle-aged',
      role: 'Office clerk',
      summary: 'Implant placed 2 years ago (£2000+) now failing with blood, pus, redness. Bite always felt high but was reassured by dentist.',
      medicalHistory: 'None relevant',
      allergies: 'None',
      smoking: 'Not mentioned',
      alcohol: 'Not mentioned',
      emotionalArc: {
        start: 'ANGRY & UPSET',
        trigger: 'Once given clear explanations and options',
        end: 'Becomes less angry, more constructive'
      },
      keyPoints: [
        'Not sure if crown loose or whole implant',
        'Bite always felt high — was reassured by dentist',
        'Believes it must be the dentist\'s fault',
        'Spent over £2000 on this treatment',
        'Wants to understand why and what can be done'
      ],
      questions: [
        { id: 1, text: 'Why has this failed so quickly?', prompt: 'Why has this failed so quickly?' },
        { id: 2, text: 'Did I do anything wrong — or did the dentist?', prompt: 'Did I do anything wrong to cause this - if not, did the dentist do anything wrong?' },
        { id: 3, text: 'Why did it feel slightly high when I bit on it?', prompt: 'Why did it feel slightly high all the time when you bit on it?' },
        { id: 4, text: 'What is going on? Describe the x-ray to me.', prompt: 'What is going on? Can you describe the x-ray to me?' },
        { id: 5, text: 'What are the complications of having the implant out?', prompt: 'What the possible complications of having this implant out, how it would be undertaken and how they can be avoided? E.g. fracture, bleeding, pain, swelling, residual numbness, dry sockets, infection.' },
        { id: 6, text: 'What are the treatment options available to me?', prompt: 'What are the treatment options available to me?' },
        { id: 7, text: 'How are you going to help me today?', prompt: 'How are you going to help me today?' }
      ]
    },
    {
      id: 's2d1',
      station: 'Station 2',
      name: 'Chris Jones',
      age: 'Parent',
      role: 'Parent of Betty (15yo)',
      summary: 'Daughter needs extra tooth removed before orthodontic treatment. Wants to avoid surgery and start braces ASAP. Very concerned about GA.',
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
        'Extra tooth found on x-ray (no pain from area)',
        'Must be removed before braces can start',
        'Very concerned about general anaesthetic',
        'Wants to leave tooth and just start brace treatment',
        'Daughter brushes twice daily, attends dentist yearly'
      ],
      questions: [
        { id: 1, text: 'Can the buried tooth be left alone?', prompt: 'Can this buried tooth be left as it is and the orthodontic treatment commenced?' },
        { id: 2, text: 'Why must it be removed first?', prompt: 'Why does this tooth need to be removed before the orthodontic treatment can start?' },
        { id: 3, text: 'Can we avoid general anaesthetic?', prompt: 'I am very concerned about general anaesthetic - can this be avoided?' },
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
      summary: 'Mid-filling, saw nurse touch drawer with dirty gloves. Water tastes stagnant. VERY unhappy — fully conversant with cross-infection procedures.',
      medicalHistory: 'Not relevant',
      allergies: 'Not mentioned',
      smoking: 'Not mentioned',
      alcohol: 'Not mentioned',
      emotionalArc: {
        start: 'APPALLED & DEMANDING',
        trigger: 'Throughout — keep pressing for specifics',
        end: 'Wants formal complaint process'
      },
      keyPoints: [
        'YOU ARE A NURSE — fully conversant with cross-infection protocols',
        'Nurse touched drawer with dirty gloves then continued',
        'Dentist watched and said nothing — just "thank you"',
        'Water tastes stagnant',
        'Want to make a formal complaint'
      ],
      questions: [
        { id: 1, text: 'Why is the nurse touching everything with dirty gloves?', prompt: 'Why is the nurse touching everything with her dirty gloves?' },
        { id: 2, text: 'Why didn\'t the dentist say anything?', prompt: 'Why didn\'t the dentist say anything even though they saw her touching everything?' },
        { id: 3, text: 'What is done to check the water is fresh?', prompt: 'What is done to the water supply to check that it is fresh? What do you do daily, weekly or monthly?' },
        { id: 4, text: 'Temperature checks? Flushing time? Disinfection?', prompt: 'What about temperature checks of the water? How long do you flush the water for? What do you disinfect with?' },
        { id: 5, text: 'What will you do about this?', prompt: 'What will you do about this?' },
        { id: 6, text: 'I want to make a complaint - how do I do this?', prompt: 'I want to make a complaint as this is a serious issue. How can I do this?' },
        { id: 7, text: 'What about my unfinished filling?', prompt: 'What are you going to do about the unfinished filling as I don\'t want that same nurse back in the room?' }
      ]
    },
    {
      id: 's6d1',
      station: 'Station 6',
      name: 'Stephen Barlow',
      age: '68',
      role: 'Retired accountant',
      summary: 'Floor of mouth swelling for ~2 months, growing larger and more painful. On blood thinners. Flight to Spain in 3 weeks — happy to leave it 6 months if complicated.',
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
        'Swelling ~2 months, gradually larger & more painful',
        'No discharge, doesn\'t fluctuate in size',
        'On APIXABAN (blood thinner)',
        'Heavy alcohol + ex-heavy smoker (now vapes)',
        'Flight to Spain in 3 weeks',
        'Happy to leave it 6 months if "too complicated"'
      ],
      questions: [
        { id: 1, text: 'What do you think this lump is?', prompt: 'What do you think this lump is?' },
        { id: 2, text: 'Is this something I should be worried about?', prompt: 'Is this something I should be worried about?' },
        { id: 3, text: 'Can it wait until I\'m back from Spain?', prompt: 'I have a flight booked in 3 weeks. If this problem cannot be sorted out now or it is too complicated, can it wait 6 months when I return to the UK?' },
        { id: 4, text: 'What do you need to do to find out what it is?', prompt: 'What do you need to do to find out what it is?' },
        { id: 5, text: 'Does my heart medication matter?', prompt: 'Does it matter that I take Apixaban for my heart?' }
      ]
    },
    {
      id: 's11d1',
      station: 'Station 11',
      name: 'Peter Collins',
      age: '26',
      role: 'Receptionist at medical practice',
      summary: 'Lower right wisdom tooth pain for 3 days. Had similar problem last month (given mouthwash). Struggling to work. Wants extraction ASAP.',
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
        'Same problem LAST MONTH — given mouthwash which helped',
        'Foul taste, can\'t open mouth fully, can\'t bite together',
        'Job involves talking and answering phones',
        'PENICILLIN ALLERGY',
        'Difficult to brush area due to soreness'
      ],
      questions: [
        { id: 1, text: 'Why is my wisdom tooth getting infected?', prompt: 'Why is my wisdom tooth getting infected?' },
        { id: 2, text: 'Why wasn\'t it removed last month?', prompt: 'Why was my wisdom tooth not removed when I had problems with the tooth last month?' },
        { id: 3, text: 'Are there any risks for this procedure?', prompt: 'Are there any risks for this procedure?' },
        { id: 4, text: 'Will I need to take time off work afterwards?', prompt: 'Will I need to take time off work afterwards?' }
      ]
    },
    {
      id: 's12d1',
      station: 'Station 12',
      name: 'Darcy Bateman',
      age: '40',
      role: 'Office worker',
      summary: 'Double vision after elbow to right cheek playing football. Sees double looking up/down. Right cheek numb. In A&E - only had x-ray, NO formal eye assessment yet.',
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
        'Right cheek numb up to right side of nose',
        'Nose feels blocked, had small nosebleed',
        'Feels a little sick, especially looking up',
        'NO headache, NO loss of consciousness',
        'Has NOT had formal eye assessment yet'
      ],
      questions: [
        { id: 1, text: 'What is causing the double vision?', prompt: 'What is causing the double vision?' },
        { id: 2, text: 'Why does my cheek feel numb?', prompt: 'Why does my right cheek feel numb up to the right side of my nose?' },
        { id: 3, text: 'Is this going to be permanent?', prompt: 'Is this going to be permanent?' },
        { id: 4, text: 'What do you need to do to fix this?', prompt: 'What do you need to do to fix this?' },
        { id: 5, text: 'When can I go back to work?', prompt: 'I am employed in an office job. Looking down at a keyboard is important. When can I go back to work?' }
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
      summary: 'WRONG TOOTH EXTRACTED! Consented for LEFT wisdom tooth (4 infections in 6 months), but RIGHT was removed. Still numb, sitting in chair, furious.',
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
        'LEFT tooth had 4 infections in 6 months (needed extraction)',
        'Signed consent for LEFT extraction',
        'RIGHT tooth was extracted (never had problems with it)',
        'Was too nervous to notice during procedure',
        'Barely slept night before worrying',
        'Still sitting in dental chair, numb on right'
      ],
      questions: [
        { id: 1, text: 'What just happened? Explain this to me!', prompt: 'What just happened? I need an explanation as to what just happened.' },
        { id: 2, text: 'Was anything wrong with the right tooth?', prompt: 'Was there anything wrong with the lower right wisdom tooth that was extracted?' },
        { id: 3, text: 'Why did this happen? What procedures failed?', prompt: 'Why did it happen? Were normal procedures not followed and what procedures are in place to stop this happening?' },
        { id: 4, text: 'Can I get the correct side done today?', prompt: 'What will happen with me now? Can I get the correct side done today?' },
        { id: 5, text: 'Can I have general anaesthetic instead?', prompt: 'Could I have a general anaesthetic as I am too nervous to have this done under local anaesthetic?' },
        { id: 6, text: 'Can I get an urgent/priority referral?', prompt: 'If you mention a hospital referral, can you refer me urgently as a mistake has been made and I should get priority?' },
        { id: 7, text: 'How will you prevent this happening again?', prompt: 'How will the clinic prevent this happening again to me or someone else?' },
        { id: 8, text: 'What compensation will I receive?', prompt: 'What compensation will I receive?' }
      ]
    },
    {
      id: 's6d2',
      station: 'Station 6',
      name: 'Casey Byrne',
      age: '55',
      role: 'Primary school teacher',
      summary: 'Tongue ulcer for 1 month, now very painful with numbness on right side. Has Crohn\'s (on Humira) — used to oral ulcers but this one is different.',
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
        'Ulcer RIGHT side of tongue for 1 month',
        'Recently became very PAINFUL with NUMBNESS',
        'Sharp tooth in lower right — unsure if related',
        'Usually gets clusters of 1-5 ulcers that heal in 10-14 days',
        'THIS ulcer is different — single, persistent, very painful',
        'On immunosuppressant (Humira)',
        'Diet limited to pureed foods and liquids'
      ],
      questions: [
        { id: 1, text: 'Is this related to my Crohn\'s?', prompt: 'I frequently suffer with recurrent oral ulceration every 3-4 months because of my Crohn\'s. Is this just another one of those?' },
        { id: 2, text: 'Why is this ulcer different?', prompt: 'The ulcers I have had in the past generally occur in clusters of 1-5 and heal spontaneously within 10-14 days. Why is this one different?' },
        { id: 3, text: 'Is the sharp tooth causing it?', prompt: 'There is a sharp tooth in the lower right quadrant of my mouth. Is this causing the ulcer?' },
        { id: 4, text: 'Why do I have numbness along the right side of my tongue?', prompt: 'Why do I have numbness along the right side of my tongue?' },
        { id: 5, text: 'What do you need to do to find out what this is?', prompt: 'What do you need to do to find out what this is?' },
        { id: 6, text: 'Is this something serious? Could it be cancer?', prompt: 'Is this something serious? Could it be cancer?' }
      ]
    },
    {
      id: 's11d2',
      station: 'Station 11',
      name: 'Jamie Dawson',
      age: '25',
      role: 'Office worker, lives alone',
      summary: 'Severe wisdom tooth pain (9/10) for 2 days, swelling, bad taste. Diabetic on insulin. Similar problem 1 year ago (antibiotics helped). NOT keen on surgery.',
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
        'Swelling, bad taste, can\'t bite together fully',
        'Similar problem 1 year ago — settled with antibiotics',
        'DIABETIC on insulin — well controlled (BG 5-9)',
        'PENICILLIN ALLERGY',
        'NOT KEEN ON SURGERY',
        'Very worried about permanent numbness'
      ],
      questions: [
        { id: 1, text: 'What can you do to help me now?', prompt: 'I want to know what you can do to help me now and to make sure that this sort of pain doesn\'t come back.' },
        { id: 2, text: 'What shows up on the X-ray?', prompt: 'I am keen to know what shows up on the X-ray.' },
        { id: 3, text: 'What does surgery involve?', prompt: 'I want to know what surgery entails.' },
        { id: 4, text: 'What are the surgery risks, especially with my diabetes?', prompt: 'I want to know the risks of surgery especially because of my diabetes.' },
        { id: 5, text: 'Could the numbness be permanent?', prompt: 'If you mention numbness of the lip and tongue as a complication - I am worried this is going to be permanent.' },
        { id: 6, text: 'Can you show me the nerve on the X-ray?', prompt: 'Can you show me the nerve on the X-ray and how close the nerve is to the tooth?' },
        { id: 7, text: 'Will I look like I\'ve had a stroke?', prompt: 'I am concerned that I will look as if I have had a stroke. I am not happy to be left with a droopy lip after surgery as this is going to affect my quality of life.' },
        { id: 8, text: 'How frequent are these complications?', prompt: 'I want to know how frequent complications of this sort are after surgery.' },
        { id: 9, text: 'Can complications be prevented or corrected?', prompt: 'Is there anything that can be done to prevent it from happening and what can be done to correct it afterwards?' }
      ]
    },
    {
      id: 's12d2',
      station: 'Station 12',
      name: 'James Ellison',
      age: '19',
      role: 'Carpenter',
      summary: 'Jaw very painful after pub fight 2 days ago. Hit on chin. Lower lip/chin numb on LEFT. Can only have liquids. Thought painkillers would fix it.',
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
        'Fight 2 days ago — hit on chin area',
        'NOT knocked unconscious, remembers clearly',
        'Lower lip & chin NUMB on LEFT',
        'Bite feels strange — back teeth meeting one side first',
        'Only having liquids — soft food too painful',
        'Hasn\'t seen anyone until now',
        'Thought painkillers would fix it'
      ],
      questions: [
        { id: 1, text: 'Why am I in pain?', prompt: 'Why am I in pain?' },
        { id: 2, text: 'Where is my jaw broken?', prompt: 'If told your jaw is broken: Where is it broken?' },
        { id: 3, text: 'Why is my face numb?', prompt: 'Why is my face numb?' },
        { id: 4, text: 'Will the numbness be permanent?', prompt: 'Will it remain numb permanently?' },
        { id: 5, text: 'How long will I have to wait to be seen?', prompt: 'If referral offered with no indication of urgency: How long will I have to wait?' },
        { id: 6, text: 'What will they do in hospital?', prompt: 'If referral offered: What will they do in the hospital?' },
        { id: 7, text: 'Can I smoke a cigarette to calm down?', prompt: 'I am keen to have a cigarette to calm me down whilst I take in the diagnosis. Can I smoke a cigarette? Why not?' },
        { id: 8, text: 'What will the surgery involve?', prompt: 'If surgery is mentioned: What will the surgery involve?' }
      ]
    }
  ]
};

// Optimized for one-hand use with large touch targets
const EmotionBadge = ({ arc }) => (
  <div className="bg-slate-700/80 backdrop-blur rounded-2xl p-4 mb-4">
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="bg-red-500/20 text-red-400 font-bold text-xs px-3 py-1.5 rounded-full">START</span>
        <span className="text-white text-sm flex-1">{arc.start}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="bg-yellow-500/20 text-yellow-400 font-bold text-xs px-2 py-1.5 rounded-full">TRIGGER</span>
        <span className="text-slate-300 text-sm flex-1">{arc.trigger}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="bg-green-500/20 text-green-400 font-bold text-xs px-3 py-1.5 rounded-full">END</span>
        <span className="text-white text-sm flex-1">{arc.end}</span>
      </div>
    </div>
  </div>
);

// Large touch-friendly question card
const QuestionCard = ({ question, isChecked, onToggle, isExpanded, onExpand }) => (
  <div
    className={`rounded-2xl p-4 mb-3 transition-all border-2 active:scale-[0.98] ${
      isChecked
        ? 'bg-green-900/30 border-green-600'
        : 'bg-slate-700/80 border-slate-600'
    }`}
  >
    <div className="flex items-start gap-4">
      <button
        onClick={onToggle}
        className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold transition-all active:scale-90 ${
          isChecked
            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
            : 'bg-slate-600 text-slate-300'
        }`}
        aria-label={isChecked ? 'Mark as not asked' : 'Mark as asked'}
      >
        {isChecked ? '✓' : question.id}
      </button>
      <div className="flex-1 min-w-0">
        <button
          onClick={onExpand}
          className="text-left w-full min-h-[44px] flex items-center"
        >
          <p className={`font-medium text-base leading-snug ${isChecked ? 'text-green-300 line-through' : 'text-white'}`}>
            {question.text}
          </p>
        </button>
        {isExpanded && (
          <div className="mt-3 p-4 bg-slate-800/90 rounded-xl border-l-4 border-amber-500">
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Say something like:</p>
            <p className="text-amber-200 italic text-base leading-relaxed">"{question.prompt}"</p>
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
  const scrollRef = useRef(null);
  const touchStartX = useRef(0);

  const toggleQuestion = useCallback((id) => {
    setCheckedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const resetForNextCandidate = useCallback(() => {
    setCheckedQuestions({});
    setExpandedQuestion(null);
    setCandidateCount(prev => prev + 1);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Swipe to go back (right edge swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (touchStartX.current < 30 && diff > 100) {
      onBack();
    }
  };

  const allAnswered = station.questions.every(q => checkedQuestions[q.id]);
  const answeredCount = station.questions.filter(q => checkedQuestions[q.id]).length;

  return (
    <div
      ref={scrollRef}
      className="min-h-screen bg-slate-900 pb-36 overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header - sticky with blur */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 p-4 z-10 safe-top">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="text-slate-400 active:text-white flex items-center gap-2 min-h-[44px] min-w-[44px] -ml-2 px-3 rounded-xl active:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <div className="bg-slate-700/80 px-4 py-2 rounded-full">
            <span className="text-slate-400 text-sm">Candidate </span>
            <span className="text-white font-bold">#{candidateCount}</span>
          </div>
        </div>
        <h1 className="text-xl font-bold text-white">{station.station}: {station.name}</h1>
        <p className="text-slate-400 text-sm mt-1">{station.age} • {station.role}</p>

        {/* Progress bar */}
        <div className="mt-4 bg-slate-700 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(answeredCount / station.questions.length) * 100}%` }}
          />
        </div>
        <p className="text-slate-500 text-xs mt-2">{answeredCount}/{station.questions.length} questions addressed</p>
      </div>

      <div className="p-4">
        {/* Quick Summary */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-4 mb-4 border border-slate-700/50">
          <p className="text-white leading-relaxed">{station.summary}</p>
        </div>

        {/* Medical Info Pills - scrollable horizontally */}
        <div className="flex flex-wrap gap-2 mb-4">
          {station.allergies !== 'None' && station.allergies !== 'None mentioned' && (
            <span className="bg-red-900/80 text-red-200 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1">
              <span>⚠️</span> {station.allergies}
            </span>
          )}
          {station.medicalHistory !== 'None relevant' && station.medicalHistory !== 'Not relevant' && station.medicalHistory !== 'None mentioned' && (
            <span className="bg-blue-900/80 text-blue-200 px-4 py-2 rounded-full text-sm">
              {station.medicalHistory}
            </span>
          )}
          {station.smoking !== 'Not mentioned' && station.smoking !== 'N/A' && station.smoking !== 'Non-smoker' && (
            <span className="bg-orange-900/80 text-orange-200 px-4 py-2 rounded-full text-sm">
              🚬 {station.smoking}
            </span>
          )}
          {station.alcohol !== 'Not mentioned' && station.alcohol !== 'N/A' && station.alcohol !== 'Non-drinker' && (
            <span className="bg-purple-900/80 text-purple-200 px-4 py-2 rounded-full text-sm">
              🍺 {station.alcohol}
            </span>
          )}
        </div>

        {/* Emotional Arc */}
        <EmotionBadge arc={station.emotionalArc} />

        {/* Key Points */}
        <div className="bg-amber-900/30 backdrop-blur rounded-2xl p-4 mb-6 border border-amber-700/50">
          <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
            <span className="text-lg">🔑</span> Key Points
          </h3>
          <ul className="space-y-2">
            {station.keyPoints.map((point, i) => (
              <li key={i} className="text-amber-100 text-sm flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Questions */}
        <h3 className="text-white font-semibold mb-4 text-lg">Questions to Ask</h3>
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

      {/* Bottom Action Bar - thumb-friendly zone */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-lg border-t border-slate-700/50 p-4 safe-bottom">
        {allAnswered ? (
          <button
            onClick={resetForNextCandidate}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 active:from-green-700 active:to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] shadow-lg shadow-green-500/20"
          >
            ✓ Complete — Next Candidate
          </button>
        ) : (
          <button
            onClick={resetForNextCandidate}
            className="w-full bg-slate-600 active:bg-slate-500 text-white py-5 rounded-2xl font-medium transition-all active:scale-[0.98]"
          >
            Reset for Next Candidate
          </button>
        )}
      </div>
    </div>
  );
};

const StationList = ({ day, stations, onSelectStation }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-white mb-4 px-1">{day}</h2>
    <div className="space-y-3">
      {stations.map((station) => (
        <button
          key={station.id}
          onClick={() => onSelectStation(station)}
          className="w-full bg-slate-800/80 backdrop-blur active:bg-slate-700 rounded-2xl p-4 text-left transition-all border border-slate-700/50 active:scale-[0.98]"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
              {station.station}
            </span>
            <span className="text-slate-400 text-sm">{station.questions.length} Qs</span>
          </div>
          <h3 className="text-white font-semibold text-lg mt-2">{station.name}</h3>
          <p className="text-slate-400 text-sm mt-1">{station.age} • {station.role}</p>
          <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-relaxed">{station.summary}</p>
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
    <div className="min-h-screen bg-slate-900 p-4 safe-top">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">MFDS Exam Companion</h1>
        <p className="text-slate-400 mt-1">Select a station to begin</p>
      </div>

      {/* Day Tabs - large touch targets */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveDay('day1')}
          className={`flex-1 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.97] ${
            activeDay === 'day1'
              ? 'bg-white text-slate-900 shadow-lg'
              : 'bg-slate-700/80 text-slate-300 active:bg-slate-600'
          }`}
        >
          Day 1 <span className="text-sm opacity-70">({stationsData.day1.length})</span>
        </button>
        <button
          onClick={() => setActiveDay('day2')}
          className={`flex-1 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.97] ${
            activeDay === 'day2'
              ? 'bg-white text-slate-900 shadow-lg'
              : 'bg-slate-700/80 text-slate-300 active:bg-slate-600'
          }`}
        >
          Day 2 <span className="text-sm opacity-70">({stationsData.day2.length})</span>
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
      <div className="mt-4 bg-slate-800/80 backdrop-blur rounded-2xl p-5 border border-slate-700/50">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="text-lg">📊</span> Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-700/50 rounded-xl p-4">
            <p className="text-3xl font-bold text-white">{stationsData.day1.length + stationsData.day2.length}</p>
            <p className="text-slate-400 text-sm mt-1">Total Stations</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4">
            <p className="text-3xl font-bold text-white">
              {stationsData.day1.reduce((a, s) => a + s.questions.length, 0) +
               stationsData.day2.reduce((a, s) => a + s.questions.length, 0)}
            </p>
            <p className="text-slate-400 text-sm mt-1">Total Questions</p>
          </div>
        </div>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-slate-600 text-xs mt-6 mb-4">
        Swipe from left edge to go back
      </p>
    </div>
  );
}
