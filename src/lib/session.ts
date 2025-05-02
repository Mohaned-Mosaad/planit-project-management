const TOKEN_KEY = 'user_id'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const storeToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token)

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const doesTokenExist = () => {
  if (getToken()) {
    return true
  }
  return false
}
