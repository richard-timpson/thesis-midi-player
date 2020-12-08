FROM node:12.20.0

COPY /client /client 
WORKDIR /client 
RUN ls
RUN yarn 
RUN yarn build 

FROM python:3

COPY /server /server

WORKDIR /server
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN pip install -r requirements.txt 

COPY --from=0 /client/build /client/build

EXPOSE 80
CMD ["python3", "app.py"]
