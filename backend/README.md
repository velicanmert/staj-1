# HOW TO RUN

docker-compose up -d

Run Spring boot application

# HOW TO TEST


```shell
curl --location --request POST 'localhost:8080/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{"username":"tan.apaydin","password":"tan"}'
```

replace tokens below
```shell
curl --location --request GET 'localhost:8080/api/users' \
--header 'authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW4uYXBheWRpbiIsImV4cCI6MTYyMzAxMzM1OSwiaWF0IjoxNjIzMDA5NzU5fQ.QOo3QAo2GPXEUabMSuSLN9LdrfphGrcV7RlBN7Qnz3ptbi5ettSLeetDheFB4k1uVP2n5J7_EaD3DpkbLeqE5A' \
--data-raw ''

curl --location --request GET 'localhost:8080/api/admins' \
--header 'authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0YW4uYXBheWRpbiIsImV4cCI6MTYyMzAxMzM1OSwiaWF0IjoxNjIzMDA5NzU5fQ.QOo3QAo2GPXEUabMSuSLN9LdrfphGrcV7RlBN7Qnz3ptbi5ettSLeetDheFB4k1uVP2n5J7_EaD3DpkbLeqE5A' \
--data-raw ''
```