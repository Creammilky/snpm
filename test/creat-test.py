#!/usr/bin/python3
import docker
client = docker.from_env()
images = client.images.list(name="node")
for i in images:
    print(i)

# helloworld_image = client.images.pull(repository="hello-world") 
# node_image = client.images.pull(repository='node') 
commands = ['ls', '-a']
rsp =client.containers.run(image="node", command=commands)
# rsp = client.containers.run(helloworld_image)
print(rsp)