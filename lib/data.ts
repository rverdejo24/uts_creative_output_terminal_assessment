export const PROMPTS = [
  "What's one thing that went better today than you expected?",
  "What are you avoiding right now, and what makes it hard to start?",
  "If a friend were in your exact situation, what would you tell them?",
  "What part of your last role are you genuinely glad to leave behind?",
  "What's a skill you used this week that you almost didn't notice using?",
  "What would 'a good week' look like, realistically, from here?",
  "What's one assumption about your worth that this job search has been testing?",
  "Who could you ask for a five-minute conversation this week?",
  "What did you do today that had nothing to do with the job search?",
  "What's one thing you know now that you didn't know a month ago?",
];

export type ResourceItem = {
  title: string;
  description: string;
  href?: string;
};

export type ResourceCategory = {
  id: string;
  label: string;
  intro: string;
  items: ResourceItem[];
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "moving",
    label: "Getting moving",
    intro:
      "Small, concrete actions for when the job search itself feels too big to look at.",
    items: [
      {
        title: "Rework a resume around outcomes, not duties",
        description:
          "List what changed because you were there — time saved, revenue affected, problems that stopped recurring — rather than a list of responsibilities.",
      },
      {
        title: "Informational interviews",
        description:
          "A 15-minute call asking someone about their role or industry, not for a job. Lower stakes than an application, and often where real openings surface.",
      },
      {
        title: "LinkedIn Learning",
        description:
          "Short, structured courses if you want to close a specific skill gap before applying somewhere new.",
        href: "https://www.linkedin.com/learning/",
      },
      {
        title: "Indeed / company career pages",
        description:
          "Aggregators are useful for volume; a company's own careers page is usually the most current source for a specific employer.",
        href: "https://www.indeed.com/",
      },
    ],
  },
  {
    id: "steady",
    label: "Staying steady day to day",
    intro:
      "The search is easier to sustain with some structure around it, not white-knuckling through every day.",
    items: [
      {
        title: "Keep one weekday routine anchor",
        description:
          "A fixed wake time or a daily walk does more for morale during unemployment than most people expect — it's one thing that doesn't depend on a callback.",
      },
      {
        title: "Cap job-search hours, then stop",
        description:
          "Treat it like a part-time job with a defined end time. Open-ended searching all day tends to produce more anxiety than results.",
      },
      {
        title: "Track applications, not just to-dos",
        description:
          "A simple log of where you applied and when reduces the mental load of trying to remember, and shows progress that feels invisible day to day.",
      },
    ],
  },
  {
    id: "money",
    label: "Money and logistics",
    intro:
      "Practical groundwork that's easy to put off but genuinely reduces stress once it's done.",
    items: [
      {
        title: "Check unemployment benefit eligibility early",
        description:
          "Rules and processing times vary a lot by location — applying promptly matters even if you expect to find something quickly.",
      },
      {
        title: "List fixed vs. flexible expenses",
        description:
          "Knowing your real monthly floor makes it easier to judge how much runway you actually have, and takes some of the guesswork-driven anxiety out of the picture.",
      },
      {
        title: "Ask about COBRA or marketplace coverage timelines",
        description:
          "Health coverage gaps are one of the more stressful logistics to leave until the last minute — worth confirming deadlines early.",
      },
    ],
  },
  {
    id: "mindset",
    label: "When self-doubt shows up",
    intro:
      "Unemployment and rejection can distort how you see your own track record. These are reframes, not fixes.",
    items: [
      {
        title: "Separate the rejection from the reason",
        description:
          "Most rejections are about fit, timing, budget, or an internal candidate — reasons that say very little about your ability, even though they rarely get explained.",
      },
      {
        title: "Keep a short 'evidence' list",
        description:
          "A running note of things you've done well — not achievements for a resume, just proof for yourself on the days it's hard to remember.",
      },
      {
        title: "Notice the story, not just the feeling",
        description:
          "\"I'm behind\" and \"I'm unemployable\" are stories, not facts. Naming them as stories can loosen their grip, even when the feeling itself is real.",
      },
    ],
  },
];
