import { Company, JobOpening, Question, CodingProblem, RoadmapStage } from '../types';

export const PROGRAMMING_LANGUAGES_LIST = [
  { name: 'C', category: 'Language', icon: '©️', popularity: 'High (Embedded & Core)', desc: 'Procedural systems programming, memory management & OS development' },
  { name: 'C++', category: 'Language', icon: '⚡', popularity: 'Very High (DSA & CP)', desc: 'High performance, STL, object-oriented, competitive programming favorite' },
  { name: 'Java', category: 'Language', icon: '☕', popularity: 'Top Enterprise Pick', desc: 'Enterprise backends, Spring Boot, Android, OOP & large scale systems' },
  { name: 'Python', category: 'Language', icon: '🐍', popularity: 'Most Popular', desc: 'Versatile language for AI/ML, data analysis, scripting & web APIs' },
  { name: 'JavaScript', category: 'Language', icon: '🌐', popularity: 'Universal Web', desc: 'The backbone of frontend and full-stack web applications' },
  { name: 'TypeScript', category: 'Language', icon: '🔷', popularity: 'Modern Standard', desc: 'Typed superset of JavaScript for scalable, robust frontend & backend apps' },
  { name: 'SQL', category: 'Language', icon: '🗄️', popularity: 'Universal Data', desc: 'Relational database queries, joins, window functions & data aggregation' },
  { name: 'HTML', category: 'Language', icon: '📄', popularity: 'Web Foundation', desc: 'Semantic web structure, accessibility, forms and modern web markup' },
  { name: 'CSS', category: 'Language', icon: '🎨', popularity: 'Styling & Layout', desc: 'Responsive design, Flexbox, CSS Grid, transitions and animations' },
  { name: 'PHP', category: 'Language', icon: '🐘', popularity: 'Web Backend', desc: 'Server-side scripting powering massive web ecosystems like WordPress and Laravel' },
  { name: 'C#', category: 'Language', icon: '🎯', popularity: 'Enterprise & Games', desc: 'Modern OOP language by Microsoft for .NET services, web APIs and Unity games' },
  { name: 'Go', category: 'Language', icon: '🐹', popularity: 'Cloud & Microservices', desc: 'Google-developed language renowned for concurrency, goroutines and cloud infra' },
  { name: 'Kotlin', category: 'Language', icon: '📱', popularity: 'Modern Android & JVM', desc: 'Concise, null-safe modern JVM language officially favored for Android' },
  { name: 'Rust', category: 'Language', icon: '🦀', popularity: 'Systems & High Safety', desc: 'Memory safety without garbage collection, blazingly fast concurrent systems' },
];

export const CORE_CS_SKILLS = [
  'Data Structures',
  'Algorithms',
  'Object-Oriented Programming (OOP)',
  'Database Management Systems (DBMS)',
  'Operating Systems',
  'Computer Networks',
  'System Design',
  'Git & Version Control',
];

export const APTITUDE_TOPICS_LIST = [
  { slug: 'percentages', name: 'Percentages', count: 15, difficulty: 'Easy - Medium', icon: '📊', formula: 'Percentage = (Value / Total) × 100' },
  { slug: 'profit-loss', name: 'Profit and Loss', count: 18, difficulty: 'Medium', icon: '📈', formula: 'Profit % = (Profit / CP) × 100, SP = CP × (100 + P%)/100' },
  { slug: 'ratio-proportion', name: 'Ratio and Proportion', count: 12, difficulty: 'Easy', icon: '⚖️', formula: 'If a/b = c/d then ad = bc' },
  { slug: 'averages', name: 'Averages', count: 14, difficulty: 'Easy - Medium', icon: '🎯', formula: 'Average = (Sum of observations) / (Number of observations)' },
  { slug: 'time-work', name: 'Time and Work', count: 16, difficulty: 'Medium - Hard', icon: '⏱️', formula: 'Work Done = Rate × Time; If A takes x days, 1 day work = 1/x' },
  { slug: 'time-speed-distance', name: 'Time Speed Distance', count: 20, difficulty: 'Medium - Hard', icon: '🚀', formula: 'Distance = Speed × Time; 1 km/h = 5/18 m/s' },
  { slug: 'simple-interest', name: 'Simple Interest', count: 12, difficulty: 'Easy', icon: '💰', formula: 'SI = (P × R × T) / 100; Amount = P + SI' },
  { slug: 'compound-interest', name: 'Compound Interest', count: 15, difficulty: 'Medium - Hard', icon: '🏦', formula: 'A = P(1 + R/100)^T; CI = A - P' },
  { slug: 'probability', name: 'Probability', count: 14, difficulty: 'Medium - Hard', icon: '🎲', formula: 'P(E) = Favorable Outcomes / Total Sample Space' },
  { slug: 'number-system', name: 'Number System', count: 16, difficulty: 'Medium', icon: '🔢', formula: 'Divisibility rules, Unit digits, Remainders & LCM/HCF' },
  { slug: 'permutation-combination', name: 'Permutation and Combination', count: 14, difficulty: 'Hard', icon: '🔀', formula: 'nPr = n! / (n-r)! ; nCr = n! / (r! × (n-r)!)' },
  { slug: 'data-interpretation', name: 'Data Interpretation', count: 12, difficulty: 'Medium', icon: '📉', formula: 'Reading tables, bar graphs, pie charts and trends' },
];

export const REASONING_TOPICS_LIST = [
  { slug: 'number-series', name: 'Number Series', count: 15, difficulty: 'Easy - Medium', icon: '🔢', tip: 'Check differences, double differences, primes, or squares/cubes.' },
  { slug: 'letter-series', name: 'Letter Series', count: 12, difficulty: 'Easy', icon: '🔤', tip: 'Convert letters to alphabetical positions (A=1, Z=26) for pattern lookup.' },
  { slug: 'coding-decoding', name: 'Coding-Decoding', count: 16, difficulty: 'Medium', icon: '🔐', tip: 'Inspect position shifting (+2, -3) or reverse letter pairs (A-Z, B-Y).' },
  { slug: 'blood-relations', name: 'Blood Relations', count: 14, difficulty: 'Medium', icon: '👥', tip: 'Draw family generation trees with + for male, - for female, = for spouses.' },
  { slug: 'direction-sense', name: 'Direction Sense', count: 12, difficulty: 'Easy - Medium', icon: '🧭', tip: 'Draw standard North-South-East-West compass and track final coordinates.' },
  { slug: 'syllogism', name: 'Syllogism', count: 15, difficulty: 'Medium - Hard', icon: '⭕', tip: 'Use standard Venn diagrams. Test extreme valid counter-examples.' },
  { slug: 'seating-arrangement', name: 'Seating Arrangement', count: 14, difficulty: 'Hard', icon: '🪑', tip: 'Identify definite starting clues, track clockwise/anti-clockwise in circular tables.' },
  { slug: 'puzzles', name: 'Puzzles', count: 12, difficulty: 'Hard', icon: '🧩', tip: 'Build tabular matrix grid matching people, days, colors, and professions.' },
  { slug: 'analogy', name: 'Analogy', count: 10, difficulty: 'Easy', icon: '🔗', tip: 'Determine semantic relation (cause/effect, synonym, part/whole, tool/worker).' },
  { slug: 'classification', name: 'Classification (Odd One Out)', count: 10, difficulty: 'Easy', icon: '🏷️', tip: 'Find common property shared by 3 items that the 4th item breaks.' },
  { slug: 'statement-conclusion', name: 'Statement and Conclusion', count: 14, difficulty: 'Medium', icon: '💡', tip: 'Do not bring outside knowledge; only deduce strictly stated logical bounds.' },
  { slug: 'data-sufficiency', name: 'Data Sufficiency', count: 12, difficulty: 'Hard', icon: '📋', tip: 'Evaluate Statement 1 alone, Statement 2 alone, then both combined.' },
];

