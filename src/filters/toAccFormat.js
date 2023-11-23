export default function toFixed (number) {
  const tempRes = number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const res = tempRes.replace(/,/g, ' ')
  return res
}