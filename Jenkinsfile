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
                    echo "Building Docker Image for branch: ${env.BRANCH_NAME}"
                    // Note: If running on Jenkins Windows without bash, use 'bat' instead of 'sh'
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                }
            }
        }
        
        stage('Deploy to DEV') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    echo "Deploying to DEV Environment..."
                    // Stop/Remove existing container
                    sh 'docker rm -f microshop-dev || true'
                    // Deploy to DEV port (e.g., 8080)
                    sh "docker run -d -p 8081:80 --name microshop-dev ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "Deploying to Production Environment..."
                    // Stop/Remove existing container
                    sh 'docker rm -f microshop-prod || true'
                    // Deploy to Production port (e.g., 80)
                    sh "docker run -d -p 80:80 --name microshop-prod ${IMAGE_NAME}:${env.BUILD_NUMBER}"
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
