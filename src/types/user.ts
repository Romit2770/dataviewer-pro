
export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  accessLevel: "handler" | "worker" | "member";
  email: string;
}

// Mock users with the ID format
export const mockUsers: User[] = [
  { 
    id: "25hd001", 
    name: "Alex Johnson", 
    role: "Senior Lab Handler", 
    department: "Research",
    accessLevel: "handler",
    email: "alex.johnson@datalab.com" 
  },
  { 
    id: "25wk001", 
    name: "Sam Thompson", 
    role: "Lab Worker", 
    department: "Testing",
    accessLevel: "worker",
    email: "sam.thompson@datalab.com" 
  },
  { 
    id: "25mb001", 
    name: "Jamie Davis", 
    role: "Company Member", 
    department: "Management",
    accessLevel: "member",
    email: "jamie.davis@datalab.com" 
  },
  { 
    id: "25hd002", 
    name: "Morgan Wright", 
    role: "Lab Administrator", 
    department: "Operations",
    accessLevel: "handler",
    email: "morgan.wright@datalab.com" 
  },
  { 
    id: "25wk002", 
    name: "Taylor Lee", 
    role: "Lab Technician", 
    department: "Analysis",
    accessLevel: "worker",
    email: "taylor.lee@datalab.com" 
  },
];
