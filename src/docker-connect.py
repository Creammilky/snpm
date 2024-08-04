#!/usr/bin/python3
import docker

client = docker.from_env()

version = client.version()

print(version)