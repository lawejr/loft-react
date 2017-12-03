set -e
zip -r build.zip build

OUT=$( curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_KEY" \
     --data-binary "@build.zip" \
     -qSfsw '\n%{http_code}' \
     https://api.netlify.com/api/v1/sites/pensive-murdock-a8bf74.netlify.com/deploys ) 2>/dev/null

# get exit code
RET=$?

if [[ $RET -ne 0 ]] ; then
    # if error exit code, print exit code
    echo "Error $RET"

    # print HTTP error
    echo "Deploy Error"
    echo "HTTP Error: $(echo "$OUT" | tail -n1 )"
else
    # otherwise print last line of output, i.e. HTTP status code
    echo "Success, HTTP status is:"
    echo "$OUT" | tail -n1

    # and print all but the last line, i.e. the regular response
    echo "Response is:"
    echo "$OUT" | head -n-1
    echo deployed on https://pensive-murdock-a8bf74.netlify.com/
fi