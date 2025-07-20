import axios from 'axios';

export interface FlowNode {
  id: string;
  label: string;
}

export interface FlowEdge {
  from: string;
  to: string;
}

export interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export const generateFlowChart = async (prompt: string, apiKey: string): Promise<FlowData> => {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Gemini API key is required. Please add your API key.');
  }

  const instruction = `Convert the following process into a flowchart in JSON with two keys: 'nodes' (each with id and label) and 'edges' (with from and to referencing node ids). Return only the JSON object, no additional text or formatting. Example format:
{
  "nodes": [
    { "id": "1", "label": "Start" },
    { "id": "2", "label": "Validation" },
    { "id": "3", "label": "Approve/Reject" }
  ],
  "edges": [
    { "from": "1", "to": "2" },
    { "from": "2", "to": "3" }
  ]
}

Process to convert: ${prompt}`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: instruction
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Gemini response');
    }

    const flowData: FlowData = JSON.parse(jsonMatch[0]);
    
    // Validate the structure
    if (!flowData.nodes || !flowData.edges || !Array.isArray(flowData.nodes) || !Array.isArray(flowData.edges)) {
      throw new Error('Invalid flowchart structure returned from Gemini');
    }

    return flowData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('Invalid request to Gemini API. Please check your prompt and API key.');
      } else if (error.response?.status === 403) {
        throw new Error('Gemini API access denied. Please check your API key or try a different one.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests to Gemini API. Please wait and try again.');
      }
      throw new Error(`Gemini API error: ${error.response?.data?.error?.message || error.message}`);
    }
    throw error;
  }
};
