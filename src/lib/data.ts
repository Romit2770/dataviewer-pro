
// Sample data for the application
export const sampleData = [
  {
    id: "S-23051",
    name: "Water Quality Test",
    date: "2023-05-15",
    status: "completed" as const,
    type: "water",
    batchNumber: "B-2305-01",
    collectedBy: "John Smith"
  },
  {
    id: "S-23052",
    name: "Soil Analysis",
    date: "2023-05-16",
    status: "completed" as const,
    type: "soil",
    batchNumber: "B-2305-02",
    collectedBy: "Maria Garcia"
  },
  {
    id: "S-23053",
    name: "Air Particle Test",
    date: "2023-05-18",
    status: "in-progress" as const,
    type: "air",
    batchNumber: "B-2305-03",
    collectedBy: "Robert Johnson"
  },
  {
    id: "S-23054",
    name: "Biological Culture",
    date: "2023-05-20",
    status: "pending" as const,
    type: "tissue",
    batchNumber: "B-2305-04",
    collectedBy: "Jennifer Lee"
  },
  {
    id: "S-23055",
    name: "Chemical Analysis",
    date: "2023-05-21",
    status: "failed" as const,
    type: "water",
    batchNumber: "B-2305-05",
    collectedBy: "David Kim"
  },
  {
    id: "S-23056",
    name: "River Water Quality",
    date: "2023-05-22",
    status: "completed" as const,
    type: "water",
    batchNumber: "B-2305-06",
    collectedBy: "Sarah Wilson"
  },
  {
    id: "S-23057",
    name: "Agricultural Soil Test",
    date: "2023-05-23",
    status: "in-progress" as const,
    type: "soil",
    batchNumber: "B-2305-07",
    collectedBy: "Michael Brown"
  },
  {
    id: "S-23058",
    name: "Indoor Air Quality Test",
    date: "2023-05-24",
    status: "pending" as const,
    type: "air",
    batchNumber: "B-2305-08",
    collectedBy: "Emily Davis"
  },
  {
    id: "S-23059",
    name: "Plant Tissue Culture",
    date: "2023-05-25",
    status: "completed" as const,
    type: "tissue",
    batchNumber: "B-2305-09",
    collectedBy: "James Wilson"
  },
  {
    id: "S-23060",
    name: "Industrial Wastewater",
    date: "2023-05-26",
    status: "in-progress" as const,
    type: "water",
    batchNumber: "B-2305-10",
    collectedBy: "Sophia Martinez"
  }
];

// Trend data for charts
export const trendData = [
  { date: "Jan", value: 45 },
  { date: "Feb", value: 52 },
  { date: "Mar", value: 49 },
  { date: "Apr", value: 63 },
  { date: "May", value: 71 },
  { date: "Jun", value: 83 },
  { date: "Jul", value: 78 },
  { date: "Aug", value: 91 },
  { date: "Sep", value: 102 },
  { date: "Oct", value: 95 },
  { date: "Nov", value: 110 },
  { date: "Dec", value: 118 }
];

// Monthly data for analysis charts
export const monthlyData = [
  { month: "Jan", completed: 32, pending: 8, failed: 2 },
  { month: "Feb", completed: 35, pending: 10, failed: 3 },
  { month: "Mar", completed: 38, pending: 7, failed: 2 },
  { month: "Apr", completed: 42, pending: 9, failed: 4 },
  { month: "May", completed: 48, pending: 12, failed: 3 },
  { month: "Jun", completed: 52, pending: 15, failed: 5 },
  { month: "Jul", completed: 58, pending: 10, failed: 3 },
  { month: "Aug", completed: 65, pending: 8, failed: 2 },
  { month: "Sep", completed: 70, pending: 12, failed: 4 },
  { month: "Oct", completed: 76, pending: 15, failed: 6 },
  { month: "Nov", completed: 82, pending: 10, failed: 3 },
  { month: "Dec", completed: 88, pending: 12, failed: 4 }
];

// Test type data for line charts
export const testTypeData = [
  { month: "Jan", chemical: 18, biological: 12, physical: 10 },
  { month: "Feb", chemical: 20, biological: 15, physical: 12 },
  { month: "Mar", chemical: 22, biological: 16, physical: 13 },
  { month: "Apr", chemical: 25, biological: 18, physical: 14 },
  { month: "May", chemical: 28, biological: 22, physical: 16 },
  { month: "Jun", chemical: 30, biological: 25, physical: 17 }
];

// Results distribution for pie chart
export const resultsDistribution = [
  { name: "Within Normal Range", value: 145 },
  { name: "Slightly Elevated", value: 35 },
  { name: "Moderately Elevated", value: 28 },
  { name: "Significantly Elevated", value: 15 },
  { name: "Below Detection Limit", value: 12 }
];
