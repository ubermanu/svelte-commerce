export interface PriceFormat {
  pattern: string
  precision: number
  requiredPrecision: number
  decimalSymbol: string
  groupSymbol: string
  groupLength: number
  integerRequired: boolean
}

const defaultPriceFormat: PriceFormat = {
  pattern: '$%s',
  precision: 2,
  requiredPrecision: 2,
  decimalSymbol: '.',
  groupSymbol: ',',
  groupLength: 3,
  integerRequired: false,
}

// TODO: Add tests
export function formatPrice(
  price: string | number,
  format: PriceFormat = defaultPriceFormat
): string {
  const {
    pattern,
    precision,
    requiredPrecision,
    decimalSymbol,
    groupSymbol,
    groupLength,
    integerRequired,
  } = format
  const priceNumber = Number(price)
  const priceString = priceNumber.toFixed(requiredPrecision)
  const [integer, decimal] = priceString.split('.')
  const integerLength = integer.length
  const integerPrefix = integerRequired ? integer : ''
  const integerSuffix = integerRequired ? '' : integer
  const integerFormatted =
    integerPrefix +
    integerSuffix
      .split('')
      .reverse()
      .reduce((acc, curr, index) => {
        const isGroup = index % groupLength === 0 && index > 0
        return curr + (isGroup ? groupSymbol : '') + acc
      }, '')
  const decimalFormatted = decimal ? decimalSymbol + decimal : ''
  const priceFormatted = integerFormatted + decimalFormatted
  return pattern.replace('%s', priceFormatted)
}
