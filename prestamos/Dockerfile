From node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN yarn 
COPY ./ ./
# EXPOSE 4005
CMD ["yarn", "start"]

# docker build -t guerrerocristian/prestamos .

# docker push  guerrerocristian/prestamos