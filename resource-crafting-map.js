(function initializeSettlementResourceUses() {
  const RESOURCE_USE_TYPES = Object.freeze({
    GEAR: 'gear'
  });

  const RESOURCE_USES = {
    basic_resources__monster_organ: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'monster_grease.png', displayName: 'Monster Grease' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'fecal_salve.png', displayName: 'Fecal Salve' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lucky_charm.png', displayName: 'Lucky Charm' }
    ],
    basic_resources__monster_bone: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_axe.png', displayName: 'Bone Axe' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_blade.png', displayName: 'Bone Blade' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_club.png', displayName: 'Bone Club' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_dagger.png', displayName: 'Bone Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_darts.png', displayName: 'Bone Darts' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'bone_sickle.png', displayName: 'Bone Sickle' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'whisker_harp.png', displayName: 'Whisker Harp' }
    ],
    basic_resources__monster_hide: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_headband.png', displayName: 'Rawhide Headband' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_vest.png', displayName: 'Rawhide Vest' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_gloves.png', displayName: 'Rawhide Gloves' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_boots.png', displayName: 'Rawhide Boots' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_pants.png', displayName: 'Rawhide Pants' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'rawhide_whip.png', displayName: 'Rawhide Whip' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lion_beast_katar.png', displayName: 'Lion Beast Katar' }
    ],
    basic_resources__scrap: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_sword.png', displayName: 'Scrap Sword' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_dagger.png', displayName: 'Scrap Dagger' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_shield.png', displayName: 'Scrap Shield' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_lantern.png', displayName: 'Scrap Lantern' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_rebar.png', displayName: 'Scrap Rebar' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'scrap_bone_spear.png', displayName: 'Scrap Bone Spear' }
    ],
    basic_resources__skull: [
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
      { type: RESOURCE_USE_TYPES.GEAR, file: 'white_lion_mask.png', displayName: 'White Lion Mask' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'lion_headdress.png', displayName: 'Lion Headdress' }
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
    white_lion__eye_of_the_cat: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'cat_eye_circlet.png', displayName: 'Cat Eye Circlet' }
    ],
    white_lion__great_cat_bones: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'cat_fang_knife.png', displayName: 'Cat Fang Knife' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'cat_gut_bow.png', displayName: 'Cat Gut Bow' },
      { type: RESOURCE_USE_TYPES.GEAR, file: 'king_spear.png', displayName: 'King Spear' }
    ],
    strange_resources__fresh_acanthus: [
      { type: RESOURCE_USE_TYPES.GEAR, file: 'dried_acanthus.png', displayName: 'Dried Acanthus' }
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
