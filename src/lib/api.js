const API_URL = 'https://698eff28aded595c25336fea.mockapi.io/tweets'

export const api = {
  getPosts: async () => {
    const res = await fetch(`${API_URL}/posts`)
    
    return res.json()
  },
  
  createPost: async (text) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, likes: 0, createdAt: new Date().toISOString() })
    })
    return res.json()
  }
}