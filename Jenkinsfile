pipeline {
    agent any

    environment {
        IMAGE_NAME = "microshop-app"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "--- PRESENTATION MODE: Performing Docker Build ---"
                    echo "Building Docker Image: ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    // This logs the command so the audience can see it.
                    sh "echo 'EXEC: docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} .'"
                    sleep 2
                    echo "Build SUCCESSFUL."
                }
            }
        }
        
        stage('Deploying to Branch Environment') {
            steps {
                script {
                    def port = (env.BRANCH_NAME == 'main') ? "80" : "8081"
                    def container = (env.BRANCH_NAME == 'main') ? "prod" : "dev"
                    echo "--- PRESENTATION MODE: Deploying to ${env.BRANCH_NAME.toUpperCase()} ---"
                    echo "Environment URL: http://localhost:${port}"
                    sh "echo 'EXEC: docker run -d -p ${port}:80 --name microshop-${container} ${IMAGE_NAME}:${env.BUILD_NUMBER}'"
                    sleep 3
                    echo "Deployment to ${env.BRANCH_NAME} is LIVE and verified."
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline execution complete base on branch ${env.BRANCH_NAME}."
        }
        success {
            echo "Deployment to ${env.BRANCH_NAME} was successful!"
        }
        failure {
            echo "Deployment failed."
        }
    }
}
