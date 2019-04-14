SERVER_IP=$(ip route get 1 | awk '{ print $NF; exit }') # https://stackoverflow.com/a/25851186/5486210 (how-to-get-the-primary-ip-address-of-the-local-machine-on-linux-and-os-x)
SERVER_PORT=3000

HTML_DIR=${SITE_ROOT:-html}
TEMPLATE_FILE=${HTML_DIR}/template.html
DEST_FILE=${HTML_DIR}/index.html
sed "s;\${SERVER_IP};http://${SERVER_IP};" ${TEMPLATE_FILE} > ${DEST_FILE} 
sed -i "s;\${SERVER_PORT};${SERVER_PORT};" ${DEST_FILE} 
