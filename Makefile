SHELL 				:= /bin/bash
BIN					:= ./bin
NM_BIN		     	:= ./node_modules/.bin
MOCHA		     	:= multi='spec=- html-cov=coverage.html' ${NM_BIN}/mocha
LINTER		     	:= eslint
MOCHA_OPTS	     	:= --recursive --colors -r blanket --reporter mocha-multi

start:
	node ./mercury.js

install:
	npm prune
	npm install
	npm upgrade

test: lint
	@ NODE_ENV=test\
		${MOCHA} ${MOCHA_OPTS}\
		${MOCHA_ARGS} ./tests/

test-coverage: lint
	@ NODE_ENV=test COVERAGE=y\
		${MOCHA} ${MOCHA_OPTS}\
		${MOCHA_ARGS} ./tests/

lint: noTodosOrFixmes
	@ ${LINTER} ./mercury.js ./tests/\
				./lib/ ./db/
noTodosOrFixmes:
	-@ git grep -n 'TODO\|FIXME' --\
		`git ls-files | grep -v '^Makefile\|^public/'`\
		> .todos
	@ [ ! "$$(cat .todos)" ]\
		|| [ "$${SKIPTODOS=n}" != "n" ]\
		|| (echo "$$(cat .todos)"\
			&& echo "Use 'SKIPTODOS= make ...' to skip this check"\
			&& exit 1)

clean:
	-@ rm .todos\
		2> /dev/null
spotless: clean
	-@ read -p "Are you sure you want rm node_modules? [y|N]" confirm;\
		echo $${confirm,,};\
		([[ $${confirm,,} =~ ^(yes|y)$$ ]]\
		&& mv ./node_modules ~/.Trash\
		|| echo "aborting...")

help:
	make -rpn | sed -n -e '/^$$/ { n ; /^[^ ]*:/p; }' | sort | egrep --color '^[^ ]*:'

.PHONY: start install lint test clean spotless
