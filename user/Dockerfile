FROM node:14.15.0

ARG DIR=Cablegram

RUN mkdir -p ${DIR}
WORKDIR ${DIR}

COPY package*.json ./
RUN npm install

COPY . .

CMD ["./start.sh"]