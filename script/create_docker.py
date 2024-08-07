#!/usr/bin/env python3
import gen_dockerfile
import tar_server
import docker
import random
import json
import sys
import os

cwd = os.getenv('SNPM_ROOT', '/usr/local/snpm')
print("tar_server.py -> cwd:", cwd)

client = docker.from_env()

def check_image_exist(package_name):
    images = client.images.list()
    counter = 0
    for image in images:
        img_name = str(image)
        if img_name.find(package_name):
            counter = counter + 1
    if counter != 0:
        package_name = package_name + str(counter)
    return package_name

def create_docker_image(path, package_name):
    try: 
        package_name = check_image_exist(package_name=package_name)
        image_log = client.images.build(path=path, tag=str("node:" + package_name))
    except docker.errors.BuildError as e:
        raise Exception(f"BulidError: {e}")
    except docker.errors.APIError as e:
        raise Exception(f"APIError: {e}")
    except TypeError as e:
        raise Exception(f"TypeError: {e}")
    return image_log[0], "node-" + package_name


def file_check(file_path):
    # check if file exist
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File {file_path} not found.")
    else:
        print(f"{file_path} exist.")
    

def update_package_json(package_name, port, file_path=os.path.join(cwd, 'server'), filename='package-snpm.json'):
    file_path = os.path.join(file_path, filename)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
    else:
        data = {}

    if package_name not in data:
        data[package_name] = 0

    data[package_name] = port
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)


def parse_pkgname(package_name: str):
    if package_name.find('/'):
        return package_name.lstrip('@').split('/')[-1]
    return package_name


if __name__ == "__main__":
    port = random.randint(10011, 65534)

    if len(sys.argv) != 2:
        print("Received arguments:", sys.argv)
        print("Usage: snpm package_name")
        sys.exit(1)

    package_name = sys.argv[1]

    dockerfile_obj = gen_dockerfile.generate(package_name=package_name, port=port)

    tar_server.tar_server(port=port)

    file_check(os.path.join(cwd ,"docker/http_server.tar"))
    file_check(os.path.join(cwd ,"docker/Dockerfile"))
    
    port_bindings = {
        f'{port}/tcp': port
    }
    image_pgkname = create_docker_image(os.path.join(cwd ,"docker"), parse_pkgname(package_name))
    image = image_pgkname[0]
    pgkname = image_pgkname[1]
    
    # Todo: create package-snpm.json to sender cwd
    update_package_json(package_name=package_name, port=port, file_path=os.path.join(cwd, 'sender'))

    rsp = client.containers.run(
        image=image,
        detach=True,
        name = pgkname,
        ports=port_bindings
    )
    print(rsp)
