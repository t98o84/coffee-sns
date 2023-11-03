import { validateShopUsecase } from '@/features/shop/server/usecases/validate-shop-usecase';
import { Shop, db } from '@/lib/database';

export interface CreateShopUsecaseParams {
  shop: Shop;
}

export async function createShopUsecase({ shop }: CreateShopUsecaseParams) {
  await validateShopUsecase({ shop });

  return db.shop.create({
    data: shop,
  });
}
