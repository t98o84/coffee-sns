import { Shop, db } from '@/lib/database';

export interface DeleteShopUsecaseParams {
  id: Shop['id'];
}

export async function deleteShopUsecase({ id }: DeleteShopUsecaseParams) {
  return db.shop.delete({
    where: { id },
  });
}
