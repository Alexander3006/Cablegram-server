export default () => {
  const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_TTL,
    JWT_REFRESH_TTL,
  } = process.env;

  return {
    jwt: {
      access_secret: JWT_ACCESS_SECRET,
      refresh_secret: JWT_REFRESH_SECRET,
      access_ttl: parseInt(JWT_ACCESS_TTL),
      refresh_ttl: parseInt(JWT_REFRESH_TTL),
    },
  };
};
