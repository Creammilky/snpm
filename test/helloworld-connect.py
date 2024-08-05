#!/usr/bin/python3
import docker

client = docker.from_env()

version = client.version()

docker_list = client.images.list()

print(version)

rsp = client.containers.run('hello-world')

print(rsp)