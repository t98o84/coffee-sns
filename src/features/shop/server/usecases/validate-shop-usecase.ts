import { Shop, db } from '@/lib/database';
import { ValidationError } from '@/lib/errors';

export interface ValidateShopUsecaseParams {
  shop: Shop;
  ignoreId?: string;
}

export async function validateShopUsecase({
  shop,
  ignoreId,
}: ValidateShopUsecaseParams): Promise<void> {
  const errors = new ValidationError();
  const criteriaBase = {
    creatorId: shop.creatorId,
    id: ignoreId ? { not: ignoreId } : undefined,
  };

  if (
    (await db.shop.count({
      where: {
        ...criteriaBase,
        name: shop.name,
      },
    })) > 0
  ) {
    errors.addErrors([
      {
        code: 'SHOP_NAME_ALREADY_EXISTS',
        path: ['name'],
        message: 'すでに同じ名前のショップが存在します',
      },
    ]);
  }

  if (
    shop.refId &&
    (await db.shop.count({
      where: { ...criteriaBase, refId: shop.refId },
    })) > 0
  ) {
    errors.addErrors([
      {
        code: 'SHOP_REF_USER_ALREADY_EXISTS',
        path: ['refId'],
        message: 'すでに同じユーザーを参照するショップが存在します',
      },
    ]);
  }

  if (errors.errors.length > 0) {
    throw errors;
  }
}
