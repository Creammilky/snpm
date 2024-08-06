import docker

client = docker.from_env()

images = client.images.list()

for image in images:
    print(str(image))