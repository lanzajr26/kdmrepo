// kdm-data.js - Kingdom Death: Monster character data
// Fighting Arts, Disorders, Abilities, and Permanent Injuries

const GLOSSARY = {
  'barbed': 'On a Perfect hit, gain +X strength for the rest of the attack.',
  'bash': 'Causes survivors to be knocked down.',
  'collision': 'When a survivor suffers collision, they are knocked down.',
  'cursed': 'This gear cannot be removed from the gear grid for any reason. If the survivor dies, archive this gear.',
  'deadly': 'Gain +X luck while attacking with this weapon. This increases the odds of inflicting critical wounds.',
  'deaf': 'An impairment. You won\'t hear it coming. Suffer -1 permanent evasion. This injury is permanent and can be recorded once.',
  'deflect': 'When you Deflect X, gain (or lose) deflect tokens until you have X of them. When you are hit, if you have any deflect tokens, you ignore that hit and lose a deflect token. When you Deflect X, you lose the benefits of Block.',
  'devastating': 'When a devastating weapon wounds a monster, it will inflict X additional wounds.',
  'frenzy': 'A survivor who suffers this is Frenzied until the end of the Showdown Phase. Gain +1 strength token, +1 speed token, and 1d5 insanity. Ignore the "slow" special rule on melee weapons. A frenzied survivor may not spend survival or use fighting arts, weapon specialization, or weapon mastery. A survivor may be Frenzied multiple times.',
  'guardless': 'You cannot ignore hits.',
  'heavy': 'This gear has substantial weight.',
  'two-handed': 'This weapon requires two hands to use. Some gear and rules do not work with two-handed weapons.',
  'encourage': 'A survival action. A standing survivor may spend 1 survival at any time to encourage a knocked down survivor, letting them stand. Deaf survivors may not be encouraged. Each survivor may only Encourage once per round, and only if the settlement has the Language innovation.',
  'endeavors': 'Actions taken during the settlement phase to improve your survivor or settlement.',
  'impervious': 'Impervious hit locations cannot be wounded, even with a Lantern 10 wound roll. Wound attempts will never remove AI cards. However, critical effects may still occur.',
  'insanity': 'A measure of psychological stress. Too much insanity can cause disorders.',
  'evasion': 'Your ability to avoid incoming attacks.',
  'momentum': 'When you travel 4 or more spaces from movement or knockback without passing over the same space twice, gain +1 momentum token. When you successfully Tumble, gain +1 momentum token. When you are knocked down, lose all your momentum tokens.',
  'noisy': 'This gear is hard to keep quiet.',
  'paired': 'Paired weapons are two identical weapons that can be used as one. Add the speed of the second weapon when attacking with the first. These weapons must have the same name, and both must be in your gear grid.',
  'perfect hit': 'An attack dice roll result of a Lantern 10. This always results in a hit. When there are multiple Perfect Hits in a single attack, trigger any rules applying to Perfect Hits that many times. Perfect Hits are modified by the Perfection special rule.',
  'provoke': 'When you wound with this weapon, gain the priority target token.',
  'savage': 'After the first critical wound in an attack, savage weapons cause 1 additional wound. This rule does not trigger on [Impervious] hit locations.',
  'slam': 'Spend activation and full move forward in a straight line. If you move 4+ spaces and stop adjacent to a monster, it suffers knockback 1 and -1 toughness until the end of the round.',
  'sharp': 'Add 1d10 strength to each wound attempt using this gear. This d10 is not a wound roll, and cannot cause critical wounds.',
  'surge': 'A type of survival action. When opportunity permits, a survivor may spend 1 survival to surge. Gain +1 Activation which must be spent immediately. This allows them to activate a weapon, interact with terrain, use gear, and anything else spending an activation allows them to do. Resolve the results of the surge (including any monster reactions) before resuming the turn. Each survivor may only surge once per round, and only if the settlement has the Inner Lantern innovation.'
};

