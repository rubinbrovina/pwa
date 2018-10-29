FROM node:8.11.1


RUN mkdir -p /app

WORKDIR /app


COPY package.json /app/


RUN ["npm", "install"]



COPY . /app


EXPOSE 443/tcp

RUN chmod 777 /usr/local/lib/node_modules/

CMD ["npm", "start"]
