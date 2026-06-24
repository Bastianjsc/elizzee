// src/utils/cardUtils.ts

/**
 * 1. Algoritmo de Luhn (Módulo 10)
 * Evalúa matemáticamente si un número de tarjeta de 16 dígitos es válido estructuralmente.
 */
export function validateLuhn(cardNumber: string): boolean {
  // Quitamos los espacios vacíos que añade el formateador visual
  const cleanNumber = cardNumber.replace(/\s+/g, "");
  
  // Si no tiene al menos 13 o 16 dígitos, ni nos molestamos en calcular
  if (cleanNumber.length < 13) return false;

  let sum = 0;
  let shouldDouble = false;

  // Recorremos el número de derecha a izquierda
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  // Si el residuo de dividir entre 10 es 0, la tarjeta es válida
  return sum % 10 === 0;
}

/**
 * 2. Detector de Red de Pago (Visa, Mastercard, Amex)
 * Identifica la marca basándose en los primeros dígitos (BIN).
 */
export function getCardType(cardNumber: string): "visa" | "mastercard" | "amex" | "unknown" {
  const cleanNumber = cardNumber.replace(/\s+/g, "");

  if (cleanNumber.startsWith("4")) {
    return "visa";
  }
  
  // Mastercard suele empezar con rangos del 51 al 55 o de 2221 a 2720
  const firstTwo = parseInt(cleanNumber.substring(0, 2), 10);
  const firstFour = parseInt(cleanNumber.substring(0, 4), 10);
  if ((firstTwo >= 51 && firstTwo <= 55) || (firstFour >= 2221 && firstFour <= 2720)) {
    return "mastercard";
  }

  // American Express empieza con 34 o 37
  if (firstTwo === 34 || firstTwo === 37) {
    return "amex";
  }

  return "unknown";
}