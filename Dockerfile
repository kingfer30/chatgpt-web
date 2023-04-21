# build front-end
FROM node:lts-alpine AS frontend

RUN npm install pnpm -g

WORKDIR /mnt/data/aichat/public

EXPOSE 3002

CMD ["pnpm", "run", "prod"]
