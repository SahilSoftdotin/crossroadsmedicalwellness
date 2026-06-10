export type Faq = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  items: Faq[];
};

export const faqCategories: FaqCategory[] = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I schedule an appointment?",
        answer:
          "We don't currently offer online booking. The fastest way to get started is to call or text our office, or fill out our contact form / health assessment — our team will follow up to schedule your visit.",
      },
      {
        question: "What should I expect at my first visit?",
        answer:
          "Your first visit typically includes a thorough conversation with Dr. Adams about your health history and goals, and often baseline labs depending on the services you're interested in.",
      },
      {
        question: "Do you accept new patients?",
        answer:
          "Yes! We're happy to welcome new patients. Reach out by phone, text, or our contact form and our team will help you get scheduled.",
      },
      {
        question: "Is there a virtual / telehealth option?",
        answer:
          "Some follow-up visits may be available virtually depending on the service. Call our office to ask about options for your specific situation.",
      },
    ],
  },
  {
    category: "Hormone Therapy (BioTE)",
    items: [
      {
        question: "How do I know if I need hormone therapy?",
        answer:
          "The best way to know is through a conversation with Dr. Adams and a comprehensive lab panel. Common signs include fatigue, mood changes, low libido, sleep issues, and hot flashes (for women) or low drive and reduced muscle mass (for men).",
      },
      {
        question: "How often will I need pellet insertions?",
        answer:
          "Most women return every 3–4 months and most men every 4–5 months, though this is personalized based on how your body metabolizes the hormones.",
      },
      {
        question: "Are bioidentical hormones safe?",
        answer:
          "BioTE pellet therapy uses plant-derived hormones that are molecularly identical to those your body produces. As with any therapy, it's important to be evaluated and monitored by a physician — which is exactly how we approach it.",
      },
    ],
  },
  {
    category: "Medical Weight Loss",
    items: [
      {
        question: "What medications do you use for weight loss?",
        answer:
          "We use FDA-approved GLP-1 medications, including semaglutide and tirzepatide, prescribed and monitored by Dr. Adams based on your health profile.",
      },
      {
        question: "Will I have to be on medication forever?",
        answer:
          "This is a personal decision made together with Dr. Adams based on your goals, response, and overall health. We'll discuss long-term planning as part of your program.",
      },
      {
        question: "What if I experience side effects?",
        answer:
          "Mild nausea or digestive changes are common, especially early on. We start at low doses and titrate gradually, and our team is available if you have concerns along the way.",
      },
    ],
  },
  {
    category: "Billing & Insurance",
    items: [
      {
        question: "Do you accept insurance?",
        answer:
          "Many of our integrative services, including hormone therapy and medical weight loss, are typically self-pay, as insurance coverage for these programs varies widely. Our team can walk you through pricing during your consultation.",
      },
      {
        question: "Can I use my HSA or FSA?",
        answer:
          "Many patients use HSA/FSA funds for services at Crossroads. We recommend checking with your plan administrator about eligible expenses.",
      },
      {
        question: "Is pricing discussed upfront?",
        answer:
          "Yes — we believe in transparency. Program and service costs will be discussed clearly before you begin any treatment.",
      },
    ],
  },
  {
    category: "Patient Portal",
    items: [
      {
        question: "What is the patient portal?",
        answer:
          "Our patient portal gives you a secure place to view your lab results and trends, your current treatment protocol, upcoming appointments, and messages from our care team.",
      },
      {
        question: "Is this prototype using my real medical information?",
        answer:
          "No. This site is a demo/prototype. The patient portal uses sample data only, and sign-in does not access any real medical records.",
      },
    ],
  },
];
