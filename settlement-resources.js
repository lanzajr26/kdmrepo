const RESOURCE_TAG_NAMES = Object.freeze({
  B: 'Bone',
  H: 'Hide',
  O: 'Organ',
  S: 'Scrap',
  C: 'Consumable',
  F: 'Flower',
  He: 'Herb',
  I: 'Iron',
  Si: 'Silk'
});

function slugifySettlementResource(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function parseSettlementResource(groupId, rawValue) {
  const normalized = String(rawValue).replace('{', '[').replace('}', ']');
  const match = normalized.match(/^(.*?)\s*(?:\[([^\]]+)\])?$/);
  const name = (match?.[1] || normalized).trim();
  const tags = (match?.[2] || '')
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);

  return {
    id: `${groupId}__${slugifySettlementResource(name)}`,
    name,
    tags
  };
}

function makeSettlementResources(groupId, rawValues) {
  return rawValues.map(value => parseSettlementResource(groupId, value));
}

const SETTLEMENT_RESOURCE_GROUPS = Object.freeze([
  {
    id: 'basic_resources',
    name: 'Basic Resources',
    description: 'Core crafting stock shared across settlement development.',
    resources: Object.freeze(makeSettlementResources('basic_resources', [
      'Broken Lantern [S]',
      'Love Juice [C,O]',
      'Monster Bone [B]',
      'Monster Hide [H]',
      'Monster Organ [C,O]',
      'Scrap [S]',
      'Skull [B]',
      '??? [B,H,O,S]'
    ]))
  },
  {
    id: 'strange_resources',
    name: 'Strange Resources',
    description: 'Rare finds, oddities, and specialized materials outside a single quarry deck.',
    resources: Object.freeze(makeSettlementResources('strange_resources', [
      '1,000 Year Sunspot [B,O]',
      '3,000 Year Sunspot [B,O,S]',
      'Active Thyroid [C,O]',
      'Blistering Plasma Fruit [C,O]',
      'Bugfish [F,O]',
      'Canopic Jar [O,S]',
      'Crimson Vial [C,I]',
      'Crystal Sword Mold [I,S]',
      'Dark Water',
      'Drifting Dream Fruit [C]',
      'Elder Cat Teeth [B]',
      'Fresh Acanthus [He]',
      'Gormite [I,S]',
      'Hagfish [B,F,H]',
      'Iron [S]',
      'Jagged Marrow Fruit [B,C,S]',
      'Jowls [F,I]',
      'Leather [H]',
      'Legendary Horns [B,S]',
      'Lonely Fruit [C]',
      'Old Blue Box [S]',
      'Perfect Crucible [I]',
      'Pituitary Gland [O]',
      'Porous Flesh Fruit [C,H]',
      'Preserved Caustic Dung [C,O,S]',
      'Pure Bulb [O]',
      'Phoenix Crest [O]',
      'Radiant Heart [O]',
      'Red Vial [C]',
      'Salt',
      'Sarcophagus [I]',
      'Scell [C,O]',
      'Second Heart [B,O]',
      'Shining Liver [O]',
      'Silken Nervous System [O]',
      'Silver Urn [B,S]',
      'Stomach Lining [O]',
      'Sunstones [B]',
      'Triptych [H,S]',
      'Web Silk [Si]'
    ]))
  },
  {
    id: 'vermin',
    name: 'Vermin',
    description: 'Minor creatures and forage targets that still feed the settlement.',
    resources: Object.freeze(makeSettlementResources('vermin', [
      'Crab Spider [He]',
      'Cyclops Fly',
      'Hissing Cockroach',
      'Lone Ant',
      'Nightmare Tick',
      'Sword Beetle'
    ]))
  },
  {
    id: 'white_lion',
    name: 'White Lion',
    description: 'Quarry rewards from the White Lion resource deck.',
    resources: Object.freeze(makeSettlementResources('white_lion', [
      'Curious Hand [H]',
      'Eye of the Cat [C,O]',
      'Golden Whiskers [O]',
      'Great Cat Bones [B]',
      'Lion Claw [B]',
      'Lion Tail [H]',
      'Lion Testes [C,O]',
      'Shimmering Mane [H]',
      'White Fur [H]'
    ]))
  },
  {
    id: 'screaming_antelope',
    name: 'Screaming Antelope',
    description: 'Quarry rewards from the Screaming Antelope resource deck.',
    resources: Object.freeze(makeSettlementResources('screaming_antelope', [
      'Beast Steak [O]',
      'Bladder [O]',
      'Large Flat Tooth [B]',
      'Muscly Gums [O]',
      'Pelt [H]',
      'Screaming Brain [O]',
      'Shank Bone [B]',
      'Spiral Horn [B]'
    ]))
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    description: 'Quarry rewards from the Phoenix resource deck.',
    resources: Object.freeze(makeSettlementResources('phoenix', [
      'Bird Beak [B]',
      'Black Skull [B,I]',
      'Hollow Wing Bones [B]',
      'Muculent Droppings [O]',
      'Phoenix Eye [O,S]',
      'Phoenix Finger [B]',
      'Small Hand Parasites [O]',
      'Phoenix Whisker [H]',
      'Pustules [O]',
      'Rainbow Droppings [O]',
      'Shimmering Halo [O]',
      'Small Feathers [H]',
      'Tail Feathers [H]',
      'Wishbone [B]'
    ]))
  },
  {
    id: 'gorm',
    name: 'Gorm',
    description: 'Quarry rewards from the Gorm resource deck.',
    resources: Object.freeze(makeSettlementResources('gorm', [
      'Acid Gland [O]',
      'Dense Bone [B]',
      'Gorm Brain [O]',
      'Handed Skull [B]',
      'Jiggling Lard [O,H]',
      'Mammoth Hand [B,H,O]',
      'Meaty Rib [B,O]',
      'Milky Eye [O]',
      'Stout Heart [O]',
      'Stout Hide [H]',
      'Stout Kidney [O]',
      'Stout Vertebrae [B]'
    ]))
  },
  {
    id: 'dragon_king',
    name: 'Dragon King',
    description: 'Quarry rewards from the Dragon King resource deck.',
    resources: Object.freeze(makeSettlementResources('dragon_king', [
      'Cabled Vein [O]',
      'Dragon Iron [I]',
      'Hardened Ribs [B]',
      'Horn Fragment [B]',
      'Husk [H]',
      'King\'s Claws [B]',
      'King\'s Tongue [H]',
      'Radioactive Dung [O,S]',
      'Veined Wing [H]'
    ]))
  },
  {
    id: 'sunstalker',
    name: 'Sunstalker',
    description: 'Quarry rewards from the Sunstalker resource deck.',
    resources: Object.freeze(makeSettlementResources('sunstalker', [
      'Black Lens [O]',
      'Brain Root [O]',
      'Cycloid Scales [H]',
      'Fertility Tentacle [O]',
      'Huge Sunteeth [B]',
      'Inner Shadow Skin [H]',
      'Prismatic Gills [O]',
      'Shark Tongue [O]',
      'Shadow Ink Gland [O]',
      'Shadow Tentacles [H,O]',
      'Small Sunteeth [B]',
      'Sunshark Blubber [O]',
      'Sunshark Bone [B]',
      'Sunshark Fin [B,H]'
    ]))
  },
  {
    id: 'dung_beetle_knight',
    name: 'Dung Beetle Knight',
    description: 'Quarry rewards from the Dung Beetle Knight resource deck.',
    resources: Object.freeze(makeSettlementResources('dung_beetle_knight', [
      'Beetle Horn [B]',
      'Century Fingernails [B]',
      'Century Shell [H,I]',
      'Compound Eye [O,C]',
      'Elytra [B,H,O]',
      'Scarab Shell [H]',
      'Scarab Wing [O]',
      'Underplate Fungus [C,H,He]'
    ]))
  },
  {
    id: 'flower_knight',
    name: 'Flower Knight',
    description: 'Quarry rewards from the Flower Knight resource deck.',
    resources: Object.freeze(makeSettlementResources('flower_knight', [
      'Lantern Bloom [F,H]',
      'Lantern Bud [F,S]',
      'Osseous Bloom [B,F]',
      'Sighing Bloom [F,O]',
      'Warbling Bloom [F,H]'
    ]))
  },
  {
    id: 'spidicules',
    name: 'Spidicules',
    description: 'Quarry rewards from the Spidicules resource deck.',
    resources: Object.freeze(makeSettlementResources('spidicules', [
      'Arachnid Heart [O]',
      'Chitin [H]',
      'Eyeballs [O]',
      'Exoskeleton [H]',
      'Large Appendage [B]',
      'Serrated Fangs [B]',
      'Small Appendages [H]',
      'Spinnerets [O,S]',
      'Stomach [O]',
      'Thick Web Silk [H,Si]',
      'Unlaid Eggs [C,O]',
      'Venom Sac [C,O]'
    ]))
  }
]);

window.RESOURCE_TAG_NAMES = RESOURCE_TAG_NAMES;
window.SETTLEMENT_RESOURCE_GROUPS = SETTLEMENT_RESOURCE_GROUPS;
