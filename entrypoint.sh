#!/bin/sh

# substitute variables in *.template files 
for f in ${SITE_ROOT}/*.html ${SITE_ROOT}/scripts/*; do
	sed -i "s;\${HOST_IP};http://${HOST_IP};" $f 
	sed -i "s;\${NODEJS_PORT};${NODEJS_PORT};" $f
done

# configure nginx to listen on specified port
sed -i "s;\${HTTP_PORT};${HTTP_PORT};" /etc/nginx/conf.d/default.conf
sed -i "s;\${SITE_ROOT};${SITE_ROOT};" /etc/nginx/conf.d/default.conf
# start nginx
nginx
# start node 
node ${SOCK_SERVER_ROOT}/server.js & 
# run a shell
/bin/sh

