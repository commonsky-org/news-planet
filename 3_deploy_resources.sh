export NAME=newsservice

# Deploy image to Cloud Run with the correct service account
SECONDS=0
gcloud run deploy $NAME --source . \
    --platform managed --project $PROJECT_ID \
    --region $REGION --allow-unauthenticated \
    --service-account="$NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --set-env-vars BUCKET_NAME="$BUCKET_NAME",SERVICE_ACCOUNT="$NAME@$PROJECT_ID.iam.gserviceaccount.com",LOCATION="$REGION"
duration=$SECONDS
echo "Deployment finished in $((duration / 60)) minutes and $((duration % 60)) seconds."
    