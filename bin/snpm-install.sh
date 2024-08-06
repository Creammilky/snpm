# WORKDIR? 
# WORKDIR/server -> npm install package
WORKDIR=$(dirname "$(pwd)")'/server'
npm install $1 --prefix $WORKDIR