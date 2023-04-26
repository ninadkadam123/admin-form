FROM node:alpine

WORKDIR /usr/local/app

COPY ./ /usr/local/app

RUN npm install

RUN npm run build


FROM nginx:alpine

COPY --from=build /usr/local/app/dist/admin /usr/share/nginx/html

EXPOSE 4200