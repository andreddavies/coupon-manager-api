import { Request, Response } from "express";
import { MongooseError } from "mongoose";

import Coupon from "@schemas/Coupon";
import { ApiError, BadRequestError } from "@helpers/api-errors";

interface ICoupon {
  id?: string;
  link: string;
  code: string;
  logo: String;
  due_date: Date;
  description: string;
  company_name: string;
  discount_percentage: number;
  status: "active" | "inactive";
}

type CouponControllerResponse = Response | ApiError;

class CouponController {
  async create(req: Request, res: Response): Promise<CouponControllerResponse> {
    const { file } = req;
    const {
      link,
      code,
      status,
      due_date,
      description,
      company_name,
      discount_percentage,
    }: ICoupon = req.body;

    const coupon = await Coupon.create({
      link,
      code,
      status,
      due_date,
      description,
      company_name,
      discount_percentage,
      logo: file.path.split("public/")[1],
    })
      .then((res) => {
        return res;
      })
      .catch((err: MongooseError) => {
        throw new ApiError(400, err.message);
      });

    return res.json({ coupon });
  }

  async getCoupon(
    req: Request,
    res: Response
  ): Promise<CouponControllerResponse> {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);

    if (!coupon)
      throw new BadRequestError("Não foi possível encontrar o cupom!");

    return res.json({ coupon });
  }

  async list(req: Request, res: Response): Promise<CouponControllerResponse> {
    const coupon_list = await Coupon.find().sort({ percentage_discount: -1 });

    if (!coupon_list)
      throw new BadRequestError("Não foi possível encontrar a list de cupons!");

    return res.json({ coupon_list });
  }

  async update(req: Request, res: Response): Promise<CouponControllerResponse> {
    const { file } = req;
    const { id } = req.params;
    const data: ICoupon = req.body;

    if (file) {
      const coupon = await Coupon.findByIdAndUpdate(id, {
        ...data,
        logo: file.path.split("public/")[1],
      })
        .then((res) => {
          return res;
        })
        .catch((err: MongooseError) => {
          throw new ApiError(400, err.message);
        });

      return res.json({ coupon });
    } else {
      const coupon = await Coupon.findById(id)
        .then(async (res) => {
          const updated = await Coupon.findByIdAndUpdate(id, {
            ...data,
            logo: res.logo,
          });

          return updated;
        })
        .catch((err: MongooseError) => {
          throw new ApiError(400, err.message);
        });

      return res.json({ coupon });
    }
  }

  async delete(req: Request, res: Response): Promise<CouponControllerResponse> {
    const { id } = req.params;
    const deleteCoupon = await Coupon.findByIdAndDelete(id);

    if (!deleteCoupon)
      throw new ApiError(
        500,
        "Não foi possível remover o cupom! Tente novamente mais tarde."
      );

    return res.json({ message: "O cupom foi deletado com sucesso!" });
  }
}

export default new CouponController();
