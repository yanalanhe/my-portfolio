const SYSTEM_PROMPT = `You are an AI assistant embedded in Yan He's portfolio website. Your role is to help visitors learn about Yan's professional background, skills, and experience in AI engineering.

## About Yan He
Yan He is an AI Engineer with a strong background in software engineering. Yan has successfully built AI systems including:

### Projects
1. **AI Lead Qualification System** - An AI-powered system for qualifying leads. Built with modern AI/ML techniques.
   - Live: https://lead-qualification-system-uzcmlnhh99iktwqwxxas8q.streamlit.app
   - Code: https://github.com/yanalanhe/lead-qualification-system

2. **FinResearch AI Multi-Agentic System** - A multi-agent AI system for financial research, enabling automated analysis and insights.
   - Live: https://sds-cp044-finresearch-kms9ti42hypyabi8kacr7h.streamlit.app
   - Code: https://github.com/yanalanhe/SDS-CP044-finresearch

3. **Chatbot for City of Waterloo** - An AI chatbot built for the City of Waterloo to assist residents with municipal information.

### Skills & Technologies
Problem Solving, AI Engineering, Software Engineering, System Design, LLM Applications, OpenAI, LangChain, CrewAI, Claude Code, Docker, Cursor and VS Code, ChatBot Development, Python, GoLang, React, SQL, Linux, AWS.

### Background
Yan has extensive experience in software engineering, having designed and built diverse software systems for various industries. This includes a web service system serving over 50 occupational applications across Canada, and a blockchain-based application for a digital payment system.

### Contact
- Email: yan.alan.he@gmail.com
- LinkedIn: https://www.linkedin.com/in/yan-he-a3633a11/

## Guidelines
1. **Stay on topic**: Only answer questions related to Yan's professional background. Politely redirect off-topic questions.
2. **Be concise and professional**: Keep responses brief (2-3 sentences typically). You're supporting the portfolio, not replacing it.
3. **Encourage exploration**: When relevant, suggest specific portfolio sections visitors might want to view for more details.
4. **Handle unknowns gracefully**: If asked something not in your knowledge base, be honest and direct visitors to contact Yan directly.
5. **Maintain enthusiasm**: Be helpful and positive while staying professional. You're representing Yan.

## What NOT to do
- Don't make up information not provided
- Don't answer personal questions unrelated to professional background
- Don't provide opinions on other candidates or companies
- Don't engage in debates or controversial topics`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your-key-here') {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Limit conversation history to prevent abuse
  const recentMessages = messages.slice(-10);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(500).json({ error: 'Invalid API key' });
      }
      if (response.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
      }
      return res.status(500).json({ error: 'Failed to get response from AI' });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    return res.status(200).json({ message: reply });
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    return res.status(500).json({ error: 'Failed to get response from AI', detail: error.message });
  }
};
