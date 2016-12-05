#!/bin/bash

# $1: SSH server alias, as defined in `~/.ssh/config`.
# $2: Root directory of the application on the server.
# $3: Type of deployment. Either 'staging' or 'production'.

TARFILE="build.$3.tar.gz"

echo "Uploading $TARFILE."
scp "./build/$TARFILE" $1:$2/frontend
if [ $? -eq 0 ]; then
  echo -e "$TARFILE successfully uploaded.\n"
else
  echo "Error uploading $TARFILE, exiting."
  exit 1
fi


echo "Connecting to $1..."
ssh $1 'bash -s' -- < ./sh/untar.sh $2 $3


echo $'\nDeployment complete!\n'