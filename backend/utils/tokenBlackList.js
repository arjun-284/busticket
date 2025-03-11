// For demonstration purposes. In production, use a persistent storage like Redis.
const tokenBlacklist = new Set();


export const addToBlacklist = (token) => {
  tokenBlacklist.add(token);
};

export const isBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};
