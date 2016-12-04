#!/bin/bash

# $1: Root directory of the application on the server.
# $2: Type of deployment. Either 'staging' or 'prod'.

TARFILE="build.$2.tar.gz"

# Go to the frontend directory
cd $1/frontend

# Check if file exists
if [ ! -f "$TARFILE" ]; then
  echo "$TARFILE does not exist!"
  exit 1
fi

echo "$1/frontend/$TARFILE found!"

# Make backup of dist to current datetime
if [ -d ./dist ]; then
  cp -r ./dist "dist_backup_$(date +%Y%m%d_%H%M%S)"
else
  mkdir dist
fi

# Untar the tarfile
tar -zxvf $TARFILE -C dist/

# Clean up
rm $TARFILE