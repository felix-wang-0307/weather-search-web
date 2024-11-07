import { Request, Response, NextFunction } from 'express';

export interface IController {
  (req: Request, res: Response, next: NextFunction): void | Promise<void>;
}