import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import fetch from '@/utils/fetch'

export const useAuthentication = () => {
  // null -> wala pa nacheck ang cookies
  // undefined -> no tokens sa cookies

  const [loading, setLoading] = React.useState(true)
  const [tokens, setTokens] = React.useState(null)
  const router = useRouter()

  const login = async (username, password) => {
    setLoading(true)
    let resTokens = null
    try {
      const res = await fetch('/api/token/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      resTokens = await res.json();
      if (resTokens) {
        Cookies.set('tokens', JSON.stringify(resTokens))
        setTokens(resTokens)
      }

    } catch (err) {
      console.log(err.message)
    }
    setLoading(false)

    // CHANGED: fix login na need twice ipress ang button
    if (resTokens) {
      return true;
    } else {
      return false;
    }
  }

  const logout = () => {
    Cookies.remove('tokens')
    setTokens(null)
    router.push('/login')
  }

  React.useEffect(() => {
    setLoading(true)
    const currentTokens = Cookies.get('tokens')
    if (currentTokens) {
      setTokens(JSON.parse(currentTokens))
    }
    setLoading(false)
  }, [])

  return { login, logout, tokens, loading }
}