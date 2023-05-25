#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if a filename was provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <filename>"
  exit 1
fi

# Create the output file in the script directory
OUTPUT_FILE="$SCRIPT_DIR/testable_dockerfile"
touch "$OUTPUT_FILE"
from_count=0

# Read the file line by line
while read line; do
  
  if [[ $line == *"FROM"* ]]; then
    from_count=$((from_count+1))
  fi
  # If we've encountered "FROM" twice, break the loop
  if [ $from_count -eq 2 ]; then
    break
  fi

  # Otherwise, copy the line to the output file
  echo "$line" >> "$OUTPUT_FILE"

done < "$1"

echo "Output file created: $OUTPUT_FILE"
