
export function formatCurrency(value: any): string {
  const numericValue = Number(value) || 0;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);
}

// A função formatPhone agora espera que 'value' seja uma string,
// o que é o tipo correto para essa função.
export const formatPhone = (value: string): string => {
  const clean = value.replace(/\D/g, '');
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  } else if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6, 10)}`;
  }
  return value;
};