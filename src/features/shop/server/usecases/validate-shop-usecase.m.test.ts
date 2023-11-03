import { db } from '@/lib/database';
import { defineUserFactory } from '@/lib/database/factories';

describe('ValidateShopUseCase', () => {
  test('should validate shop', async () => {
    const user = await db.user.create({
      data: await defineUserFactory().create({
        id: 'test-id',
        name: 'TestName',
      }),
    });

    expect(user.name).toEqual('TestName');
  });
});
