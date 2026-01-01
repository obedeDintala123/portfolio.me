import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractFirstImage(markdown: string) {
  const match = markdown.match(/!\[.*?\]\((.*?)\)/)
  return match ? match[1] : null // retorna URL da imagem
}
