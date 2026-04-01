# EdgeX ⚡

> **Kinetic Code Execution** — A LeetCode-style platform that auto-generates intelligent test cases using AI and runs them against user submissions.

---

## What is EdgeX?

EdgeX is a full-stack competitive programming platform where users can submit code solutions and have them tested against **AI-generated test cases**. Instead of manually writing test cases, EdgeX uses AI to generate a brute force reference solution, runs it to produce expected outputs, and stores them as verified test cases.

---

## How It Works

1. **Problem Creation** — Admin provides a problem statement, examples, and constraints
2. **AI Brute Force** — Gemini generates a brute force C++ solution for the problem
3. **Test Case Generation** — AI generates inputs for each test case type (edge, large input, boundary, etc.)
4. **Execution** — Judge Zero runs the brute force solution against each input to get expected outputs
5. **User Submission** — Users submit their optimized solution
6. **Smart Judging** — AI analyzes the submission and predicts which test case type it's most likely to fail on, running those first
7. **Result** — Pass/fail with execution time and memory usage

---

## Tech Stack

### Backend
- **Node.js** + **Express v5**
- **MongoDB** + **Mongoose**
- **Axios** — for Judge Zero API calls
- **Judge Zero** — self-hosted on VPS for code execution

### AI
- **Google Gemini 2.5** — brute force solution generation + test case input generation + smart failure prediction

### Frontend
- **React.js**
- **Tailwind CSS**

---

## Test Case Types

EdgeX uses a standardized set of test case tags across all problems:

| Tag | Description |
|---|---|
| `basic` | Standard happy path inputs |
| `edge` | Edge cases and corner cases |
| `large_input` | Maximum constraint inputs |
| `random` | Random valid inputs |
| `boundary` | Min/max boundary values |
| `no_valid_answer` | Cases where no answer exists |
| `duplicates` | Inputs with duplicate values |
| `zero_falsy` | Zero or falsy value inputs |

---

## Project Structure

```
EdgeX/
├── Backend/
│   ├── src/
│   │   ├── configs/         # Axios config for Judge Zero
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Judge Zero & AI service logic
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   └── utils/           # ApiResponse, ApiError, asyncHandler
│   └── package.json
└── Frontend/
    └── src/
        └── pages/
            └── Landing.jsx
```

---

## Environment Variables

```env
JUDGE0_URL=http://your-vps-ip:2358
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run dev
```

---

## Author

**Siddesh Poojary**

---

> EdgeX — *Find where your code fails.*
