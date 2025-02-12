import { create } from "zustand";
import { Accomplishment } from "../types/accomplishment";

export const sampleAccomplishments: Accomplishment[] = [
  {
    id: "1",
    title: "Reached 100% of sales quota for Q2",
    date: "2024-06-15",
    role: "Sales Executive",
    company: "HorizonCorp",
    privateDetails: "Managed a 20-client portfolio worth $1.2M in revenue",
    tags: ["Sales", "Achievement", "Quarter Goals", "highlight"],
    attachments: [
      {
        id: "1",
        name: "Final_points",
        type: "docx",
        size: "1.9MB",
        url: "/docs/final-points.docx"
      }
    ]
  },
  {
    id: "2",
    title: "Led a team of 4 to develop a new sales dashboard",
    date: "2024-07-10",
    role: "Project Manager",
    company: "HorizonCorp",
    privateDetails: "Used Agile methodology to reduce development time by 25%",
    tags: ["Leadership", "Development", "Project Management"],
    attachments: [
      {
        id: "2",
        name: "Presentation",
        type: "pwr",
        size: "1.4MB",
        url: "/docs/presentation.pptx"
      }
    ]
  },
  {
    id: "3",
    title: "Implemented new CRM system",
    date: "2024-05-20",
    role: "Business Analyst",
    company: "TechFirm Inc",
    privateDetails: "Reduced customer response time by 40% through automation",
    tags: ["Business", "Analysis", "CRM"],
    attachments: [
      {
        id: "3",
        name: "CRM_Report",
        type: "pdf",
        size: "2.5MB",
        url: "/docs/crm-report.pdf"
      }
    ]
  },
  {
    id: "4",
    title: "Successfully launched mobile app",
    date: "2024-04-01",
    role: "Product Manager",
    company: "AppWorks",
    privateDetails: "Achieved 100K downloads in first month with 4.8 star rating",
    tags: ["Product", "Launch", "Mobile"],
    attachments: [
      {
        id: "4",
        name: "App_Screenshot",
        type: "png",
        size: "500KB",
        url: "/docs/app-screenshot.png"
      }
    ]
  },
  {
    id: "5",
    title: "Optimized marketing campaign ROI",
    date: "2024-03-15",
    role: "Marketing Manager",
    company: "BrandBoost",
    privateDetails: "Increased conversion rate by 35% while reducing cost per acquisition by 20%",
    tags: ["Marketing", "ROI", "Campaign", "highlight"],
    attachments: [
      {
        id: "5",
        name: "Campaign_Report",
        type: "xlsx",
        size: "1.2MB",
        url: "/docs/campaign-report.xlsx"
      }
    ]
  },
  {
    id: "6",
    title: "Redesigned company website",
    date: "2024-02-28",
    role: "UX Designer",
    company: "DigitalCraft",
    privateDetails: "Improved user engagement by 45% and reduced bounce rate by 30%",
    tags: ["UX", "Design", "Website"],
    attachments: [
      {
        id: "6",
        name: "Wireframes",
        type: "pdf",
        size: "1.0MB",
        url: "/docs/wireframes.pdf"
      }
    ]
  },
  {
    id: "7",
    title: "Launched successful email campaign",
    date: "2024-02-01",
    role: "Digital Marketing Specialist",
    company: "MarketPro",
    privateDetails: "Generated $500K in revenue with 28% open rate and 12% click-through rate",
    tags: ["Email", "Campaign", "Marketing"],
    attachments: [
      {
        id: "7",
        name: "Email_Report",
        type: "pdf",
        size: "1.5MB",
        url: "/docs/email-report.pdf"
      }
    ]
  },
  {
    id: "8",
    title: "Developed AI-powered chatbot",
    date: "2024-01-15",
    role: "Software Engineer",
    company: "AITech Solutions",
    privateDetails: "Reduced customer service costs by 40% while maintaining 95% satisfaction rate",
    tags: ["AI", "Chatbot", "Development"],
    attachments: [
      {
        id: "8",
        name: "Chatbot_Code",
        type: "zip",
        size: "3.0MB",
        url: "/docs/chatbot-code.zip"
      }
    ]
  },
  {
    id: "9",
    title: "Streamlined procurement process",
    date: "2023-12-20",
    role: "Operations Manager",
    company: "GlobalSupply",
    privateDetails: "Saved $2M annually through vendor consolidation and process automation",
    tags: ["Procurement", "Streamlining", "Operations"],
    attachments: [
      {
        id: "9",
        name: "Procurement_Report",
        type: "pdf",
        size: "1.8MB",
        url: "/docs/procurement-report.pdf"
      }
    ]
  },
  {
    id: "10",
    title: "Led international team expansion",
    date: "2023-11-30",
    role: "HR Director",
    company: "TalentGrowth",
    privateDetails: "Successfully hired and onboarded 50+ employees across 5 countries",
    tags: ["HR", "Expansion", "International"],
    attachments: [
      {
        id: "10",
        name: "Hiring_Report",
        type: "docx",
        size: "2.2MB",
        url: "/docs/hiring-report.docx"
      }
    ]
  },
  {
    id: "11",
    title: "Implemented data security protocol",
    date: "2023-11-15",
    role: "IT Security Manager",
    company: "SecureNet",
    privateDetails: "Achieved ISO 27001 certification with zero major non-conformities",
    tags: ["Security", "Protocol", "IT"],
    attachments: [
      {
        id: "11",
        name: "Security_Report",
        type: "pdf",
        size: "1.7MB",
        url: "/docs/security-report.pdf"
      }
    ]
  },
  {
    id: "12",
    title: "Launched customer loyalty program",
    date: "2023-10-01",
    role: "Customer Success Manager",
    company: "LoyaltyFirst",
    privateDetails: "Increased customer retention by 25% and generated 40% more referrals",
    tags: ["Loyalty", "Program", "Customer Success", "highlight"],
    attachments: [
      {
        id: "12",
        name: "Loyalty_Report",
        type: "xlsx",
        size: "1.1MB",
        url: "/docs/loyalty-report.xlsx"
      }
    ]
  }
];

interface AccomplishmentStore {
  accomplishments: Accomplishment[];
  toggleSelected: (id: string) => void;
  getSelectedAccomplishments: () => Accomplishment[];
  clearSelection: () => void;
}

export const useAccomplishmentStore = create<AccomplishmentStore>((set, get) => ({
  accomplishments: sampleAccomplishments,
  toggleSelected: (id) =>
    set((state) => ({
      accomplishments: state.accomplishments.map((acc) =>
        acc.id === id ? { ...acc, selected: !acc.selected } : acc
      ),
    })),
  getSelectedAccomplishments: () =>
    get().accomplishments.filter((acc) => acc.selected),
  clearSelection: () =>
    set((state) => ({
      accomplishments: state.accomplishments.map((acc) => ({
        ...acc,
        selected: false,
      })),
    })),
}));
