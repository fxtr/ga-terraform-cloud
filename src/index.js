import * as core from '@actions/core'
import Terraform from './terraform'

export default async function main() {
  try {
    const token = core.getInput('tfToken');
    const org = core.getInput('tfOrg');
    const workspace = core.getInput('tfWorkspace');
    const filePath = core.getInput('filePath');
    const identifier = core.getInput('identifier');

    const tf = new Terraform(token, org);
    const id = await tf.run(workspace, filePath, identifier.slice(0, 7));
    console.log(`Workspace run submitted succesfully: https://app.terraform.io/app/${org}/workspaces/${workspace}/runs/${id}`);
    core.setOutput("runId", id);
  } catch (error) {
    core.error(`Error ${error}, action may still succeed though`)
    core.setFailed(error.message);
  }
}

main();
