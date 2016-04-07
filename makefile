flfip=192.168.1.111
flfhost=root@$(flfip)
path=server/project/vue-cnode
coding=git@git.coding.net:vuecn/cnode.git

dist=./dist

ifeq ($(m),)
	m=update
endif

.PHONY : clean dev production bak deploy server


main: dev server

clean:
	rm -rf $(dist)/*

dev: clean
	NODE_ENV=development webpack

production: clean
	NODE_ENV=production webpack

server:
	node server.js

bak:
	git add -A &&\
	git commit -m '$(m)';\
	git push $(coding) master -f

deploy:
	tar -czvf static.zip index.html favicon.png $(dist)/*
	scp static.zip $(flfhost):$(path)
	-rm static.zip
	ssh -t $(flfhost) "cd $(path) && tar -xzvf static.zip && rm -f static.zip"

all: production bak deploy

