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
[![CodeFactor](https://www.codefactor.io/repository/github/creammilky/snpm/badge)](https://www.codefactor.io/repository/github/creammilky/snpm)

This is the repo of **SNPM** (Secure-NPM) - A Docker-based containerized Javascript Package manager. It can generate dockers with npm packages within it and allow use of them with the RPC approach we provided.
It provides a security approach via containerization to isolate e.g. File system, Process & sub-process, Memory space, and Execution of untrustworthy third-party `node.js` packages or scripts. 

\
**Set Environment Variable**
It is a MUST to add the environment variable to execute `snpm`
```shell
vim ~/.bashrc
# Adding SNPM_ROOT and NODE_PATH to your .bashrc
export SNPM_ROOT="your_current_snpm_path"
export NODE_PATH="$NODE_PATH:$SNPM_ROOT/sender"

# Save and execute this
source ~/.bashrc
```
If you have a problem accessing to the official source - `npmjs`, we strongly recommend you to use the npm mirror below:
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
\
**Usage:**\
\
To use our system of SNPM, despite the setup on your system, you will also need to follow a specific programming paradigm in your `JavaScript` file.
Here is an example to demonstrate, `srequire` stands for secure-require, basically same as `require` in usage:
```Javascript
// Notice: Wrap the function with async because you receive an HTTP response from the container behind.
async function test() {
    console.log('test');
    let srequire = require('srequire').srequire; // Notice: Always do this at first
    let PadPackage = await srequire('@zerodep/string-padleft'); // Notice: srequire your package, just as require
    // Then you may call functions as normal.
    let PadLeft = PadPackage.stringPadLeft;
    let res = await PadLeft('abc', 10); // Notice: MUST await for return or losing synchronous
    console.log(res);
    console.log("Done");
}
test();
```

Besides, other things you need to notice are:
1. No callback functions are allowed yet\*, the execution process of the code you use SNPM, srequire, etc. should ideally be linear.
2. You will always receive the RPC (in containers) result by `return`, so don't try other ways to make your code fancy. (It is JavaScript! A Script!)
3. Environment variable is very important to SNPM, you can run `cd $SNPM_ROOT` in the command line to check whether it is set correctly.

\*(maybe we will repair this defect later)
