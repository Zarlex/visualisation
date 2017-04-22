#!/usr/bin/env bash
set -e

# install nvm
echo "installing NVM"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

# save nvm env in bash rc
hasNvmEnv=`grep "export NVM_DIR" ~/.bashrc | cat`
if [ -z "$hasNvmEnv" ]; then
  echo "export NVM_DIR='$HOME/.nvm'" >> ~/.bashrc
  echo "[ -s '$NVM_DIR/nvm.sh' ] && \. '$NVM_DIR/nvm.sh'" >> ~/.bashrc
  echo "source '$NVM_DIR/nvm.sh'" >> ~/.bashrc
fi

# install node
echo "installing node"
nvm install node
nvm alias default node

# install pm2 module globally
echo "installing pm2"
sudo npm install -g pm2
pm2 update

cd ~/visualisation
npm install

# setup NODE_ENV
if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
    export NODE_ENV=$DEPLOYMENT_GROUP_NAME

    hasEnv=`grep "export NODE_ENV" ~/.bashrc | cat`
    if [ -z "$hasEnv" ]; then
        echo "export NODE_ENV=$DEPLOYMENT_GROUP_NAME" >> ~/.bashrc
    else
        sed -i "/export NODE_ENV=\b/c\export NODE_ENV=$DEPLOYMENT_GROUP_NAME" ~/.bashrc
    fi
fi

# add node to startup
hasRc=`grep "su -l $USER" /etc/rc.local | cat`
if [ -z "$hasRc" ]; then
    sudo sh -c "echo 'su -l $USER -c \"cd ~/visualisation;sh ./run.sh\"' >> //etc/rc.local"
fi

source ~/.bashrc
