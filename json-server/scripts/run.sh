#!/usr/bin/env bash
cd ~/visualisation/app
pm2 start json-server.js -n www -i 0 -f
