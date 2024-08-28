import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { GenesyscloudProvider } from './.gen/providers/genesyscloud/provider'
import { RoutingQueue } from './.gen/providers/genesyscloud/routing-queue'

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new GenesyscloudProvider(this, "genesyscloudprovider", {
      awsRegion: 'us-east-1',
      oauthclientId: 'eee840f2-3062-4b53-b1df-99869fd30ba8',
      oauthclientSecret: 'm_Z_BqhIYHCUhJ4vldsiAgbUZXVJz91ejLXLPB3K_Qk'
    })
    new RoutingQueue(this, "mySimpleCDKQueue", {
      name: "MySimpleCDKQueue",
      description: "Example Queue build by CDK"
      
    })
  }
}

const app = new App();
new MyStack(app, "buildQueue");
app.synth();
