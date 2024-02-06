export const formFields = [
 {
  name: "username",
  label: "Nome Completo",
  validation: {
   minLength: 3,
   errorMessage: "* Seu nome precisa conter pelo menos 3 caracteres.",
  },
 },
 {
  name: "email",
  label: "E-mail",
  validation: {
   email: true,
   errorMessage: "* Por favor, digite um e-mail válido.",
  },
 },
 {
  name: "cpf",
  label: "CPF",
  validation: {
   required: true,
   errorMessage: "* Campo obrigatório",
  },
 },
 {
  name: "tel",
  label: "Telefone",
  validation: {
   required: true,
   errorMessage: "* Campo obrigatório",
  },
 },
];
