import os
import tarfile

def read_template(filename):
    with open(filename, 'r') as file:
        return file.read()
    
def file_check(file_path):
    # check if file exist
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File {file_path} not found.")
    else:
        print(f"{file_path} exist.")

def generate_startup(template_content, package_name, port):
    dockerfile_content = template_content.format(package_name=package_name, port=port)
    with open('../', 'w') as file:
        file.write(dockerfile_content)
    print("Dockerfile has been generated successfully.")
    return file

def create_tarfile(output_filename, source_dir):
    with tarfile.open(output_filename, "w") as tar:
        tar.add(source_dir, arcname='.')

def list_tarfile(tar_filename):
    with tarfile.open(tar_filename, 'r') as tar:
        member_names = tar.getnames()
        for member_name in member_names:
            print(member_name)

def tar_server(port):
    file_check("../server/app.js")
    file_check("../server/start-up.sh.template")
    template_content = read_template("../server/start-up.sh.template")
    startup_content = template_content.format(port=port)

    with open('../server/start-up.sh', 'w') as file:
        file.write(startup_content)
    create_tarfile("../server/http_server.tar", "../server")
    list_tarfile("../server/http_server.tar")
    print("server has been tar successfully.")
