#!/usr/bin/python3
import sys
import os

os.makedirs('../docker', exist_ok=True)

def read_template(filename):
    with open(filename, 'r') as file:
        return file.read()

def generate_dockerfile(template_content, package_name, port):
    dockerfile_content = template_content.format(package_name=package_name, port=port)
    with open('../docker/Dockerfile', 'w') as file:
        file.write(dockerfile_content)
    print("Dockerfile has been generated successfully.")
    return file

def generate(package_name, port):
    template_content = read_template('../docker/DOCKERFILE.template')
    return generate_dockerfile(template_content, package_name, port)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_dockerfile.py <package_name> <port>")
        sys.exit(1)
    package_name, port = sys.argv[1], sys.argv[2]
    template_content = read_template('../docker/DOCKERFILE.template')
    generate_dockerfile(template_content, package_name, port)