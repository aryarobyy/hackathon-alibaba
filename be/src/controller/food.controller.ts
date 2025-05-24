import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma.config";
import { errorRes, successRes } from "../utils/response";

export const getFoodByMood = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { mood } = req.params;

        const data = await prisma.food.findFirst({
        where: { mood },
        select: {
            id: true,
            tags: true,
            mood: true
        },
        });

        if (!data) {
        errorRes(res, 404, "Pengguna tidak ditemukan");
        return;
        }

        successRes(res, 200, data, "Data pengguna ditemukan");
    } catch (e: any) {
        console.error("Error in getUserById:", e);
        errorRes(res, 500, "Terjadi kesalahan pada server", e.message);
    }
};