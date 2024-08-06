#!/usr/bin/env python3
import gen_dockerfile
import tar_server
import docker
import random
import json
import sys
import os


client = docker.from_env()


def create_docker_image(path, package_name):
    try: 
        image = client.images.build(path=path, tag=str("node:" + package_name))
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
    

def update_package_json(package_name, port, filename='package-snpm.json'):
    file_path = filename
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
    else:
        data = {}

    if package_name not in data:
        data[package_name] = []

    data[package_name].append(port)
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)


def parse_pkgname(package_name):
    return package_name.lstrip('@').split('/')[1]


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
    file_check("../docker/Dockerfile")
    

    image = create_docker_image("../docker", parse_pkgname(package_name))
    update_package_json(package_name=package_name, port=port)
    image_info = {
        "attrs":image.attrs,
        "id":image.id,
        "labels":image.lables,
        "short_id":image.short_id,
        "tags":image.tags
    }
    print(image_info)
    # rsp = client.containers.run(image="node:string-padleft")
    # print(rsp)
