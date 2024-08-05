#!/usr/bin/env python3
import gen_dockerfile
import tar_server
import docker
import random
import sys
import os

client = docker.from_env()

def create_docker_image(fileobj, package_name):
    try: 
        image = client.images.build(fileobj=fileobj, tag=package_name)
    except docker.errors.BuildError as e:
        raise Exception(f"BulidError: {e}")
    except docker.errors.APIError as e:
        raise Exception(f"APIError: {e}")
    except TypeError as e:
        raise Exception(f"TypeError: {e}")
    return image

def file_check(file_path):
    # check if file exist
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File {file_path} not found.")
    else:
        print(f"{file_path} exist.")

def parse_pkgname(package_name):
    return package_name[1:]

if __name__ == "__main__":
    port = random.randint(10011, 65534)

    if len(sys.argv) != 2:
        print("Received arguments:", sys.argv)
        print("Usage: snpm package_name")
        sys.exit(1)

    package_name = sys.argv[1]

    dockerfile_obj = gen_dockerfile.generate(package_name=package_name, port=port)

    tar_server.tar_server(port=port)

    file_check("../server/http_server.tar")
    file_check("../docker/DOCKERFILE")
    
    with open('../docker/DOCKERFILE', 'rb') as file:
        image = create_docker_image(file, parse_pkgname(package_name))
    rsp =client.containers.run(image=image)
    print(rsp)
