# WORKDIR? 
# WORKDIR/server -> npm install package
WORKDIR="$SNPM_ROOT/server"
SCRIPT_DIR="$SNPM_ROOT/script"
echo $SNPM_ROOT
npm install $1 --prefix $WORKDIR

echo npm installed $1

"$SCRIPT_DIR/create_docker.py" $1
