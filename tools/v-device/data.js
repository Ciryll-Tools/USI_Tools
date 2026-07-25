// Seed data for the Unnamed Space Idle V-Device (Tier 14 shards): each shard's
// colored effects (with link-only flags) plus the derived objective library.

export const COLORS = ["Red", "Orange", "Green", "Blue", "Pink"];
export const WHITE = "White";
export const MAX_LINKS = 6;

export const DEFAULT_SHARDS = [
  {
    "name": "Capital Research Shard",
    "tier14Name": "Capital Research Shard XIV",
    "effects": [
      {
        "color": "Orange",
        "linkOnly": true,
        "bonus": "Bonus to Zephyrion Specimen Research"
      },
      {
        "color": "Orange",
        "linkOnly": true,
        "bonus": "Bonus to Yttaldar Specimen Research"
      },
      {
        "color": "Orange",
        "linkOnly": true,
        "bonus": "Bonus to Xyloquant Specimen Research"
      },
      {
        "color": "Pink",
        "linkOnly": false,
        "bonus": "Bonus to Specimen Research"
      },
      {
        "color": "Blue",
        "linkOnly": false,
        "bonus": "Bonus to Applied Research"
      },
      {
        "color": "Blue",
        "linkOnly": false,
        "bonus": "Bonus to Fundamental Research"
      },
      {
        "color": "Green",
        "linkOnly": false,
        "bonus": "Bonus to Wraithtex Specimen Research"
      },
      {
        "color": "Green",
        "linkOnly": false,
        "bonus": "Bonus to Verdanix Specimen Research"
      }
    ]
  },
  {
    "name": "Corruption Shard",
    "tier14Name": "Corruption Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": false,
        "bonus": "Resistance Rate"
      },
      {
        "color": "Green",
        "linkOnly": false,
        "bonus": "Adaptation Speed"
      }
    ]
  },
  {
    "name": "Mastery Shard",
    "tier14Name": "Mastery Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": true,
        "bonus": "Zephyrion Mastery Gain Multiplier"
      },
      {
        "color": "Orange",
        "linkOnly": false,
        "bonus": "Yttaldar Mastery Gain Multiplier"
      },
      {
        "color": "Pink",
        "linkOnly": true,
        "bonus": "Xyloquant Mastery Gain Multiplier"
      },
      {
        "color": "Blue",
        "linkOnly": false,
        "bonus": "Wraithtex Mastery Gain Multiplier"
      },
      {
        "color": "Green",
        "linkOnly": true,
        "bonus": "Verdanix Mastery Gain Multiplier"
      }
    ]
  },
  {
    "name": "Production Shard",
    "tier14Name": "Production Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": false,
        "bonus": "Base 6 Material Multiplier"
      },
      {
        "color": "Pink",
        "linkOnly": false,
        "bonus": "Base 6 Parts Multiplier"
      },
      {
        "color": "Green",
        "linkOnly": false,
        "bonus": "Base 6 Components Multiplier"
      }
    ]
  },
  {
    "name": "Resource Shard",
    "tier14Name": "Resource Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": false,
        "bonus": "Veil Fragment Gain"
      },
      {
        "color": "Orange",
        "linkOnly": false,
        "bonus": "Antum Fragment Gain"
      },
      {
        "color": "Blue",
        "linkOnly": false,
        "bonus": "Penum Fragment Gain"
      },
      {
        "color": "Green",
        "linkOnly": true,
        "bonus": "Capital Resource Gain"
      }
    ]
  },
  {
    "name": "Specimen Shard",
    "tier14Name": "Specimen Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": false,
        "bonus": "Zephyrion Specimen Gain Bonus"
      },
      {
        "color": "Orange",
        "linkOnly": true,
        "bonus": "Yttaldar Specimen Gain Bonus"
      },
      {
        "color": "Pink",
        "linkOnly": false,
        "bonus": "Xyloquant Specimen Gain Bonus"
      },
      {
        "color": "Blue",
        "linkOnly": true,
        "bonus": "Wraithtex Specimen Gain Bonus"
      },
      {
        "color": "Green",
        "linkOnly": false,
        "bonus": "Verdanix Specimen Gain Bonus"
      }
    ]
  },
  {
    "name": "Strata Shard",
    "tier14Name": "Strata Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": true,
        "bonus": "Strata Growth Multiplier"
      },
      {
        "color": "Orange",
        "linkOnly": false,
        "bonus": "Compute Throughput"
      },
      {
        "color": "Green",
        "linkOnly": false,
        "bonus": "Strata Expertise Gain"
      }
    ]
  },
  {
    "name": "Synth Shard",
    "tier14Name": "Synth Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": false,
        "bonus": "Synth Speed"
      },
      {
        "color": "Pink",
        "linkOnly": true,
        "bonus": "Fixture Creation Speed"
      },
      {
        "color": "Blue",
        "linkOnly": false,
        "bonus": "Alien Synth Speed Multiplier"
      }
    ]
  },
  {
    "name": "Titan Shard",
    "tier14Name": "Titan Shard XIV",
    "effects": [
      {
        "color": "Orange",
        "linkOnly": false,
        "bonus": "Titan Damage"
      },
      {
        "color": "Orange",
        "linkOnly": false,
        "bonus": "Titan Max Shield"
      },
      {
        "color": "Pink",
        "linkOnly": false,
        "bonus": "Titan Array Capacity"
      }
    ]
  },
  {
    "name": "Versatile Shard",
    "tier14Name": "Versatile Shard XIV",
    "effects": [
      {
        "color": "Red",
        "linkOnly": false,
        "bonus": "Fixture Creation Speed"
      },
      {
        "color": "Orange",
        "linkOnly": false,
        "bonus": "Compute Throughput"
      },
      {
        "color": "Pink",
        "linkOnly": false,
        "bonus": "Base 6 Production Multiplier"
      },
      {
        "color": "Blue",
        "linkOnly": false,
        "bonus": "Overdrive Charge Speed"
      },
      {
        "color": "Green",
        "linkOnly": false,
        "bonus": "Discipline Mastery Gain Multiplier"
      }
    ]
  }
];

