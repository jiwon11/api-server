FROM node:10.14

# Bundle APP files
WORKDIR /tuningApp

COPY . .

RUN npm cache clean --force
RUN npm install -g pm2


# Install app dependencies
RUN npm install

# Expose the listening port of your app

CMD [ "pm2-runtime", "start", "ecosystem.config.js"]