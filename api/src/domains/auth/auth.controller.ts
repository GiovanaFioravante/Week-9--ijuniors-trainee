import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body
      const usuario = await authService.register(email, senha)
      return res.status(201).json(usuario)
    } catch (err) {
      next(err)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body
      const { token, usuario } = await authService.login(email, senha)

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1h — mantenha igual ao JWT_EXPIRES_IN
      })

      return res.status(200).json({ usuario })
    } catch (err) {
      next(err)
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token')
    return res.status(200).json({ message: 'Logout realizado com sucesso' })
  }

  async me(req: Request, res: Response) {
    return res.status(200).json({ usuario: req.user })
  }
}
