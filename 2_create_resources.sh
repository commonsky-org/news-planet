echo "First let's enable all APIs needed for this solution."
gcloud services enable storage.googleapis.com
gcloud services enable cloudscheduler.googleapis.com
gcloud services enable run.googleapis.com

gcloud config set project $PROJECT_ID

echo "Now let's create a service account to access the resources with"
gcloud iam service-accounts create newsservice \
    --description="Service account to manage news resources" \
    --display-name="NewsService"

echo "Now let's give the account the right role access to the project $PROJECT_ID"
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:newsservice@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:newsservice@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:newsservice@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

echo "Creating storage bucket..."
gcloud alpha storage buckets create gs://$BUCKET_NAME --location $REGION

echo "Now setting the visability to public..."
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME
gsutil cors set ./data/cors_config.json gs://$BUCKET_NAME
