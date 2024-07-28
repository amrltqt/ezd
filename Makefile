build:
	npm --prefix ./board run build
	npm --prefix ./server run build

	docker build -t amrltqt/ezd:latest .