export const SAMPLE_QUESTIONS: Question[] = [
  // Aptitude
  {
    id: 'q-apt-1',
    topic: 'percentages',
    category: 'Aptitude',
    difficulty: 'Easy',
    questionText: 'If the price of a commodity increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains the same?',
    options: ['15%', '20%', '25%', '33.33%'],
    correctAnswer: 1,
    explanation: 'Reduction % = [R / (100 + R)] × 100 = [25 / 125] × 100 = (1/5) × 100 = 20%.',
  },
  {
    id: 'q-apt-2',
    topic: 'percentages',
    category: 'Aptitude',
    difficulty: 'Medium',
    questionText: 'A student scored 35% marks and failed by 15 marks. Another student scored 45% marks and got 25 marks more than the pass mark. What is the total maximum mark of the examination?',
    options: ['300', '350', '400', '450'],
    correctAnswer: 2,
    explanation: 'Difference in percentages = 45% - 35% = 10%. Difference in marks = 25 - (-15) = 40 marks. So, 10% of Total = 40 => Total Maximum Marks = 400.',
  },
  {
    id: 'q-apt-3',
    topic: 'profit-loss',
    category: 'Aptitude',
    difficulty: 'Medium',
    questionText: 'A shopkeeper sells an article at a profit of 12.5%. If he had sold it for Rs. 22.50 more, his profit would have been 15%. Find the cost price (CP) of the article.',
    options: ['Rs. 750', 'Rs. 900', 'Rs. 1000', 'Rs. 1200'],
    correctAnswer: 1,
    explanation: 'Difference in profit percentage = 15% - 12.5% = 2.5%. 2.5% of CP = 22.50. Therefore, CP = (22.50 / 2.5) × 100 = Rs. 900.',
  },
  {
    id: 'q-apt-4',
    topic: 'time-work',
    category: 'Aptitude',
    difficulty: 'Medium',
    questionText: 'A can complete a piece of work in 12 days, while B can complete the same work in 18 days. They worked together for 4 days, then A left. How many days will B take to finish the remaining work?',
    options: ['6 days', '8 days', '10 days', '12 days'],
    correctAnswer: 1,
    explanation: "A's 1 day work = 1/12, B's 1 day work = 1/18. Together in 1 day = (3+2)/36 = 5/36. In 4 days = 4 × 5/36 = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9. B takes: (4/9) / (1/18) = (4/9) × 18 = 8 days.",
  },
  {
    id: 'q-apt-5',
    topic: 'time-speed-distance',
    category: 'Aptitude',
    difficulty: 'Medium',
    questionText: 'A train 180 meters long is traveling at a speed of 54 km/h. How long will it take to pass a stationary telegraph pole beside the track?',
    options: ['8 seconds', '10 seconds', '12 seconds', '15 seconds'],
    correctAnswer: 2,
    explanation: 'Speed in m/s = 54 × (5/18) = 15 m/s. Time = Distance / Speed = 180 m / 15 m/s = 12 seconds.',
  },
  {
    id: 'q-apt-6',
    topic: 'probability',
    category: 'Aptitude',
    difficulty: 'Hard',
    questionText: 'Two dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on the two dice is a prime number?',
    options: ['5/12', '7/18', '15/36', '13/36'],
    correctAnswer: 0,
    explanation: 'Total outcomes = 36. Prime sums possible: 2, 3, 5, 7, 11. Pairs giving 2: (1,1)[1]; giving 3: (1,2),(2,1)[2]; giving 5: (1,4),(2,3),(3,2),(4,1)[4]; giving 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)[6]; giving 11: (5,6),(6,5)[2]. Total favorable = 1 + 2 + 4 + 6 + 2 = 15. Probability = 15/36 = 5/12.',
  },
  {
    id: 'q-apt-7',
    topic: 'ratio-proportion',
    category: 'Aptitude',
    difficulty: 'Easy',
    questionText: 'If A : B = 3 : 4 and B : C = 8 : 9, find the ratio of A : C.',
    options: ['1 : 2', '2 : 3', '3 : 2', '4 : 5'],
    correctAnswer: 1,
    explanation: 'A/C = (A/B) × (B/C) = (3/4) × (8/9) = 24/36 = 2/3. Hence A : C = 2 : 3.',
  },
  {
    id: 'q-apt-8',
    topic: 'simple-interest',
    category: 'Aptitude',
    difficulty: 'Easy',
    questionText: 'A sum of money doubles itself in 8 years at a simple interest rate. What is the annual rate of interest?',
    options: ['10%', '12.5%', '15%', '16%'],
    correctAnswer: 1,
    explanation: 'Let Principal be P. Simple interest for doubling = P. Formula: SI = (P × R × T) / 100 => P = (P × R × 8) / 100 => R = 100 / 8 = 12.5%.',
  },

  // Logical Reasoning
  {
    id: 'q-rea-1',
    topic: 'number-series',
    category: 'Reasoning',
    difficulty: 'Easy',
    questionText: 'Find the next number in the series: 4, 9, 25, 49, 121, ?',
    options: ['144', '169', '196', '225'],
    correctAnswer: 1,
    explanation: 'The series consists of squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121. The next prime number is 13, so 13^2 = 169.',
  },
  {
    id: 'q-rea-2',
    topic: 'coding-decoding',
    category: 'Reasoning',
    difficulty: 'Medium',
    questionText: 'In a certain code language, "SYSTEM" is written as "SYSMET" and "NEARER" is written as "AENRER". How is "FRACTION" written in that code?',
    options: ['CARFNOIT', 'CARFTION', 'ARFCNOIT', 'CARFNOIT'],
    correctAnswer: 0,
    explanation: 'Divide the word into two equal halves. "SYSTEM" -> SYS (reversed = SYS), TEM (reversed = MET) -> SYSMET. "FRACTION" has 8 letters: FRAC (reversed = CARF), TION (reversed = NOIT) -> CARFNOIT.',
  },
  {
    id: 'q-rea-3',
    topic: 'blood-relations',
    category: 'Reasoning',
    difficulty: 'Medium',
    questionText: 'Pointing to a photograph of a boy, Suresh said, "He is the only son of my mother\'s only daughter." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle (Maternal)', 'Father', 'Grandfather'],
    correctAnswer: 1,
    explanation: "Suresh's mother's only daughter = Suresh's sister. The boy is the son of Suresh's sister. Hence Suresh is the maternal uncle of the boy.",
  },
  {
    id: 'q-rea-4',
    topic: 'direction-sense',
    category: 'Reasoning',
    difficulty: 'Medium',
    questionText: 'A man walks 6 km South, then turns left and walks 4 km, then turns left and walks 3 km, and finally turns right and walks 2 km. How far is he from his starting point horizontally along the East direction?',
    options: ['4 km', '6 km', '8 km', '10 km'],
    correctAnswer: 1,
    explanation: 'Eastward movements: 4 km (first left) + 2 km (final right) = 6 km East. Southward movements: 6 km South - 3 km North = 3 km South.',
  },
  {
    id: 'q-rea-5',
    topic: 'syllogism',
    category: 'Reasoning',
    difficulty: 'Hard',
    questionText: 'Statements:\n1. All cars are vehicles.\n2. Some vehicles are electric.\nConclusions:\nI. Some electric items are cars.\nII. Some vehicles are cars.',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both I and II follow', 'Neither I nor II follows'],
    correctAnswer: 1,
    explanation: 'Since all cars are vehicles, some vehicles are definitely cars (Conclusion II is valid). But electric items need not overlap with cars directly (Conclusion I is not necessarily true).',
  },
  {
    id: 'q-rea-6',
    topic: 'letter-series',
    category: 'Reasoning',
    difficulty: 'Easy',
    questionText: 'Complete the series: B, E, H, K, N, ?',
    options: ['P', 'Q', 'R', 'S'],
    correctAnswer: 1,
    explanation: 'Letter positions: B(2) + 3 = E(5) + 3 = H(8) + 3 = K(11) + 3 = N(14) + 3 = Q(17). The next letter is Q.',
  },
];

