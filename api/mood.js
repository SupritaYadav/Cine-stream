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

  const models = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
  ];

  const prompt = `Suggest ONE well-known movie based on this mood:
${mood}

Return ONLY the movie title.
Do not include explanation, year, quotes, bullets, or extra text.`;

  for (const model of models) {
    try {
      console.log('Trying Gemini model:', model);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 50,
              temperature: 0.2,
            },
          }),
        }
      );

      const data = await response.json();

      console.log(
        'Gemini model:',
        model,
        'status:',
        response.status
      );

      if (response.ok) {
        const title = data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || '')
          .join('')
          .trim();

        if (title) {
          console.log('Gemini movie:', title);

          return res.status(200).json({
            title,
          });
        }
      }

      if (response.status === 503) {
        console.log(
          `${model} is temporarily unavailable. Trying next model.`
        );
        continue;
      }

      console.error('Gemini error:', data);

      return res.status(502).json({
        error:
          data?.error?.message ||
          'Gemini API request failed.',
      });
    } catch (error) {
      console.error(`${model} request error:`, error);
    }
  }

  return res.status(503).json({
    error:
      'Gemini is temporarily unavailable. Please try again shortly.',
  });
}