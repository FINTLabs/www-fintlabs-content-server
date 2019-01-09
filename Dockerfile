FROM nginx
COPY content/ /usr/share/nginx/html/content/
COPY default.conf /etc/nginx/conf.d/default.conf