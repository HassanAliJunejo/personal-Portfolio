const HF_SPACE_URL = 'https://hassanalijunejo-personal-portfolio.hf.space'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await fetch(`${HF_SPACE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({
        error: 'Backend error',
        detail: errorText,
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('[Proxy] Chat request failed:', error)
    return res.status(500).json({
      error: 'Failed to reach backend',
      detail: error.message,
    })
  }
}