export const COMPANIES_LIST: Company[] = [
  {
    id: 'comp-1',
    name: 'TCS',
    logo: '🏢',
    industry: 'IT Services & Consulting',
    tier: 'Tier 1',
    roles: ['Ninja Software Engineer', 'Digital Developer', 'Prime R&D Engineer'],
    requiredSkills: ['C', 'Java', 'Python', 'SQL', 'Aptitude', 'Data Structures'],
    programmingLanguages: ['Java', 'Python', 'C', 'C++'],
    aptitudeRequirements: 'Numerical Ability, Verbal Ability & Reasoning cutoff: 65%+',
    logicalReasoningRequirements: 'Inductive, deductive & situational reasoning in TCS NQT',
    dsaRequirements: 'Arrays, Strings, Matrices, basic Recursion and Searching algorithms',
    eligibility: '60% or 6.0 CGPA throughout 10th, 12th & Degree. Max 1 active backlog allowed at time of test.',
    salaryPackage: '3.6 - 9.0 LPA',
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Delhi NCR'],
    openingsCount: 1400,
    applicationUrl: 'https://nextstep.tcs.com/campus/#/',
    isVerified: true,
    notes: 'National Qualifier Test (NQT) conducted quarterly. High weightage on Aptitude speed.'
  },
  {
    id: 'comp-2',
    name: 'Infosys',
    logo: '🌐',
    industry: 'IT Services & Technology',
    tier: 'Tier 1',
    roles: ['Systems Engineer', 'Specialist Programmer (Power Programmer)', 'Digital Specialist Engineer'],
    requiredSkills: ['Python', 'Java', 'Data Structures', 'Algorithms', 'SQL', 'Aptitude'],
    programmingLanguages: ['Java', 'Python', 'C++'],
    aptitudeRequirements: 'Mathematical Ability, Logical Reasoning, Verbal Ability & Pseudocode',
    logicalReasoningRequirements: 'Data interpretation, cryptarithmetic & syllogisms',
    dsaRequirements: 'Trees, Graphs, DP & Greedy algorithms for Specialist Programmer role',
    eligibility: '65% or 6.5 CGPA in graduation. No active backlogs allowed.',
    salaryPackage: '3.6 - 9.5 LPA',
    locations: ['Bangalore', 'Mysore', 'Pune', 'Hyderabad', 'Chennai', 'Bhubaneswar'],
    openingsCount: 850,
    applicationUrl: 'https://career.infosys.com/joblist',
    isVerified: true,
    notes: 'InfyTQ and HackWithInfy coding competition routes offer direct Specialist Programmer interviews.'
  },
  {
    id: 'comp-3',
    name: 'Wipro',
    logo: '💼',
    industry: 'IT & Business Process',
    tier: 'Tier 1',
    roles: ['Project Engineer (Elite)', 'Turbo Developer', 'Star Software Engineer'],
    requiredSkills: ['Java', 'C++', 'Python', 'OOP', 'SQL', 'Logical Reasoning'],
    programmingLanguages: ['Java', 'Python', 'C++'],
    aptitudeRequirements: 'Quantitative, Logical, Verbal & Essay Writing test',
    logicalReasoningRequirements: 'Coding-decoding, blood relations, and pattern deduction',
    dsaRequirements: 'Basic linear data structures, string manipulation & hashing',
    eligibility: '60% throughout education. Max 1 backlog permitted during online round.',
    salaryPackage: '3.5 - 7.0 LPA',
    locations: ['Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'],
    openingsCount: 620,
    applicationUrl: 'https://careers.wipro.com/careers-home',
    isVerified: true,
    notes: 'Elite National Talent Hunt (NTH) features an automated programming round and business communication test.'
  },
  {
    id: 'comp-4',
    name: 'Accenture',
    logo: '🔮',
    industry: 'Technology & Consulting',
    tier: 'Tier 1',
    roles: ['Associate Software Engineer (ASE)', 'Advanced ASE'],
    requiredSkills: ['Python', 'Java', 'Cloud Fundamentals', 'SQL', 'Problem Solving'],
    programmingLanguages: ['Java', 'Python', 'C++'],
    aptitudeRequirements: 'Cognitive assessment (English, Critical Thinking, Abstract Reasoning) & Tech assessment',
    logicalReasoningRequirements: 'Data arrangement, conditional logic and coding pseudocode evaluation',
    dsaRequirements: 'Array traversal, sorting, string parsing and dictionary mappings',
    eligibility: '65% or 6.5 CGPA in BE/B.Tech/MCA. Zero active backlogs.',
    salaryPackage: '4.5 - 6.5 LPA',
    locations: ['Bangalore', 'Gurgaon', 'Hyderabad', 'Mumbai', 'Chennai', 'Kolkata'],
    openingsCount: 950,
    applicationUrl: 'https://www.accenture.com/in-en/careers',
    isVerified: true,
    notes: 'Elimination round follows Cognitive + Technical MCQs, followed immediately by 2 coding questions.'
  },
  {
    id: 'comp-5',
    name: 'Cognizant',
    logo: '🔷',
    industry: 'Information Technology',
    tier: 'Tier 1',
    roles: ['GenC Associate', 'GenC Elevate', 'GenC Next'],
    requiredSkills: ['Java', 'SQL', 'Web Technologies', 'Data Structures', 'Aptitude'],
    programmingLanguages: ['Java', 'Python', 'C#'],
    aptitudeRequirements: 'Analytical, quantitative and verbal aptitude in GenC entrance',
    logicalReasoningRequirements: 'Deductive reasoning, sequencing and analytical puzzles',
    dsaRequirements: 'GenC Next requires strong Dynamic Programming, Binary Trees & HashMaps',
    eligibility: '60% or 6.0 CGPA throughout 10th, 12th and B.Tech. Up to 1 backlog permitted.',
    salaryPackage: '4.0 - 9.0 LPA',
    locations: ['Chennai', 'Bangalore', 'Coimbatore', 'Hyderabad', 'Kolkata'],
    openingsCount: 750,
    applicationUrl: 'https://careers.cognizant.com/global/en',
    isVerified: true,
    notes: 'Skill badge verification on HackerRank or Coursera adds bonus weight during resume screening.'
  },
  {
    id: 'comp-6',
    name: 'Amazon',
    logo: '📦',
    industry: 'E-Commerce, Cloud & AI',
    tier: 'Product',
    roles: ['Software Development Engineer I (SDE 1)', 'Data Engineer', 'Support Engineer'],
    requiredSkills: ['Data Structures', 'Algorithms', 'System Design', 'Java', 'C++', 'Object-Oriented Programming'],
    programmingLanguages: ['Java', 'C++', 'Python'],
    aptitudeRequirements: 'Amazon Online Assessment (OA) with Work Simulation & 16 Leadership Principles',
    logicalReasoningRequirements: 'Situational Judgment Test (SJT) evaluating Customer Obsession & Ownership',
    dsaRequirements: 'Medium-to-Hard LeetCode problems: Graphs (BFS/DFS), Dynamic Programming, Binary Search, Heaps',
    eligibility: 'B.Tech/M.Tech/MCA with no current backlogs. Open to all branches.',
    salaryPackage: '28.0 - 45.0 LPA',
    locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR'],
    openingsCount: 180,
    applicationUrl: 'https://www.amazon.jobs/en/teams/internships-for-students',
    isVerified: false,
    notes: 'Always verify active batch eligibility on the official Amazon university careers portal.'
  },
  {
    id: 'comp-7',
    name: 'Microsoft',
    logo: '🪟',
    industry: 'Software & Cloud Computing',
    tier: 'Product',
    roles: ['Software Engineer (New College Graduate)', 'Product Manager', 'Data Analyst'],
    requiredSkills: ['Data Structures', 'Algorithms', 'Operating Systems', 'C++', 'C#', 'Python', 'System Design'],
    programmingLanguages: ['C++', 'C#', 'Java', 'Python'],
    aptitudeRequirements: 'Codility OA: 3 algorithmic questions in 90 minutes',
    logicalReasoningRequirements: 'Code logic tracing, edge case identification and time complexity proofs',
    dsaRequirements: 'Tries, Graph Theory, Segment Trees, DP, String algorithms & System concurrency',
    eligibility: '7.5+ CGPA preferred. Strong competitive coding or open-source credentials.',
    salaryPackage: '32.0 - 52.0 LPA',
    locations: ['Hyderabad', 'Bangalore', 'Noida'],
    openingsCount: 95,
    applicationUrl: 'https://careers.microsoft.com/students/us/en',
    isVerified: false,
    notes: 'Campus engagement drives through Microsoft Engage and university hackathons.'
  },
  {
    id: 'comp-8',
    name: 'Google',
    logo: '🔍',
    industry: 'Technology & Search',
    tier: 'Product',
    roles: ['Software Engineer, University Graduate', 'Site Reliability Engineer (SRE)', 'Associate Product Manager'],
    requiredSkills: ['Data Structures', 'Algorithms', 'Operating Systems', 'Computer Networks', 'Python', 'C++', 'Go'],
    programmingLanguages: ['C++', 'Java', 'Python', 'Go'],
    aptitudeRequirements: 'Google Online Challenge (GOC): pure mathematical and algorithmic problem solving',
    logicalReasoningRequirements: 'Mathematical proofs, invariant analysis and amortized bounds',
    dsaRequirements: 'Hard Graph problems, DP with bitmasks, Fenwick trees, Range Queries & Game Theory',
    eligibility: 'Bachelor or Master student in CS, EE or related STEM discipline. Zero backlogs.',
    salaryPackage: '35.0 - 60.0 LPA',
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Gurgaon'],
    openingsCount: 60,
    applicationUrl: 'https://www.google.com/about/careers/applications/students/',
    isVerified: false,
    notes: 'Verify recruitment season schedules directly on Google for Students official page.'
  },
  {
    id: 'comp-9',
    name: 'Oracle',
    logo: '🔴',
    industry: 'Cloud & Enterprise Software',
    tier: 'Product',
    roles: ['Associate Application Developer', 'Software Engineer - Cloud Infrastructure', 'Database Engineer'],
    requiredSkills: ['Java', 'SQL', 'DBMS', 'Operating Systems', 'C++', 'Data Structures'],
    programmingLanguages: ['Java', 'C++', 'SQL', 'Python'],
    aptitudeRequirements: 'Technical MCQs on Database internals, OS scheduling, Networking and Quantitative aptitude',
    logicalReasoningRequirements: 'SQL query tracing, transaction isolation levels & boolean algebra',
    dsaRequirements: 'Binary Search Trees, Heaps, Hashing, Graph shortest path (Dijkstra) & Sorting',
    eligibility: '7.0 CGPA or 70% in degree. No active backlogs.',
    salaryPackage: '14.0 - 22.0 LPA',
    locations: ['Bangalore', 'Hyderabad', 'Noida', 'Pune'],
    openingsCount: 110,
    applicationUrl: 'https://www.oracle.com/corporate/careers/students-grads/',
    isVerified: true,
    notes: 'Strong emphasis on Database Management Systems (DBMS), normalization and acid properties.'
  },
  {
    id: 'comp-10',
    name: 'Deloitte',
    logo: '🟢',
    industry: 'Consulting & Technology',
    tier: 'Consulting',
    roles: ['Analyst - Technology', 'Risk & Financial Advisory Analyst', 'Cybersecurity Analyst'],
    requiredSkills: ['SQL', 'Python', 'Data Analytics', 'Excel', 'Problem Solving', 'Aptitude'],
    programmingLanguages: ['Python', 'SQL', 'JavaScript'],
    aptitudeRequirements: 'Versant Communication Assessment, Quantitative reasoning & Business case study',
    logicalReasoningRequirements: 'Critical path evaluation, matrix analysis and argument validity',
    dsaRequirements: 'Foundational programming concepts, data cleaning, and relational joins',
    eligibility: '60% throughout academic career. Consistent academic record.',
    salaryPackage: '6.5 - 9.0 LPA',
    locations: ['Hyderabad', 'Bangalore', 'Mumbai', 'Gurgaon'],
    openingsCount: 320,
    applicationUrl: 'https://www2.deloitte.com/in/en/pages/careers/articles/students.html',
    isVerified: true,
    notes: 'Includes an interactive group discussion or case study round before technical interview.'
  },
  {
    id: 'comp-11',
    name: 'Zoho',
    logo: '🟩',
    industry: 'SaaS & Enterprise Products',
    tier: 'Product',
    roles: ['Software Developer', 'Quality Analyst', 'UI/UX Developer'],
    requiredSkills: ['C', 'Java', 'C++', 'OOP', 'Data Structures', 'Problem Solving'],
    programmingLanguages: ['C', 'Java', 'C++'],
    aptitudeRequirements: 'Round 1: C/Java pseudocode tracing, pointer arithmetic, bitwise logic & aptitude',
    logicalReasoningRequirements: 'High focus on output prediction and edge cases in C code',
    dsaRequirements: 'Advanced Application Programming round: Design snake game, railway reservation, chess engine',
    eligibility: 'Open to any degree and branch! No minimum CGPA barrier. Pure skills matter.',
    salaryPackage: '6.0 - 12.0 LPA',
    locations: ['Chennai', 'Tenkasi', 'Salem', 'Tirunelveli', 'Madurai'],
    openingsCount: 220,
    applicationUrl: 'https://www.zoho.com/careers/',
    isVerified: true,
    notes: 'Famous for practical machine coding rounds where you code a complete mini-system from scratch.'
  },
  {
    id: 'comp-12',
    name: 'Freshworks',
    logo: '🟧',
    industry: 'SaaS & Customer Engagement',
    tier: 'Product',
    roles: ['Software Academy Engineer', 'Frontend Engineer', 'Backend Engineer'],
    requiredSkills: ['JavaScript', 'TypeScript', 'Ruby', 'Java', 'SQL', 'REST APIs'],
    programmingLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    aptitudeRequirements: 'HackerEarth assessment with Quantitative and logical puzzles',
    logicalReasoningRequirements: 'System architecture comprehension and debugging reasoning',
    dsaRequirements: 'Medium-level problem solving, Hash tables, sliding window & tree traversals',
    eligibility: 'Graduation in engineering or computer science. Zero backlogs preferred.',
    salaryPackage: '8.0 - 15.0 LPA',
    locations: ['Chennai', 'Bangalore'],
    openingsCount: 85,
    applicationUrl: 'https://www.freshworks.com/company/careers/',
    isVerified: true,
    notes: 'Strong preference for candidates who have built and deployed full-stack web applications.'
  },
  {
    id: 'comp-13',
    name: 'IBM',
    logo: '🟦',
    industry: 'Cloud & AI Technology',
    tier: 'Tier 1',
    roles: ['Associate System Engineer', 'Cloud Developer', 'AI/Data Specialist'],
    requiredSkills: ['Python', 'Java', 'Linux', 'SQL', 'Cloud Basics'],
    programmingLanguages: ['Java', 'Python', 'SQL'],
    aptitudeRequirements: 'IBM Cognitive Ability Assessment (Games-based psychometric test)',
    logicalReasoningRequirements: 'Grid challenge, reseller game, and digit challenge test',
    dsaRequirements: 'Array manipulation, sorting, basic stack and queue operations',
    eligibility: '60% or 6.0 CGPA in 10th, 12th and B.Tech. No active backlogs.',
    salaryPackage: '4.5 - 7.5 LPA',
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'],
    openingsCount: 450,
    applicationUrl: 'https://www.ibm.com/careers/in-en',
    isVerified: true,
    notes: 'Features unique interactive mini-games instead of conventional MCQs in round 1.'
  },
  {
    id: 'comp-14',
    name: 'Capgemini',
    logo: '🔷',
    industry: 'Consulting & Engineering Services',
    tier: 'Tier 1',
    roles: ['Analyst - A4', 'Senior Analyst'],
    requiredSkills: ['Java', 'C++', 'SQL', 'Aptitude', 'Data Structures'],
    programmingLanguages: ['Java', 'C++', 'Python'],
    aptitudeRequirements: 'Pseudocode round, English communication test, and behavioral profiling',
    logicalReasoningRequirements: 'Data arrangement, coding algorithms and logical flowcharts',
    dsaRequirements: 'Array algorithms, sorting, linked lists and hash sets',
    eligibility: '50% or 5.5 CGPA in graduation. All branches eligible.',
    salaryPackage: '4.0 - 7.5 LPA',
    locations: ['Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Noida'],
    openingsCount: 580,
    applicationUrl: 'https://www.capgemini.com/in-en/careers/students-and-graduates/',
    isVerified: true,
    notes: 'Exceller graduation drive tests pseudocode execution and conversational English fluency.'
  },
  {
    id: 'comp-15',
    name: 'HCLTech',
    logo: '🌐',
    industry: 'IT & Infrastructure Services',
    tier: 'Tier 1',
    roles: ['Graduate Engineer Trainee (GET)', 'Software Engineer'],
    requiredSkills: ['C', 'C++', 'Java', 'Operating Systems', 'Networking'],
    programmingLanguages: ['Java', 'C', 'C++'],
    aptitudeRequirements: 'Quantitative aptitude, reasoning and general verbal comprehension',
    logicalReasoningRequirements: 'Direction test, seating arrangement and syllogism',
    dsaRequirements: 'Linear data structures, matrix operations, searching & sorting',
    eligibility: '60% throughout academic career. Max 1 active backlog allowed.',
    salaryPackage: '3.6 - 5.5 LPA',
    locations: ['Noida', 'Chennai', 'Bangalore', 'Lucknow', 'Madurai'],
    openingsCount: 500,
    applicationUrl: 'https://www.hcltech.com/careers',
    isVerified: true,
    notes: 'First Careers training program includes initial 6-month hands-on industry skill immersion.'
  },
  {
    id: 'comp-16',
    name: 'Tech Mahindra',
    logo: '⚙️',
    industry: 'Telecommunications & IT',
    tier: 'Tier 1',
    roles: ['Associate Software Engineer', 'Network Support Engineer'],
    requiredSkills: ['Java', 'Python', 'SQL', 'Networking', 'Aptitude'],
    programmingLanguages: ['Java', 'Python', 'SQL'],
    aptitudeRequirements: 'General aptitude round + Technical evaluation + Conversational psychometric test',
    logicalReasoningRequirements: 'Analogy, odd-man-out and non-verbal spatial reasoning',
    dsaRequirements: 'Array rotation, string palindrome, prime factorization algorithms',
    eligibility: '60% throughout 10th, 12th & Degree. No current standing arrears.',
    salaryPackage: '3.5 - 5.5 LPA',
    locations: ['Pune', 'Hyderabad', 'Chennai', 'Bangalore', 'Chandigarh'],
    openingsCount: 420,
    applicationUrl: 'https://careers.techmahindra.com/',
    isVerified: true,
    notes: 'SuperCoder assessment allows students to upgrade to high-paying specialized developer tracks.'
  }
];

