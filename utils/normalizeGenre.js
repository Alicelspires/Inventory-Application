exports.normalizeGenre = (genres) => {
  if (!genres) return [];
  return Array.isArray(genres) ? genres : [genres];
};