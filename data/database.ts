
export interface Case {
  id: string;
  name: string;
  status: 'Open' | 'Classified' | 'Archived';
  difficulty: number;
  operatives: number;
  solvedRate: string;
  description: string;
}

export interface EvidenceCode {
  code: string;
  scenario: string;
  resultMessage: string;
  isValid: boolean;
}

export interface Suspect {
  id: number;
  name: string;
  clothing: string;
  footwear: string;
  accessories?: string;
  notableDetail?: string;
}

export interface CaseFileContent {
  caseTitle: string;
  dateOfIncident: string;
  storyline: string;
  firDetails: {
    station: string;
    firNo: string;
    dateOfReg: string;
    timeOfReg: string;
  };
  complainant: {
    name: string;
    age: string;
    relation: string;
  };
  victim: {
    name: string;
    age: string;
    occupation: string;
  };
  occurrence: {
    date: string;
    time: string;
    place: string;
  };
  nature: string;
  statementOfFacts: string;
  observations: string[];
  personsPresent: string;
  articles: string[];
  currentStatus: string;
}

export const SCENARIOS: Case[] = [
  {
    id: "001",
    name: "Game is Real",
    status: "Open",
    difficulty: 4,
    operatives: 124,
    solvedRate: "12%",
    description: "An escape room enthusiast goes missing. The props aren't fake anymore."
  },
  {
    id: "002",
    name: "The Last Trip",
    status: "Open",
    difficulty: 3,
    operatives: 89,
    solvedRate: "24%",
    description: "A private game event turns into a crime scene when the organizer mysteriously collapses."
  },
  {
    id: "003",
    name: "The Glass Room",
    status: "Classified",
    difficulty: 5,
    operatives: 42,
    solvedRate: "3%",
    description: "The victim was found in a room sealed from the inside. No weapon. No entry."
  },
  {
    id: "004",
    name: "The Party",
    status: "Open",
    difficulty: 2,
    operatives: 215,
    solvedRate: "45%",
    description: "A high-society gala turns deadly when the host is poisoned in front of everyone."
  },
  {
    id: "005",
    name: "The Cult",
    status: "Classified",
    difficulty: 5,
    operatives: 18,
    solvedRate: "0.5%",
    description: "Whispers in the woods. Missing hikers. A ritual that never ended."
  }
];

export const EVIDENCE_DB: EvidenceCode[] = [
  { 
    code: "E01LT", 
    scenario: "The Last Trip", 
    resultMessage: "Valid Evidence: Forensic logs from the game unit confirm a manual override of the voltage regulators at 18:38 hrs.",
    isValid: true 
  },
  { 
    code: "E02LT", 
    scenario: "The Last Trip", 
    resultMessage: "Red Herring: A discarded coffee cup. Fingerprints match the victim, Arjun Mehra. No traces of toxins.",
    isValid: false 
  },
  { 
    code: "E03LT", 
    scenario: "The Last Trip", 
    resultMessage: "Crucial Link: A mobile phone found hidden behind the server rack shows an unsent message: 'The settings are locked. He won't know what hit him.'",
    isValid: true 
  }
];

export const SUSPECTS: Suspect[] = [
  {
    id: 1,
    name: "Rhea Kapoor",
    clothing: "Light beige hoodie, blue jeans",
    footwear: "White sneakers",
    notableDetail: "Hoodie sleeves pulled down for most of the time observed"
  },
  {
    id: 2,
    name: "Dev Malhotra",
    clothing: "Dark green T-shirt, black cargo pants",
    footwear: "Sports shoes",
    accessories: "Wristband on right hand"
  },
  {
    id: 3,
    name: "Sanya Bedi",
    clothing: "Oversized black sweatshirt",
    footwear: "Slip-on shoes",
    accessories: "Backpack"
  },
  {
    id: 4,
    name: "Manav Grover",
    clothing: "Grey hoodie",
    footwear: "Dark trainers",
    notableDetail: "Observed near the storage area during portions of the evening"
  },
  {
    id: 5,
    name: "Viren Khanna",
    clothing: "Checked shirt",
    footwear: "Brown shoes",
    accessories: "Camera with lens pouch and strap"
  },
  {
    id: 6,
    name: "Priya Nanda",
    clothing: "Blue denim jacket",
    footwear: "Sneakers",
    accessories: "Mobile phone frequently in hand"
  },
  {
    id: 7,
    name: "Sameer Saxena",
    clothing: "White T-shirt, jeans",
    footwear: "Running shoes"
  }
];

export const CASE_FILES: Record<string, CaseFileContent> = {
  "002": {
    caseTitle: "The Last Trip",
    dateOfIncident: "22 January 2025",
    storyline: "On the evening of 22 January 2025, a private game event was being prepared at a closed venue by Arjun Mehra, a college student and the event’s primary organizer. The setup involved multiple technical components and was nearing completion when Arjun suddenly collapsed near one of the game units.\n\nAt first, the incident was assumed to be caused by exhaustion or stress. However, a closer inspection of the setup raised concerns that certain equipment settings may have been altered beyond safe limits. With no visible signs of physical assault and several people present at the venue, the circumstances surrounding the incident remain unclear.\n\nAuthorities are now examining whether the incident resulted from negligence, external influence, or deliberate interference.",
    firDetails: {
      station: "Central City Police Station",
      firNo: "0147/2025",
      dateOfReg: "22 / 01 / 2025",
      timeOfReg: "19:05 hrs"
    },
    complainant: {
      name: "Sameer Saxena",
      age: "22 years",
      relation: "Close friend"
    },
    victim: {
      name: "Arjun Mehra",
      age: "22 years",
      occupation: "College Student / Event Organizer"
    },
    occurrence: {
      date: "22 / 01 / 2025",
      time: "Approximately 18:40 hrs",
      place: "Private event venue during preparation of a game-based event"
    },
    nature: "The incident involves the sudden collapse of the victim during final event preparations. Preliminary observations suggest the possibility of unauthorized modification of event equipment. No signs of physical assault were observed at the scene.",
    statementOfFacts: "The complainant stated that Arjun Mehra was supervising final preparations of the event and personally checking multiple setup components. Several friends and associates were present at the venue, assisting with logistics and coordination. No arguments or conflicts were observed.\n\nAt approximately 6:40 PM, Arjun collapsed near one of the game setup units. Initial assumptions pointed toward exhaustion; however, certain configuration settings appeared inconsistent with normal operational limits, prompting suspicion of manual interference.",
    observations: [
      "Possible unauthorized modification of equipment",
      "Exact cause of the incident not confirmed",
      "Requires forensic and technical examination"
    ],
    personsPresent: "Approximately 11 individuals, all personally known to the victim. No individual has been named as an accused at this stage.",
    articles: [
      "One game setup unit (sealed for examination)",
      "Related technical accessories"
    ],
    currentStatus: "Investigation is ongoing. Responsibility cannot be established based on a single piece of evidence and requires correlation of all available records."
  }
};

export const LIVE_LOGS = [
  { time: "14:22:01", team: "Shadow-7", action: "EVIDENCE_UPLOADED", caseId: "001" },
  { time: "14:23:45", team: "GHOST-4", action: "INTERROGATION_COMPLETE", caseId: "004" },
  { time: "14:25:12", team: "ALPHA-1", action: "SUSPECT_IDENTIFIED", caseId: "002" },
  { time: "14:26:30", team: "SYSTEM", action: "ENCRYPTION_RENEWED", caseId: "GLOBAL" },
];
