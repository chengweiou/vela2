yarn build:aws

scp -i ~/Documents/aws/spacetimepainting/idrsa.pem -r dist root@127.0.0.1:/root/proj/contentcensor/pisces/
scp -i ~/Documents/aws/spacetimepainting/idrsa.pem nginx.conf root@127.0.0.1:/root/proj/contentcensor/pisces/default.conf

ssh -i ~/Documents/aws/spacetimepainting/idrsa.pem root@127.0.0.1 << remotessh
docker stop contentcensor-pisces
docker run --rm -it -d --name contentcensor-pisces -p 61002:80 --network net -v /root/proj/contentcensor/pisces/dist/:/usr/share/nginx/html/ -v /root/proj/contentcensor/pisces/default.conf:/etc/nginx/conf.d/default.conf nginx
exit
remotessh