export const DEFAULT_OBJECTIVES = [
  {
    "id": "obj-adaptation-speed",
    "name": "Adaptation Speed",
    "requirements": [
      {
        "shard": "Corruption Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-alien-synth-speed-multiplier",
    "name": "Alien Synth Speed Multiplier",
    "requirements": [
      {
        "shard": "Synth Shard",
        "color": "Blue"
      }
    ]
  },
  {
    "id": "obj-antum-fragment-gain",
    "name": "Antum Fragment Gain",
    "requirements": [
      {
        "shard": "Resource Shard",
        "color": "Orange"
      }
    ]
  },
  {
    "id": "obj-base-6-components-multiplier",
    "name": "Base 6 Components Multiplier",
    "requirements": [
      {
        "shard": "Production Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-base-6-material-multiplier",
    "name": "Base 6 Material Multiplier",
    "requirements": [
      {
        "shard": "Production Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-base-6-parts-multiplier",
    "name": "Base 6 Parts Multiplier",
    "requirements": [
      {
        "shard": "Production Shard",
        "color": "Pink"
      }
    ]
  },
  {
    "id": "obj-base-6-production-multiplier",
    "name": "Base 6 Production Multiplier",
    "requirements": [
      {
        "shard": "Versatile Shard",
        "color": "Pink"
      }
    ]
  },
  {
    "id": "obj-bonus-to-applied-fundamental-research",
    "name": "Bonus to Applied / Fundamental Research",
    "requirements": [
      {
        "shard": "Capital Research Shard",
        "color": "Blue"
      }
    ]
  },
  {
    "id": "obj-bonus-to-specimen-research",
    "name": "Bonus to Specimen Research",
    "requirements": [
      {
        "shard": "Capital Research Shard",
        "color": "Pink"
      }
    ]
  },
  {
    "id": "obj-bonus-to-wraithtex-verdanix-specimen-research",
    "name": "Bonus to Wraithtex / Verdanix Specimen Research",
    "requirements": [
      {
        "shard": "Capital Research Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-bonus-to-zephyrion-yttaldar-xyloquant-specimen-research",
    "name": "Bonus to Zephyrion / Yttaldar / Xyloquant Specimen Research",
    "requirements": [
      {
        "shard": "Capital Research Shard",
        "color": "Orange"
      }
    ]
  },
  {
    "id": "obj-capital-resource-gain",
    "name": "Capital Resource Gain",
    "requirements": [
      {
        "shard": "Resource Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-compute-throughput",
    "name": "Compute Throughput",
    "requirements": [
      {
        "shard": "Strata Shard",
        "color": "Orange"
      },
      {
        "shard": "Versatile Shard",
        "color": "Orange"
      }
    ]
  },
  {
    "id": "obj-discipline-mastery-gain-multiplier",
    "name": "Discipline Mastery Gain Multiplier",
    "requirements": [
      {
        "shard": "Versatile Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-fixture-creation-speed",
    "name": "Fixture Creation Speed",
    "requirements": [
      {
        "shard": "Synth Shard",
        "color": "Pink"
      },
      {
        "shard": "Versatile Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-overdrive-charge-speed",
    "name": "Overdrive Charge Speed",
    "requirements": [
      {
        "shard": "Versatile Shard",
        "color": "Blue"
      }
    ]
  },
  {
    "id": "obj-penum-fragment-gain",
    "name": "Penum Fragment Gain",
    "requirements": [
      {
        "shard": "Resource Shard",
        "color": "Blue"
      }
    ]
  },
  {
    "id": "obj-resistance-rate",
    "name": "Resistance Rate",
    "requirements": [
      {
        "shard": "Corruption Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-strata-expertise-gain",
    "name": "Strata Expertise Gain",
    "requirements": [
      {
        "shard": "Strata Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-strata-growth-multiplier",
    "name": "Strata Growth Multiplier",
    "requirements": [
      {
        "shard": "Strata Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-synth-speed",
    "name": "Synth Speed",
    "requirements": [
      {
        "shard": "Synth Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-titan-array-capacity",
    "name": "Titan Array Capacity",
    "requirements": [
      {
        "shard": "Titan Shard",
        "color": "Pink"
      }
    ]
  },
  {
    "id": "obj-titan-damage-titan-max-shield",
    "name": "Titan Damage + Titan Max Shield",
    "requirements": [
      {
        "shard": "Titan Shard",
        "color": "Orange"
      }
    ]
  },
  {
    "id": "obj-veil-fragment-gain",
    "name": "Veil Fragment Gain",
    "requirements": [
      {
        "shard": "Resource Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-verdanix-mastery-gain-multiplier",
    "name": "Verdanix Mastery Gain Multiplier",
    "requirements": [
      {
        "shard": "Mastery Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-verdanix-specimen-gain-bonus",
    "name": "Verdanix Specimen Gain Bonus",
    "requirements": [
      {
        "shard": "Specimen Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-wraithtex-mastery-gain-multiplier",
    "name": "Wraithtex Mastery Gain Multiplier",
    "requirements": [
      {
        "shard": "Mastery Shard",
        "color": "Blue"
      }
    ]
  },
  {
    "id": "obj-wraithtex-specimen-gain-bonus",
    "name": "Wraithtex Specimen Gain Bonus",
    "requirements": [
      {
        "shard": "Specimen Shard",
        "color": "Blue"
      }
    ]
  },
  {
    "id": "obj-xyloquant-mastery-gain-multiplier",
    "name": "Xyloquant Mastery Gain Multiplier",
    "requirements": [
      {
        "shard": "Mastery Shard",
        "color": "Pink"
      }
    ]
  },
  {
    "id": "obj-xyloquant-specimen-gain-bonus",
    "name": "Xyloquant Specimen Gain Bonus",
    "requirements": [
      {
        "shard": "Specimen Shard",
        "color": "Pink"
      }
    ]
  },
  {
    "id": "obj-yttaldar-mastery-gain-multiplier",
    "name": "Yttaldar Mastery Gain Multiplier",
    "requirements": [
      {
        "shard": "Mastery Shard",
        "color": "Orange"
      }
    ]
  },
  {
    "id": "obj-yttaldar-specimen-gain-bonus",
    "name": "Yttaldar Specimen Gain Bonus",
    "requirements": [
      {
        "shard": "Specimen Shard",
        "color": "Orange"
      }
    ]
  },
  {
    "id": "obj-zephyrion-mastery-gain-multiplier",
    "name": "Zephyrion Mastery Gain Multiplier",
    "requirements": [
      {
        "shard": "Mastery Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-zephyrion-specimen-gain-bonus",
    "name": "Zephyrion Specimen Gain Bonus",
    "requirements": [
      {
        "shard": "Specimen Shard",
        "color": "Red"
      }
    ]
  },
  {
    "id": "obj-all-mastery-gain",
    "name": "All Mastery Gain",
    "requirements": [
      {
        "shard": "Mastery Shard",
        "color": "Red"
      },
      {
        "shard": "Mastery Shard",
        "color": "Orange"
      },
      {
        "shard": "Mastery Shard",
        "color": "Pink"
      },
      {
        "shard": "Mastery Shard",
        "color": "Blue"
      },
      {
        "shard": "Mastery Shard",
        "color": "Green"
      },
      {
        "shard": "Versatile Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-all-specimen-gain",
    "name": "All Specimen Gain",
    "requirements": [
      {
        "shard": "Specimen Shard",
        "color": "Red"
      },
      {
        "shard": "Specimen Shard",
        "color": "Orange"
      },
      {
        "shard": "Specimen Shard",
        "color": "Pink"
      },
      {
        "shard": "Specimen Shard",
        "color": "Blue"
      },
      {
        "shard": "Specimen Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-all-specimen-research",
    "name": "All Specimen Research",
    "requirements": [
      {
        "shard": "Capital Research Shard",
        "color": "Orange"
      },
      {
        "shard": "Capital Research Shard",
        "color": "Pink"
      },
      {
        "shard": "Capital Research Shard",
        "color": "Green"
      }
    ]
  },
  {
    "id": "obj-all-fragment-gain",
    "name": "All Fragment Gain",
    "requirements": [
      {
        "shard": "Resource Shard",
        "color": "Red"
      },
      {
        "shard": "Resource Shard",
        "color": "Orange"
      },
      {
        "shard": "Resource Shard",
        "color": "Blue"
      }
    ]
  },
  {
    "id": "obj-all-base-6",
    "name": "All Base 6",
    "requirements": [
      {
        "shard": "Production Shard",
        "color": "Red"
      },
      {
        "shard": "Production Shard",
        "color": "Pink"
      },
      {
        "shard": "Production Shard",
        "color": "Green"
      },
      {
        "shard": "Versatile Shard",
        "color": "Pink"
      }
    ]
  },
  {
    "id": "obj-all-titan",
    "name": "All Titan",
    "requirements": [
      {
        "shard": "Titan Shard",
        "color": "Orange"
      },
      {
        "shard": "Titan Shard",
        "color": "Pink"
      }
    ]
  }
];
