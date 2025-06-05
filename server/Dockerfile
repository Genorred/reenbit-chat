FROM node:20.16.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g pnpm

FROM base as build

ENV NODE_ENV=production

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

VOLUME [ "/node_modules" ]

EXPOSE 5000

CMD ["pnpm", "run", "start"]
