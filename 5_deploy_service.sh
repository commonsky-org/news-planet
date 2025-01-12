
SERVICE_URL=$(gcloud run services describe newsservice --project $PROJECT_ID --region $REGION --platform=managed --format=yaml | grep -m 1 url | awk '{print $NF}')

# Delete job if it already exists
gcloud scheduler jobs delete news_update_job --location=$REGION

# Deploy update scheduler
gcloud scheduler jobs create http news_update_job \
--project $PROJECT_ID \
--http-method=GET \
--uri=$SERVICE_URL \
--location=$REGION \
--schedule="0 */6 * * *" \
--uri="$SERVICE_URL/news?gcswrite=true&outputwrite=false" \
--time-zone="Europe/Amsterdam" \
--oidc-service-account-email="newsservice@$PROJECT_ID.iam.gserviceaccount.com" \
--oidc-token-audience="$SERVICE_URL"