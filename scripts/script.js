const horrorGame = {};

horrorGame.reset = () => {
  horrorGame.advanceDialogue(conversationOne);
  $(horrorGame.frames)
    .find('.window').addClass('hideFrame')
    .find('.closedEye').removeClass('hideFrame');
  horrorGame.changeFrame(0);
}
// $element.on('transitionend webkitTransitionEnd oTransitionEnd', function () { // your event handler });
horrorGame.changeFrame = (n) => {
  //Hide current frame and show eyeball cover
  $(horrorGame.frames[horrorGame.currentFrame])
    .find('.window').addClass('hideFrame')
    .find('.closedEye').removeClass('hideFrame');

  //Show next frame and hide next eyeball cover
  $(horrorGame.frames[n])
    .find('.window').removeClass('hideFrame')
    .find('.closedEye').addClass('hideFrame');
  
  //Scroll the html/body to the top of the next frame
  $('HTML, body').animate({scrollTop: $(horrorGame.frames[n]).offset().top - 30}, 1000);
  //Set the current frame to the next frame
  horrorGame.currentFrame = n;
}


// Bind events here
horrorGame.bindEvents = () => {
  $('#characterOne button').on('click', function(){
    horrorGame.changeFrame(1);
  });
  $('#retryButton').on('click', function () {
    horrorGame.reset();
  });
}
horrorGame.findDomReferences = () => {
  horrorGame.frames = $('#frameHolder').children();

  horrorGame.npcName = $('#npcName');
  horrorGame.npcText = $('#npcText');

  horrorGame.responseList = $('#responseList');

  horrorGame.endingDiv = $('#endingDiv');
}

horrorGame.showEndScreen = (text, imgUrl) => {
  horrorGame.endingDiv
    .find('h3').text(text);
  horrorGame.endingDiv
    .find('img').attr("src", imgUrl);
    console.log(imgUrl);
}

horrorGame.advanceDialogue = (conversationObject) => {
  //Set the overall npc settings
  //Set the text of the name
  horrorGame.npcName.text(conversationObject.name);
  //Set the npc portrait

  //Store the dialogue object in a shorter name
  const dialogue = conversationObject.dialogue[conversationObject.currentIndex];
  //Set the current text
  horrorGame.npcText.text(dialogue.text);

  //Make sure the ul doesn't have any buttons in it
  horrorGame.responseList.empty();
  //Append the ul with buttons
  //Set the html to have the response text
  //Bind the click event to the response's callback
  for(let i = 0; i < dialogue.responses.length; i++){
    const newButton = $(`<li><button></button></li>`);
    $(newButton).appendTo(horrorGame.responseList)
      .find('button')
      .html(`<p>${dialogue.responses[i].text}</p>`)
      .on('click', dialogue.responses[i].callback);
  }
}

horrorGame.init = () => {
  horrorGame.bindEvents();
  horrorGame.findDomReferences();

  horrorGame.reset();
}



conversationOne = {
  name: "Boris",
  portraitURL: "./assets/priestPortrait.png",
  currentIndex: 0,
  dialogue: [
    {
      text: "Dog or Cat?",
      responses: [
        {
          text: "Dog.",
          callback: function () { horrorGame.changeFrame(2); horrorGame.showEndScreen("(you died)", "./assets/deathIcon.svg"); }
        },
        {
          text: "Cat.",
          callback: function () { horrorGame.changeFrame(2); horrorGame.showEndScreen("(you escaped)", "./assets/heartIcon.svg"); }
        },
        {
          text: "(leave)",
          callback: function () { horrorGame.changeFrame(0); }
        }
      ]
    }
  ]
}

// $(function() {
$(document).ready(function(){
  horrorGame.init();
});
