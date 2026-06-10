export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Appointments are arranged by phone, text, or our contact form — we don't currently offer real-time online scheduling. Call (256) 434-9301, text (256) 608-4111, or submit a request through our contact page and our team will follow up to find a time that works.",
      },
      {
        question: "What happens during my first visit?",
        answer:
          "Your first visit typically includes a detailed health history review, a conversation with Dr. Adams about your goals and symptoms, and — for most programs — a lab draw to establish your baseline before any treatment begins.",
      },
      {
        question: "Do I need a referral to be seen?",
        answer:
          "No referral is needed. You can reach out directly to schedule a consultation for any of our services or programs.",
      },
      {
        question: "What is the health assessment on your website?",
        answer:
          "Our online assessment is a short questionnaire about your goals and health basics. It's not a diagnosis — it helps our team understand your situation before your consultation so we can make the most of your visit. It's submitted as a request, and our team will follow up to schedule.",
      },
    ],
  },
  {
    category: "Hormone Therapy (BioTE)",
    items: [
      {
        question: "How do I know if I need hormone therapy?",
        answer:
          "Common signs include fatigue, low libido, mood changes, sleep disruption, and changes in muscle mass or body composition. A comprehensive lab panel can confirm whether your hormone levels fall outside an optimal range.",
      },
      {
        question: "How often are pellets replaced?",
        answer:
          "Most patients return for new pellets every 3-5 months. Your exact schedule depends on how your body metabolizes hormones, which we track with follow-up labs.",
      },
      {
        question: "Are bioidentical hormones different from synthetic hormones?",
        answer:
          "Bioidentical hormones are molecularly identical to the hormones your body naturally produces, which is why many patients and physicians prefer them for hormone optimization.",
      },
    ],
  },
  {
    category: "Medical Weight Loss",
    items: [
      {
        question: "What medications do you use for weight loss?",
        answer:
          "We offer GLP-1 receptor agonist medications, including semaglutide and tirzepatide, prescribed and monitored by Dr. Adams based on your individual health profile.",
      },
      {
        question: "Will I have to give myself injections?",
        answer:
          "Most protocols use a simple once-weekly subcutaneous injection. We provide hands-on training so you feel confident administering it at home.",
      },
      {
        question: "Are there side effects?",
        answer:
          "The most common side effects are mild nausea, constipation, or fatigue, particularly when starting or increasing a dose. Gradual titration and nutrition coaching help most patients tolerate treatment well.",
      },
    ],
  },
  {
    category: "Billing & Insurance",
    items: [
      {
        question: "Do you accept insurance?",
        answer:
          "Many of our integrative services, including hormone therapy and medical weight loss, are offered as cash-pay programs since they're not always covered by insurance. Our front desk can walk you through current pricing.",
      },
      {
        question: "Can I use HSA or FSA funds?",
        answer:
          "Many patients use HSA/FSA funds toward eligible services. We recommend checking with your plan administrator and our front desk for specifics related to your account.",
      },
      {
        question: "Is financing available?",
        answer:
          "Ask our team about current options for managing the cost of ongoing programs — we're happy to discuss what's available.",
      },
    ],
  },
  {
    category: "The Patient Portal",
    items: [
      {
        question: "What is the patient portal?",
        answer:
          "The Crossroads patient portal is a private dashboard where established patients can view their lab trends, current treatment protocol, upcoming appointments, and messages from our care team.",
      },
      {
        question: "Is the portal demo on this website real?",
        answer:
          "The portal on this website is a demonstration using sample data to showcase what the experience looks like. It does not contain real patient information, and sign-in does not require real credentials.",
      },
      {
        question: "How do I get access to the real patient portal?",
        answer:
          "Existing patients can ask our front desk team for portal access during any visit, by phone, or by text.",
      },
    ],
  },
];
