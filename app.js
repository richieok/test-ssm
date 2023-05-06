import { SSMClient, AddTagsToResourceCommand } from "@aws-sdk/client-ssm";

const client = new SSMClient({ region: "us-east-1" });
