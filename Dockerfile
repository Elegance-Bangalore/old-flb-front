# Use an official Nginx base image
FROM nginx:alpine

COPY dockernginx.conf /etc/nginx/conf.d/
COPY ./dist/ /usr/share/nginx/html/


EXPOSE 80


