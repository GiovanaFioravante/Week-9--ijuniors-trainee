import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: number
  email: string
}

interface DecodedToken extends TokenPayload {
  iat: number
  exp: number
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  })
}

export function verifyToken(token: string): DecodedToken {
  return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken
}
