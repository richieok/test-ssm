import { SSMClient, GetParametersCommand, GetParameterCommand } from "@aws-sdk/client-ssm";
import * as dotenv from "dotenv";
dotenv.config();

let username
let password

try{
    if (process.env.SERVER) {
        username = process.env.MONGO_USER
        password = process.env.MONGO_PASSWORD
    } else {
        username = accessParameter("/qubit-app/mongodb/username")
        password = accessParameter("/qubit-app/mongodb/password")
    }
} catch (err) {
    console.log(err.message);
} finally {
    if (username && password) {
        console.log(`username:  ${username}. password: ${password}`);
    }
    else{
        console.log('Got nothing');
    }
}


async function accessParameters() {
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

async function accessParameter(paraName) {
    const client = new SSMClient({ region: "us-east-1" });
    const input = {
        Name: paraName,
        WithDecryption: true
    }
    const command = new GetParameterCommand(input);
    const response = await client.send(command);
    return response.Parameter.Value
}

// accessParameters()
