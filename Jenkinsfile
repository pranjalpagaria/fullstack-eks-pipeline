pipeline {
    agent any

    environment {
        FRONTEND_REPO  = 'my-frontend'
        BACKEND_REPO   = 'my-backend'
        IMAGE_TAG      = "${BUILD_NUMBER}"

        FRONTEND_URI   = "local/${FRONTEND_REPO}:${IMAGE_TAG}"
        BACKEND_URI    = "local/${BACKEND_REPO}:${IMAGE_TAG}"

        SONAR_SCANNER  = 'SonarQubeScanner'
    }

    stages {

        stage('Checkout code base') {
            steps {
                git branch: 'main', url: 'https://github.com/pranjalpagaria/fullstack-eks-pipeline.git'
            }
        }

        stage('Parallel Pre Build Scans') {

            parallel {

                stage('Sonar Static Analysis') {
                    steps {

                        withSonarQubeEnv('SonarQube-Server') {

                            sh """
                            ${tool env.SONAR_SCANNER}/bin/sonar-scanner \
                            -Dsonar.projectKey=nodejs-fullstack-app \
                            -Dsonar.sources=backend \
                            -Dsonar.exclusions=**/node_modules/**,**/build/**,**/dist/**
                            """
                        }
                    }
                }

                stage('Trivy FileSystem Verification') {
                    steps {

                        sh """
                        docker run --rm \
                        --network tool-setup_devops-network  \
                        -v \$(pwd):/app \
                        aquasec/trivy:latest fs \
                        --server http://trivy-scanner:4954 \
                        --exit-code 0 \
                        /app
                        """
                    }
                }
            }
        }
    }
}
