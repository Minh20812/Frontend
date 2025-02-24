export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
];

export const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Redesign company website",
    color: "#0ea5e9", // sky-500
  },
  {
    id: "2",
    name: "Mobile App",
    description: "Develop mobile application",
    color: "#8b5cf6", // violet-500
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q1 marketing campaign",
    color: "#f59e0b", // amber-500
  },
];

export const labels = [
  { id: "1", name: "Bug", color: "#ef4444" }, // red-500
  { id: "2", name: "Feature", color: "#10b981" }, // emerald-500
  { id: "3", name: "Documentation", color: "#6366f1" }, // indigo-500
  { id: "4", name: "Design", color: "#ec4899" }, // pink-500
  { id: "5", name: "Backend", color: "#8b5cf6" }, // violet-500
  { id: "6", name: "Frontend", color: "#f59e0b" }, // amber-500
];

export const defaultTasks = [
  {
    id: "1",
    title: "Create new design system",
    description: "Implement a consistent design language across the platform",
    status: "todo",
    priority: "high",
    projectId: "1",
    createdAt: new Date(2024, 1, 15),
    updatedAt: new Date(2024, 1, 15),
    createdById: "1",
    assignedToId: "2",
    labels: ["4", "6"],
  },
  {
    id: "2",
    title: "Build authentication",
    description: "Set up user authentication and authorization",
    status: "in-progress",
    priority: "medium",
    projectId: "2",
    createdAt: new Date(2024, 1, 16),
    updatedAt: new Date(2024, 1, 18),
    createdById: "2",
    assignedToId: "3",
    labels: ["2", "5"],
  },
  {
    id: "3",
    title: "Write documentation",
    description: "Document all features and APIs",
    status: "done",
    priority: "low",
    projectId: "3",
    createdAt: new Date(2024, 1, 17),
    updatedAt: new Date(2024, 1, 19),
    createdById: "3",
    labels: ["3"],
  },
];
