# substitute variables in template.html to create index.html
HTML_DIR=${SITE_ROOT:-html}
TEMPLATE_FILE=${HTML_DIR}/template.html
DEST_FILE=${HTML_DIR}/index.html
sed "s;\${HOST_IP};http://${HOST_IP};" ${TEMPLATE_FILE} > ${DEST_FILE} 
sed -i "s;\${NODEJS_PORT};${NODEJS_PORT};" ${DEST_FILE} 

# configure nginx to listen on specified port
sed -i "s;\${HTTP_PORT};${HTTP_PORT};" /etc/nginx/conf.d/default.conf
sed -i "s;\${SITE_ROOT};${SITE_ROOT};" /etc/nginx/conf.d/default.conf
# start nginx
nginx
# start node 
node ${SOCK_SERVER_ROOT}/server.js & 
# run a shell
/bin/sh

