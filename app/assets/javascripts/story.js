var Story = function(meteorite) {
  this.meteorite = meteorite;
}

Story.prototype.generateTree = function(grammar) {
  var trace = tracery.createGrammar(grammar);
  this.storyTree = trace.expand("#origin#");
};

Story.prototype.renderStory = function() {
  return this.storyTree.finalText;
}

Story.prototype.confusedGrammar = function() {return {
    "hello": [
      "Hello!",
      "Whaddup whaddup!",
      "Salve!",
      "Konnichiwa!",
      "<stares at you>",
      "Bonjourno."
    ],
    "introduction": [
      "I have fallen from the sky.",
      "I've never been so still.",
      "WHAT ARE YOU?"
    ],
    "confusedStatement": [
      "Help me!",
      "I've lost my fam.",
      "Where am I?",
      "Huhwhahuh?!"
    ],
    "nonsense": [
      "Wubba lubba dub dub...",
      "Aroo?",
      "Zuuhh?",
      "Oohrruu",
      "<looks terrified>"
    ],
    "greeting": ["#hello# My name is " + this.meteorite.name + "."],
    "origin": ["#greeting#  #introduction#  #nonsense#  #confusedStatement#"]
  };
}

Story.prototype.coherentGrammar = function() {return {
  "thanks": [
    "THANKS!",
    "Wowzers, you're great!",
    "Domo Arigato.",
    "Thank you, but our princess is in another castle."
  ],
  "timeframe": [
    "year",
    "day",
    "century",
    "light-year",
    "parsec"
  ],
  "spaceThing": [
    "the Hubble Telescope",
    "Andromeda",
    "the Kuiper Belt",
    "Reno, NV"
  ],
  "relative": [
    "my cousin",
    "my brother",
    "my sister",
    "my neighbor",
    "my dear friend"
  ],
  "expandedOrigin": [
    "It feels like just yester#timeframe# that I was flying past #spaceThing#.",
    "It wasn't an accident... it was SABOTAGE!",
    "There are other " + this.meteorite.recclass +
    " meteorites just like me who survived... I am sure of it.",
    "We never know the attack was coming.",
    "I got tired of orbiting Neptune.",
    "While sitting around one day... I was bouldered off my asteroid."
  ],
  "hint": [
    "along " + this.meteorite.nextMeteorite.getLat() + " latitude",
    "along " + this.meteorite.nextMeteorite.getLong() + " longitude"
    // "in " + this.meteorite.nextMeteorite.getYear() + " AD"
  ],

  // REGIONAL CLUES
  "africa": [
  "OMG A LION, GET IN THE CAR",
  "Pyramids!",
  "I was approaching Earth, aimed straight for the middle, and... BULLSEYE!"
  ],
  "arctic": [
    "My compass is broken.",
    "Are you Santa?",
    "Where is everybody?"
  ],
  "antarctica": [
    "Brrrrrr!",
    "Which one has penguins and which one has polar bears?  I always forget."
  ],
  "north-america": [
    "What a rainy day.",
    "Yay seasons!",
    "DID BIGFOOT JUST WALK BY!"
  ],
  "south-america": [
    "¿Qué Paso?",
    "I've a distant cousin who is a soccer ball!",
    "I could go for some Yerba Mate."
  ],
  "europe": [
    "I can't keep track of all these kings and queens.",
    "Pasta!",
    "These buildings look older than me!"
  ],
  "australia": [
    "G'day Mate.",
    "Blimey!",
    "What's the deal with the platypus, I mean, really?"
  ],
  "asia": [
    "I can see that wall from home!",
    "Oh no, Mongol hordes!",
    "Fireworks!"
  ],
  // CLASS INFO
  "L6": [
    "A swarm of steel beings attacked my family as we were taking a stroll around Sirius.",
    "We were attacked by a steel swarm. Some of us were able to escape to Earth.",
    "I fear most of my family has been reduced to space dust.",
    "Why do you keep saying Nogata?"
  ],
  "iron": [
    "This planet is quite nice. It seems like an old relative of mine.",
    "Please don't melt me down into one of those ships I saw on my way here."
  ],
  "H": [
    "Looks like I've hit rock bottom.",
    "You can call me Dwayne Johnson.",
    "Wanna play me-paper-scissors?"
  ],
  "unclass": [
    "I still can't remember where we came from.",
    "I feel like I'm having an identity crisis... Am I an asteroid, meteorite, meteor?"
  ],
  "pun": [
    "rock solid!",
    "going stone-cold crazy!",
    "on the roll and gathering no stardust!",
    "feeling much boulder!",
    "together, for the crater good!",
    "winning by a landslide!",
    "starting over with a clean slate!"
  ],
  "clue": ["Please find #relative#!  Look #hint#."],
  "conclusion": ["Please help another family of meteorites!  I heard that there's somerock #hint# who you could help."],
  "familyFound": ["You found " + this.meteorite.family.reduce(function(previous, current) {
    return previous + current.name + ", ";
  }, "") + "and we are now reunited!  This " + this.meteorite.recclass + " family is #pun# #conclusion#"],
  "familyNotFound": ["#expandedOrigin# #" + this.classAbouts(this.meteorite) + "#  #" + this.whereabouts(this.meteorite) + "# #clue#"],
  "origin": ["#thanks# " + (this.meteorite.family.length < 5 ? "#familyNotFound#" : "#familyFound#")]
  }
}

Story.prototype.whereabouts = function(meteorite) {
  var latitude = meteorite.getLat();
  var longitude = meteorite.getLong();

  if (latitude > 60) {
    return "arctic";
  } else if (latitude < -60) {
    return "antarctica";
  } else if (longitude < -30 && latitude > 0) {
    return "north-america";
  } else if (longitude < -30 && latitude < 0) {
    return "south-america";
  } else if (latitude < 32 && longitude < 45) {
    return "africa";
  } else if (latitude > 32 && longitude < 30) {
    return "europe";
  } else if (latitude > 90 && longitude < 10) {
    return "australia";
  } else {
    return "asia";
  }
}

Story.prototype.classAbouts = function(meteorite) {
  var recclass = meteorite.recclass[0];

  if (recclass == "L") {
    return "L6";
  } else if (recclass == "I") {
    return "iron";
  } else if (recclass == "H") {
    return "H";
  } else {
    return "unclass";
  }
}