export const SAMPLE_JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    companyId: 'comp-1',
    companyName: 'TCS',
    companyLogo: '🏢',
    role: 'TCS Digital Software Developer',
    location: 'Pan India (Bangalore/Hyderabad/Pune)',
    eligibility: 'BE/B.Tech/ME/M.Tech (2025/2026 Batch) with 60% or 6.0 CGPA',
    requiredSkills: ['Java', 'Python', 'SQL', 'Data Structures', 'Cloud'],
    salary: '7.0 - 9.0 LPA',
    jobType: 'Drive',
    postedDate: '2026-03-01',
    closingDate: '2026-04-15',
    applicationLink: 'https://nextstep.tcs.com/campus/#/',
    isVerified: true
  },
  {
    id: 'job-2',
    companyId: 'comp-2',
    companyName: 'Infosys',
    companyLogo: '🌐',
    role: 'Specialist Programmer (Power Programmer)',
    location: 'Bangalore / Mysore',
    eligibility: 'B.Tech/MCA all branches, 65% aggregate with zero backlogs',
    requiredSkills: ['Algorithms', 'Dynamic Programming', 'Java', 'Python', 'System Design'],
    salary: '9.5 LPA',
    jobType: 'Full-time',
    postedDate: '2026-02-20',
    closingDate: '2026-04-10',
    applicationLink: 'https://career.infosys.com/joblist',
    isVerified: true
  },
  {
    id: 'job-3',
    companyId: 'comp-6',
    companyName: 'Amazon',
    companyLogo: '📦',
    role: 'Software Development Engineer I (SDE 1)',
    location: 'Hyderabad / Bangalore',
    eligibility: 'Graduation in CS/IT/ECE (Passing batch 2025/2026)',
    requiredSkills: ['Data Structures', 'Algorithms', 'C++', 'Java', 'OOP', 'OS'],
    salary: '28.0 - 42.0 LPA',
    jobType: 'Full-time',
    postedDate: '2026-02-28',
    closingDate: '2026-04-30',
    applicationLink: 'https://www.amazon.jobs/en/teams/internships-for-students',
    isVerified: false // Verify on official careers page
  },
  {
    id: 'job-4',
    companyId: 'comp-11',
    companyName: 'Zoho',
    companyLogo: '🟩',
    role: 'Product Developer',
    location: 'Chennai / Tenkasi',
    eligibility: 'Any Degree or Graduation Year, No CGPA criteria',
    requiredSkills: ['C', 'Java', 'C++', 'Data Structures', 'Problem Solving'],
    salary: '6.5 - 10.0 LPA',
    jobType: 'Drive',
    postedDate: '2026-03-05',
    closingDate: '2026-04-20',
    applicationLink: 'https://www.zoho.com/careers/',
    isVerified: true
  },
  {
    id: 'job-5',
    companyId: 'comp-4',
    companyName: 'Accenture',
    companyLogo: '🔮',
    role: 'Associate Software Engineer',
    location: 'Bangalore / Gurgaon / Pune',
    eligibility: 'BE/B.Tech/MCA with 65% or 6.5 CGPA, max 1 year academic gap',
    requiredSkills: ['Java', 'SQL', 'Python', 'Analytical Reasoning'],
    salary: '4.5 - 6.5 LPA',
    jobType: 'Full-time',
    postedDate: '2026-03-02',
    closingDate: '2026-04-25',
    applicationLink: 'https://www.accenture.com/in-en/careers',
    isVerified: true
  },
  {
    id: 'job-6',
    companyId: 'comp-12',
    companyName: 'Freshworks',
    companyLogo: '🟧',
    role: 'Software Academy Engineer Trainee',
    location: 'Chennai',
    eligibility: 'Final year students in Computer Science / Information Technology',
    requiredSkills: ['JavaScript', 'TypeScript', 'HTML/CSS', 'SQL', 'REST APIs'],
    salary: '8.0 - 12.0 LPA',
    jobType: 'Internship',
    postedDate: '2026-03-08',
    closingDate: '2026-04-18',
    applicationLink: 'https://www.freshworks.com/company/careers/',
    isVerified: true
  }
];

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'code-1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' }
    ],
    starterCode: {
      python: 'def twoSum(nums, target):\n    # Write your solution here\n    hash_map = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in hash_map:\n            return [hash_map[diff], i]\n        hash_map[n] = i\n    return []',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Use a HashMap for O(N) lookup\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (mp.count(diff)) return {mp[diff], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};',
      javascript: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}'
    },
    hints: [
      'A brute force O(N^2) uses two nested loops.',
      'Can you use a Hash Map to record previously seen values for O(1) lookups?'
    ],
    solved: true
  },
  {
    id: 'code-2',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' }
    ],
    starterCode: {
      python: 'def isPalindrome(s: str) -> bool:\n    filtered = [c.lower() for c in s if c.isalnum()]\n    return filtered == filtered[::-1]',
      java: 'class Solution {\n    public boolean isPalindrome(String s) {\n        int i = 0, j = s.length() - 1;\n        while (i < j) {\n            while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;\n            while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;\n            if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;\n            i++; j--;\n        }\n        return true;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    bool isPalindrome(string s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) {\n            while (l < r && !isalnum(s[l])) l++;\n            while (l < r && !isalnum(s[r])) r--;\n            if (tolower(s[l]) != tolower(s[r])) return false;\n            l++; r--;\n        }\n        return true;\n    }\n};',
      javascript: 'function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return clean === clean.split("").reverse().join("");\n}'
    },
    hints: [
      'Two pointer approach: one starting from index 0, another from index n-1.',
      'Skip non-alphanumeric characters without allocating extra arrays.'
    ],
    solved: true
  },
  {
    id: 'code-3',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    examples: [
      { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', output: '[1, 1, 2, 3, 4, 4]' }
    ],
    starterCode: {
      python: '# Definition for singly-linked list node:\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\ndef mergeTwoLists(l1, l2):\n    dummy = ListNode(0)\n    tail = dummy\n    while l1 and l2:\n        if l1.val < l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    tail.next = l1 or l2\n    return dummy.next',
      java: 'class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val <= l2.val) {\n                curr.next = l1; l1 = l1.next;\n            } else {\n                curr.next = l2; l2 = l2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = (l1 != null) ? l1 : l2;\n        return dummy.next;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        if (!l1) return l2;\n        if (!l2) return l1;\n        if (l1->val < l2->val) {\n            l1->next = mergeTwoLists(l1->next, l2);\n            return l1;\n        } else {\n            l2->next = mergeTwoLists(l1, l2->next);\n            return l2;\n        }\n    }\n};',
      javascript: 'function mergeTwoLists(l1, l2) {\n  const dummy = { val: 0, next: null };\n  let curr = dummy;\n  while (l1 && l2) {\n    if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }\n    else { curr.next = l2; l2 = l2.next; }\n    curr = curr.next;\n  }\n  curr.next = l1 || l2;\n  return dummy.next;\n}'
    },
    hints: ['Create a dummy node to hold the head of the new list.'],
    solved: false
  },
  {
    id: 'code-4',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' }
    ],
    starterCode: {
      python: 'def lengthOfLongestSubstring(s: str) -> int:\n    char_index = {}\n    max_len = 0\n    start = 0\n    for end, ch in enumerate(s):\n        if ch in char_index and char_index[ch] >= start:\n            start = char_index[ch] + 1\n        char_index[ch] = end\n        max_len = max(max_len, end - start + 1)\n    return max_len',
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int maxLen = 0;\n        Map<Character, Integer> map = new HashMap<>();\n        for (int right = 0, left = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (map.containsKey(c)) {\n                left = Math.max(left, map.get(c) + 1);\n            }\n            map.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> last(256, -1);\n        int max_len = 0, left = 0;\n        for (int right = 0; right < s.size(); right++) {\n            if (last[s[right]] >= left) left = last[s[right]] + 1;\n            last[s[right]] = right;\n            max_len = max(max_len, right - left + 1);\n        }\n        return max_len;\n    }\n};',
      javascript: 'function lengthOfLongestSubstring(s) {\n  let maxLen = 0, left = 0;\n  const map = new Map();\n  for (let right = 0; right < s.length; right++) {\n    if (map.has(s[right]) && map.get(s[right]) >= left) {\n      left = map.get(s[right]) + 1;\n    }\n    map.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}'
    },
    hints: ['Use sliding window with two pointers `left` and `right`. Store last seen index of each char.'],
    solved: false
  },
  {
    id: 'code-5',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1 step + 1 step OR 2 steps.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' }
    ],
    starterCode: {
      python: 'def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b',
      java: 'class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int prev2 = 1, prev1 = 2;\n        for (int i = 3; i <= n; i++) {\n            int cur = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = cur;\n        }\n        return prev1;\n    }\n}',
      cpp: 'class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b; b = c;\n        }\n        return b;\n    }\n};',
      javascript: 'function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}'
    },
    hints: ['Notice that ways(n) = ways(n-1) + ways(n-2), exactly like the Fibonacci sequence!'],
    solved: false
  }
];

