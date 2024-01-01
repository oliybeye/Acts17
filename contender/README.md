# Read Me
This project scrapes election data from public site usually from gov site. At the moment this project only scrapes WA's election data. 

### Building
To build the project simply run the following command. Make sure to have installed python3 and pip.

`
pip install -r requirements.txt
`

### Running

Prior to running the python election scrapper. Run selenium chrome driver in a container using docker.

`
docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-chrome:latest
`

to view inside selenium container 
http://localhost:7900/?autoconnect=1&resize=scale&password=secret

To run the code simply run the following the code

`python3 main.py`

