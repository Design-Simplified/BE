import type { IGetAllCouponPackagesResponse } from '../dtos/CouponPackageDto';
import { CouponPackageRepository } from '../repositories';

export class CouponPackageService {
  static async getAllCouponPackages(): Promise<IGetAllCouponPackagesResponse> {
    const couponPackages = await CouponPackageRepository.findAll();

    return { couponPackages };
  }
}
