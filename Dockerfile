FROM alpine:3.9 

RUN apk update \
	&& apk add nginx \
	&& apk add nodejs \
	&& apk add npm 

# nodejs setup 
ENV SOCK_SERVER_ROOT=/root/sock-server
RUN mkdir ${SOCK_SERVER_ROOT} 
COPY sock-server/package.json ${SOCK_SERVER_ROOT}/
RUN cd ${SOCK_SERVER_ROOT} && npm install 
COPY sock-server/server.js ${SOCK_SERVER_ROOT}/

# nginx setup 
ENV SITE_ROOT=/www
RUN adduser -D -g 'www' www
RUN mkdir -p ${SITE_ROOT} 
RUN chown -R www:www /var/lib/nginx
RUN chown -R www:www ${SITE_ROOT}
RUN mkdir -p /run/nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# copy client code
COPY index.html ${SITE_ROOT}/index.html
COPY scripts/ ${SITE_ROOT}/scripts/
COPY tests/ ${SITE_ROOT}/tests/

COPY entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod u+x /usr/bin/entrypoint.sh

ENTRYPOINT [ "entrypoint.sh" ]
