const HF_SPACE_URL = 'https://hassanalijunejo-personal-portfolio.hf.space'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { sessionId } = req.query

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' })
  }

  try {
    const response = await fetch(`${HF_SPACE_URL}/api/history/${sessionId}`)

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
    console.error('[Proxy] History request failed:', error)
    return res.status(500).json({
      error: 'Failed to reach backend',
      detail: error.message,
    })
  }
}
