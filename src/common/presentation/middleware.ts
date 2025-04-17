import { Request, Response } from 'express';

export const validationRequest = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const session = req.header('session-coockie');

    if (!session || session != process.env.SESSION) {
      return res.status(422).json({
        ok: false,
        msg: 'no hay session en la petición',
      });
    }

    // Validar que el cuerpo de un POST no venga vacío
    if (
      req.method === 'POST' &&
      (!req.body || Object.keys(req.body).length === 0)
    ) {
      return res.status(400).json({
        ok: false,
        msg: 'El cuerpo de la petición POST está vacío',
      });
    }

    next();
  } catch (error) {
    return res.status(422).json({
      ok: false,
      msg: 'Algo salió mal',
    });
  }
};
