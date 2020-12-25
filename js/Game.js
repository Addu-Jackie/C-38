class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of the array for a single player.
      var index = 0;
      //x and y position of the cars.
      var x = 0,y;
      //var display_position = 130;
      for(var plr in allPlayers){
        //increase the index for every player,so player1 have index 1 player2 have index 2. 
        index = index + 1;
        //cars placed at the horizontal distance of 200 from each other. 
        x = x+200;
        //y position of the car is calculated by getting data from dataBase.
        y = displayHeight - allPlayers[plr].distance;
        //place the cars at x and y position.
        cars[index-1].x = x;
        cars[index-1].y = y;
        if (index === player.index){
          //display the active player car in red colour.
          cars [index-1].shapeColor="red";
          //the camera shows the game from different angles.
          //place the camera as the cars y position.
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
      }
        }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance=player.distance + 10;
      player.update();
    }
    drawSprites();
  }
}
