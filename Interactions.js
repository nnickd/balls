const Interactions = {
  state: {
    isBallClicked: false
  },
  keyPressed: {
    deleteBalls: (balls) => {
      if (keyCode === DELETE) {
        for (let ball of balls) {
         ball.dead = true; 
        }
      }
    }
  }
};
