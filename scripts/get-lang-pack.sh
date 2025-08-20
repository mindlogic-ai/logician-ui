#!/bin/bash

# Variables
BUCKET_NAME="mindlogic-language-pack/logician_ui"
LOCAL_DOWNLOAD_DIR="./src/translations"

# Ensure the AWS CLI is installed
if ! command -v aws &> /dev/null
then
    echo "AWS CLI could not be found. Please install AWS CLI and try again."
    exit 1
fi

mkdir -p $LOCAL_DOWNLOAD_DIR

# List all files in the S3 bucket
echo "Listing files in S3 bucket: $BUCKET_NAME"
aws s3 ls s3://$BUCKET_NAME/ --recursive

# Download all files from the S3 bucket to the local directory
echo "Downloading files from S3 bucket: $BUCKET_NAME to $LOCAL_DOWNLOAD_DIR"
aws s3 sync s3://$BUCKET_NAME/ $LOCAL_DOWNLOAD_DIR

echo "Download complete. Files are saved in $LOCAL_DOWNLOAD_DIR."
