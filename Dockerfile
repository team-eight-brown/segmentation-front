FROM node:18-alpine
WORKDIR /react-vite-app
EXPOSE 5173
COPY package.json package-lock.json ./
RUN npm install --silent
COPY ../../../../AppData/Local/Temp/Rar$DRa4168.33329/segmentation-front-add-ci-cd ./
CMD ["npm", "run", "dev", "--", "--host"]
