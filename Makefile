build:
	VITE_DEBUG_PANEL=false npm --prefix ./board run build
	npm --prefix ./server run build

	docker build -t amrltqt/ezd:latest .

dev-board:
	npm --prefix ./board run dev