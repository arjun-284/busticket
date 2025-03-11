export const validateBusFields = (body) => {
   const requiredFields = ['title', 'number', 'passenger', 'deport_from', 'deport_to', 'deport_date', 'deport_time'];
   return requiredFields.every(field => field in body);
 };