#!/usr/bin/env bash
if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
 echo "DEPLOYMENT GROUP NAME ${DEPLOYMENT_GROUP_NAME}"
 #export NODE_ENV=$DEPLOYMENT_GROUP_NAME
fi
whoami
cd ~/visualisation/app
/usr/local/bin/pm2 start json-server.js -n www -i 0
