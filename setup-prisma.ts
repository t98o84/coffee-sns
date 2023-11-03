jest.mock('./src/lib/database', () => {
  return {
    db: jestPrisma.client,
  };
});
