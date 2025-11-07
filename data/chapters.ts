/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import type { Chapter } from '../components/types.ts';

const initialHistoryChapters: Chapter[] = [
  { 
    id: 1, 
    title: 'Chapter 1: The Evolution of Humans and the Indus Valley Civilization (2 Million BCE - 1500 BCE)', 
    content: 'This chapter traces the long journey of human evolution, from early hominins to the emergence of Homo sapiens, and explores one of the world\'s earliest urban cultures, the Indus Valley Civilization.',
    locked: false,
    progress: 0,
    quizCompleted: false,
    quizUnlocked: false,
    quizScore: null,
    tabbedContent: [
      {
        title: 'Evolution of Humans',
        content: `
<p class="mb-4 leading-relaxed">This chapter traces the long journey of human evolution, from early hominins to the emergence of Homo sapiens.</p>
<h1 class="text-2xl font-bold my-4 dark:text-white">1. settlement of humans in the prehistoric period</h1>
<p class="mb-4 leading-relaxed">The prehistoric period is divided into 3 categories:</p>
<p class="mb-4 leading-relaxed">a. stone age</p>
<p class="mb-4 leading-relaxed">b. bronze age</p>
<p class="mb-4 leading-relaxed">c. iron age</p>
<h1 class="text-2xl font-bold my-4 dark:text-white">stone age</h1>
<img src="https://images.pexels.com/photos/305831/pexels-photo-305831.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Hands holding a small sapling, representing early human settlement and agriculture." class="my-4 rounded-lg shadow-md mx-auto" style="max-width: 500px; width: 100%;" />
<p class="mb-4 leading-relaxed">Stone Age is the age when people used to live inside large stone caves and used to gather food using sharp stone tools. 2 million years ago, modern humans known as homo-sapiens came into existance, meaning the earliest evolution of human-beings. In Stone Age the people were called hunter-gatherers.</p>
<p class="mb-4 leading-relaxed"><a href="https://www.notion.so/02-the-evolution-of-humans-and-formation-of-the-indus-valley-civilization-2-million-BCE-1500-BCE-a15fde00922983ea94d101a5f003552a?source=copy_link#14efde0092298194a1feee7c929f55ba" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">https://www.notion.so/02-the-evolution-of-humans-and-formation-of-the-indus-valley-civilization-2-million-BCE-1500-BCE-a15fde00922983ea94d101a5f003552a?source=copy_link#14efde0092298194a1feee7c929f55ba</a></p>
`
      },
      {
        title: 'Evolution of Indus Valley Civilization',
        content: `One of the world's earliest urban cultures, the Indus Valley Civilization flourished in what is now Pakistan and northwest India. This civilization was known for its advanced urban planning, sophisticated drainage systems, and mysterious script, laying a crucial foundation for subsequent cultures in the Indian subcontinent.`
      }
    ],
    quiz: [
      { id: 1, question: "What does 'Homo sapiens' mean?", options: ["Tool Maker", "Wise Man", "Upright Man", "Handy Man"], answer: "Wise Man", explanation: "Homo sapiens is Latin for 'wise man', named for our species' characteristic cognitive abilities, such as advanced reasoning and self-awareness." },
      { id: 2, question: "The Indus Valley Civilization is also known by what name?", options: ["Mesopotamian Civilization", "Egyptian Civilization", "Harappan Civilization", "Chinese Civilization"], answer: "Harappan Civilization", explanation: "Harappa was one of the first major sites to be excavated in the 1920s, so the entire civilization is often named after it." },
      { id: 3, question: "Which of these is a famous city of the Indus Valley Civilization?", options: ["Athens", "Rome", "Mohenjo-Daro", "Babylon"], answer: "Mohenjo-Daro", explanation: "Mohenjo-Daro, meaning 'Mound of the Dead Men', is one of the largest and most well-preserved urban centers of the civilization." },
      { id: 4, question: "What was a distinguishing feature of Indus Valley cities?", options: ["Lack of plumbing", "Disorganized streets", "Advanced grid-like urban planning", "Small, rural settlements"], answer: "Advanced grid-like urban planning", explanation: "Cities like Mohenjo-Daro and Harappa featured streets laid out in a grid pattern with sophisticated drainage and water supply systems, indicating a high level of central planning." },
      { id: 5, question: "The script of the Indus Valley Civilization is:", options: ["Fully deciphered", "Hieroglyphic", "Cuneiform", "Largely undeciphered"], answer: "Largely undeciphered", explanation: "Despite numerous attempts, the Indus script, found on thousands of seals, has not yet been deciphered, making it one of history's great mysteries." },
      { id: 6, question: "Early hominins, like Australopithecus, are known for what significant development?", options: ["Starting agriculture", "Bipedalism (walking on two legs)", "Building pyramids", "Sailing across oceans"], answer: "Bipedalism (walking on two legs)", explanation: "Bipedalism was a crucial evolutionary step that freed the hands for carrying tools and food, predating large brain growth." },
      { id: 7, question: "The period characterized by the use of stone tools is known as the:", options: ["Bronze Age", "Iron Age", "Stone Age", "Information Age"], answer: "Stone Age", explanation: "The Stone Age is a broad prehistoric period during which stone was widely used to make implements with an edge, a point, or a percussion surface." },
      { id: 8, question: "What material was commonly used for seals in the Indus Valley?", options: ["Papyrus", "Clay", "Steatite", "Iron"], answer: "Steatite", explanation: "Most Indus seals were carved from steatite, a soft soapstone, which was then fired to harden it. They often feature animal motifs and script." },
      { id: 9, question: "The 'Great Bath' is a significant structure found in which archaeological site?", options: ["Harappa", "Lothal", "Dholavira", "Mohenjo-Daro"], answer: "Mohenjo-Daro", explanation: "The Great Bath is a large, public water tank, likely used for ritual bathing, showcasing the advanced engineering and social organization of Mohenjo-Daro." },
      { id: 10, question: "Which two rivers were crucial for the Indus Valley Civilization?", options: ["Nile and Tigris", "Indus and Ghaggar-Hakra", "Yellow and Yangtze", "Ganges and Yamuna"], answer: "Indus and Ghaggar-Hakra", explanation: "The civilization was centered in the basin of the Indus River and the now-dried Ghaggar-Hakra river system, which provided fertile land for agriculture." },
      { id: 11, question: "What is the study of human origins and evolution called?", options: ["Sociology", "Paleoanthropology", "Archaeology", "Geology"], answer: "Paleoanthropology", explanation: "Paleoanthropology is a subfield of anthropology that combines the study of fossils (paleontology) and human origins to understand our evolutionary history." },
      { id: 12, question: "The decline of the Indus Valley Civilization is thought to be caused by:", options: ["A single, clear event", "Alien invasion", "A combination of factors, including climate change", "A massive fire"], answer: "A combination of factors, including climate change", explanation: "While the exact cause is debated, evidence points to gradual decline due to factors like climate change (which affected rivers and agriculture), environmental degradation, and possibly tectonic shifts." },
      { id: 13, question: "The term 'Neolithic Revolution' refers to:", options: ["The invention of the wheel", "The development of writing", "The transition to agriculture", "The discovery of fire"], answer: "The transition to agriculture", explanation: "The Neolithic Revolution marked the shift from nomadic hunting and gathering to settled agriculture and the domestication of plants and animals, fundamentally changing human society." },
      { id: 14, question: "Which hominin species is considered a close relative of modern humans and lived in Europe and Asia?", options: ["Homo erectus", "Neanderthals", "Australopithecus afarensis", "Homo habilis"], answer: "Neanderthals", explanation: "Neanderthals (Homo neanderthalensis) are our closest extinct human relatives, who lived across Eurasia until about 40,000 years ago." },
      { id: 15, question: "Indus Valley trade networks extended to which distant region?", options: ["North America", "Australia", "Mesopotamia", "South America"], answer: "Mesopotamia", explanation: "Archaeological evidence, such as Harappan seals found in Mesopotamian sites, confirms extensive trade routes between these two ancient civilizations." },
      { id: 16, question: "What type of artifact is most commonly found at Indus Valley sites?", options: ["Iron swords", "Gold coins", "Pottery", "Written books"], answer: "Pottery", explanation: "A vast amount of pottery, both plain and decorated, has been found, indicating it was a major craft and essential for storage and daily life." },
      { id: 17, question: "The 'Out of Africa' theory suggests that Homo sapiens first evolved in Africa and then:", options: ["Stayed only in Africa", "Migrated to other parts of the world", "Became extinct", "Evolved into Neanderthals"], answer: "Migrated to other parts of the world", explanation: "This model posits that modern humans evolved in Africa and then spread out, eventually replacing other hominin populations like Neanderthals." },
      { id: 18, question: "What is NOT a feature of Harappan cities?", options: ["Citadels", "Public baths", "Massive palaces for kings", "Drainage systems"], answer: "Massive palaces for kings", explanation: "Unlike Egypt or Mesopotamia, there is little evidence of grand palaces or temples, suggesting a more egalitarian or decentralized form of governance." },
      { id: 19, question: "The domestication of plants and animals is a hallmark of which period?", options: ["Paleolithic", "Mesolithic", "Neolithic", "Chalcolithic"], answer: "Neolithic", explanation: "The Neolithic period, or New Stone Age, is defined by the development of agriculture, polished stone tools, and permanent settlements." },
      { id: 20, question: "What iconic figurine was discovered at Mohenjo-Daro?", options: ["The Venus of Willendorf", "The Terracotta Army", "The Dancing Girl", "The Sphinx"], answer: "The Dancing Girl", explanation: "This small bronze statuette is a famous artifact from Mohenjo-Daro, celebrated for its artistic quality and naturalistic pose, offering a glimpse into the culture's art." }
    ]
  },
  { 
    id: 2, 
    title: 'Chapter 2: The Middle Ages', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 3, 
    title: 'Chapter 3: The Renaissance', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 4, 
    title: 'Chapter 4: The Age of Discovery',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
   { 
    id: 5, 
    title: 'Chapter 5: Revolutions and Industry',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
];

const initialGeographyChapters: Chapter[] = [
  { 
    id: 1, 
    title: 'Chapter 1: Physical Geography', 
    content: 'Physical Geography is the study of Earth\'s seasons, climate, atmosphere, soil, streams, landforms, and oceans. It explores the natural processes of the Earth and their outcomes, providing a foundation for understanding our planet\'s dynamic systems.',
    locked: false,
    progress: 0,
    quizCompleted: false,
    quizUnlocked: false,
    quizScore: null,
    quiz: [
        { id: 1, question: "What is the primary driver of Earth's seasons?", options: ["The Earth's distance from the sun", "The tilt of the Earth's axis", "Ocean currents", "Volcanic activity"], answer: "The tilt of the Earth's axis", explanation: "The Earth's axis is tilted at about 23.5 degrees. This tilt causes different parts of the Earth to receive more direct sunlight at different times of the year as it orbits the sun, resulting in seasons." },
        { id: 2, question: "The study of the atmosphere and weather patterns is called:", options: ["Geology", "Hydrology", "Meteorology", "Ecology"], answer: "Meteorology", explanation: "Meteorology is the science dealing with the atmosphere and its phenomena, including weather and weather forecasting." },
        { id: 3, question: "What is a large, naturally occurring community of flora and fauna occupying a major habitat?", options: ["An ecosystem", "A population", "A biome", "A niche"], answer: "A biome", explanation: "A biome is a large-scale ecological unit, like a tropical rainforest or a desert, defined by its dominant vegetation and climate." },
        { id: 4, question: "The process by which rocks are broken down into smaller pieces is called:", options: ["Erosion", "Deposition", "Weathering", "Compaction"], answer: "Weathering", explanation: "Weathering is the in-situ breakdown of rocks at the Earth's surface. Erosion, by contrast, involves the movement of these broken-down materials." },
        { id: 5, question: "Which layer of the Earth is composed mainly of iron and nickel?", options: ["Crust", "Mantle", "Outer Core", "Inner Core"], answer: "Inner Core", explanation: "The Earth's inner core is a hot, dense ball of mostly iron and nickel. Despite its extreme temperature, it is solid due to immense pressure." }
    ]
  },
  { 
    id: 2, 
    title: 'Chapter 2: Human Geography', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 3, 
    title: 'Chapter 3: World Regions', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 4, 
    title: 'Chapter 4: Environmental Geography',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
   { 
    id: 5, 
    title: 'Chapter 5: Cartography',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
];

const initialScienceChapters: Chapter[] = [
  { 
    id: 1, 
    title: 'Chapter 1: The Scientific Method', 
    content: 'The scientific method is a systematic process that involves observation, measurement, experiment, and the formulation, testing, and modification of hypotheses. It is the cornerstone of scientific inquiry, enabling objective and evidence-based conclusions.',
    locked: false,
    progress: 0,
    quizCompleted: false,
    quizUnlocked: false,
    quizScore: null,
    quiz: [
        { id: 1, question: "What is the first step in the scientific method?", options: ["Experiment", "Hypothesis", "Observation", "Conclusion"], answer: "Observation", explanation: "The scientific method begins with observing a phenomenon or a group of phenomena in the natural world, which leads to a question." },
        { id: 2, question: "A testable prediction or explanation for an observation is called a(n):", options: ["Theory", "Law", "Hypothesis", "Fact"], answer: "Hypothesis", explanation: "A hypothesis is a proposed, testable explanation. It's a specific prediction that can be supported or refuted through experimentation." },
        { id: 3, question: "In an experiment, the variable that is deliberately changed by the scientist is the:", options: ["Control variable", "Dependent variable", "Independent variable", "Confounding variable"], answer: "Independent variable", explanation: "The independent variable is the one factor that a scientist changes on purpose to see its effect. The dependent variable is what is measured in response to that change." },
        { id: 4, question: "A well-substantiated explanation of some aspect of the natural world, based on a body of facts, is a:", options: ["Hypothesis", "Guess", "Theory", "Postulate"], answer: "Theory", explanation: "A scientific theory is a comprehensive explanation supported by a vast body of evidence from many experiments. It is much more robust than a simple hypothesis." },
        { id: 5, question: "Why is reproducibility important in science?", options: ["It makes experiments more expensive", "It ensures the results are valid and reliable", "It proves a hypothesis is always true", "It is not important"], answer: "It ensures the results are valid and reliable", explanation: "Reproducibility, the ability for other scientists to repeat an experiment and get the same results, is crucial for validating scientific claims and building confidence in the findings." }
    ]
  },
  { 
    id: 2, 
    title: 'Chapter 2: Introduction to Biology', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 3, 
    title: 'Chapter 3: Fundamentals of Chemistry', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 4, 
    title: 'Chapter 4: Principles of Physics',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
   { 
    id: 5, 
    title: 'Chapter 5: Earth and Space Science',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
];

const initialCurrentAffairsChapters: Chapter[] = [
  { id: 1, title: 'January', content: 'Significant events from January. This section covers major political, social, and economic happenings that occurred globally during the first month of the year.', locked: false, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [
      { id: 1, question: "Which international summit was a major focus in January?", options: ["G7 Summit", "World Economic Forum", "NATO Meeting", "UN General Assembly"], answer: "World Economic Forum", explanation: "The World Economic Forum's annual meeting in Davos, Switzerland, takes place in January and brings together global leaders to discuss pressing economic and social issues." },
      { id: 2, question: "A significant technological breakthrough was announced in which field?", options: ["Space Exploration", "Quantum Computing", "Medical Science", "Artificial Intelligence"], answer: "Artificial Intelligence", explanation: "January often sees major announcements from tech companies regarding advancements in AI, reflecting the rapid pace of development in this sector." },
      { id: 3, question: "Which country held a pivotal general election in January?", options: ["USA", "India", "Taiwan", "UK"], answer: "Taiwan", explanation: "Taiwan held its presidential and legislative elections in January 2024, an event with significant geopolitical implications." },
      { id: 4, question: "Global markets were impacted by new trade policies related to:", options: ["Agriculture", "Fossil Fuels", "Renewable Energy Technology", "Textiles"], answer: "Renewable Energy Technology", explanation: "Global trade policies concerning solar panels, wind turbines, and battery components were a key economic topic, influencing international relations and markets." },
      { id: 5, question: "A major cultural festival, the 'Sundance Film Festival', took place primarily in which month?", options: ["December", "January", "February", "March"], answer: "January", explanation: "The Sundance Film Festival, a major showcase for independent cinema, is held annually in January in Park City, Utah." }
  ]},
  { id: 2, title: 'February', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 3, title: 'March', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 4, title: 'April', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 5, title: 'May', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 6, title: 'June', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 7, title: 'July', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 8, title: 'August', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 9, title: 'September', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 10, title: 'October', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 11, title: 'November', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
  { id: 12, title: 'December', content: 'This content is locked.', locked: true, progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: [] },
];

const initialGkChapters: Chapter[] = [
  { 
    id: 1, 
    title: 'Famous Personalities', 
    content: 'This chapter explores the lives and contributions of influential figures throughout history, from world leaders and scientists to artists and activists. Understanding their impact helps us appreciate the complexities of our shared past.',
    locked: false,
    progress: 0,
    quizCompleted: false,
    quizUnlocked: false,
    quizScore: null,
    quiz: [
        { id: 1, question: "Who is known as the 'Father of the Computer'?", options: ["Alan Turing", "Charles Babbage", "Tim Berners-Lee", "Bill Gates"], answer: "Charles Babbage", explanation: "Charles Babbage, an English mathematician, originated the concept of a digital programmable computer. His Analytical Engine design is considered the conceptual forerunner of the modern computer." },
        { id: 2, question: "Marie Curie was a pioneering physicist and chemist famous for her research on:", options: ["Gravity", "Radioactivity", "Genetics", "Planetary motion"], answer: "Radioactivity", explanation: "Marie Curie, along with her husband Pierre, conducted groundbreaking research on radioactivity, a term she coined. She was the first woman to win a Nobel Prize and the only person to win in two different scientific fields." },
        { id: 3, question: "Which famous artist painted the 'Mona Lisa'?", options: ["Vincent van Gogh", "Pablo Picasso", "Michelangelo", "Leonardo da Vinci"], answer: "Leonardo da Vinci", explanation: "The Mona Lisa is one of the world's most famous paintings, created by the Italian High Renaissance artist, inventor, and scientist Leonardo da Vinci." },
        { id: 4, question: "Nelson Mandela was a revolutionary leader who fought against apartheid in which country?", options: ["Nigeria", "Kenya", "South Africa", "Ghana"], answer: "South Africa", explanation: "Nelson Mandela was a central figure in the anti-apartheid movement. After 27 years in prison, he became South Africa's first black president, leading the country's transition to a multi-racial democracy." },
        { id: 5, question: "Who wrote the famous play 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare", explanation: "Known as the 'Bard of Avon', William Shakespeare is widely regarded as the greatest writer in the English language and the world's pre-eminent dramatist, with 'Romeo and Juliet' being one of his most famous tragedies." }
    ]
  },
  { 
    id: 2, 
    title: 'World Capitals', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 3, 
    title: 'Inventions and Discoveries', 
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
  { 
    id: 4, 
    title: 'Sports',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
   { 
    id: 5, 
    title: 'Books and Authors',
    content: 'This content is locked.',
    locked: true,
    progress: 0, quizCompleted: false, quizUnlocked: false, quizScore: null, quiz: []
  },
];

export const initialChaptersData = {
    'History': initialHistoryChapters,
    'Geography': initialGeographyChapters,
    'Science': initialScienceChapters,
    'Current Affairs': initialCurrentAffairsChapters,
    'G.K': initialGkChapters,
};