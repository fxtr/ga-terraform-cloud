# ga-terraform-cloud 

> An action to run Terraform Cloud workspaces

Fork of https://github.com/addresscloud/terraform-cloud-action

This Action was based on the example Terraform Enterprise script at: 
https://github.com/hashicorp/terraform-guides/tree/master/operations/automation-script

This action submits a run to a Terraform Cloud workspace which performs a plan and apply. 
Once the run is successfully submitted the action returns a success, leaving the plan and apply 
to continue to run in Terraform Cloud.

## Usage

Terraform Cloud requires a .tar.gz archive containing the Terraform configuration, and build 
artifacts if required. The example shows a GitHub workflow archiving Lambda functions (in the 
`build` directory) alongside a Terraform configuration (in the `infrastructure` directory) for 
deployment. The archive is then passed to the action for deployment by Terraform Cloud.

```yml
- name: Create tar gz file
  run: tar --exclude *.terraform* -zcvf build.tar.gz build infrastructure

- name: Terraform Cloud
  uses: addresscloud/terraform-cloud-action@v1.0.0
  with:
    tfToken: ${{ secrets.TERRAFORM_TOKEN }}
    tfOrg: '<ORGANISATION>'
    tfWorkspace: 'my-lambda-service'
    filePath: './build.tar.gz'
    identifier: ${{ github.sha }}
```

![Example workflow](example.png)

### Inputs

The inputs below are required by the action to submit the run to Terraform Cloud. 
Additional workspace variables and settings should be configured using the Terraform Cloud UI. 

#### `tfToken`
 
**Required** - Terraform Cloud access token.

#### `tfOrganization`

**Required** - Terraform Cloud organization.

#### `tfWorkspace`

**Required** - Name of existing Terraform Cloud workspace.

#### `filePath`

**Required** - Path to .tar.gz archive with Terraform configuration.

#### `identifier`

**Required** - Unique identifier for the run (e.g. git commit sha). Reduced to 7 characters for brevity.

### Outputs

#### `runId` 

The identifier of the run in Terraform Cloud.

### Notes

If your repository contains multiple modules, upload the top-level directory and configure the 
root workspace path in the Terraform Cloud UI. For example, to deploy 
`infrastructure/dev/services/lambda/main.tf` which has references to modules in 
`infrastructure/modules/services/lambda/module.tf` upload the entire `infrastructure` directory 
and configure `infrastructure/dev/services/lambda/` as the root of the workspace in the Terraform Cloud UI.


