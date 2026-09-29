export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  const mood =
    typeof req.body?.mood === 'string'
      ? req.body.mood.trim()
      : '';

  if (!mood) {
    return res.status(400).json({
      error: 'Mood text is required.',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is missing on the deployment.',
    });
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text:
                  'Return exactly one well-known movie title and nothing else. No quotes, explanation, year, bullets, or extra text.',
              },
            ],
          },

          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Suggest ONE movie based on this mood: ${mood}`,
                },
              ],
            },
          ],

          generationConfig: {
            thinkingConfig: {
              thinkingLevel: 'low',
            },
            maxOutputTokens: 100,
          },
        }),
      }
    );

    const data = await response.json();

    console.log('Gemini status:', response.status);
    console.log(
      'Gemini finish reason:',
      data?.candidates?.[0]?.finishReason
    );

    if (!response.ok) {
      console.error('Gemini error:', data);

      return res.status(502).json({
        error:
          data?.error?.message ||
          'Gemini API request failed.',
      });
    }

    const title =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || '')
        .join('')
        .trim();

    if (!title) {
      console.error('Gemini returned no title:', data);

      return res.status(502).json({
        error: 'Gemini returned no movie title.',
      });
    }

    console.log('Gemini movie:', title);

    return res.status(200).json({
      title,
    });
  } catch (error) {
    console.error('Gemini request error:', error);

    return res.status(500).json({
      error: 'Could not contact the Gemini AI service.',
    });
  }
}