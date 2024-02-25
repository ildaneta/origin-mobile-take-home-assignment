export const formatCurrency = (amount: number) => {
  const formatedAmount = Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatedAmount;
};
