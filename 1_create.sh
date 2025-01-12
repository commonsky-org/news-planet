export PROJECT_ID="cloud32x" # The name of the GCP project
export REGION="europe-west1"

BUCKET_NAME="news_t$(tr -dc A-Za-z0-9 </dev/urandom | head -c 8 ; echo '')"
export BUCKET_NAME=$(echo "$BUCKET_NAME" | tr '[:upper:]' '[:lower:]')



