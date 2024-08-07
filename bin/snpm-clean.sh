WORKDIR=$(dirname "$(pwd)")'/server'
KEEP_PACKAGE="serialize-javascript"
npm list --prefix $WORKDIR --depth=0 --parseable | grep -oP "node_modules/\K.*" | while read -r line
do
    # echo $line
    if [[ $line != $KEEP_PACKAGE ]]; then
        npm uninstall $line --prefix $WORKDIR
    fi
done