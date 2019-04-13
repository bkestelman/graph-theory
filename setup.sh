SERVER_IP="http://$(ip route get 1 | awk '{ print $NF; exit }')" # https://stackoverflow.com/a/25851186/5486210 (how-to-get-the-primary-ip-address-of-the-local-machine-on-linux-and-os-x)
SERVER_PORT=3000

HTML_DIR=html
TEMPLATE_FILE=${HTML_DIR}/template.html
DEST_FILE=${HTML_DIR}/index.html
SERVER_IP=${SERVER_IP} SERVER_PORT=${SERVER_PORT} envsubst '${SERVER_IP} ${SERVER_PORT}' < ${TEMPLATE_FILE} > ${DEST_FILE} 
