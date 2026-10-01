


















// TODO: Replace mock submission with POST /api/complaints
// TODO: Fetch real status from GET /api/complaints/{id}

export const mockComplaints = [
{
  id: "CMP-1041",
  description: "Water pressure is very low. Taps barely produce any water since last week.",
  category: "Water Supply",
  subcategory: "Low Pressure",
  location: "Arera Colony, Bhopal",
  area: "Arera Colony",
  address: "Plot 42, Sector C, Arera Colony",
  photo: null,
  submittedAt: "2026-09-09T08:15:00Z",
  reportedDuration: "7 days",
  status: "IN_PROGRESS",
  relatedIssueId: "ISS-104",
  reporterName: "Amit Kumar",
  reporterEmail: "amit.kumar@email.com"
},
{
  id: "CMP-1048",
  description: "Water is barely coming from the taps. Very low pressure especially in mornings.",
  category: "Water Supply",
  subcategory: "Low Pressure",
  location: "Arera Colony, Bhopal",
  area: "Arera Colony",
  address: "Block B, House 17, Arera Colony",
  photo: null,
  submittedAt: "2026-09-10T11:00:00Z",
  reportedDuration: "3 days",
  status: "IN_PROGRESS",
  relatedIssueId: "ISS-104",
  reporterName: "Priya Singh",
  reporterEmail: "priya.singh@email.com"
},
{
  id: "CMP-1052",
  description: "No proper water supply. We are not getting adequate water since Monday.",
  category: "Water Supply",
  subcategory: "Insufficient Supply",
  location: "Arera Colony, Bhopal",
  area: "Arera Colony",
  address: "Sector E, Flat 5B, Arera Colony",
  photo: null,
  submittedAt: "2026-09-11T09:45:00Z",
  reportedDuration: "4 days",
  status: "IN_PROGRESS",
  relatedIssueId: "ISS-104",
  reporterName: "Rahul Joshi",
  reporterEmail: "rahul.joshi@email.com"
},
{
  id: "CMP-1061",
  description: "Water supply has been very weak for three days. Very difficult to manage daily activities.",
  category: "Water Supply",
  subcategory: "Insufficient Supply",
  location: "Arera Colony, Bhopal",
  area: "Arera Colony",
  address: "Lane 7, House 3, Arera Colony",
  photo: null,
  submittedAt: "2026-09-12T14:30:00Z",
  reportedDuration: "3 days",
  status: "IN_PROGRESS",
  relatedIssueId: "ISS-104",
  reporterName: "Sunita Patel",
  reporterEmail: "sunita.patel@email.com"
},
{
  id: "CMP-1064",
  description: "No water pressure since weekend. Tank is not filling at all.",
  category: "Water Supply",
  subcategory: "No Supply",
  location: "Arera Colony, Bhopal",
  area: "Arera Colony",
  address: "Sector A, Plot 21, Arera Colony",
  photo: null,
  submittedAt: "2026-09-13T08:00:00Z",
  reportedDuration: "5 days",
  status: "IN_PROGRESS",
  relatedIssueId: "ISS-104",
  reporterName: "Manoj Gupta",
  reporterEmail: "manoj.gupta@email.com"
},
{
  id: "CMP-1067",
  description: "Water barely reaches first floor. Ground floor also has very low pressure.",
  category: "Water Supply",
  subcategory: "Low Pressure",
  location: "Arera Colony, Bhopal",
  area: "Arera Colony",
  address: "Sector D, Apartment 102, Arera Colony",
  photo: null,
  submittedAt: "2026-09-14T07:30:00Z",
  reportedDuration: "2 days",
  status: "IN_PROGRESS",
  relatedIssueId: "ISS-104",
  reporterName: "Kavita Sharma",
  reporterEmail: "kavita.sharma@email.com"
},
{
  id: "CMP-1053",
  description: "Garbage not collected for 3 days near the park. Smell is becoming unbearable.",
  category: "Waste / Garbage",
  subcategory: "Collection Failure",
  location: "MP Nagar, Bhopal",
  area: "MP Nagar",
  address: "Zone 2, Near Central Park, MP Nagar",
  photo: null,
  submittedAt: "2026-09-11T10:00:00Z",
  reportedDuration: "3 days",
  status: "ACTIVE",
  relatedIssueId: "ISS-107",
  reporterName: "Deepak Rao",
  reporterEmail: "deepak.rao@email.com"
},
{
  id: "CMP-1055",
  description: "Garbage pile on main road. Collection vehicle has not come since 3 days.",
  category: "Waste / Garbage",
  subcategory: "Collection Failure",
  location: "MP Nagar, Bhopal",
  area: "MP Nagar",
  address: "Zone 1, Main Road, MP Nagar",
  photo: null,
  submittedAt: "2026-09-11T12:00:00Z",
  reportedDuration: "3 days",
  status: "ACTIVE",
  relatedIssueId: "ISS-107",
  reporterName: "Anita Tiwari",
  reporterEmail: "anita.tiwari@email.com"
},
{
  id: "CMP-1058",
  description: "Waste bins overflowing. Garbage spread on streets creating health hazard.",
  category: "Waste / Garbage",
  subcategory: "Overflow",
  location: "MP Nagar, Bhopal",
  area: "MP Nagar",
  address: "Zone 3, Market Area, MP Nagar",
  photo: null,
  submittedAt: "2026-09-12T09:00:00Z",
  reportedDuration: "2 days",
  status: "ACTIVE",
  relatedIssueId: "ISS-107",
  reporterName: "Sanjay Mishra",
  reporterEmail: "sanjay.mishra@email.com"
},
{
  id: "CMP-1062",
  description: "Municipal waste truck has not visited our area. Residents are suffering.",
  category: "Waste / Garbage",
  subcategory: "Collection Failure",
  location: "MP Nagar, Bhopal",
  area: "MP Nagar",
  address: "Zone 2, Residential Block B, MP Nagar",
  photo: null,
  submittedAt: "2026-09-12T15:00:00Z",
  reportedDuration: "3 days",
  status: "ACTIVE",
  relatedIssueId: "ISS-107",
  reporterName: "Rekha Dubey",
  reporterEmail: "rekha.dubey@email.com"
},
{
  id: "CMP-1031",
  description: "Large potholes on Kolar Road. Three vehicles got damaged this week.",
  category: "Road / Pothole",
  subcategory: "Pothole",
  location: "Kolar Road, Bhopal",
  area: "Kolar",
  address: "Kolar Main Road, near Kolar Chowk",
  photo: null,
  submittedAt: "2026-09-05T07:00:00Z",
  reportedDuration: "5 days",
  status: "ACTIVE",
  relatedIssueId: "ISS-099",
  reporterName: "Vijay Tomar",
  reporterEmail: "vijay.tomar@email.com"
},
{
  id: "CMP-1035",
  description: "Road is badly damaged near the school. Children are at risk.",
  category: "Road / Pothole",
  subcategory: "Road Damage",
  location: "Kolar Road, Bhopal",
  area: "Kolar",
  address: "Near Government School, Kolar Road",
  photo: null,
  submittedAt: "2026-09-07T08:30:00Z",
  reportedDuration: "1 week",
  status: "ACTIVE",
  relatedIssueId: "ISS-099",
  reporterName: "Geeta Saxena",
  reporterEmail: "geeta.saxena@email.com"
},
{
  id: "CMP-1039",
  description: "Multiple deep potholes causing traffic jams and slow movement on Kolar road.",
  category: "Road / Pothole",
  subcategory: "Pothole",
  location: "Kolar Road, Bhopal",
  area: "Kolar",
  address: "Kolar Road stretch, 2 km from Kolar Circle",
  photo: null,
  submittedAt: "2026-09-08T10:00:00Z",
  reportedDuration: "4 days",
  status: "ACTIVE",
  relatedIssueId: "ISS-099",
  reporterName: "Ashok Sharma",
  reporterEmail: "ashok.sharma@email.com"
},
{
  id: "CMP-1071",
  description: "Street light near my house is not working for 2 nights. Very dark and unsafe.",
  category: "Streetlight",
  subcategory: "Non-Functional",
  location: "Shahpura, Bhopal",
  area: "Shahpura",
  address: "Lane 4, Shahpura Colony",
  photo: null,
  submittedAt: "2026-09-13T20:00:00Z",
  reportedDuration: "2 days",
  status: "NEW",
  relatedIssueId: "ISS-112",
  reporterName: "Meena Solanki",
  reporterEmail: "meena.solanki@email.com"
},
{
  id: "CMP-1072",
  description: "Three streetlights on our street are out. Very dangerous at night.",
  category: "Streetlight",
  subcategory: "Non-Functional",
  location: "Shahpura, Bhopal",
  area: "Shahpura",
  address: "Main Street, Shahpura",
  photo: null,
  submittedAt: "2026-09-13T21:30:00Z",
  reportedDuration: "1 day",
  status: "NEW",
  relatedIssueId: "ISS-112",
  reporterName: "Ramesh Chouhan",
  reporterEmail: "ramesh.chouhan@email.com"
},
{
  id: "CMP-1073",
  description: "No lighting in the park area of Shahpura. Senior citizens feel unsafe.",
  category: "Streetlight",
  subcategory: "Non-Functional",
  location: "Shahpura, Bhopal",
  area: "Shahpura",
  address: "Shahpura Park, Shahpura",
  photo: null,
  submittedAt: "2026-09-14T07:00:00Z",
  reportedDuration: "2 days",
  status: "NEW",
  relatedIssueId: "ISS-112",
  reporterName: "Usha Pandey",
  reporterEmail: "usha.pandey@email.com"
}];


// Citizen's own complaints (logged in as Priya Singh who owns CMP-1048)
export const myComplaintIds = ["CMP-1048", "CMP-1071"];