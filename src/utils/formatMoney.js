const formatter = Intl.NumberFormat('en-SG', {
  style: 'currency',
  currency: 'SGD',
});

export default function formatMoney(cost) {
  return ' ' + formatter.format(+cost);
}
