FROM node:12.20.0

RUN apt-get update -y && \ 
    apt-get install python3-pip -y 

WORKDIR /client 
COPY . /client
RUN yarn 
RUN yarn build 

WORKDIR /server 
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt 

EXPOSE 5000

COPY . /server

CMD ["python3", "app.py"]