// Weapon proficiency data is keyed by the select option value.
// Add new weapon types here and they will automatically appear in the dropdown.
const WEAPON_PROFICIENCY_DATA = {
  axe: {
    name: 'Axe',
    specialist: { title: 'Axe Specialist', description: 'When attacking with an axe, if your wound attempt fails, you may ignore it and attempt to wound the selected hit location again. Limit, once per attack.', effect: 'none', stats: {} },
    master: { title: 'Axe Mastery', description: 'When an Axe Master wounds a monster with an axe at a location with a persistent injury, that wound becomes a critical wound. All survivors gain Axe Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  bow: {
    name: 'Bow',
    specialist: { title: 'Bow Specialist', description: 'When attacking with a bow you may reroll any misses once. Limit, once per attack.', effect: 'none', stats: {} },
    master: { title: 'Bow Mastery', description: 'If you are a Bow Master, all bows in your gear grid gain [Deadly] 2. In addition, ignore cumbersome on all bows. All survivors gain Bow Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  club: {
    name: 'Club',
    specialist: { title: 'Club Specialist', description: 'When attacking with a club, on a [Perfect hit], double your wound attempt total on the first selected hit location. Limit, once per attack.', effect: 'none', stats: {} },
    master: { title: 'Club Mastery', description: 'When a Club Master attacks with a club, if a successful wound attempt total is greater than or equal to twice the monster\'s toughness, inflict an additional wound. All survivors gain Club Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  dagger: {
    name: 'Dagger',
    specialist: { title: 'Dagger Specialist', description: 'When attacking with a Dagger, if a wound attempt fails, after performing any reactions, you may discard another drawn hit location card to attempt to wound the failed hit location again. Limit once per attack.', effect: 'none', stats: {} },
    master: { title: 'Dagger Mastery', description: 'After a wounded hit location is discarded, a Dagger Master who is adjacent to the attacker and the wounded monster may spend 1 survival to re-draw the wounded hit location and attempt to wound with a dagger. Treat monster reactions on the re-drawn hit location card normally. All survivors gain Dagger Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  fan: {
    name: 'Fan',
    specialist: { title: 'Fan Specialist', description: 'At the start of your act, you may lose all deflect tokens. At the end of your act, if you are standing and have a fan in your gear grid, you may [Deflect] 1 for free.', effect: 'none', stats: {} },
    master: { title: 'Fan Mastery', description: 'While you have no deflect tokens, fans in your gear grid gain [Sharp] and [Devastating] 1. While you have any deflect tokens, increase the range of your [Perfect hits] with fans by 2. All survivors gain Fan Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  'fist-tooth': {
    name: 'Fist & Tooth',
    specialist: { title: 'Fist & Tooth Specialist', description: 'You may stand (if knocked down) at the start of the monster\'s turn or the survivor\'s turn. Limit, once per round.', effect: 'none', stats: {} },
    master: {
      title: 'Fist & Tooth Mastery',
      description: 'While a survivor is a Fist & Tooth Master, they gain +2 permanent accuracy and +2 permanent strength (they receive this bonus even when not attacking with Fist & Tooth). All survivors gain Fist & Tooth Specialization in addition to their other weapon proficiencies.',
      effect: '+2 accuracy, +2 strength',
      stats: { accuracy: 2, strength: 2 }
    }
  },
  grand: {
    name: 'Grand Weapon',
    specialist: { title: 'Grand Weapon Specialist', description: 'When attacking with a grand weapon, gain +1 accuracy. When attacking with a grand weapon during your act, if you critically wound, the monster is knocked down.',
       effect: '+1 accuracy',
        stats: { accuracy: 1 } },
    master: { title: 'Grand Weapon Mastery', description: 'When a Grand Weapon Master [perfect hit]s with a grand weapon, cancel all reactions for that attack. All survivors gain Grand Weapon Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  katar: {
    name: 'Katar',
    specialist: { title: 'Katar Specialist', description: 'When attacking with a katar, cancel reactions on the first selected hit locations.', effect: 'none', stats: {} },
    master: { title: 'Katar Mastery', description: 'If you are a Katar Master, gain a +1 evasion token on a [Perfect hit] with a katar. When you are knocked down, remove all +1 evasion tokens. All survivors gain Katar Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  shield: {
    name: 'Shield',
    specialist: { title: 'Shield Specialist', description: 'While a shield is in your gear grid, you are no longer knocked down after [Collision] with a monster. While a shield is in your gear grid, add 1 to all hit locations.', effect: 'none', stats: {} },
    master: { title: 'Shield Mastery', description: 'When a Shield Master is adjacent to a survivor that is targeted by a monster, they may swap spaces on the board with the survivor and become the target instead. The master must have a shield to perform this. All survivors gain Shield Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  spear: {
    name: 'Spear',
    specialist: { title: 'Spear Specialist', description: 'When attacking with a spear, if you draw a trap, roll 1d10. On a 7+, cancel the trap. Discard it, then reshuffle the hit location discard into the hit location deck and draw a new card. Limit once per round.', effect: 'none', stats: {} },
    master: { title: 'Spear Mastery', description: 'Whenever a Spear Master hits a monster with a spear, they may spend 1 survival to gain the priority target token. If they made the hit from directly behind another survivor, that survivor gains the priority target token instead. All survivors gain Spear Specialization in addition to their other weapon proficiencies.', effect: 'none', stats: {} }
  },
  sword: {
    name: 'Sword',
    specialist: { title: 'Sword Specialist', description: 'When attacking with a sword, after drawing hit locations, make a wound attempt and then select a hit location to resolve with that result. Limit once per attack.', effect: 'none', stats: {} },
    master: { title: 'Sword Mastery', description: 'A Sword Master gains +1 accuracy, +1 strength, and +1 speed when attacking with a Sword. All survivors gain Sword Specialization in addition to their other weapon proficiencies.', 
      effect: '+1 accuracy, +1 strength, +1 speed', 
      stats: {accuracy: 1, strength: 1, speed: 1}
   }
  },
  sword_willow: {
    name: 'Sword Willow',
    specialist: { title: 'Sword Willow Specialist', description: 'Swords in your gear grid gain Block 1 and the two-handed keyword. When you block or deflect a hit with a sword, gain +1 survival. Limit once per round.', effect: 'none', stats: {} },
    master: { title: 'Sword Willow Mastery', description: 'After resolving a monster\'s AI card, if you ignored a hit with a block or deflect, you may spend 1 survival to activate a sword and attack. Limit once per round.', 
      effect: 'none', 
      stats: {}
   }
  },  
  twilight_sword: {
    name: 'Twilight Sword',
    specialist: { title: 'Twilight Sword Specialist', description: 'This sentient sword improves as it\'s used. Gain the effects as proficiency rank increases: <br>2 Ignore Cumbersome on Twilight Sword.<br>4 When attacking with the Twilight Sword, ignore slow and gain +2 speed.<br>6 Twilight Sword gains deadly.', effect: 'none', stats: {} },
    master: { title: 'Twilight Sword Mastery', description: 'Any survivor who attains Twilight Sword Mastery leaves the settlement forever in pursuit of a higher purpose. Remove them from the settlement\'s population. You may place the master\'s Twilight Sword in another survivor\'s gear grid or archive it.', effect: 'none', stats: {} }
  },  
  whip: {
    name: 'Whip',
    specialist: { title: 'Whip Specialist', description: 'When you wound with a whip, instead of moving the top card of the AI deck into the wound stack, you may move the top card of the AI discard pile. Limit once per attack.', effect: 'none', stats: {} },
    master: { title: 'Whip Mastery', description: 'Whip Masters gain +5 strength when attacking with a whip. All survivors gain Whip Specialization in addition to their other weapon proficiencies.', 
      effect: '+5 strength', 
      stats: {strength: 5}
}
  }
};

const FIGHTING_ARTS_LIST = [
  { id: 'abyssal_sadist', name: 'Abyssal Sadist', description: 'The first time you wound the monster each attack, gain +1 survival and +1 insanity. Ignore the effects of the [Fear of the Dark] and [Prey] disorders.', effect: 'none' },
  { id: 'acrobatics', name: 'Acrobatics', description: 'When you are adjacent to the monster, you may spend Movement to place your survivor on any other space adjacent to the monster.', effect: 'none' },
  { id: 'ambidextrous', name: 'Ambidextrous', description: 'All melee weapons in your gear grid gain [paired]. Ambidextrous cannot be used if there are any shields, [two-handed] or [heavy] gear in your gear grid.', effect: 'none' },
  { id: 'berserker', name: 'Berserker', description: 'Once per showdown, you may spend Activation to suffer [Bash] and the frenzy brain trauma.', effect: 'none' },
  { id: 'bloodzerker', name: 'Bloodzerker', description: 'Gain +1 strength for each of your bleeding tokens. When you have 3+ bleeding tokens, you lose yourself to the blood and are [guardless]!', effect: 'none' },
  { id: 'blotted_out', name: 'Blotted Out', description: 'Whenever you suffer a brain trauma, gain a bleeding token.', effect: 'none' },
  { id: 'burning_ambition', name: 'Burning Ambition', description: 'When you are instructed to skip the next hunt, ignore it. The "Skip Next Hunt" box on your survivor record sheet cannot be filled in.', effect: 'none' },
  { id: 'burning_focus', name: 'Burning Focus', description: 'If you have 0 survival at the start of your act, gain 1 survival.', effect: 'none' },
  { id: 'carapace_of_will', name: 'Carapace of Will', description: 'On Arrival, gain the Steadfast survivor status card. When you are attacked, if you have 2+ steadfast tokens, ignore a hit and remove all your steadfast tokens.', effect: 'none' },
  { id: 'champions_rite', name: 'Champions Rite', description: 'Before making an attack, you may add your understanding to your accuracy attribute for that attack.', effect: 'none' },
  { id: 'clutch_fighter', name: 'Clutch Fighter', description: 'While you have 3 or more bleeding tokens, gain +1 strength and +1 accuracy.', effect: 'none' },
  { id: 'combo_master', name: 'Combo Master', description: 'On a [Perfect Hit] make 1 additional attack roll.', effect: 'none' },
  { id: 'crazed', name: 'Crazed', description: 'On a [Perfect Hit], gain +1 insanity.', effect: 'none' },
  { id: 'crossarm_block', name: 'Crossarm Block', description: 'Whenever you are hit, after hit locations are rolled, you may change 1 result to the arms hit location.', effect: 'none' },
  { id: 'defender', name: 'Defender', description: 'When a survivor adjacent to you is knocked down, you may spend 1 survival. If you do, they stand and gain +1 survival from your words of encouragement. You cannot use this if you have the shattered jaw severe injury.', effect: 'none' },
  { id: 'double_dash', name: 'Double Dash', description: 'During your act, once per round, you may spend Activation to gain Movement', effect: 'none' },
  { id: 'extra_sense', name: 'Extra Sense', description: 'You may Dodge 1 additional time per round.', effect: 'none' },
  { id: 'fated_blow', name: 'Fated Blow', description: 'Once per showdown, you may give your next wound attempt +2 strength and [Devastating] X 1.', effect: 'none' },
  { id: 'glass_mask', name: 'Glass Mask', description: 'When you depart, you lightly cut your ears, rub blood all over your face, and wait for it to dry. Gain +3 insanity. If you have Face Painting, you create a seal between your glass mask and your armor. Gain an additional +3 insanity.', effect: 'none' },
  { id: 'harvestman', name: 'Harvestman', description: 'Gain +3 movement. Whenever you are knocked down, gain -1 movement token. If you have the Tiny Arachnophobia disorder, you are too scared of spiders to imitate them and you cannot use this fighting art.', effect: 'none' },
  { id: 'headliner', name: 'Headliner', description: 'When you become [Doomed] or gain the [Priority Target] token, you may choose to gain +1 survival or +1 strength token.', effect: 'none' },
  { id: 'heroic', name: 'Heroic', description: 'Once per showdown, if you are standing adjacent to the monster and have 3+ survival, you may spend all of your survival for one automatic hit that inflicts a critical wound.', effect: 'none' },
  { id: 'invigorator', name: 'Invigorator', description: 'Gain +1 accuracy and +1 speed while you have no insanity.', effect: 'none' },
  { id: 'last_man_standing', name: 'Last Man Standing', description: 'While you are the only survivor on the showdown board, you may not gain bleeding tokens or be knocked down.', effect: 'none' },
  { id: 'leader', name: 'Leader', description: 'Whenever you Encourage a survivor, they gain +1 speed token until the end of the round. Once per hunt phase, you may inspire another survivor. They use your understanding and courage to resolve a hunt or story event. (Example: if you have 3+ courage you can inspire another survivor to walk the path of the brave during Overwhelming Darkness.)', effect: 'none' },
  { id: 'lure_epilepsy', name: 'Lure Epilepsy', description: 'Once per showdown, you may spend Activation to give yourself a seizure. You suffer a random brain trauma and are knocked down.', effect: 'none' },
  { id: 'mammoth_hunting', name: 'Mammoth Hunting', description: 'Gain +1 strength when attacking from adjacent spaces outside the monster\'s facing and blind spot.', effect: 'none' },
  { id: 'mighty_strike', name: 'Mighty Strike', description: 'On a [Perfect Hit], gain +2 strength until the end of the attack.', effect: 'none' },
  { id: 'monster_claw_style', name: 'Monster Claw Style', description: 'Your Fist & Tooth attacks gain +1 accuracy, +1 strength and [Savage].', effect: 'none' },
  { id: 'orator_of_death', name: 'Orator of Death', description: 'Once per showdown, you may spend Activation to have all non-deaf survivors gain +2 insanity. When you die, you [Encourage] all survivors with your last words.', effect: 'none' },
  { id: 'otherworldly_luck', name: 'Otherworldly Luck', description: 'During the hunt and settlement phase, whenever you roll on a table, you may add +1 to the roll result. This may not exceed the highest possible result of that table. This includes Hunt Events, Story Events, Endeavors, Settlement Events, etc.', effect: 'none' },
  { id: 'phantom_friend', name: 'Phantom Friend', description: 'The first time you gain a resource during a showdown, you may feed it to your phantom friend. If you do, archive the resource and gain +1 evasion token. Lose this token if you are [Deaf] or become deaf during the showdown.', effect: 'none' },
  { id: 'propulsion_drive', name: 'Propulsion Drive', description: 'On Arrival, gain the [Momentum] survivor status card. When you attack, if you have 5+ momentum tokens, remove them all and roll 1d10. Gain that amount of luck and strength when attempting to wound the first selected hit location for this attack.', effect: 'none' },
  { id: 'purpose', name: 'Purpose', description: 'Your comrades make you strong enough to exceed the limits of death itself. During the showdown, if you would gain a lethal number of bleeding tokens while there are any other standing survivors, roll 1d10. On a 6+, you live but are knocked down. You will not bleed to death until you gain another bleeding token.', effect: 'none' },
  { id: 'rhythm_chaser', name: 'Rhythm Chaser', description: 'On Arrival, gain +1 evasion token. When you are knocked down, if you don\'t have an instrument in your gear grid, remove all your +1 evasion tokens. Rhythm Chaser cannot be used if there is any [Heavy] gear in your gear grid.', effect: 'none' },
  { id: 'ruthless', name: 'Ruthless', description: 'Whenever a survivor dies during the showdown, roll 1d10. On a 7+, gain a Skull basic resource.', effect: 'none' },
  { id: 'seasoned_hunter', name: 'Seasoned Hunter', description: 'Whenever a random hunt event result is: 11, 22, 33, 44, 55, 66, 77, 88, 99, or 100, the event revealer gains +1 understanding and +1 courage.', effect: 'none' },
  { id: 'sneak_attack', name: 'Sneak Attack', description: 'When you attack a monster from its blind spot, gain +4 strength for that attack.', effect: 'none' },
  { id: 'strategist', name: 'Strategist', description: 'During the showdown setup, after placing terrain, you may add a Giant Stone Face or a Toppled Pillar terrain card to the showdown board.', effect: 'none' },
  { id: 'tenacious', name: 'Tenacious', description: 'When your wound attempt on a hit location is a failure, you may put that hit location back on top of the deck instead of in the discard pile. Limit, once per round.', effect: 'none' },
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
  { id: 'coprolalia', name: 'Coprolalia', description: 'All your gear is [noisy]. You are always a threat unless you are knocked down, even if an effect says otherwise.', effect: 'none' },
  { id: 'fear_of_the_dark', name: 'Fear of the Dark', description: 'You [retire]. If you gain this disorder during a hunt or showdown, you put on a brave face until you return to the settlement, vowing never to leave the Lantern Hoard again.', effect: 'none' },
  { id: 'hemophobia', name: 'Hemophobia', description: 'During the showdown, whenever a survivor (including you) gains a bleeding token, you are knocked down.', effect: 'none' },
  { id: 'hoarder', name: 'Hoarder', description: 'Whenever you are a returning survivor, archive 1 resource gained from the last showdown and gain +1 courage.', effect: 'none' },
  { id: 'honorable', name: 'Honorable', description: 'You cannot attack a monster from its blind spot or if it is knocked down.', effect: 'none' },
  { id: 'hyperactive', name: 'Hyperactive', description: 'During the showdown, you must move at least 1 space every round.', effect: 'none' },
  { id: 'immortal', name: 'Immortal', description: 'While you are insane, convert all damage dealt to your hit locations to brain damage. You are so busy reveling in your own glory that you cannot spend survival while insane.', effect: 'none' },
  { id: 'indecision', name: 'Indecision', description: 'If you are the event revealer of hunt events that call on you to make a roll, roll twice and use the lower result.', effect: 'none' },
  { id: 'monster_panic', name: 'Monster Panic', description: 'Whenever you suffer brain damage from an intimidate action, suffer 1 additional brain damage.', effect: 'none' },
  { id: 'post_traumatic_stress', name: 'Post-Traumatic Stress', description: 'Next settlement phase, you do not contribute or participate in any endeavors. Skip the next hunt to recover.', effect: 'none' },
  { id: 'prey', name: 'Prey', description: 'You may not spend survival unless you are insane.', effect: 'none' },
  { id: 'quixotic', name: 'Quixotic', description: 'If you are insane when you depart, gain +1 survival and +1 strength token.', effect: 'none' },
  { id: 'rageholic', name: 'Rageholic', description: 'Whenever you suffer a severe injury, also suffer the frenzy brain trauma.', effect: 'none' },
  { id: 'secretive', name: 'Secretive', description: 'When you are a returning survivor, you quickly become preoccupied with your own affairs. You must skip the next hunt to deal with them.', effect: 'none' },
  { id: 'seizures', name: 'Seizures', description: 'During the showdown, whenever you suffer damage to your head location, you are knocked down.', effect: 'none' },
  { id: 'squeamish', name: 'Squeamish', description: 'You cannot depart with any stinky gear in your gear grid. If a status or effect would cause you to become [stinky], lose all your survival.', effect: 'none' },
  { id: 'traumatized', name: 'Traumatized', description: 'Whenever you end your act adjacent to a monster, you are knocked down.', effect: 'none' },
  { id: 'vermin_obsession', name: 'Vermin Obsession', description: 'While there is a Bug Patch terrain tile on the showdown board, you are so overwhelmed that you cannot spend survival.', effect: 'none' },
  { id: 'vestiphobia', name: 'Vestiphobia', description: 'You cannot wear armor at the body location. If you are wearing armor at the body location when you gain this disorder, archive it as you tear it off your person!', effect: 'none' },
  { id: 'weak_spot', name: 'Weak Spot', description: 'When you gain this disorder, roll a random hit location and record it. You cannot depart unless you have armor at this hit location.', effect: 'none' }
];

const ABILITIES_LIST = [
  { id: 'acceleration', name: 'Acceleration', description: 'Add +1d10 movement to a move action. Before moving, you may roll the Death Die and add the result to your movement for one move action this round.', effect: 'none' },
  { id: 'acid_palms', name: 'Acid Palms', description: 'Add 1d10 strength to wound attempts when attacking with Fist & Tooth.', effect: 'none' },
  { id: 'ageless', name: 'Ageless', description: 'You may hunt if you are retired. When you gain Hunt XP, you may decide not to gain it. Saviors age unnaturally and cannot use Ageless, though they are able to gain Ageless.', effect: 'none' },
  { id: 'aggression_overload', name: 'Aggression Overload', description: 'Add an attack roll to an attack. During your attack, after making your attack rolls but before drawing hit locations, you may roll the Death Die as an additional attack roll.', effect: 'none' },
  { id: 'analyze', name: 'Analyze', description: 'At the start of the survivors\' turn, if you are adjacent to the monster, reveal the top AI card, then place it back on top of the deck.', effect: 'none' },
  { id: 'astute', name: 'Astute', description: 'On Arrival, if possible, add an acanthus plant terrain card to the showdown.', effect: 'none' },
  { id: 'bitter_frenzy', name: 'Bitter Frenzy', description: 'Each showdown, the first time you suffer the frenzy brain trauma, gain 1d10 survival. You may spend survival while Frenzied.', effect: 'none' },
  { id: 'burnt_nerves', name: 'Burnt Nerves', description: 'You are immune to [bash].', effect: 'none' },
  { id: 'caratosis', name: 'Caratosis', description: ' Before making an attack roll, you may declare "Caratosis X" in a loud, booming voice. If you do, that attack gains X automatic hits. X cannot be more than your total red affinities. When the attack ends, gain +X hunt XP.', effect: 'none' },
  { id: 'crystal_skin', name: 'Crystal Skin', description: 'You ignore [cursed] and cannot wear armor. When you depart gain 3 to all hit locations. Suffer -2 to the result of all severe injury rolls. When you participate in Intimacy, newborns gain Crystal Skin in addition to any other roll results.', effect: 'none' },
  { id: 'dormenatus', name: 'Dormenatus', description: 'When you suffer damage, you may declare "Dormenatus X" in a loud, booming voice, if you do, gain X armor points to each hit location. X cannot be more than your total green affinities. After the damage is resolved, gain +X hunt XP.', effect: 'none' },
  { id: 'explore', name: 'Explore', description: 'When you roll on an investigate table, add +2 to your roll result.', effect: 'none' },
  { id: 'fated_battle', name: 'Fated Battle', description: 'At the start of a showdown with the picked monster, gain +1 speed token.', effect: 'none' },
  { id: 'forgettable', name: 'Forgettable', description: 'Gain +2 permanent evasion. Forgettable survivors cannot be encouraged.', effect: 'none' },
  { id: 'heart_of_the_sword', name: 'Heart of the Sword', description: 'If you gain a weapon proficiency during the Aftermath, gain +3 additional ranks. You cough up a hunk of your own solidified blood and gain +1 Iron strange resource.', effect: 'none' },
  { id: 'homing_instinct', name: 'Homing Instinct', description: 'Add +5 to your rolls on the Run Away story event.', effect: 'none' },
  { id: 'iridescent_hide', name: 'Iridescent Hide', description: 'Gain 1 to all hit locations for each different-colored affinity in your gear grid.', effect: 'none' },
  { id: 'iron_will', name: 'Iron Will', description: 'You cannot be knocked down. Reduce all knockback you suffer to knockback 1.', effect: 'none' },
  { id: 'legendcaller', name: 'Legendcaller', description: 'Once a lifetime, on a hunt board space after Overwhelming Darkness, in place of rolling a random hunt event, use "53" as your result.', effect: 'none' },
  { id: 'legs_locked', name: 'Legs Locked', description: 'While you have the Death Die, you stand. While you have the Death Die, you cannot be knocked down for any reason.', effect: 'none' },
  { id: 'leyline_walker', name: 'Leyline Walker', description: 'While there is no armor or accessory gear in your gear grid, gain +3 evasion.', effect: '+3 evasion' },
  { id: 'life_exchange', name: 'Life Exchange', description: 'In the Aftermath, gain 1 additional Hunt XP. You may not wear other gear. If you trigger the White Secret story event, you cease to exist. When you retire, you cease to exist.', effect: 'none' },
  { id: 'limb_maker', name: 'Limb-maker', description: 'Once per settlement phase, spend 2 Endeavors to carve a prosthetic limb. Remove a survivor\'s dismembered injury and add 1 bone to the settlement\'s storage.', effect: 'none' },
  { id: 'lucernae', name: 'Lucernae', description: 'Before making a wound attempt, you many declare "Lucernae X" in a loud, booming voice. If you do, that wound attempt gains X Luck. X cannot be more than your total blue affinities. When the attack ends, gain +X hunt XP. When you trigger Age 2, gain the Lucernae\'s Lantern secret fighting art.', effect: 'none' },
  { id: 'mad_oracle', name: 'Mad Oracle', description: 'Once per showdown, as a monster draws an AI, name a card. If the AI card drawn is the named card, gain +1 evasion token.', effect: 'none' },
  { id: 'matchmaker', name: 'Matchmaker', description: 'When you are a returning survivor, once per lantern year, you may spend an Endeavor to trigger the Story Event Intimacy.', effect: 'none' },
  { id: 'metabolic_surrender', name: 'Metabolic Surrender', description: 'Any time during the showdown, you may roll the Death Die. Gain twice that much survival. This round, ignore negative effects of permanent injuries, impairments, disorders, and negative attributes (including tokens). At the end of the round, you die.', effect: 'none' },
  { id: 'metal_maw', name: 'Metal Maw', description: 'Your Fist & Tooth attacks gain [Sharp] (add 1d10 strength to each wound attempt).', effect: 'none' },
  { id: 'nightmare_blood', name: 'Nightmare Blood', description: 'Whenever you gain a bleeding token, add 1 to all hit locations.', effect: 'none' },
  { id: 'nightmare_membrane', name: 'Nightmare Membrane', description: 'You may spend Movement & Activation to exchange any 1 of your tokens for a +1 strength token.', effect: 'none' },
  { id: 'nightmare_spurs', name: 'Nightmare Spurs', description: 'Once per showdown, you may spend all of your survival (at least 1) to lose all your +1 strength tokens and gain that many +1 luck tokens.', effect: 'none' },
  { id: 'oracles_eye', name: 'Oracle\'s Eye', description: 'At the start of the showdown, look through the AI deck, then shuffle it.', effect: 'none' },
  { id: 'partner', name: 'Partner', description: 'When you gain this ability, add the name of your partner. Partners may only nominate each other for Story Event Intimacy. When you partner dies, gain a random disorder and lose this ability.', effect: 'none' },
  { id: 'peerless', name: 'Peerless', description: 'When you gain insanity, you may gain an equal amount of survival.', effect: 'none' },
  { id: 'possessed', name: 'Possessed', description: 'The survivor cannot use weapon specialization, weapon mastery, or fighting arts.', effect: 'none' },
  { id: 'prepared', name: 'Prepared', description: 'When rolling to determine a straggler, add your hunt experience to your roll result.', effect: 'none' },
  { id: 'presage', name: 'Presage', description: 'Each time you attack, before drawing hit locations, loudly say a name. You lightly bite the eye in your cheek to see what it sees. If you draw any hit locations with the name, gain +3 insanity and +10 strength when attempting to wound them.', effect: 'none' },
  { id: 'pristine', name: 'Pristine', description: 'When you suffer a dismembered severe injury, ignore it and gain 1 bleeding token instead.', effect: 'none' },
  { id: 'psychovore', name: 'Psychovore', description: 'Once per showdown, you may eat an adjacent survivor\'s disorder. If you do, remove the disorder. They gain 1 bleeding token and you gain +1 permanent strength. At the end of the showdown, if you haven\'t eaten a disorder, you die.', effect: 'none' },
  { id: 'reflection', name: 'Reflection', description: 'Your complete affinities and incomplete affinity halves count as all colors. You may dodge at any time and as many times as you like each round. When you attack from a blind spot, add +1d10 to all wound attempts for that attack.', effect: 'none' },
  { id: 'refraction', name: 'Refraction', description: 'Your complete affinities and incomplete affinity halves count as all colors. During the Showdown, after you perform a survival action, gain +1 survival.', effect: 'none' },
  { id: 'rooted_to_all', name: 'Rooted to All', description: 'If you are standing at the start of your act, reveal the top 2 cards of the AI deck and put them back in any order.', effect: 'none' },
  { id: 'sour_death', name: 'Sour Death', description: 'When you are knocked down, you may encourage yourself. If you do, gain +1 strength token.', effect: 'none' },
  { id: 'stalwart', name: 'Stalwart', description: 'Ignore being knocked down by brain trauma and intimidate actions.', effect: 'none' },
  { id: 'story_of_the_forsaker', name: 'Story of the Forsaker', description: 'You cannot be knocked down during a showdown with a nemesis monster.', effect: 'none' },
  { id: 'story_of_the_goblin', name: 'Story of the Goblin', description: 'Once per showdown, you may roll 1d10. On a 3+, gain the priority target token and the monster gains +1 damage token.', effect: 'none' },
  { id: 'story_of_the_young_hero', name: 'Story of the Young Hero', description: 'At the start of each of your acts, you may choose to gain 1 survival and 2 bleeding tokens.', effect: 'none' },
  { id: 'super_hair', name: 'Super Hair', description: 'You may spend Activation to freely exchange any tokens with adjacent survivors who have Super Hair.', effect: 'none' },
  { id: 'sweet_battle', name: 'Sweet Battle', description: 'You may surge without spending survival. If you do, they must be used to activate a weapon. You may use Sweet Battle even if your settlement cannot normally Surge. You may also use Sweet Battle when you have no survival and/or cannot spend survival. This does not let you Surge more than once per round.', effect: 'none' },
  { id: 'thundercaller', name: 'Thundercaller', description: 'Once a lifetime, on a hunt board space after Overwhelming Darkness, in place of rolling a random hunt event, use "100" as your result.', effect: 'none' },
  { id: 'tinker', name: 'Tinker', description: 'When you are a returning survivor, gain +1 Endeavor to use this settlement phase.', effect: 'none' },
  { id: 'twelve_fingers', name: 'Twelve Fingers', description: 'You cannot carry two-handed gear. On a [Perfect hit], your right hand pulses. Gain +5 insanity and +1 luck for the attack. However, for each natural 1 rolled when attempting to hit, your left hand shakes. Suffer 5 brain damage and -1 luck for the attack.', effect: 'none' },
  { id: 'twilight_succession', name: 'Twilight Succession', description: 'If you die during the showdown and you have a Twilight Sword, nominate another survivor on the showdown board to gain the Twilight Sword and this ability.', effect: 'none' },
  { id: 'uninhibited_rage', name: 'Uninhibited Rage', description: 'Add +1d10 strength to a wound attempt. After a wound attempt is rolled you may roll the Death Die and add the result to the strength of your wound attempt.', effect: 'none' },
  { id: 'way_of_the_rust', name: 'Way of the Rust', description: 'Your bleeding tokens are also +1 evasion tokens.', effect: 'none' }
];

const SEVERE_INJURIES_LIST = [
  { id: 'blind', name: 'Blind', description: 'Lose an eye. Suffer -1 permanent accuracy. This injury is permanent and can be recorded twice. A survivor with two blind severe injuries suffers -4 permanent accuracy and retires at the end of the next showdown or settlement phase, having lost all sight.', effect: '-1 accuracy' },
  { id: 'broken_arm', name: 'Broken Arm', description: 'An ear-shattering crunch. Suffer -1 permanent accuracy and -1 permanent strength. This injury is permanent, and can be recorded twice.', effect: '-1 accuracy, -1 strength' },
  { id: 'broken_hip', name: 'Broken Hip', description: 'Your hip is dislocated. You can no longer dodge. Suffer -1 permanent movement. This injury is permanent and can be recorded once. Gain 1 bleeding token.', effect: '-1 movement' },
  { id: 'broken_rib', name: 'Broken Rib', description: 'It even hurts to breathe. Suffer -1 permanent speed. This injury is permanent, and can be recorded multiple times.', effect: '-1 speed' },
  { id: 'contracture', name: 'Contracture', description: 'The arm will never be the same. Suffer -1 permanent accuracy. This injury is permanent and can be recorded multiple times.', effect: '-1 accuracy' },
  { id: 'deaf', name: 'Deaf', description: 'You won\'t hear it coming. Suffer -1 permanent evasion. This injury is permanent and can be recorded once.', effect: '-1 evasion' },
  { id: 'destroyed_back', name: 'Destroyed Back', description: 'A sharp crackling noise. Suffer -2 permanent movement. You can no longer activate any gear that has 2+ strength. This injury is permanent and can be recorded once.', effect: '-2 movement' },
  { id: 'destroyed_genitals', name: 'Destroyed Genitals', description: 'You cannot be nominated for Story Event Intimacy. This injury is permanent and can be recorded once. Gain a random disorder. You are knocked down. Gazing upwards, you wonder at the futility of your struggle. Gain +3 insanity.', effect: '+3 insanity' },
  { id: 'dismembered_arm', name: 'Dismembered Arm', description: 'Lose an arm. You can no longer activate two-handed weapons. This injury is permanent and can be recorded twice. A survivor with two dismembered arm severe injuries cannot activate any weapons.', effect: 'none' },
  { id: 'dismembered_leg', name: 'Dismembered Leg', description: 'Lose a leg. You suffer -2 permanent movement and can no longer dash. This injury is permanent and can be recorded twice. A survivor with two dismembered leg severe injuries has lost both of their legs and must retire at the end of the next showdown or settlement phase.', effect: '-2 movement' },
  { id: 'gaping_chest_wound', name: 'Gaping Chest Wound', description: 'Suffer -1 permanent strength. This injury is permanent, and can be recorded multiple times. ', effect: '-1 strength' },
  { id: 'hamstrung', name: 'Hamstrung', description: 'A painful rip. The leg is unusable. You can no longer use any fighting arts or abilities. This injury is permanent and can be recorded once.', effect: 'none' },
  { id: 'intestinal_prolapse', name: 'Intestinal Prolapse', description: 'Your gut is gravely injured. You can no longer equip any gear on your waist, as it is too painful to wear. This injury is permanent and can be recorded once.', effect: 'none' },
  { id: 'intracranial_hemorrhage', name: 'Intracranial Hemorrhage', description: 'You can no longer use or gain any survival. This injury is permanent and can be recorded once.', effect: 'none' },
  { id: 'ruptured_muscle', name: 'Ruptured Muscle', description: 'A painful rip. The arm hangs limp. You can no longer activate fighting arts. This injury is permanent and can be recorded once.', effect: 'none' },
  { id: 'shattered_jaw', name: 'Shattered Jaw', description: 'You drink your meat through a straw. You can no longer consume or be affected by events requiring you to consume. You can no longer encourage. This injury is permanent and can be recorded once.', effect: 'none' },
  { id: 'warped_pelvis', name: 'Warped Pelvis', description: 'Your pelvis is disfigured. Suffer -1 permanent luck. This injury is permanent and can be recorded multiple times.', effect: '-1 luck' }
];

const COURAGE_LIST = [
  { id: 'courage_bonus_1', name: 'Stalwart', description: 'Ignore being knocked down by brain trauma and intimidate actions.', effect: 'none' },
  { id: 'courage_bonus_2', name: 'Prepared', description: 'When rolling to determine a straggler, add your hunt experience to your roll result.', effect: 'none' },
  { id: 'courage_bonus_3', name: 'Matchmaker', description: 'When you are a returning survivor, once per year you may spend an Endeavor to Story Event Intimacy.', effect: 'none' },
  { id: 'courage_bonus_4', name: 'Sweet Battle', description: 'Once per round, you may surge without spending survival. If you do, the Activation must be used to activate a weapon.', effect: 'none' },
  { id: 'courage_bonus_5', name: 'Bitter Frenzy', description: 'Each showdown, the first time you suffer the [frenzy] brain trauma, gain d10 survival. You may spend survival while Frenzied.', effect: 'none' },
  { id: 'courage_bonus_6', name: 'Sour Death', description: 'When you are knocked down, you may encourage yourself (even if you\'re deaf). If you do, gain +1 strength token.', effect: 'none' }
];

const UNDERSTANDING_LIST = [
  { id: 'understanding_bonus_1', name: 'Analyze', description: 'At the start of the survivors\' turn, if you are adjacent to the monster, reveal the top AI card, then place it back on top of the deck.', effect: 'none' },
  { id: 'understanding_bonus_2', name: 'Explore', description: 'When you roll on an investigate table, add +2 to your roll result.', effect: 'none' },
  { id: 'understanding_bonus_3', name: 'Tinker', description: 'When you are a returning survivor, gain +1 Endeavor to use this settlement phase.', effect: 'none' },
  { id: 'understanding_bonus_4', name: 'Ageless', description: 'You may hunt if you are retired. When you gain Hunt XP, you may decide not to gain it. Saviors age unnaturally and cannot use Ageless.', effect: 'none' },
  { id: 'understanding_bonus_5', name: 'Peerless', description: 'When you gain insanity, you may gain an equal amount of survival.', effect: 'none' },
  { id: 'understanding_bonus_6', name: 'Leyline Walker', description: 'While there is no armor or accessory gear in your gear grid, gain +3 evasion.', effect: 'none' }
];

const COURAGE_REMINDER_TEXT = Object.freeze({
  3: 'Courage milestone reached. Complete <strong>Bold</strong> story event.',
  9: 'Courage milestone reached. Complete <strong>See the Truth</strong> story event.'
});

const UNDERSTANDING_REMINDER_TEXT = Object.freeze({
  3: 'Understanding milestone reached. Complete <strong>Insight</strong> story event',
  9: 'Understanding milestone reached. Complete <strong>White Secret</strong> story event.'
});

// Bestiary / Monster page scaffolding (Phase 3)
const BESTIARY_MONSTER_ORDER = Object.freeze([
  'white_lion',
  'butcher',
  'screaming_antelope',
  'kings_man',
  'the_hand',
  'phoenix',
  'watcher',
  'gold_smoke_knight'
]);

const WHITE_LION_HUNT_SETUP = Object.freeze({
  title: 'White Lion Hunt Setup',
  notes: [
    'Use this section to present level-based hunt setup details.',
    'List required hunt event deck adjustments for the chosen White Lion level.',
    'Include any campaign-era or expansion condition overrides here.'
  ],
  terrainDeck: [
    'Tall Grass',
    'Stone Face',
    'Acid Palms',
    'Spidicules Spore',
    'Random Basic Terrain x4'
  ]
});

const WHITE_LION_SHOWDOWN_SETUP = Object.freeze({
  title: 'White Lion Showdown Setup',
  notes: [
    'Place the White Lion according to the board setup coordinates.',
    'Place all survivors according to the board setup survivor positions.',
    'Apply level-specific setup rules before the first survivor turn.'
  ]
});

const WHITE_LION_AI_CARDS = Object.freeze([
  { name: 'Claw', type: 'Basic Action', description: 'A straightforward attack action used as a baseline behavior card.' },
  { name: 'Maul', type: 'Basic Action', description: 'Heavy forward pressure attack that punishes survivors in close range.' },
  { name: 'Cunning', type: 'Trait / Reaction', description: 'Manipulates targeting and can force awkward survivor positioning.' },
  { name: 'Stalker', type: 'Advanced Action', description: 'Repositions and isolates targets before delivering focused attacks.' },
  { name: 'Terrifying Roar', type: 'Mood / Trigger', description: 'Adds intimidation pressure and can disrupt survivor turn planning.' }
]);

const WHITE_LION_SHOWDOWN_SURVIVOR_STARTS = Object.freeze([
  { col: 1, row: 10 },
  { col: 1, row: 11 },
  { col: 2, row: 9 },
  { col: 3, row: 8 },
  { col: 4, row: 7 },
  { col: 5, row: 6 },
  { col: 6, row: 5 },
  { col: 7, row: 4 },
  { col: 8, row: 4 },
  { col: 9, row: 5 },
  { col: 10, row: 6 },
  { col: 11, row: 7 },
  { col: 12, row: 8 },
  { col: 13, row: 9 },
  { col: 14, row: 10 },
  { col: 14, row: 11 },
  { col: 13, row: 12 },
  { col: 12, row: 13 },
  { col: 11, row: 14 },
  { col: 10, row: 15 },
  { col: 9, row: 16 },
  { col: 8, row: 17 },
  { col: 7, row: 17 },
  { col: 6, row: 16 },
  { col: 5, row: 15 },
  { col: 4, row: 14 },
  { col: 3, row: 13 },
  { col: 2, row: 12 }
].map((position, index) => Object.freeze({
  id: 'survivor_start_' + (index + 1),
  label: 'S',
  color: 'blue',
  spanCols: 1,
  spanRows: 1,
  ...position
})));

const WHITE_LION_BOARD_SETUP = Object.freeze({
  board: { cols: 16, rows: 22 },
  monster: {
    id: 'white_lion',
    label: 'White Lion',
    color: 'red',
    col: 7,
    row: 10,
    spanCols: 2,
    spanRows: 2
  },
  survivors: WHITE_LION_SHOWDOWN_SURVIVOR_STARTS,
  terrain: []
});

const BUTCHER_BOARD_SETUP = Object.freeze({ board: { cols: 16, rows: 22 }, monster: null, survivors: [], terrain: [] });
const SCREAMING_ANTELOPE_BOARD_SETUP = Object.freeze({ board: { cols: 16, rows: 22 }, monster: null, survivors: [], terrain: [] });
const KINGS_MAN_BOARD_SETUP = Object.freeze({ board: { cols: 16, rows: 22 }, monster: null, survivors: [], terrain: [] });
const THE_HAND_BOARD_SETUP = Object.freeze({ board: { cols: 16, rows: 22 }, monster: null, survivors: [], terrain: [] });
const PHOENIX_BOARD_SETUP = Object.freeze({ board: { cols: 16, rows: 22 }, monster: null, survivors: [], terrain: [] });
const WATCHER_BOARD_SETUP = Object.freeze({ board: { cols: 16, rows: 22 }, monster: null, survivors: [], terrain: [] });
const GOLD_SMOKE_KNIGHT_BOARD_SETUP = Object.freeze({ board: { cols: 16, rows: 22 }, monster: null, survivors: [], terrain: [] });

const MONSTER_DATA = Object.freeze({
  white_lion: {
    id: 'white_lion',
    name: 'White Lion',
    type: 'node quarry 1',
    huntSetup: WHITE_LION_HUNT_SETUP,
    showdownSetup: WHITE_LION_SHOWDOWN_SETUP,
    aiCards: WHITE_LION_AI_CARDS,
    boardSetup: WHITE_LION_BOARD_SETUP
  },
  butcher: {
    id: 'butcher',
    name: 'Butcher',
    type: 'nemesis',
    huntSetup: { title: 'Butcher Hunt Setup', notes: ['TODO'] },
    showdownSetup: { title: 'Butcher Showdown Setup', notes: ['TODO'] },
    aiCards: [],
    boardSetup: BUTCHER_BOARD_SETUP
  },
  screaming_antelope: {
    id: 'screaming_antelope',
    name: 'Screaming Antelope',
    type: 'quarry',
    huntSetup: { title: 'Screaming Antelope Hunt Setup', notes: ['TODO'] },
    showdownSetup: { title: 'Screaming Antelope Showdown Setup', notes: ['TODO'] },
    aiCards: [],
    boardSetup: SCREAMING_ANTELOPE_BOARD_SETUP
  },
  kings_man: {
    id: 'kings_man',
    name: 'Kings Man',
    type: 'nemesis',
    huntSetup: { title: 'Kings Man Hunt Setup', notes: ['TODO'] },
    showdownSetup: { title: 'Kings Man Showdown Setup', notes: ['TODO'] },
    aiCards: [],
    boardSetup: KINGS_MAN_BOARD_SETUP
  },
  the_hand: {
    id: 'the_hand',
    name: 'The Hand',
    type: 'nemesis',
    huntSetup: { title: 'The Hand Hunt Setup', notes: ['TODO'] },
    showdownSetup: { title: 'The Hand Showdown Setup', notes: ['TODO'] },
    aiCards: [],
    boardSetup: THE_HAND_BOARD_SETUP
  },
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix',
    type: 'quarry',
    huntSetup: { title: 'Phoenix Hunt Setup', notes: ['TODO'] },
    showdownSetup: { title: 'Phoenix Showdown Setup', notes: ['TODO'] },
    aiCards: [],
    boardSetup: PHOENIX_BOARD_SETUP
  },
  watcher: {
    id: 'watcher',
    name: 'Watcher',
    type: 'nemesis',
    huntSetup: { title: 'Watcher Hunt Setup', notes: ['TODO'] },
    showdownSetup: { title: 'Watcher Showdown Setup', notes: ['TODO'] },
    aiCards: [],
    boardSetup: WATCHER_BOARD_SETUP
  },
  gold_smoke_knight: {
    id: 'gold_smoke_knight',
    name: 'Gold Smoke Knight',
    type: 'finale',
    huntSetup: { title: 'Gold Smoke Knight Hunt Setup', notes: ['TODO'] },
    showdownSetup: { title: 'Gold Smoke Knight Showdown Setup', notes: ['TODO'] },
    aiCards: [],
    boardSetup: GOLD_SMOKE_KNIGHT_BOARD_SETUP
  }
});
