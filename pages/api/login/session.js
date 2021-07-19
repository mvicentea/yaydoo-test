import { getLoginSession } from '../../../lib/auth'
import { findUser } from '../../../lib/user'

export default async function session(req, res) {
  try {
    const sessionUser = await getLoginSession(req)
    const user = (sessionUser && (await findUser(sessionUser))) ?? null
    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
} 
