const OWNER = 'ArthurOrlov'
const REPO = 'admin-test'
const PATH = 'src/content/site.json'
const BRANCH = 'main'

const API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`

interface SaveResult {
  commitSha: string
  commitUrl: string
}

async function getCurrentSha(token: string): Promise<string | null> {
  const res = await fetch(`${API}?ref=${BRANCH}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    }
  })

  if (res.status === 404) return null
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Не удалось получить SHA: ${err.message || res.status}`)
  }

  const data = await res.json()
  return data.sha
}

// UTF-8-safe base64 (кириллица не ломается)
function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
}

export async function saveContent(
  content: unknown,
  token: string
): Promise<SaveResult> {
  const sha = await getCurrentSha(token)

  const body: Record<string, unknown> = {
    message: `content: update ${new Date().toISOString()}`,
    content: toBase64(JSON.stringify(content, null, 2)),
    branch: BRANCH
  }
  if (sha) body.sha = sha

  const res = await fetch(API, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API error: ${res.status}`)
  }

  const data = await res.json()
  return {
    commitSha: data.commit.sha,
    commitUrl: data.commit.html_url
  }
}