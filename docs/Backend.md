# AI Agent Instructions: Connecting to VibeWQuest-BE

**Context for the AI Agent:**
You are tasked with connecting a frontend application to the `VibeWQuest-BE` backend. This is a cloud-synced backend hosted at `https://vibewquest-be.onrender.com/api/v1` that connects directly to a Firebase Firestore database. 

The backend groups data using a `studentId`. Think of the `studentId` as a unique user or device token. Under each `studentId`, you can create custom collections (like `notes`, `tasks`, `settings`).

Please read the rules and implement the REST architecture below exactly as requested.

---

## 1. Core API Endpoints

The base URL for all requests is: `const API_BASE = 'https://vibewquest-be.onrender.com/api/v1';`

| Action | HTTP Method | Endpoint Format | Example Body |
|--------|-------------|-----------------|--------------|
| **Init** | `GET` | `/init` | None |
| **Get All** | `GET` | `/:studentId/:collection` | None |
| **Create** | `POST` | `/:studentId/:collection` | `{ "title": "...", "content": "..." }` |
| **Update** | `PUT` | `/:studentId/:collection/:documentId`| `{ "title": "...", "content": "..." }` |
| **Delete** | `DELETE` | `/:studentId/:collection/:documentId`| None |

*(Note: Replace `:collection` with the feature name, e.g., `notes`)*

---

## 2. Implementation Prompts / Rules for the Agent

When writing the frontend code, you **MUST** follow this specific flow:

### Prompt 1: Initialization & Local Storage
"On the initial component mount, check `localStorage` for a key named `cosmos_notes_studentId`. 
- If it exists, use it as the active `studentId` and immediately call the **Get All** endpoint to fetch the user's data. 
- If it does NOT exist, call the **Init** endpoint (`GET /init`). Extract `studentId` from the JSON response, save it to `localStorage`, and set it in the React state."

### Prompt 2: Optimistic UI for Creation (POST)
"When the user clicks the 'Create' button, DO NOT wait for the API to respond before updating the UI. 
Instead, instantly push a temporary object to the React state with a fake ID (e.g., `temp-123`) and a flag `isTemp: true`. 
Then, execute the `POST` request. When the backend responds with `{ documentId: '...' }`, update the React state to replace the fake ID with the real `documentId` and set `isTemp: false`."

### Prompt 3: Handling Saves (PUT)
"Create a manual 'Save' button in the UI. 
When clicked, ensure the item has a valid `documentId` (it is not `isTemp: true`). Disable the button while the save is pending. 
Send a `PUT` request containing the modified fields. The backend uses `{ merge: true }` under the hood, so you only need to send the fields that have changed, or the whole object."

### Prompt 4: Handling Deletions (DELETE)
"When the user deletes an item, instantly filter it out of the React state array for immediate UI feedback. 
Then, asynchronously fire the `DELETE` request to the API."

---

## 3. Example Response Formats Expected from Backend

**GET /init**
```json
{
  "studentId": "bc45f693",
  "apiUrl": "http://vibewquest-be.onrender.com/api/v1/bc45f693"
}
```

**GET /:studentId/notes**
```json
{
  "documents": [
    {
      "id": "OwNcs1s6XXBBHtSd1Xff",
      "title": "My First Note",
      "content": "Hello world"
    }
  ]
}
```

**POST /:studentId/notes**
```json
{
  "success": true,
  "message": "Document created successfully.",
  "documentId": "OwNcs1s6XXBBHtSd1Xff"
}
```
