/**
 * Extracts all values from a form data object.
 *
 * For example, street[0] and street[1] will be extracted as street.
 */
export function extractAllValues(
  formData: FormData,
  name: string
): Map<string, string> {
  const values: Map<string, string> = new Map()

  for (const [entry, value] of formData.entries()) {
    const matches = /^([^\[]+)/.exec(entry)
    if (matches && matches[1] === name) {
      values.set(entry, String(value))
    }
  }

  return values
}