export const SOFTWARE_DEVELOPER_ROADMAP: RoadmapStage[] = [
  {
    id: 1,
    title: 'Programming Basics & Syntax',
    description: 'Master clean coding conventions, variables, loops, control flow, functions, and memory in C++, Java, or Python.',
    topics: ['Primitive Data Types & Type Casting', 'Conditionals & Loops', 'Functions & Variable Scope', 'Pointers & References / Memory Model', 'Exception Handling'],
    resources: [
      { name: 'Language Documentation & Cheatsheet', url: '#', type: 'doc' },
      { name: 'Core Syntax Drills on HackerRank', url: '#', type: 'practice' }
    ],
    completed: true,
    completionPercentage: 100
  },
  {
    id: 2,
    title: 'Data Structures Foundations',
    description: 'Learn linear structures thoroughly with space-time complexity analysis.',
    topics: ['Arrays & Strings', 'Linked Lists (Singly & Doubly)', 'Stacks & Monotonic Queues', 'Hash Maps & Sets', 'Two Pointers & Sliding Window'],
    resources: [
      { name: 'Visualgo Data Structure Visualizer', url: '#', type: 'doc' },
      { name: 'LeetCode 75 Curated Problems', url: '#', type: 'practice' }
    ],
    completed: true,
    completionPercentage: 100
  },
  {
    id: 3,
    title: 'Algorithms & Problem Solving',
    description: 'Implement core algorithmic paradigms crucial for tier-1 technical screening.',
    topics: ['Binary Search on Answers', 'Recursion & Backtracking', 'Sorting (Merge, Quick, Heap)', 'Trees (BST, Traversals, Height)', 'Graphs (BFS, DFS, Dijkstra, Topo Sort)', 'Dynamic Programming (1D & 2D)'],
    resources: [
      { name: 'NeetCode Roadmap Algorithms', url: '#', type: 'video' },
      { name: 'Placement Coding Hub Practice', url: '#', type: 'practice' }
    ],
    completed: false,
    completionPercentage: 65
  },
  {
    id: 4,
    title: 'SQL & Database Management (DBMS)',
    description: 'Crucial for enterprise rounds (Oracle, TCS Digital, Cognizant GenC Next, Amazon).',
    topics: ['Relational Schema Design & Keys', 'SQL Queries, Group By, Having', 'Inner, Left, Right & Full Joins', 'Subqueries & Window Functions (RANK, DENSE_RANK)', 'ACID Properties & Normalization (1NF to BCNF)', 'Indexing (B-Tree, Hash) & Query Optimization'],
    resources: [
      { name: 'SQLZoo Interactive Sandbox', url: '#', type: 'practice' },
      { name: 'Top 50 Placement SQL Questions', url: '#', type: 'doc' }
    ],
    completed: true,
    completionPercentage: 90
  },
  {
    id: 5,
    title: 'Quantitative Aptitude Mastery',
    description: 'Clear the high-volume first filtering round across all campus drives.',
    topics: ['Percentages, Profit & Loss', 'Time, Work & Pipes-Cisterns', 'Time, Speed & Distance, Trains, Boats', 'Ratio, Proportions & Mixtures', 'Permutation, Combination & Probability', 'Data Interpretation Tables & Charts'],
    resources: [
      { name: 'Aptitude Practice Section', url: '#', type: 'practice' },
      { name: 'Formula Cheat Sheet PDF', url: '#', type: 'doc' }
    ],
    completed: false,
    completionPercentage: 75
  },
  {
    id: 6,
    title: 'Logical Reasoning & Analytical Skills',
    description: 'Solve sequence deductions, puzzle arrangements, and syllogisms within strict time limits.',
    topics: ['Number & Letter Series', 'Coding-Decoding Patterns', 'Blood Relations & Family Trees', 'Direction Sense & Distances', 'Syllogism & Venn Diagrams', 'Circular & Linear Seating Arrangements'],
    resources: [
      { name: 'Timed Reasoning Drills', url: '#', type: 'practice' },
      { name: 'TCS NQT / Infosys Reasoning Archives', url: '#', type: 'doc' }
    ],
    completed: false,
    completionPercentage: 70
  },
  {
    id: 7,
    title: 'Capstone Projects & System Design',
    description: 'Build 2 strong real-world projects deployed online to anchor your technical interviews.',
    topics: ['Full-Stack Web App with Auth & Database', 'RESTful API & Clean Architecture', 'Deployment on Cloud (Vercel, Supabase, Render)', 'README Documentation & Architecture Diagram', 'Low-Level Design (LLD) / OOP Principles (SOLID)'],
    resources: [
      { name: 'GitHub Student Developer Pack', url: '#', type: 'doc' },
      { name: 'System Design Primer', url: '#', type: 'doc' }
    ],
    completed: false,
    completionPercentage: 50
  },
  {
    id: 8,
    title: 'ATS Resume Review & Optimization',
    description: 'Format your resume cleanly with high ATS parse rate and verified project metrics.',
    topics: ['Single-Page Clean Layout (Jake\'s / Harvard Template)', 'Impact Statements (XYZ Formula: Accomplished X by doing Y measured by Z)', 'Keyword Matching with Job Role', 'GitHub & Live Demo Links Verification', 'Proofreading for Grammar & Section Hierarchy'],
    resources: [
      { name: 'Resume Readiness Analyzer', url: '#', type: 'practice' },
      { name: 'Action Verbs Power List', url: '#', type: 'doc' }
    ],
    completed: true,
    completionPercentage: 85
  },
  {
    id: 9,
    title: 'Company Mock Tests & Timed Simulators',
    description: 'Simulate the exact test pattern, sectional timers, and pressure of real drives.',
    topics: ['TCS NQT Full-Length Mock (180 mins)', 'Infosys Cognitive & Pseudocode Mock', 'Accenture Cognitive + Tech Assessment Mock', 'Product Company OA (Amazon/Google style 90 mins)'],
    resources: [
      { name: 'Mock Test Simulator', url: '#', type: 'practice' },
      { name: 'Past Exam Question Archives', url: '#', type: 'doc' }
    ],
    completed: false,
    completionPercentage: 40
  },
  {
    id: 10,
    title: 'Technical & HR Interview Preparation',
    description: 'Master behavioral storytelling, core CS viva questions, and mock peer interviews.',
    topics: ['"Tell me about yourself" Elevator Pitch', 'STAR Method for Behavioral Questions (Amazon Leadership)', 'Core CS Subject Viva (OS, CN, DBMS, OOP)', 'Project Deep-Dive & Architecture Defense', 'Questions to ask the Interviewer at the end'],
    resources: [
      { name: 'HR Interview Question Bank', url: '#', type: 'doc' },
      { name: 'Peer Mock Interview Scheduler', url: '#', type: 'video' }
    ],
    completed: false,
    completionPercentage: 30
  }
];

