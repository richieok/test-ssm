import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";


async function accessParameter(){
    try {
        const client = new SSMClient({ region: "us-east-1" });
        const input = {
            Name: "/tmdb/api_key",
        }
        const command = new GetParameterCommand(input);
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.log(err.message);
    }
}

accessParameter()
