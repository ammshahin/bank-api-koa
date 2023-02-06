### Tech Challange- Bank Api
### Author: Meherullah Shahin 

```
Runtime: NodeJs
Framework: KoaJs
DataBase: MongoDB
Deployment: Docker with github actions CI/CD
Additional Packages: 
    "node-cron" => to run schedular
    "uuid: => to generate walletId 
```

### Usage Guide:
```
    1. Pull the docker image using any terminal
        "docker pull ammshahin/bank-api" command
    2. Run a container with the image at any port
    3. For viewing source file go the directory and run `ls`
    4. Source code is also available at 
        [Github](https://github.com/ammshahin/bank-api-koa)
```

### Routes:
    1. Can add Wallet.
        `POST /wallet`
        payload: {
            "name":"",
            "currency":"" ,
            "initialBalance":
            }
        response: {
    "message": "{name}'s wallet created successfully",
    "data": {
                "id": "",
                "name": "",
                "currency": "",
                "balance": 
            }
        }
    2. Fetch All Wallets list.
        `GET /wallets
        payload: {}
        Response: [...]
    3. Fetch wallet by wallet id.
        `Get wallet/:walletid
        response:{
                "id": "",
                "name": "",
                "currency": "",
                "balance": ,
                "todayBalanceChange": 0,
                "createdAt": ""
            }
    4. Make Transaction from one wallet to another.
        `POST /fx`
        payload: {
                "to":"",
                "from":"",
                "amount": ,
                "currency":""
            }

"todayBalanceChange" resets every 00:00 time 

