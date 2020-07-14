yarn build:uat
rm -rf ~/Desktop/docker/spacetimepainting/contentcensor/pisces/dist
cp -r dist ~/Desktop/docker/spacetimepainting/contentcensor/pisces/
cp nginx.conf ~/Desktop/docker/spacetimepainting/contentcensor/pisces/default.conf
cd ~/Desktop/docker/spacetimepainting/contentcensor/pisces
docker stop contentcensor-pisces
docker run --rm -it -d --name contentcensor-pisces -p 61002:80 --network net -v ~/Desktop/docker/spacetimepainting/contentcensor/pisces/dist/:/usr/share/nginx/html/ -v ~/Desktop/docker/spacetimepainting/contentcensor/pisces/default.conf:/etc/nginx/conf.d/default.conf nginx