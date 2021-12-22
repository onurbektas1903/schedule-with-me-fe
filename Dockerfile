FROM nginx
COPY ./dist/ /etc/nginx/html/
WORKDIR /etc/nginx
EXPOSE 80
EXPOSE 443
EXPOSE 9095
RUN nginx
