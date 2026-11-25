// Formatea un número como pesos chilenos: 14990 -> "$14.990"
export const clp = (n) => '$' + Number(n || 0).toLocaleString('es-CL')


// Validación simple de correo
export const correoValido = (c) => c !== '' && c.includes('@') && c.includes('.')
