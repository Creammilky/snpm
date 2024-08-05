#!/usr/bin/python3
import docker
client = docker.from_env()

node_image = client.images.pull(repository='node', tag='20.16.0-alpine3.19') 
test_commands = ['ls', '-a']
rsp =client.containers.run(image=node_image, command=test_commands)
print(rsp)

npm_install_commands = ['npm', 'g' ,"@zerodep/string-padleft"]
rsp =client.containers.run(image=node_image, command=npm_install_commands)
print(rsp)