echo "Replace variables in the client code..."
sed -i "/      const geojsonUrl = /c\      const geojsonUrl = \"https://storage.googleapis.com/$BUCKET_NAME/news/current-geo.json\";" ./public/index.html

echo "Now we're going to login to Firebase, please follow the instructions to login..."
firebase login --no-localhost

echo "Now deploying client to firebase..."
firebase projects:addfirebase $PROJECT_ID

#firebase init hosting
FIREBASE_NAME=${BUCKET_NAME//_/-}
echo "Firebase name set to $FIREBASE_NAME"
python3 set_firebase_config.py -p $PROJECT_ID
python3 set_firebase_config.py -t $FIREBASE_NAME
firebase use $PROJECT_ID

firebase hosting:sites:create $FIREBASE_NAME
firebase target:apply hosting $FIREBASE_NAME $FIREBASE_NAME

firebase deploy --only hosting:$FIREBASE_NAME
