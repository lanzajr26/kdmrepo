(function initializeSettlementResourceUses() {
  const RESOURCE_USE_TYPES = Object.freeze({
    GEAR: 'gear'
  });

  const RESOURCE_USES = {
    basic_resources__monster_organ: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'antelope_mask.png', displayName: 'Antelope Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'blood_paint.png', displayName: 'Blood Paint' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'blood_sheath.png', displayName: 'Blood Sheath' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_axe.png', displayName: 'Bone Axe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'counterweighted_axe.png', displayName: 'Counterweighted Axe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'crest_crown.png', displayName: 'Crest Crown' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'death_mask.png', displayName: 'Death Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'dragon_slayer.png', displayName: 'Dragon Slayer' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'fecal_salve.png', displayName: 'Fecal Salve' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'god_mask.png', displayName: 'God Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hours_ring.png', displayName: 'Hours Ring' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lance_of_longinus.png', displayName: 'Lance of Longinus' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_mail.png', displayName: 'Lantern Mail' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lucky_charm.png', displayName: 'Lucky Charm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'man_mask.png', displayName: 'Man Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'monster_grease.png', displayName: 'Monster Grease' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_gauntlet.png', displayName: 'Phoenix Gauntlet' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_greaves.png', displayName: 'Phoenix Greaves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_mask.png', displayName: 'Phoenix Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'polishing_lantern.png', displayName: 'Polishing Lantern' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'ring_whip.png', displayName: 'Ring Whip' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_rebar.png', displayName: 'Scrap Rebar' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'speed_powder.png', displayName: 'Speed Powder' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_mask.png', displayName: 'White Lion Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'whistling_mace.png', displayName: 'Whistling Mace' }
    ],
    basic_resources__monster_bone: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'beacon_shield.png', displayName: 'Beacon Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bloom_sphere.png', displayName: 'Bloom Sphere' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_axe.png', displayName: 'Bone Axe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_blade.png', displayName: 'Bone Blade' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_club.png', displayName: 'Bone Club' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_dagger.png', displayName: 'Bone Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_darts.png', displayName: 'Bone Darts' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_earrings.png', displayName: 'Bone Earrings' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_pickaxe.png', displayName: 'Bone Pickaxe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_sickle.png', displayName: 'Bone Sickle' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'boss_mehndi.png', displayName: 'Boss Mehndi' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'counterweighted_axe.png', displayName: 'Counterweighted Axe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'finger_of_god.png', displayName: 'Finger of God' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hollow_sword.png', displayName: 'Hollow Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_dagger.png', displayName: 'Lantern Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_glaive.png', displayName: 'Lantern Glaive' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_helm.png', displayName: 'Lantern Helm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_sword.png', displayName: 'Lantern Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_gauntlet.png', displayName: 'Phoenix Gauntlet' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_helm.png', displayName: 'Phoenix Helm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_drum.png', displayName: 'Rawhide Drum' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'round_leather_shield.png', displayName: 'Round Leather Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_bone_spear.png', displayName: 'Scrap Bone Spear' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_dagger.png', displayName: 'Scrap Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_sword.png', displayName: 'Scrap Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'whisker_harp.png', displayName: 'Whisker Harp' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rainbow_katana.png', displayName: 'Rainbow Katana' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'ring_whip.png', displayName: 'Ring Whip' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_shield.png', displayName: 'Scrap Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_coat.png', displayName: 'Screaming Coat' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'whistling_mace.png', displayName: 'Whistling Mace' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_gauntlet.png', displayName: 'White Lion Gauntlet' }
    ],
    basic_resources__monster_hide: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bandages.png', displayName: 'Bandages' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bird_bread.png', displayName: 'Bird Bread' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'counterweighted_axe.png', displayName: 'Counterweighted Axe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hollow_sword.png', displayName: 'Hollow Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_sword.png', displayName: 'Lantern Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lion_beast_katar.png', displayName: 'Lion Beast Katar' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_faulds.png', displayName: 'Phoenix Faulds' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_plackart.png', displayName: 'Phoenix Plackart' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_headband.png', displayName: 'Rawhide Headband' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_vest.png', displayName: 'Rawhide Vest' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_gloves.png', displayName: 'Rawhide Gloves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_boots.png', displayName: 'Rawhide Boots' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_pants.png', displayName: 'Rawhide Pants' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_whip.png', displayName: 'Rawhide Whip' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'round_leather_shield.png', displayName: 'Round Leather Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_bracers.png', displayName: 'Screaming Bracers' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_leg_warmers.png', displayName: 'Screaming Leg Warmers' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_skirt.png', displayName: 'Screaming Skirt' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'skullcap_hammer.png', displayName: 'Skullcap Hammer' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_boots.png', displayName: 'White Lion Boots' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_coat.png', displayName: 'White Lion Coat' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_skirt.png', displayName: 'White Lion Skirt' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'zanbato.png', displayName: 'Zanbato' }
    ],
    basic_resources__scrap: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'arc_bow.png', displayName: 'Arc Bow' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'elder_earrings.png', displayName: 'Elder Earrings' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'feather_mantle.png', displayName: 'Feather Mantle' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hollowpoint_arrow.png', displayName: 'Hollowpoint Arrow' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'leather_mask.png', displayName: 'Leather Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'monster_tooth_necklace.png', displayName: 'Monster Tooth Necklace' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'polishing_lantern.png', displayName: 'Polishing Lantern' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_sword.png', displayName: 'Scrap Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_dagger.png', displayName: 'Scrap Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_shield.png', displayName: 'Scrap Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_lantern.png', displayName: 'Scrap Lantern' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_rebar.png', displayName: 'Scrap Rebar' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_bone_spear.png', displayName: 'Scrap Bone Spear' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_horns.png', displayName: 'Screaming Horns' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'zanbato.png', displayName: 'Zanbato' }
    ],
    basic_resources__skull: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'man_mask.png', displayName: 'Man Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'skull_helm.png', displayName: 'Skull Helm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'skullcap_hammer.png', displayName: 'Skullcap Hammer' }
    ],
    white_lion__white_fur: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_helm.png', displayName: 'White Lion Helm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_coat.png', displayName: 'White Lion Coat' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_gauntlet.png', displayName: 'White Lion Gauntlet' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_skirt.png', displayName: 'White Lion Skirt' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_boots.png', displayName: 'White Lion Boots' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lion_skin_cloak.png', displayName: 'Lion Skin Cloak' }
    ],
    white_lion__shimmering_mane: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lion_headdress.png', displayName: 'Lion Headdress' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_mask.png', displayName: 'White Lion Mask' }
    ],
    white_lion__golden_whiskers: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'whisker_harp.png', displayName: 'Whisker Harp' }
    ],
    white_lion__lion_claw: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'claw_head_arrow.png', displayName: 'Claw Head Arrow' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'king_spear.png', displayName: 'King Spear' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lion_beast_katar.png', displayName: 'Lion Beast Katar' }
    ],
    white_lion__lion_testes: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'frenzy_drink.png', displayName: 'Frenzy Drink' }
    ],
    white_lion__eye_of_cat: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'cat_eye_circlet.png', displayName: 'Cat Eye Circlet' }
    ],
    white_lion__great_cat_bones: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'king_spear.png', displayName: 'King Spear' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_helm.png', displayName: 'White Lion Helm' }
    ],
    strange_resources__fresh_acanthus: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'dried_acanthus.png', displayName: 'Dried Acanthus' }
    ],
    basic_resources__: [],
    basic_resources__broken_lantern: [],
    basic_resources__love_juice: [],
    basic_resources__perfect_bone: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'first_aid_kit.png', displayName: 'First Aid Kit' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'red_charm.png', displayName: 'Red Charm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'zanbato.png', displayName: 'Zanbato' }
    ],
    basic_resources__perfect_organ: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'blue_charm.png', displayName: 'Blue Charm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bug_trap.png', displayName: 'Bug Trap' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_lantern.png', displayName: 'Scrap Lantern' }
    ],
    basic_resources__perfect_hide: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'green_charm.png', displayName: 'Green Charm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scavenger_kit.png', displayName: 'Scavenger Kit' }
    ],
    dragon_king__cabled_vein: [],
    dragon_king__dragon_iron: [],
    dragon_king__hardened_ribs: [],
    dragon_king__horn_fragment: [],
    dragon_king__husk: [],
    dragon_king__king_s_claws: [],
    dragon_king__king_s_tongue: [],
    dragon_king__radioactive_dung: [],
    dragon_king__veined_wing: [],
    dung_beetle_knight__beetle_horn: [],
    dung_beetle_knight__century_fingernails: [],
    dung_beetle_knight__century_shell: [],
    dung_beetle_knight__compound_eye: [],
    dung_beetle_knight__elytra: [],
    dung_beetle_knight__scarab_shell: [],
    dung_beetle_knight__scarab_wing: [],
    dung_beetle_knight__underplate_fungus: [],
    flower_knight__lantern_bloom: [],
    flower_knight__lantern_bud: [],
    flower_knight__osseous_bloom: [],
    flower_knight__sighing_bloom: [],
    flower_knight__warbling_bloom: [],
    gorm__acid_gland: [],
    gorm__dense_bone: [],
    gorm__gorm_brain: [],
    gorm__handed_skull: [],
    gorm__jiggling_lard: [],
    gorm__mammoth_hand: [],
    gorm__meaty_rib: [],
    gorm__milky_eye: [],
    gorm__stout_heart: [],
    gorm__stout_hide: [],
    gorm__stout_kidney: [],
    gorm__stout_vertebrae: [],
    phoenix__bird_beak: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rainbow_katana.png', displayName: 'Rainbow Katana' }
    ],
    phoenix__black_skull: [],
    phoenix__hollow_wing_bones: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'blood_sheath.png', displayName: 'Blood Sheath' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hollowpoint_arrow.png', displayName: 'Hollowpoint Arrow' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hollow_sword.png', displayName: 'Hollow Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_helm.png', displayName: 'Phoenix Helm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'sonic_tomahawk.png', displayName: 'Sonic Tomahawk' }
    ],
    phoenix__muculent_droppings: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'blood_sheath.png', displayName: 'Blood Sheath' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'feather_shield.png', displayName: 'Feather Shield' }
    ],
    phoenix__phoenix_eye: [],
    phoenix__phoenix_finger: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'finger_of_god.png', displayName: 'Finger of God' }
    ],
    phoenix__phoenix_whisker: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'arc_bow.png', displayName: 'Arc Bow' }
    ],
    phoenix__pustules: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bird_bread.png', displayName: 'Bird Bread' }
    ],
    phoenix__rainbow_droppings: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rainbow_katana.png', displayName: 'Rainbow Katana' }
    ],
    phoenix__shimmering_halo: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hours_ring.png', displayName: 'Hours Ring' }
    ],
    phoenix__small_feathers: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'feather_shield.png', displayName: 'Feather Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_greaves.png', displayName: 'Phoenix Greaves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_helm.png', displayName: 'Phoenix Helm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_mask.png', displayName: 'Phoenix Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'sonic_tomahawk.png', displayName: 'Sonic Tomahawk' }
    ],
    phoenix__small_hand_parasites: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bloom_sphere.png', displayName: 'Bloom Sphere' }
    ],
    phoenix__tail_feathers: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'feather_mantle.png', displayName: 'Feather Mantle' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_faulds.png', displayName: 'Phoenix Faulds' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_gauntlet.png', displayName: 'Phoenix Gauntlet' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_plackart.png', displayName: 'Phoenix Plackart' }
    ],
    phoenix__wishbone: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'arc_bow.png', displayName: 'Arc Bow' }
    ],
    screaming_antelope__beast_steak: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'boss_mehndi.png', displayName: 'Boss Mehndi' }
    ],
    screaming_antelope__bladder: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'blood_paint.png', displayName: 'Blood Paint' }
    ],
    screaming_antelope__large_flat_tooth: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'beast_knuckle.png', displayName: 'Beast Knuckle' }
    ],
    screaming_antelope__muscly_gums: [],
    screaming_antelope__pelt: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'antelope_mask.png', displayName: 'Antelope Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'beast_knuckle.png', displayName: 'Beast Knuckle' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_bracers.png', displayName: 'Screaming Bracers' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_coat.png', displayName: 'Screaming Coat' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_leg_warmers.png', displayName: 'Screaming Leg Warmers' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_skirt.png', displayName: 'Screaming Skirt' }
    ],
    screaming_antelope__screaming_brain: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'brain_mint.png', displayName: 'Brain Mint' }
    ],
    screaming_antelope__shank_bone: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_earrings.png', displayName: 'Bone Earrings' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'elder_earrings.png', displayName: 'Elder Earrings' }
    ],
    screaming_antelope__spiral_horn: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'screaming_horns.png', displayName: 'Screaming Horns' }
    ],
    spidicules__arachnid_heart: [],
    spidicules__chitin: [],
    spidicules__exoskeleton: [],
    spidicules__eyeballs: [],
    spidicules__large_appendage: [],
    spidicules__serrated_fangs: [],
    spidicules__small_appendages: [],
    spidicules__spinnerets: [],
    spidicules__stomach: [],
    spidicules__thick_web_silk: [],
    spidicules__unlaid_eggs: [],
    spidicules__venom_sac: [],
    strange_resources__1_000_year_sunspot: [],
    strange_resources__3_000_year_sunspot: [],
    strange_resources__active_thyroid: [],
    strange_resources__blistering_plasma_fruit: [],
    strange_resources__bugfish: [],
    strange_resources__canopic_jar: [],
    strange_resources__crimson_vial: [],
    strange_resources__crystal_sword_mold: [],
    strange_resources__dark_water: [],
    strange_resources__drifting_dream_fruit: [],
    strange_resources__elder_cat_teeth: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'cat_fang_knife.png', displayName: 'Cat Fang Knife' }
    ],
    strange_resources__gormite: [],
    strange_resources__hagfish: [],
    strange_resources__iron: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'beacon_shield.png', displayName: 'Beacon Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'dragon_slayer.png', displayName: 'Dragon Slayer' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_cuirass.png', displayName: 'Lantern Cuirass' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_dagger.png', displayName: 'Lantern Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_helm.png', displayName: 'Lantern Helm' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_gauntlets.png', displayName: 'Lantern Gauntlets' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_glaive.png', displayName: 'Lantern Glaive' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_greaves.png', displayName: 'Lantern Greaves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_mail.png', displayName: 'Lantern Mail' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_sword.png', displayName: 'Lantern Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_faulds.png', displayName: 'Phoenix Faulds' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_greaves.png', displayName: 'Phoenix Greaves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_plackart.png', displayName: 'Phoenix Plackart' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'polishing_lantern.png', displayName: 'Polishing Lantern' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rainbow_katana.png', displayName: 'Rainbow Katana' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'ring_whip.png', displayName: 'Ring Whip' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'sonic_tomahawk.png', displayName: 'Sonic Tomahawk' }
    ],
    strange_resources__jagged_marrow_fruit: [],
    strange_resources__jagged_marrow_fruit: [],
    strange_resources__jowls: [],
    strange_resources__leather: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'almanac.png', displayName: 'Almanac' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'beacon_shield.png', displayName: 'Beacon Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_pickaxe.png', displayName: 'Bone Pickaxe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_sickle.png', displayName: 'Bone Sickle' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'first_aid_kit.png', displayName: 'First Aid Kit' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'hunter_whip.png', displayName: 'Hunter Whip' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_cuirass.png', displayName: 'Lantern Cuirass' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_dagger.png', displayName: 'Lantern Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_gauntlets.png', displayName: 'Lantern Gauntlets' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_glaive.png', displayName: 'Lantern Glaive' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lantern_greaves.png', displayName: 'Lantern Greaves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'leather_boots.png', displayName: 'Leather Boots' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'leather_bracers.png', displayName: 'Leather Bracers' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'leather_cuirass.png', displayName: 'Leather Cuirass' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'leather_mask.png', displayName: 'Leather Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'leather_skirt.png', displayName: 'Leather Skirt' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_faulds.png', displayName: 'Phoenix Faulds' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_gauntlet.png', displayName: 'Phoenix Gauntlet' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_greaves.png', displayName: 'Phoenix Greaves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'phoenix_plackart.png', displayName: 'Phoenix Plackart' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'round_leather_shield.png', displayName: 'Round Leather Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_shield.png', displayName: 'Scrap Shield' }
    ],
    strange_resources__legendary_horns: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lance_of_longinus.png', displayName: 'Lance of Longinus' }
    ],
    strange_resources__lonely_fruit: [],
    strange_resources__old_blue_box: [],
    strange_resources__perfect_crucible: [],
    strange_resources__phoenix_crest: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'crest_crown.png', displayName: 'Crest Crown' }
    ],
    strange_resources__pituitary_gland: [],
    strange_resources__porous_flesh_fruit: [],
    strange_resources__preserved_caustic_dung: [],
    strange_resources__pure_bulb: [],
    strange_resources__radiant_heart: [],
    strange_resources__red_vial: [],
    strange_resources__salt: [],
    strange_resources__sarcophagus: [],
    strange_resources__scell: [],
    strange_resources__second_heart: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'speed_powder.png', displayName: 'Speed Powder' }
    ],
    strange_resources__shining_liver: [],
    strange_resources__silken_nervous_system: [],
    strange_resources__silver_urn: [],
    strange_resources__stomach_lining: [],
    strange_resources__sunstones: [],
    strange_resources__triptych: [],
    strange_resources__web_silk: [],
    sunstalker__black_lens: [],
    sunstalker__brain_root: [],
    sunstalker__cycloid_scales: [],
    sunstalker__fertility_tentacle: [],
    sunstalker__huge_sunteeth: [],
    sunstalker__inner_shadow_skin: [],
    sunstalker__prismatic_gills: [],
    sunstalker__shadow_ink_gland: [],
    sunstalker__shadow_tentacles: [],
    sunstalker__shark_tongue: [],
    sunstalker__small_sunteeth: [],
    sunstalker__sunshark_blubber: [],
    sunstalker__sunshark_bone: [],
    sunstalker__sunshark_fin: [],
    vermin__crab_spider: [],
    vermin__cyclops_fly: [],
    vermin__hissing_cockroach: [],
    vermin__lone_ant: [],
    vermin__nightmare_tick: [],
    vermin__sword_beetle: [],
    white_lion__curious_hand: [],
    white_lion__lion_tail: [],
    white_lion__sinew: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'cat_gut_bow.png', displayName: 'Cat Gut Bow' }
    ]
  };

  function freezeResourceUses(resourceUses) {
    const frozen = {};

    Object.entries(resourceUses).forEach(([resourceId, uses]) => {
      frozen[resourceId] = Object.freeze(
        (Array.isArray(uses) ? uses : [])
          .filter(use => use && typeof use === 'object')
          .map(use => Object.freeze({ ...use }))
      );
    });

    return Object.freeze(frozen);
  }

  const frozenResourceUses = freezeResourceUses(RESOURCE_USES);

  window.SETTLEMENT_RESOURCE_USE_TYPES = RESOURCE_USE_TYPES;
  window.SETTLEMENT_RESOURCE_USES = frozenResourceUses;
  window.getSettlementResourceUses = function getSettlementResourceUses(resourceId, type) {
    const uses = frozenResourceUses[resourceId] || [];
    if (!type) {
      return uses;
    }

    return uses.filter(use => use.type === type);
  };
})();