// kdm-data.js - Kingdom Death: Monster character data
// Fighting Arts, Disorders, Abilities, and Severe Injuries

const GLOSSARY = {
  'bash': 'Causes survivors to be knocked down.',
  'guardless': 'You cannot ignore hits.',
  'heavy': 'This gear has substantial weight.',
  'paired': 'Paired weapons are two identical weapons that can be used as one. Add the speed of the second weapon when attacking with the first. These weapons must have the same name, and both must be in your gear grid.',
  'two-handed': 'This weapon requires two hands to use. Some gear and rules do not work with two-handed weapons.',
  'endeavors': 'Actions taken during the settlement phase to improve your survivor or settlement.',
  'insanity': 'A measure of psychological stress. Too much insanity can cause disorders.',
  'evasion': 'Your ability to avoid incoming attacks.',
  'perfect hit': 'An attack dice roll result of a Lantern 10. This always results in a hit. When there are multiple Perfect Hits in a single attack, trigger any rules applying to Perfect Hits that many times. Perfect Hits are modified by the Perfection special rule.',
  'surge': 'A type of survival action. When opportunity permits, a survivor may spend 1 survival to surge. Gain +1 Activation which must be spent immediately. This allows them to activate a weapon, interact with terrain, use gear, and anything else spending an activation allows them to do. Resolve the results of the surge (including any monster reactions) before resuming the turn. Each survivor may only surge once per round, and only if the settlement has the Inner Lantern innovation.'
};

const FIGHTING_ARTS_LIST = [
  { id: 'abyssal_sadist', name: 'Abyssal Sadist', description: 'The first time you wound the monster each attack, gain +1 survival and +1 insanity. Ignore the effects of the [Fear of the Dark] and [Prey] disorders.', effect: 'none' },
  { id: 'acrobatics', name: 'Acrobatics', description: 'When you are adjacent to the monster, you may spend Movement to place your survivor on any other space adjacent to the monster.', effect: 'none' },
  { id: 'ambidextrous', name: 'Ambidextrous', description: 'All melee weapons in your gear grid gain [paired]. Ambidextrous cannot be used if there are any shields, [two-handed] or [heavy] gear in your gear grid.', effect: 'none' },
  { id: 'berserker', name: 'Berserker', description: 'Once per showdown, you may spend Activation to suffer [Bash] and the frenzy brain trauma.', effect: 'none' },
  { id: 'bloodzerker', name: 'Bloodzerker', description: 'Gain +1 strength for each of your bleeding tokens. When you have 3+ bleeding tokens, you lose yourself to the blood and are [guardless]!', effect: 'none' },
  { id: 'blotted_out', name: 'Blotted Out', description: 'Whenever you suffer a brain trauma, gain a bleeding token.', effect: 'none' },
  { id: 'tumble', name: 'Tumble', description: 'When something would collide with you, roll 1d10. On a result of 6+, you successfully tumble out of harms way. Instead, place your survivor standing on the closest free space outside of the collision path.', effect: 'none' }
];

const DISORDERS_LIST = [
  { id: 'absent_seizures', name: 'Absent Seizures', description: 'The first time you would suffer a brain trauma each showdown, you are instead knocked down and forget a fighting art (erase it).', effect: 'none' },
  { id: 'aichmophobia', name: 'Aichmophobia', description: 'You cannot activate or depart with axes, swords, spears, daggers, scythes, or katars your gear grid.', effect: 'none' },
  { id: 'anxiety', name: 'Anxiety', description: 'At the start of each showdown, gain the priority target token unless you have stinky gear in your gear grid.', effect: 'none' },
  { id: 'apathetic', name: 'Apathetic', description: 'You cannot use or gain survival. You cannot gain courage. Cure this disorder if you have 8+ understanding.', effect: 'none' },
  { id: 'arithmophilia', name: 'Arithmophilia', description: 'When you gain this disorder, roll 1d5. Your movement is that number. Ignore all other movement modifiers.', effect: 'none' },
  { id: 'atelophobia', name: 'Atelophobia', description: 'When there are no [Perfect Hit] hits in your attack, suffer 1 brain damage.', effect: 'none' },
  { id: 'binge_eating', name: 'Binge Eating', description: 'You cannot depart unless you have consumable gear in your gear grid. You must consume if a choice to consume arises.', effect: 'none' },
  { id: 'bloodlust', name: 'Bloodlust', description: 'Whenever a survivor gains a bleeding token, suffer the frenzy disorder. Limit once per round.', effect: 'none' },
  { id: 'brain_smog', name: 'Brain Smog', description: 'You cannot [Surge] or Concentrate.', effect: 'none' },
];

const ABILITIES_LIST = [
  { id: 'sharp_hearing', name: 'Sharp Hearing', description: 'You can hear subtle sounds others miss.', effect: '+1 Accuracy' },
  { id: 'tough_skin', name: 'Tough Skin', description: 'Your skin is thick and resilient.', effect: 'Heavy injury threshold +1' },
  { id: 'night_vision', name: 'Night Vision', description: 'Your eyes adapt well to darkness.', effect: '+1 Accuracy in darkness' }
];

const SEVERE_INJURIES_LIST = [
  { id: 'broken_arm', name: 'Broken Arm', description: 'Your arm is fractured and immobilized.', effect: '-2 Strength, cannot use two-handed weapons' },
  { id: 'infected_wound', name: 'Infected Wound', description: 'Your wound has become infected.', effect: 'Lose 1 survival each round until healed' },
  { id: 'concussion', name: 'Concussion', description: 'You have suffered a severe blow to the head.', effect: '-1 Accuracy' }
];
