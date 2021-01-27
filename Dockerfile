# FROM node:12.20.0
FROM nikolaik/python-nodejs:latest

# copy dependency files first so that install doesn't run on every code change
COPY /client/package.json /client/package.json 
COPY /client/yarn.lock /client/yarn.lock
WORKDIR /client
RUN yarn install 

# FROM python:3

WORKDIR /server
COPY /server/requirements.txt /server/requirements.txt
RUN pip install -r requirements.txt 

# FROM node:12.20.0
COPY /client/src /client/src 
COPY /client/public /client/public
COPY /client/tsconfig.json /client/tsconfig.json
WORKDIR /client/
RUN yarn build 

# FROM python:3 

COPY /server /server
WORKDIR /server
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0


EXPOSE 80
CMD ["python3", "app.py"]
