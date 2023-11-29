let blocks = []
let block_width
let block_height_min = 50
let block_height_max = 400
let index_current, index_loop
let timer
let mode
let sliderSpeed
let sliderAmount
let n

function setup() {
	createCanvas(1000, 400)


	sliderSpeed = createSlider(200, 1000, 1000, 100)
	createSpan('Pause zwischen den Schritten')
	createElement('br')
	sliderAmount = createSlider(10, 100, 10, 1)
	createSpan('Anzahl')

	createElement('br')

	let button = createButton('restart')
	button.mousePressed(() => {
		setupArray()
	})

	setupArray()

}

function setupArray() {
	for (let i = blocks.length - 1; i >= 0; i--) {
		blocks[i].remove()
	}

	n = sliderAmount.value()

	block_width = width/n

	index_current = 1
	index_loop = 1

	let sizes = []
	for (let i = 0; i < n; i++) {
		let size = map(i, 0, n-1, block_height_min, block_height_max)
		sizes.push(size)
	}
	sizes = sizes.sort(() => Math.random() - 0.5)
	sizes = sizes.sort(() => Math.random() - 0.5)
	sizes = sizes.sort(() => Math.random() - 0.5)

	blocks = []
	for (let i = 0; i < n; i++) {
		let h = sizes[i]
		let block = new Sprite(block_width/2 + i*block_width, block_height_max - h/2, block_width, h, 'kinematic')
		block.color = 'gray'
		blocks.push(block)
	}

	mode = 'mark'
	timer = millis()
}

function draw() {
	clear()

	if (index_loop >= blocks.length) {
		return
	}

	if (millis() - timer > sliderSpeed.value()) {
		timer = millis()
		if (mode == 'mark') {
			mark()
			mode = 'swap'
		} else if (mode == 'swap') {
			if (blocks[index_current].h < blocks[index_current-1].h) {
				swap()
				index_current--
				if (index_current <= 0) {
					index_loop++
					index_current = index_loop
				}
			} else {
				index_loop++
				index_current = index_loop
			}
			mode = 'mark'
		}
	}
}

function swap() {
	// move
	let speed = 0.07 * block_width
	blocks[index_current].move(block_width, 'left', speed)
	blocks[index_current-1].move(block_width, 'right', speed)

	// edit array
	let temp = blocks[index_current]
	blocks[index_current] = blocks[index_current-1]
	blocks[index_current-1] = temp
}

function mark() {
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i]
		block.color = 'gray'
		block.stroke = 'black'
	}
	blocks[index_loop].stroke = 'yellow'
	blocks[index_loop].color = 'yellow'
	blocks[index_current].color = 'red'
}