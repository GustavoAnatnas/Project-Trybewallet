// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export function addEmailAction(name) {
  return {
    type: 'ADD_EMAIL',
    payload: name,
  };
}
