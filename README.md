[![Twitter][1.1]][1] [![GitHub][2.1]][2] [![LinkedIn][3.1]][3] [![Ready, Set, Cloud!][4.1]][4]
# CI/CD Changelog Proof of Concept #
## Description ##
With CI/CD, it can be tricky to get release notes out at the same cadence as development. But why not automate your release notes with your issue tracking system? This is a proof of concept designed to show an integration with Atlassian JIRA via webhooks to a serverless changelog record system.

## AWS Resources ##
The CloudFormation template located in the **back-end** folder will deploy the follow resources into your AWS account

* **1 x Public API** (API Gateway)
* **1 x NoSQL Table** (DynamoDB)
* **2 x Roles with Policies** (IAM)

## Architecture Diagram ##
![AWS Architecture Diagram](https://readysetcloud.s3.amazonaws.com/changelog-architecture-diagram.png)

### Business Event Flow ###
1. Dev team moves Jira issue to **Done** status. Jira publishes a webhook containing details about the closed issue.
2. **AWS API Gateway** proxies directly to **DynamoDB** to store the details.
3. End user loads the changelog page. The page makes a request to load recent changelog details.
4. **AWS API Gateway** proxies directly to **DynamoDB** to load the details from the database and return them in the response.

## Prerequisites ##
In order to properly run and deploy this app, you must perform the following
1. [Setup an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
2. [Install NodeJS](https://nodejs.org/en/download/)
3. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
4. [Configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to use your account
5. [Install Git](https://git-scm.com/downloads)
6. [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
7. [Install the Angular CLI](https://cli.angular.io/)

## Setup ##
1. Clone the repository to your local machine
2. Navigate to the **back-end** folder
3. In **package.json**, change **REPLACEME** with the name of an S3 bucket to create in your account.
  a. S3 bucket names in AWS have to be globally unique, so be sure to use something nobody has used before
4. Run `npm run provision-bucket` in a terminal to create the S3 bucket in your AWS account
5. In **template.yaml**, change the S3BucketName Default **REPLACEME** with the name of your bucket
6. Deploy the resources into your AWS account by running `npm run deploy` in a terminal in the root of the backend folder
7. When deployment is complete, copy the value of the `APIEndpoint` output
8. Navigate to **./front-ent/environments/environment.ts**
9. Replace the **Replace_Me_With_APIEndpoint_Output** text with the value you copied in step 7
10. You are all set! The backend is deployed in AWS, and you can run the frontend locally.

## Endpoints ##
The backend will create two endpoints for your API:

* POST - /details - *This will add new changelog details into the system. The request schema for the body is below*
```
{
  "key": "<Jira Issue Key>",
  "type": "<Jira Issue Type>",
  "description": "<Text to display in the changelog>"
}
```

* GET - /details - *Retrieves all changelog details from the system. Defaults to 200 results. If you want to see more/less, you can add a `responseLimit` query string parameter*

## Walkthrough ##
For a detailed walkthough on how to configure this in JIRA, please visit [the article on my blog](https://readysetcloud.io).


[1.1]: http://i.imgur.com/tXSoThF.png
[2.1]: http://i.imgur.com/0o48UoR.png
[3.1]: http://i.imgur.com/lGwB1Hk.png
[4.1]: https://readysetcloud.s3.amazonaws.com/logo.png

[1]: http://www.twitter.com/allenheltondev
[2]: http://www.github.com/allenheltondev
[3]: https://www.linkedin.com/in/allen-helton-85aa9650/
[4]: https://readysetcloud.io
