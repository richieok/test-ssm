import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";
import * as dotenv from "dotenv";
dotenv.config();

let username
let password

if (process.env.SERVER==='local'){
    username = process.env.MONGO_USER
    password = process.env.MONGO_PASSWORD
    console.log(`username:  ${username}. password: ${password}`);
} else {
    accessParameters()
}

async function accessParameters(){
    try {
        const client = new SSMClient({ region: "us-east-1" });
        const input = {
            Names: ["/qubit-app/mongodb/username", "/qubit-app/mongodb/password"],
            WithDecryption: true
        }
        const command = new GetParametersCommand(input);
        const response = await client.send(command);
        console.log(response.Parameters);
    } catch (err) {
        console.log(err.message);
    }
}

// accessParameters()
