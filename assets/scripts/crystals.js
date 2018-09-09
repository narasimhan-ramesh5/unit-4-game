/**
 *  JavaScript for Crystal Collector Game.
 * 
 */

 /* Globals */
 var wins = 0, losses = 0;

 var targetScore = 0, playerScore = 0;

 /* The target score will be a random value
    between 50 and 150 */
 var targetScoreMin = 50, targetScoreMax = 100;

 var crystalWeights = {
   "red":0,
   "blue":0,
   "green":0,
   "yellow":0
 }

 /**
  * Function to initialize the weights for each
  * crystal. Ensures that each crystal gets a unique, 
  * randomly chosen weight.
  */
 function initializeCrystals(){
   var crystals = Object.keys(crystalWeights);
   var numCrystals = crystals.length;
   var randomWeight = 0;
   var i = 0;
   var setOfWeights = new Set();

   for(i = 0; i < numCrystals; i++){

     /* This do-while loop is necessary to ensure that a unique
      * weight is assigned to each crystal.
      * 
      * As we generate weights for each crystal, we add them to a set.
      * We also make sure that the random weight for the current crystal
      * hasn't already been assigned to another crystal.
      */
     do{
      randomWeight = 3 + Math.floor(Math.random() * Math.floor(12));
     }while(true == setOfWeights.has(randomWeight));

     setOfWeights.add(randomWeight);
     crystalWeights[crystals[i]] = randomWeight;
   }

   //console.log(crystalWeights);
 }

 /**
  * Function to initialize a new game.
  * Invoked when the previous game finishes.
  */
 function newGame(){
   //console.log("New Game!!");

   /* Choose a random score between 50 and 150 */
   targetScore = targetScoreMin + Math.floor(Math.random() * Math.floor(targetScoreMax));
   playerScore = 0;

   $("#target-score").text(targetScore);
   $("#user-score").text(playerScore);

   //console.log("The target score in this particular game is "+targetScore);

   /* Initialize the weights for the crystals */
   initializeCrystals();
 }

/**
 * Function to add the chosen crystal's weight
 * to the player score.
 * Once player score matches target score, it's a WIN.
 * Alternately, if the player score goes over the target score, it's a LOSS.
 */
function addCrystalWeight(crystalName){
  playerScore += crystalWeights[crystalName];

  //console.log("player score is now "+playerScore);
  $("#user-score").text(playerScore);

  if(playerScore >= targetScore) {
    if(playerScore === targetScore){
      //console.log("player wins!!");
      wins += 1;
      $("#wins").text(wins);
    }
    else if(playerScore > targetScore){
      //console.log("player loses!!");
      losses += 1;
      $("#losses").text(losses);
    }
    newGame();
  }
}



 /**
  * Initialize the game when the document is ready.
  */
 $( document ).ready(function(){
  wins = 0;
  losses = 0;

  $("#wins").text(wins);
  $("#losses").text(losses);

  newGame();

  $("#yellow-crystal").on("click",function(){
    addCrystalWeight("yellow");
  });

  $("#red-crystal").on("click",function(){
    addCrystalWeight("red");
  });

  $("#blue-crystal").on("click",function(){
    addCrystalWeight("blue");
  });

  $("#green-crystal").on("click",function(){
    addCrystalWeight("green");
  });
});




