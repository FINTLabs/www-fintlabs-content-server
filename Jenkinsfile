pipeline {
    agent { label 'docker' }
    stages {
        stage('Build') {
            steps {
                sh "docker build --tag ${GIT_COMMIT} ."
            }
        }
        stage('Publish') {
            when { branch 'master' }
            steps {
                withDockerRegistry([credentialsId: 'fintlabs.azurecr.io', url: 'https://fintlabs.azurecr.io']) {
                    sh "docker tag ${GIT_COMMIT} fintlabs.azurecr.io/www-fintlabs-content-server:build.${BUILD_NUMBER}"
                    sh "docker push fintlabs.azurecr.io/www-fintlabs-content-server:build.${BUILD_NUMBER}"
                }
            }
        }
        stage('Publish PR') {
            when { changeRequest() }
            steps {
                withDockerRegistry([credentialsId: 'fintlabs.azurecr.io', url: 'https://fintlabs.azurecr.io']) {
                    sh "docker tag ${GIT_COMMIT} fintlabs.azurecr.io/www-fintlabs-content-server:${BRANCH_NAME}.${BUILD_NUMBER}"
                    sh "docker push fintlabs.azurecr.io/www-fintlabs-content-server:${BRANCH_NAME}.${BUILD_NUMBER}"
                }
            }
        }
        stage('Publish Version') {
            when {
                tag pattern: "v\\d+\\.\\d+\\.\\d+(-\\w+-\\d+)?", comparator: "REGEXP"
            }
            steps {
                script {
                    VERSION = TAG_NAME[1..-1]
                }
                sh "docker tag ${GIT_COMMIT} fintlabs.azurecr.io/www-fintlabs-content-server:${VERSION}"
                withDockerRegistry([credentialsId: 'fintlabs.azurecr.io', url: 'https://fintlabs.azurecr.io']) {
                    sh "docker push fintlabs.azurecr.io/www-fintlabs-content-server:${VERSION}"
                }
            }
        }
    }
}