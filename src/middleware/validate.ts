import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

type Schemas = {
  body?: AnySchema;
  params?: AnySchema;
  query?: AnySchema;
};

export const validate =
  (schemas: Schemas) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        await schemas.body.validate(req.body, { abortEarly: false });
      }

      if (schemas.params) {
        await schemas.params.validate(req.params, { abortEarly: false });
      }

      if (schemas.query) {
        await schemas.query.validate(req.query, { abortEarly: false });
      }

      next();
    } catch (error: any) {
      return res.status(400).json({
        errors: error.errors,
      });
    }
  };
