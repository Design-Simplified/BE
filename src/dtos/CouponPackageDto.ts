export interface ICouponPackageDto {
  id: string;
  name: string;
  price: number;
  totalCoupons: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetAllCouponPackagesResponse {
  couponPackages: ICouponPackageDto[];
}
