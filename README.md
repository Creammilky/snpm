<!--
 * @Author: Carl Tan
 * @Date: 2024-08-04 19:33:10
 * @LastEditors: Carl Tan
 * @LastEditTime: 2024-08-04 19:33:26
-->
# SNPM: Secure-NPM

[![Pre-release](https://img.shields.io/badge/Version-Pre--release-FFCCCF)](#) 
[![Docker](https://img.shields.io/badge/Docker-2496ED.svg)](https://www.docker.com/) 
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

This is the repo of **SNPM** (Secure-NPM) - A Docker-based containerlized Javascript Package manager. It can generate dockers with npm packages within it and allow use them with the RPC approach we provided.

\
**Set Environment Variable**
It is a MUST to add the enviroment variable to execute `snpm`
```shell
vim ~/.bashrc
# Adding SNPM_ROOT to your .bashrc
export SNPM_ROOT="your_current_snpm_path"

# Save and execute this
source ~/.bashrc
```
If you have problem to access to official source - npmjs, we strongly recommend you to use the npm mirror below:
```shell
npm config set registry https://registry.npmmirror.com
```
\
**Install and Bulid:**
```shell
chmod +x install.sh

sudo ./install.sh
```
\
**Commands:**
```shell
snpm [-i | --install] [--remove] <package_name>
```