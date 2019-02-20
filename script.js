new Vue({
  el: '#app',
  data: {
    items: ['0', '1', '2', '3', '4', '5'],
    itemsColors: [],
    radius: 250,
    turn: 1,
    perspective: 0.4,
    backgroundScale: 0.9,
    backgroundOpacity: 0.9,
  },
  methods: {
    sliderLoop() {
        for (let i=0; i < this.items.length; i++) {
            let element = document.getElementById('container');
            let iT = this.turn - i;
            let alfa = (360 / this.items.length) * iT;
            let zPos = Math.ceil(this.radius * Math.cos((alfa * Math.PI) / 180));
            let xPos = Math.ceil(this.radius * Math.sin((alfa * Math.PI) / 180));
            let yPos = -this.perspective * Math.abs(zPos - this.radius);
            let scale = 100/(100 - yPos) * this.backgroundScale;

            if (zPos === this.radius) {
                element.getElementsByTagName('div')[i].style = `z-index: ${zPos} !important; 
                                                                left: ${xPos}px !important; 
                                                                top: ${yPos}px; 
                                                                background: ${this.itemsColors[i]};`;
            } else {
                element.getElementsByTagName('div')[i].style = `z-index: ${zPos} !important; 
                                                                left: ${xPos}px !important; 
                                                                top: ${yPos}px; 
                                                                background: ${this.itemsColors[i]};
                                                                opacity: ${this.backgroundOpacity}; transform: scale(${scale});`;
            }
        }
    },

    left() {
        this.turn += 1;
        if (this.turn === this.items.length) {
            this.turn = 0;
        }
        this.sliderLoop();
    },

    
    right() {
        this.turn -= 1;
        if (this.turn < 0) {
            this.turn = this.items.length - 1;
        }
        this.sliderLoop();
    },

    center(item) {
        this.turn = this.items.indexOf(item);
        this.sliderLoop();
    },

    randomColor() {
        let color = '#';
        let allowedString = 'abcdef0123456789';
        while (color.length < 7) {
            color += allowedString[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    setColor() {
        this.items.forEach((items, index) => {
            this.itemsColors[index] = this.randomColor();
            document.getElementById('container')
                    .getElementsByTagName('div')[index].style.background = this.itemsColors[index];
        })
    },


    addElement() {
        this.itemsColors.push(this.randomColor());
        this.items.push(`${this.items.length}`);
        this.right();
    },

    removeElement() {
        this.items.pop();
        this.itemsColors.pop();
        this.right();
    },
  },
  mounted() {
      this.setColor()
      this.right();
  }
})