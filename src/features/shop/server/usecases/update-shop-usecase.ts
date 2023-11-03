import { validateShopUsecase } from '@/features/shop/server/usecases/validate-shop-usecase';
import { Shop, db } from '@/lib/database';
import { NotFoundError } from '@/lib/errors';

export interface UpdateShopUsecaseParams {
  shop: Shop;
}

export async function updateShopUsecase({ shop }: UpdateShopUsecaseParams) {
  await validate(shop);

  return db.shop.update({
    data: shop,
    where: { id: shop.id },
  });
}

async function validate(shop: Shop) {
  if (
    (await db.shop.count({
      where: { id: shop.id },
    })) === 0
  ) {
    throw new NotFoundError({
      message: 'ショップが存在しません',
    });
  }

  await validateShopUsecase({ shop, ignoreId: shop.id });
}
