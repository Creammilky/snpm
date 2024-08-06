FROM node:20.16.0-alpine3.19

RUN mkdir /etc/http_server.d 

WORKDIR /etc/http_server.d 

# # RUN apk update 
# # RUN apk add --no-cache python3 py3-pip 

# # Install essential packages for RPC
# RUN npm install serialize-javascript 

# # user package
# RUN npm install @zerodep/string-padleft

# RUN rm -rf /var/cache/apk/*

ADD ./http_server.tar /etc/http_server.d

EXPOSE 17052

RUN chmod +x start-up.sh
# Our server startup shell script
CMD [ "./start-up.sh" ]
