export function validateBusFields(data) {
  const required = [
    "title", "owner", "price", "passenger", "from", "to",
    "bus_number", "type", "departure_date", "renew_date", "insurance_renew_date"
  ];
  for (let key of required) {
    if (!data[key]) return { valid: false, missing: key };
  }
  return { valid: true };
}

export function validateUserFields(data) {
  const required = ["name", "email", "password"];
  for (let key of required) {
    if (!data[key]) return { valid: false, missing: key };
  }
  return { valid: true };
}
