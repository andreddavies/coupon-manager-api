import { Request, Response } from "express";

import Coupon from "@schemas/Coupon";
import { ApiError, BadRequestError } from "@helpers/api-errors";

interface ICoupon {
  id?: string;
  link: string;
  code: string;
  logo: string;
  due_date: Date;
  description: string;
  company_name: string;
  discount_percentage: number;
  status: "active" | "inactive";
}

type CouponControllerResponse = Response | ApiError;

class CouponController {
  async create(req: Request, res: Response): Promise<CouponControllerResponse> {
    const {
      link,
      code,
      logo,
      status,
      due_date,
      description,
      company_name,
      discount_percentage,
    }: ICoupon = req.body;

    if (
      !link ||
      !code ||
      !logo ||
      !status ||
      !due_date ||
      !description ||
      !company_name ||
      !discount_percentage
    )
      throw new BadRequestError("Todos os campos são obrigatórios!");

    const hasCoupon = await Coupon.findOne({ code });
    if (hasCoupon) throw new BadRequestError("Este cupom já existe!");

    const coupon = await Coupon.create({
      link,
      code,
      logo,
      status,
      due_date,
      description,
      company_name,
      discount_percentage,
    });
    if (!coupon) throw new ApiError("Não foi possível criar o cupom!");

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
    const coupon_list = await Coupon
      .find
      // { due_date: -1 }
      ();

    if (!coupon_list)
      throw new BadRequestError("Não foi possível encontrar a list de cupons!");

    return res.json({ coupon_list });
  }

  async update(req: Request, res: Response): Promise<CouponControllerResponse> {
    const { id } = req.params;
    const data: ICoupon = req.body;
    const coupon = await Coupon.findByIdAndUpdate(id, { ...data });

    if (!coupon)
      throw new BadRequestError("Não foi possível atualizar o cupom!");

    return res.json({ coupon });
  }

  async delete(req: Request, res: Response): Promise<CouponControllerResponse> {
    const { id } = req.params;
    const deleteCoupon = await Coupon.findByIdAndDelete(id);

    if (!deleteCoupon)
      throw new BadRequestError("Não foi possível remover o cupom!");

    return res.json({ message: "O cupom foi deletado com sucesso!" });
  }
}

export default new CouponController();
