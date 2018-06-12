for ((n=1;n<$1;n++))
do
    curl -d "tag=Tag$n&jcr:title=tag$n&parentTagID=/etc/tags/mac/bpqatest/default&cmd=createTag" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:9090/bin/tagcommand -u admin:admin
done