import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { GenesyscloudProvider } from './.gen/providers/genesyscloud/provider'
import { RoutingQueue } from './.gen/providers/genesyscloud/routing-queue'
import { TfExport } from './.gen/providers/genesyscloud/tf-export'

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new GenesyscloudProvider(this, "genesyscloudprovider", {
      awsRegion: 'XXXXX',
      oauthclientId: 'XXXXX',
      oauthclientSecret: 'XXXXXX'
    })
    new RoutingQueue(this, "q_Bulleye_Routing_Skill_Expression", {
      name: "q_Bulleye_Routing_Skill_Expression",
      description: "Example Queue build by CDK"
    })
    new TfExport(this, "myexport", {
      directory: "./genesyscloud/export",
      resourceTypes : ["genesyscloud_routing_queue"],
      includeStateFile: true,
      exportAsHcl: true
    })
  }
}

const app = new App();
new MyStack(app, "buildQueue");
app.synth();
