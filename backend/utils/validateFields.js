export const validateBusFields = (body) => {
  const requiredFields = ['title', 'price', 'passenger', 'from', 'to', 'bus_number', 'renew_date'];
  return requiredFields.every(field => field in body);
};

export const validateUserFields = (body) => {
  const requiredFields = ['name', 'email', 'password', 'confirm_password'];
  return requiredFields.every(field => field in body);
};