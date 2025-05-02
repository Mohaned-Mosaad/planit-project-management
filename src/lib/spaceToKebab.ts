export function spaceToKebab(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, '-')
}
