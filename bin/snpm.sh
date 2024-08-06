#!/usr/bin/env bash
# snpm [-i --install --remove] <package_name>

if [ -z "$1" ]; then
    echo "Usage: snpm package"
    exit 1
fi

package_name=$1
chmod +x ./create_docker.py

# todo: path
exec ./create_docker.py "$package_name"