pipeline {
    agent {
        docker {
            image 'prod-artifactory.lmi.tools/docker-release/dt/jenkins/webbuilder/chrome-npm:18-6.1.0'
            label 'ec2-fleet'
        }
    }
    options {
        ansiColor('xterm')
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds(abortPrevious: true)
        buildDiscarder(logRotator(numToKeepStr: '15', artifactNumToKeepStr: '15'))
    }
    environment {
        BRANCH_NAME = "${env.BRANCH_NAME}"
    }
    stages {
        stage('Install dependencies') {
            steps {
                echo 'Install dependencies'
                sh 'pnpm i --frozen-lockfile'
                sh 'pnpm run install-playwright'
            }
        }
        stage('Execute e2e tests') {
            steps {
                echo 'Retrieve credentials'
                script {
                    // Define Credentials to be Retrieved
                    def secrets = [
                        [path: 'services/jenkins/rescue-msteams-integration/e2e-test-credentials', secretValues: [
                            [vaultKey: 'EMAIL_ADELE'],
                            [vaultKey: 'EMAIL_LIDIA'],
                            [vaultKey: 'EMAIL_PATTI'],
                            [vaultKey: 'PASSWORD'],
                            [vaultKey: 'EMAIL_RESCUE_ADMIN'],
                            [vaultKey: 'PASSWORD_RESCUE_ADMIN'],
                            [vaultKey: 'MASTER_SSO_PASSWORD'],
                            [vaultKey: 'EMAIL_RESCUE_TECHNICIAN'],
                            [vaultKey: 'PASSWORD_RESCUE_TECHNICIAN']
                        ]]
                    ]

                    // inside this block credentials are available as env variables
                    // the credential value will be masked with **** in Jenkins Logs
                    withVault([vaultSecrets: secrets]) {
                        echo 'Execute e2e tests'
                        lock('playwright-e2e-tests') {
                            if (params.TEST_ENV == "LIVE") {
                                sh 'pnpm run e2e-prod'
                            } else {
                                sh 'pnpm run e2e-dev'
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            publishHTML(
                target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    reportTitles: 'Playwright HTML Report'
                ]
            )
        }
    }
}