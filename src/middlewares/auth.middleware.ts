import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/app-error';
import { IVerificationToken } from '../interfaces/api.interface';

export const requireAuth = (req: Request, _: Response, next: NextFunction) => {
    const loggedToken = req.headers.authorization;

    if(!loggedToken){
        throw new AppError("Solicitação necessita do token de autenticação, faça o login.", 401);
    }

    const [, token] = loggedToken.split(" ");

    try {
        const {sub} = verify(token, process.env.JWT_SECRET_KEY!) as IVerificationToken

        req.user_id = Number(sub);
    } catch(err){
        throw new AppError("Solicitação falhou, ocorreu algum erro na verificação do token.", 401);
    }
    
    return next()
}



 