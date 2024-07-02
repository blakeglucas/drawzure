FROM nginx:latest

ENV PORT=8080
ARG BACKEND_PORT=9090
ARG S6_OVERLAY_VERSION=3.1.6.2
ARG NODE_VERSION=22.4.0
ARG NVM_VERSION=0.39.7

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl xz-utils dos2unix
RUN apt-get remove nodejs
ENV NVM_DIR=/root/.nvm
RUN curl -L https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh -o install.sh
RUN chmod +x install.sh && ./install.sh
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default ${NODE_VERSION}
ENV PATH="${NVM_DIR}/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN adduser --system --no-create-home --disabled-login --disabled-password --group nginx

RUN mkdir -p /opt/app

WORKDIR /opt/app/api

WORKDIR /opt/app/web
COPY web/package.json .
RUN npm install --no-package-lock --verbose
COPY web/** ./
COPY web/*.* .
RUN npm run build
RUN chown -R nginx:nginx ./dist

WORKDIR /opt/app
COPY . .
RUN mkdir -p /etc/nginx/logs
RUN mkdir -p /etc/services.d/api
RUN mkdir -p /etc/services.d/nginx
RUN sed "s/{{PORT}}/${PORT}/g" nginx.conf | sed "s/{{BACKEND_PORT}}/${BACKEND_PORT}/g" > /etc/nginx/nginx.conf
RUN dos2unix -n api.s6 /etc/services.d/api/run
RUN dos2unix -n nginx.s6 /etc/services.d/nginx/run
RUN chmod a+xwr /etc/services.d/**/run

WORKDIR /tmp
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-noarch.tar.xz
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-x86_64.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-x86_64.tar.xz

EXPOSE ${PORT}

ENTRYPOINT [ "/init" ]