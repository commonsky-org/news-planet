#!/usr/bin/python

import sys, getopt, json

def main(argv):
  project = ""
  target = ""
  
  try:
    opts, args = getopt.getopt(argv,"p:t:",["project=", "target="])
  except getopt.GetoptError:
    print('command.py -p PROJECT')
    sys.exit(2)
    
  for opt, arg in opts:
    if opt == '-h':
      print('command.py -p PROJECT -t TARGET')
      sys.exit()
    elif opt in ("-p", "--project"):
      project = arg
    elif opt in ("-t", "--target"):
      target = arg
  
  print('Project is ', project)
  print('Target is ', target)
  
  if project != "":
    f = open('.firebaserc', "w")

    data = {
      "projects": {
        "default": project
      }
    }

    f.write(json.dumps(data, sort_keys=False, indent=2))
    f.close()
    
  if target != "":
    f = open('firebase.json', "w")

    data = {
      "hosting": {
        "target": target,
        "public": "dist",
        "ignore": [
          "firebase.json",
          "**/.*",
          "**/node_modules/**"
        ],
        "rewrites": [
          {
            "source": "**",
            "destination": "/index.html"
          }
        ]
      }
    }

    f.write(json.dumps(data, sort_keys=False, indent=2))
    f.close()

if __name__ == "__main__":
   main(sys.argv[1:])