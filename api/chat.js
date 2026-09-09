const BACKEND_URL = (
  process.env.HF_SPACE_URL ||
  process.env.NEXT_PUBLIC_HF_SPACE_URL ||
  'http://localhost:8000'
).replace(/\/$/, '')

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      cache: 'no-store',
    })

    const contentType = response.headers.get('content-type') || ''

    if (!response.ok) {
      const errorText = await response.text()
      let detail = errorText
      if (contentType.includes('application/json')) {
        try {
          const parsed = JSON.parse(errorText)
          detail = parsed.detail || parsed.message || parsed.error || JSON.stringify(parsed)
        } catch {
          detail = errorText
        }
      }
      return res.status(response.status).json({
        error: 'Backend error',
        detail: String(detail),
      })
    }

    if (!contentType.includes('application/json')) {
      return res.status(502).json({
        error: 'Backend returned non-JSON response',
        detail: 'The Hugging Face Space may be restarting or returning an error page.',
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