export const SAMPLE_CODING_PROBLEMS: CodingProblem[] = [
  {
    id: 'prob-1',
    title: 'Two Sum Problem',
    difficulty: 'Easy',
    topic: 'Arrays & HashMaps',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    starterCode: {
      Python: 'def twoSum(nums: list[int], target: int) -> list[int]:\n    # Hash map to store value and index\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []',
      Java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}',
      'C++': 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); ++i) {\n            int diff = target - nums[i];\n            if (mp.find(diff) != mp.end()) return {mp[diff], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};',
      JavaScript: 'function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}'
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1, 2]' }
    ],
    companies: ['Amazon', 'Google', 'TCS', 'Infosys']
  },
  {
    id: 'prob-2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stacks & Strings',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.\n\nOpen brackets must be closed by the same type of brackets in the correct order.',
    starterCode: {
      Python: 'def isValid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else "#"\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack',
      Java: 'class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == \'(\') stack.push(\')\');\n            else if (c == \'{\') stack.push(\'}\');\n            else if (c == \'[\') stack.push(\']\');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}',
      'C++': 'class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == \'(\') st.push(\')\');\n            else if (c == \'{\') st.push(\'}\');\n            else if (c == \'[\') st.push(\']\');\n            else {\n                if (st.empty() || st.top() != c) return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};',
      JavaScript: 'function isValid(s) {\n    const stack = [];\n    const map = { ")": "(", "}": "{", "]": "[" };\n    for (const char of s) {\n        if (map[char]) {\n            if (stack.pop() !== map[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}'
    },
    testCases: [
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' }
    ],
    companies: ['Microsoft', 'Amazon', 'Cognizant', 'Accenture']
  },
  {
    id: 'prob-3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window & HashSets',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    starterCode: {
      Python: 'def lengthOfLongestSubstring(s: str) -> int:\n    char_set = set()\n    left = 0\n    max_len = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len',
      Java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> set = new HashSet<>();\n        int left = 0, max = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (set.contains(s.charAt(right))) {\n                set.remove(s.charAt(left++));\n            }\n            set.add(s.charAt(right));\n            max = Math.max(max, right - left + 1);\n        }\n        return max;\n    }\n}',
      'C++': 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> st;\n        int left = 0, max_len = 0;\n        for (int right = 0; right < s.size(); ++right) {\n            while (st.count(s[right])) {\n                st.erase(s[left++]);\n            }\n            st.insert(s[right]);\n            max_len = max(max_len, right - left + 1);\n        }\n        return max_len;\n    }\n};',
      JavaScript: 'function lengthOfLongestSubstring(s) {\n    const set = new Set();\n    let left = 0, maxLen = 0;\n    for (let right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n            set.delete(s[left++]);\n        }\n        set.add(s[right]);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}'
    },
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3 ("abc")' },
      { input: 's = "bbbbb"', expectedOutput: '1 ("b")' }
    ],
    companies: ['Amazon', 'Google', 'Microsoft', 'Zoho']
  },
  {
    id: 'prob-4',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list and return its head.',
    starterCode: {
      Python: '# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\ndef mergeTwoLists(list1, list2):\n    dummy = ListNode()\n    tail = dummy\n    while list1 and list2:\n        if list1.val <= list2.val:\n            tail.next = list1\n            list1 = list1.next\n        else:\n            tail.next = list2\n            list2 = list2.next\n        tail = tail.next\n    tail.next = list1 or list2\n    return dummy.next',
      Java: 'class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                tail.next = list1; list1 = list1.next;\n            } else {\n                tail.next = list2; list2 = list2.next;\n            }\n            tail = tail.next;\n        }\n        tail.next = (list1 != null) ? list1 : list2;\n        return dummy.next;\n    }\n}',
      'C++': 'class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (l1 && l2) {\n            if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }\n            else { tail->next = l2; l2 = l2->next; }\n            tail = tail->next;\n        }\n        tail->next = l1 ? l1 : l2;\n        return dummy.next;\n    }\n};',
      JavaScript: 'function mergeTwoLists(list1, list2) {\n    const dummy = { val: 0, next: null };\n    let tail = dummy;\n    while (list1 && list2) {\n        if (list1.val <= list2.val) {\n            tail.next = list1;\n            list1 = list1.next;\n        } else {\n            tail.next = list2;\n            list2 = list2.next;\n        }\n        tail = tail.next;\n    }\n    tail.next = list1 || list2;\n    return dummy.next;\n}'
    },
    testCases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' }
    ],
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Amazon']
  }
];
