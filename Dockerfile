# pull image for client build
FROM node:13.12.0-alpine as client

# Working directory be app
WORKDIR /usr/app/client/

COPY client/package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY client/ ./

RUN npm run build

# build server
FROM node:13.12.0-alpine

WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/
RUN ls

WORKDIR /usr/src/app/server/
COPY server/package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -qy

COPY server/ ./

ENV PORT 8080
ENV NODE_ENV production
ENV SECRET_KEY secret

CMD ["npm", "start"]
