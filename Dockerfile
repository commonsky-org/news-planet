FROM python:3.11

# Create app directory
WORKDIR /app

# Install app dependencies
COPY src/requirements.txt ./

RUN pip3 install -r requirements.txt

# Bundle app source
COPY src /app

# COPY . .
RUN ls -la /*

EXPOSE 8080
CMD [ "python3", "server.py" ]