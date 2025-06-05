FROM node:20.16.0-alpine as build

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN npm i -g pnpm

WORKDIR /client
COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

VOLUME [ "/node_modules" ]

CMD ["pnpm", "run", "start"]

FROM nginx:alpine
COPY --from=build /client/build/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]