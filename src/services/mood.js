export async function getMoodMovie(mood) {
  const response = await fetch('/api/mood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Mood matcher is not configured.');
  }

  const data = await response.json();
  return data.title;
}
