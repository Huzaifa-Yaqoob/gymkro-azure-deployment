module.exports = {
  apps: [
    {
      name: 'gym-api',
      cwd: 'apps/gym-api',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
      },
    },
    {
      name: 'gym-web',
      cwd: 'apps/gym-web',
      script: 'npx',
      args: 'next start -p 4200',
      env: {
        NODE_ENV: 'production',
        PORT: 4200,
      },
    },
  ],
};