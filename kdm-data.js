// kdm-data.js - Kingdom Death: Monster character data
// Fighting Arts, Disorders, Abilities, and Severe Injuries

const GLOSSARY = {
  'paired': 'Paired weapons are two identical weapons that can be used as one. Add the speed of the second weapon when attacking with the first. These weapons must have the same name, and both must be in your gear grid.',
  'two-handed': 'This weapon requires two hands to use. Some gear and rules do not work with two-handed weapons.',
  'heavy': 'This gear has substantial weight.',
  'endeavors': 'Actions taken during the settlement phase to improve your survivor or settlement.',
  'insanity': 'A measure of psychological stress. Too much insanity can cause disorders.',
  'evasion': 'Your ability to avoid incoming attacks.'
};

const FIGHTING_ARTS_LIST = [
  { id: 'tumble', name: 'Tumble', description: 'You are naturally athletic and graceful.', effect: '+1 Evasion' },
  { id: 'monster_slayer', name: 'Monster Slayer', description: 'You have a talent for fighting monsters.', effect: '+1 Accuracy vs Monsters' },
  { id: 'berserker', name: 'Berserker', description: 'You have learned to channel your rage.', effect: '+1 Strength, -1 Evasion' },
  { id: 'ambidextrous', name: 'Ambidextrous', description: 'All melee weapons in your gear grid gain [paired]. Ambidextrous cannot be used if there are any shields, [two-handed] or [heavy] gear in your gear grid.', effect: 'none' }
];

const DISORDERS_LIST = [
  { id: 'absent_seizures', name: 'Absent Seizures', description: 'The first time you would suffer a brain trauma each showdown, you are instead knocked down and forget a fighting art (erase it).', effect: 'none' },
  { id: 'aichmophobia', name: 'Aichmophobia', description: 'You cannot activate or depart with axes, swords, spears, daggers, scythes, or katars your gear grid.', effect: 'none' },
  { id: 'anxiety', name: 'Anxiety', description: 'At the start of each showdown, gain the priority target token unless you have stinky gear in your gear grid.', effect: 'none' }
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
