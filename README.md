# जनसमाधान · Jansamadhan

## Civic Problem Intelligence Platform

Jansamadhan is an AI-powered civic problem intelligence platform designed to help citizens report local civic problems and help authorities identify larger issues hidden within individual complaints.

Citizens can report problems such as water supply issues, potholes, garbage accumulation, streetlight failures, drainage problems, and other civic concerns. Instead of treating every complaint as an isolated report, Jansamadhan is designed to connect related complaints and represent them as a common **civic issue**.

The platform provides separate interfaces for citizens and authorities. Citizens can submit complaints, track their status, view related civic issues, and provide feedback after resolution. Authorities can monitor civic issues, view priority information, assign issues, update their status, and manage the resolution process.

---

## Key Features

### Citizen

- User registration and login
- Citizen dashboard
- Submit civic complaints
- Select complaint category
- Provide location and problem details
- Upload an optional image
- View complaint history
- Track complaint status
- View complaint details
- View the related civic issue
- Provide feedback after resolution
- Receive notifications

### Authority

- Authority dashboard
- Overview of total, priority, in-progress, and resolved issues
- View civic issues
- View individual issue details
- View related complaints
- Monitor issue priority and impact information
- Assign issues to departments
- Update issue status
- Manage resolved issues
- Review citizen feedback
- View authority notifications

### Civic Intelligence

The platform is designed around the distinction between an individual **complaint** and a larger **civic issue**.

For example:

> Multiple citizens reporting low water pressure in the same locality may represent one underlying water supply issue.

The system is designed to use complaint information such as semantic similarity, location, duration, and report patterns to identify related complaints and support civic issue prioritization.

---

## Tech Stack

### Frontend

- React 19
- Vite 8
- JavaScript
- React Router 7
- Lucide React

### Database

- Supabase

### AI / NLP

- NLP-based complaint processing
- Semantic similarity
- Complaint-to-issue matching



## Getting started

**Requirements:** Node.js 18+ (Node 22 recommended) and npm (or pnpm/yarn if you prefer).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev
```




