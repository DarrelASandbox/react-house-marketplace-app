const formatter = Intl.NumberFormat('en-SG', {
  style: 'currency',
  currency: 'SGD',
  minimumFractionDigits: 0,
});

export default function formatMoney(cost) {
  return ' ' + formatter.format(+cost);
}
