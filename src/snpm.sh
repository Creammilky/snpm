#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Usage: snpm package"
    exit 1
fi

package_name=$1
chmod +x ./create_docker.py
# 使用exec执行npm install命令，替换当前shell进程
./create_docker.py "$package_name"