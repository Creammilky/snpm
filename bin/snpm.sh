#!/usr/bin/env bash

WORKDIR=$(pwd)
BIN_DIR="$WORKDIR/bin"
SCRIPT_DIR="$WORKDIR/script"

# 确保 create_docker.py 具有执行权限
chmod +x "$SCRIPT_DIR/create_docker.py"

# 定义函数以处理安装操作
install_package() {
    echo "Installing package: $1" # 使用函数参数来接收包名
    # 这里添加安装包的命令
    $BIN_DIR/snpm-install.sh $1
}

# 定义函数以处理移除操作
remove_package() {
    echo "Removing package: $1" # 使用函数参数来接收包名
    # 这里添加移除包的命令
    $BIN_DIR/snpm-remove.sh $1
}

# 检查是否有足够的参数
if [ $# -lt 2 ]; then
    echo "Usage: snpm [-i | --install] [--remove] <package_name>"
    exit 1
fi

# 解析命令行参数
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -i|--install)
            action="install"
            shift # 移动到下一个参数
            ;;
        --remove)
            action="remove"
            shift # 移动到下一个参数
            ;;
        --help)
            action="help"
            shift
            ;;
        *)  # 默认情况，假设是包名
            package_name=$1
            break # 跳出循环
            ;;
    esac
done

# 执行相应的操作
if [ "$action" = "install" ]; then
    install_package "$package_name"
elif [ "$action" = "remove" ]; then
    remove_package "$package_name"
elif [ "$action" = "help" ]; then
    echo "Usage: snpm [-i | --install] [--remove] <package_name>"
else
    echo "Invalid action or no action specified."
    exit 1
fi