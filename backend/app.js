const { GoogleGenAI } = require("@google/genai");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const database_uri = process.env.ATLAS_URI;
const gemini_ai_api = process.env.GEMINIAI;

const ai = new GoogleGenAI({ apiKey: gemini_ai_api });

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// var corsOption = {
//   origin: ["http://localhost:8081", "http://localhost:3000"],
//   optionsSuccessStatus: 200,
// };

const triageResponse = {
  chiefComplaint: String,
  symptomDetails: String,
  riskFactors: String,
  redFlags: String,
}

// triage schema
const triageSchema = new mongoose.Schema({
  freeText: {
    type: String,
    required: true
  },
  triageResponse: {
    type: triageResponse,
    required: true
  }
});

const TriageResponse = mongoose.model("TriageResponse", triageSchema);

// lightweight endpoint for waking up the server without hitting the database
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.post('/', async (req, res) => {
  try {
    const text = req.body.data;
    console.log(text);
    const triagePrompt = `You are a multilingual medical triage assistant. Here is the user’s free-text symptom description: ${text}. Given the user's free-text symptom description in any language, do the following:  

    Translate the input into English (if not already in English).  
    Extract and structure the relevant medical information into a triage report with the following sections:  
        
    1. Chief complaint (1-2 sentences).  
    2. Symptom details (such as onset, duration, intensity/severity, location, characteristics) in a single paragraph.  
    3. Risk factors (medical risk factors like age or medical conditions, family history, environmental risk factors like contact with sick individuals, recent hospitalizations).  
    4. Red flag symptoms (symptoms that may indicate serious or urgent conditions).  
        
    Respond with **only a valid JSON object**, without any additional explanations, labels, or formatting. Ensure the JSON contains these keys:  
    - "chiefComplaint"  
    - "symptomDetails"  
    - "riskFactors"  
    - "redFlags"  
        
    Example of expected response:  
    {  
      "chiefComplaint": "Difficulty breathing and wheezing that started yesterday afternoon, with limited relief from Ventolin.",  
      "symptomDetails": "The patient reports onset of breathing difficulty yesterday afternoon, characterized by chest tightness and wheezing.",  
      "riskFactors": "History of similar episodes, recent cold.",  
      "redFlags": "Shortness of breath at rest, ineffectiveness of usual treatment."
    }  
        
    Do not respond or talk about anything not medical related. Do not include any extra formatting, explanations, or metadata. Only return the JSON object itself.`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: triagePrompt,

    });

    // remove the random formatting around the response returned
    const cleanJsonString = response.text.replace(/```json\n/, "").replace(/\n```/, "").trim();

    const parsedData = JSON.parse(cleanJsonString);

    const triageResponse = await TriageResponse.create({
      freeText: text,
      triageResponse: {
        chiefComplaint: parsedData.chiefComplaint,
        symptomDetails: parsedData.symptomDetails,
        riskFactors: parsedData.riskFactors,
        redFlags: parsedData.redFlags
      }
    });

    res.status(200).json({ response: triageResponse});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// get triage response history
app.get('/', async (req, res) => {
  try {
    const result = await TriageResponse.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const result = await TriageResponse.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete a triage response
app.delete('/:id', async (req, res) => {
  try {
    const result = await TriageResponse.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    console.log("1 document deleted");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

mongoose.connect(database_uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected to MongoDB.');

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port: ${port}`);
  });
});

