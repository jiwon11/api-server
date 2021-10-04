FROM node:12

# Bundle APP files
WORKDIR /tuningApp

COPY . .

RUN npm cache clean --force
RUN npm install -g pm2

ENV PM2_PUBLIC_KEY 2c7khq9byqutfcf
ENV PM2_SECRET_KEY y52z594hcnrr2l9

# Install app dependencies
RUN npm install

# Expose the listening port of your app
EXPOSE 3000
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]