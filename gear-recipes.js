(function initializeGearRecipes() {
  const GEAR_RECIPES = {

    // ── Barber Surgeon ──────────────────────────────────────────────────────
    'almanac.png':        { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 2 }
    ] },
    'blue_charm.png':     { ingredients: [
      { resourceId: 'basic_resources__perfect_organ', quantity: 1 }
    ] },
    'bug_trap.png':       { ingredients: [
      { resourceId: 'basic_resources__perfect_organ', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 2 }
    ] },
    'first_aid_kit.png':  { ingredients: [
      { resourceId: 'basic_resources__perfect_bone', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 }
    ] },
    'green_charm.png':    { ingredients: [
      { resourceId: 'basic_resources__perfect_hide', quantity: 1 }
    ] },
    'musk_bomb.png':      { ingredients: [] },
    'red_charm.png':      { ingredients: [
      { resourceId: 'basic_resources__perfect_bone', quantity: 1 }
    ] },
    'scavenger_kit.png':  { ingredients: [
      { resourceId: 'basic_resources__perfect_hide', quantity: 1 },
      { resourceId: 'basic_resources__scrap', quantity: 1 }
    ] },

    // ── Blacksmith ──────────────────────────────────────────────────────────
    'beacon_shield.png':    { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 2 },
      { resourceId: 'strange_resources__leather', quantity: 3 },
      { resourceId: 'basic_resources__monster_bone', quantity: 4 }
    ] },
    'dragon_slayer.png':    { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 5 },
      { resourceId: 'basic_resources__monster_organ', quantity: 3 }
    ] },
    'lantern_cuirass.png':  { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 2 },
      { resourceId: 'strange_resources__leather', quantity: 5 }
    ] },
    'lantern_dagger.png':   { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 3 },
      { resourceId: 'basic_resources__monster_bone', quantity: 2 }
    ] },
    'lantern_gauntlets.png':{ ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 2 },
      { resourceId: 'strange_resources__leather', quantity: 6 }
    ] },
    'lantern_glaive.png':   { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 2 },
      { resourceId: 'strange_resources__leather', quantity: 2 },
      { resourceId: 'basic_resources__monster_bone', quantity: 4 }
    ] },
    'lantern_greaves.png':  { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 5 }
    ] },
    'lantern_helm.png':     { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 7 }
    ] },
    'lantern_mail.png':     { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 5 }
      ]
    },
    'lantern_sword.png':    { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 4 },
      { resourceId: 'basic_resources__monster_hide', quantity: 3 }
    ] },
    'perfect_slayer.png':   { ingredients: [] },
    'polishing_lantern.png':{ ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 },
      { resourceId: 'basic_resources__scrap', quantity: 1 }
    ] },
    'ring_whip.png':        { ingredients: [
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 3 },
      { resourceId: 'basic_resources__monster_organ', quantity: 2 }
    ] },
    'scrap_shield.png':     { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 3 },
      { resourceId: 'basic_resources__monster_bone', quantity: 2 },
      { resourceId: 'basic_resources__scrap', quantity: 2 }
    ] },

    // ── Bone Smith ──────────────────────────────────────────────────────────
    'bone_axe.png':     { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'bone_blade.png':   { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'bone_club.png':    { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 3 }
    ] },
    'bone_dagger.png':  { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'bone_darts.png':   { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'bone_pickaxe.png': { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 }
    ] },
    'bone_sickle.png':  { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 }
    ] },
    'skull_helm.png':   { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 2 },
      { resourceId: 'basic_resources__skull', quantity: 1 }
    ] },

    // ── Catarium ────────────────────────────────────────────────────────────
    'cat_eye_circlet.png': {
      ingredients: [
        { resourceId: 'white_lion__eye_of_cat', quantity: 1 }
      ]
    },
    'cat_fang_knife.png':  { ingredients: [
      { resourceId: 'strange_resources__elder_cat_teeth', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 4 }
    ] },
    'cat_gut_bow.png':     { ingredients: [
      { resourceId: 'white_lion__sinew', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'claw_head_arrow.png': {
      ingredients: [
        { resourceId: 'white_lion__lion_claw', quantity: 1 }
      ]
    },
    'frenzy_drink.png': {
      ingredients: [
        { resourceId: 'white_lion__lion_testes', quantity: 1 }
      ]
    },
    'king_spear.png': {
      ingredients: [
        { resourceId: 'white_lion__lion_claw', quantity: 1 },
        { resourceId: 'white_lion__great_cat_bones', quantity: 1 }
      ]
    },
    'lion_beast_katar.png': {
      ingredients: [
        { resourceId: 'white_lion__lion_claw', quantity: 1 },
        { resourceId: 'basic_resources__monster_hide', quantity: 1 }
      ]
    },
    'lion_headdress.png': {
      ingredients: [
        { resourceId: 'white_lion__shimmering_mane', quantity: 1 }
      ]
    },
    'lion_skin_cloak.png': {
      ingredients: [
        { resourceId: 'white_lion__white_fur', quantity: 2 }
      ]
    },
    'whisker_harp.png': {
      ingredients: [
        { resourceId: 'white_lion__golden_whiskers', quantity: 1 },
        { resourceId: 'basic_resources__monster_bone', quantity: 1 }
      ]
    },
    'white_lion_boots.png':    { ingredients: [
      { resourceId: 'white_lion__white_fur', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'white_lion_coat.png':     { ingredients: [
      { resourceId: 'white_lion__white_fur', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'white_lion_gauntlet.png': { ingredients: [
      { resourceId: 'white_lion__white_fur', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'white_lion_helm.png':     { ingredients: [
      { resourceId: 'white_lion__white_fur', quantity: 1 },
      { resourceId: 'white_lion__great_cat_bones', quantity: 1 }
    ] },
    'white_lion_skirt.png':    { ingredients: [
      { resourceId: 'white_lion__white_fur', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },

    // ── Exhausted Lantern Hoard ─────────────────────────────────────────────
    'oxidized_beacon_shield.png':  { ingredients: [] },
    'oxidized_lantern_dagger.png': { ingredients: [] },
    'oxidized_lantern_glaive.png': { ingredients: [] },
    'oxidized_lantern_helm.png':   { ingredients: [] },
    'oxidized_lantern_sword.png':  { ingredients: [] },
    'oxidized_ring_whip.png':      { ingredients: [] },
    'survivors_lantern.png':       { ingredients: [] },

    // ── Leather Worker ──────────────────────────────────────────────────────
    'hunter_whip.png':          { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 2 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'leather_boots.png':        { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'leather_bracers.png':      { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'leather_cuirass.png':      { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'leather_mask.png':         { ingredients: [
      { resourceId: 'basic_resources__scrap', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 }
    ] },
    'leather_skirt.png':        { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 1 }
    ] },
    'round_leather_shield.png': { ingredients: [
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },

    // ── Mask Maker ──────────────────────────────────────────────────────────
    'antelope_mask.png': { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 6 },
      { resourceId: 'basic_resources__monster_organ', quantity: 4 },
      { resourceId: 'screaming_antelope__pelt', quantity: 1 }
    ] },
    'death_mask.png':    { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 6 },
      { resourceId: 'basic_resources__monster_organ', quantity: 4 }
    ] },
    'god_mask.png':      { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 6 },
      { resourceId: 'basic_resources__monster_organ', quantity: 4 }
    ] },
    'man_mask.png':      { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 6 },
      { resourceId: 'basic_resources__monster_organ', quantity: 4 },
      { resourceId: 'basic_resources__skull', quantity: 1 }
    ] },
    'phoenix_mask.png':  { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 6 },
      { resourceId: 'basic_resources__monster_organ', quantity: 4 },
      { resourceId: 'phoenix__small_feathers', quantity: 1 }
    ] },
    'white_lion_mask.png': {
      ingredients: [
        { resourceId: 'white_lion__shimmering_mane', quantity: 1 },
        { resourceId: 'basic_resources__monster_bone', quantity: 6 },
        { resourceId: 'basic_resources__monster_organ', quantity: 4 }
      ]
    },

    // ── Organ Grinder ───────────────────────────────────────────────────────
    'dried_acanthus.png':        { ingredients: [
      { resourceId: 'strange_resources__fresh_acanthus', quantity: 1 }
    ] },
    'fecal_salve.png':           { ingredients: [
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'lucky_charm.png':           { ingredients: [
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'monster_grease.png':        { ingredients: [
      { resourceId: 'basic_resources__monster_organ', quantity: 2 }
    ] },
    'monster_tooth_necklace.png':{ ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 },
      { resourceId: 'basic_resources__scrap', quantity: 1 }
    ] },
    'stone_noses.png':           { ingredients: [] },

    // ── Plumery ─────────────────────────────────────────────────────────────
    'arc_bow.png':          { ingredients: [
      { resourceId: 'basic_resources__scrap', quantity: 1 },
      { resourceId: 'phoenix__phoenix_whisker', quantity: 1 },
      { resourceId: 'phoenix__wishbone', quantity: 1 }
    ] },
    'bird_bread.png':       { ingredients: [
      { resourceId: 'phoenix__pustules', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 3 }
    ] },
    'blood_sheath.png':     { ingredients: [
      { resourceId: 'basic_resources__monster_organ', quantity: 5 },
      { resourceId: 'phoenix__hollow_wing_bones', quantity: 1 },
      { resourceId: 'phoenix__muculent_droppings', quantity: 1 }
    ] },
    'bloom_sphere.png':     { ingredients: [
      { resourceId: 'phoenix__small_hand_parasites', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 3 }
    ] },
    'crest_crown.png':      { ingredients: [
      { resourceId: 'strange_resources__phoenix_crest', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 6 }
    ] },
    'feather_mantle.png':   { ingredients: [
      { resourceId: 'basic_resources__scrap', quantity: 1 },
      { resourceId: 'phoenix__tail_feathers', quantity: 2 }
    ] },
    'feather_shield.png':   { ingredients: [
      { resourceId: 'phoenix__small_feathers', quantity: 2 },
      { resourceId: 'phoenix__muculent_droppings', quantity: 1 }
    ] },
    'finger_of_god.png':    { ingredients: [
      { resourceId: 'phoenix__phoenix_finger', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 4 }
    ] },
    'hollow_sword.png':     { ingredients: [
      { resourceId: 'phoenix__hollow_wing_bones', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 2 },
      { resourceId: 'basic_resources__monster_hide', quantity: 2 }
    ] },
    'hollowpoint_arrow.png':{ ingredients: [
      { resourceId: 'phoenix__hollow_wing_bones', quantity: 1 },
      { resourceId: 'basic_resources__scrap', quantity: 1 }
    ] },
    'hours_ring.png':       { ingredients: [
      { resourceId: 'phoenix__shimmering_halo', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 5 }
    ] },
    'phoenix_faulds.png':   { ingredients: [
      { resourceId: 'phoenix__tail_feathers', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'phoenix_gauntlet.png': { ingredients: [
      { resourceId: 'phoenix__tail_feathers', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'phoenix_greaves.png':  { ingredients: [
      { resourceId: 'phoenix__small_feathers', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'phoenix_helm.png':     { ingredients: [
      { resourceId: 'phoenix__small_feathers', quantity: 1 },
      { resourceId: 'phoenix__hollow_wing_bones', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'phoenix_plackart.png': { ingredients: [
      { resourceId: 'phoenix__tail_feathers', quantity: 1 },
      { resourceId: 'strange_resources__leather', quantity: 1 },
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'rainbow_katana.png':   { ingredients: [
      { resourceId: 'phoenix__bird_beak', quantity: 1 },
      { resourceId: 'phoenix__rainbow_droppings', quantity: 1 },
      { resourceId: 'strange_resources__iron', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 6 }
    ] },
    'sonic_tomahawk.png':   { ingredients: [
      { resourceId: 'phoenix__small_feathers', quantity: 1 },
      { resourceId: 'phoenix__hollow_wing_bones', quantity: 1 },
      { resourceId: 'strange_resources__iron', quantity: 1 }
    ] },

    // ── Skinnery ────────────────────────────────────────────────────────────
    'bandages.png':        { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'rawhide_boots.png':   { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'rawhide_drum.png':    { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'rawhide_gloves.png':  { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'rawhide_headband.png':{ ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'rawhide_pants.png':   { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'rawhide_vest.png':    { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'rawhide_whip.png':    { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },

    // ── Starting Gear ───────────────────────────────────────────────────────
    'cloth.png':         { ingredients: [] },
    'founding_stone.png':{ ingredients: [] },

    // ── Stone Circle ────────────────────────────────────────────────────────
    'beast_knuckle.png':        { ingredients: [
      { resourceId: 'screaming_antelope__large_flat_tooth', quantity: 1 },
      { resourceId: 'screaming_antelope__pelt', quantity: 1 }
    ] },
    'blood_paint.png':          { ingredients: [
      { resourceId: 'screaming_antelope__bladder', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'bone_earrings.png':        { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 },
      { resourceId: 'screaming_antelope__shank_bone', quantity: 1 }
    ] },
    'boss_mehndi.png':          { ingredients: [
      { resourceId: 'screaming_antelope__beast_steak', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'brain_mint.png':           { ingredients: [
      { resourceId: 'screaming_antelope__screaming_brain', quantity: 1 }
    ] },
    'elder_earrings.png':       { ingredients: [
      { resourceId: 'screaming_antelope__shank_bone', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'lance_of_longinus.png':    { ingredients: [
      { resourceId: 'strange_resources__legendary_horns', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 6 }
    ] },
    'screaming_bracers.png':    { ingredients: [
      { resourceId: 'screaming_antelope__pelt', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'screaming_coat.png':       { ingredients: [
      { resourceId: 'screaming_antelope__pelt', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 1 }
    ] },
    'screaming_horns.png':      { ingredients: [
      { resourceId: 'screaming_antelope__spiral_horn', quantity: 1 },
      { resourceId: 'basic_resources__scrap', quantity: 1 }
    ] },
    'screaming_leg_warmers.png':{ ingredients: [
      { resourceId: 'screaming_antelope__pelt', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'screaming_skirt.png':      { ingredients: [
      { resourceId: 'screaming_antelope__pelt', quantity: 1 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 }
    ] },
    'speed_powder.png':         { ingredients: [
      { resourceId: 'strange_resources__second_heart', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 2 }
    ] },

    // ── Weapon Crafter ──────────────────────────────────────────────────────
    'counterweighted_axe.png':{ ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 2 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'scrap_bone_spear.png':   { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 4 },
      { resourceId: 'basic_resources__scrap', quantity: 1 }
    ] },
    'scrap_dagger.png':       { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 1 },
      { resourceId: 'basic_resources__scrap', quantity: 1 }
    ] },
    'scrap_lantern.png':      { ingredients: [
      { resourceId: 'basic_resources__scrap', quantity: 1 },
      { resourceId: 'basic_resources__perfect_organ', quantity: 1 }
    ] },
    'scrap_rebar.png':        { ingredients: [
      { resourceId: 'basic_resources__scrap', quantity: 2 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'scrap_sword.png':        { ingredients: [
      { resourceId: 'basic_resources__scrap', quantity: 1 },
      { resourceId: 'basic_resources__monster_bone', quantity: 2 }
    ] },
    'skullcap_hammer.png':    { ingredients: [
      { resourceId: 'basic_resources__monster_hide', quantity: 1 },
      { resourceId: 'basic_resources__skull:', quantity: 1 }
    ] },
    'whistling_mace.png':     { ingredients: [
      { resourceId: 'basic_resources__monster_bone', quantity: 2 },
      { resourceId: 'basic_resources__monster_organ', quantity: 1 }
    ] },
    'zanbato.png':            { ingredients: [
      { resourceId: 'basic_resources__scrap', quantity: 3 },
      { resourceId: 'basic_resources__monster_hide', quantity: 1 },
      { resourceId: 'basic_resources__perfect_bone', quantity: 1 }
    ] }

  };

  function freezeRecipeMap(recipeMap) {
    const frozen = {};

    Object.entries(recipeMap).forEach(([file, recipe]) => {
      const ingredients = Array.isArray(recipe?.ingredients)
        ? recipe.ingredients
            .filter(ingredient => ingredient && typeof ingredient.resourceId === 'string')
            .map(ingredient => Object.freeze({
              resourceId: ingredient.resourceId,
              quantity: Number.isFinite(ingredient.quantity) && ingredient.quantity > 0
                ? ingredient.quantity
                : 1
            }))
        : [];

      frozen[file] = Object.freeze({
        ingredients
      });
    });

    return Object.freeze(frozen);
  }

  const frozenRecipes = freezeRecipeMap(GEAR_RECIPES);

  window.GEAR_RECIPES = frozenRecipes;
  window.getGearRecipe = function getGearRecipe(file) {
    return frozenRecipes[file] || null;
  };
})();