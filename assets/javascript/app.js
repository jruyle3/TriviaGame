var triviaQuestions = [{
	question: "Who won the popular vote in the 2016 Presidential Election?",
	answerList: ["Bernie Sanders", "Hillary Clinton", "Donald Trump", "Ted Cruz"],
	answer: 1
},{
	question: "Who won the popular vote in the 2000 Presidential Election?",
	answerList: ["Al Gore", "George W. Bush", "John Kerry", "Howard Dean"],
	answer: 0
},{
	question: "Which Presidency won his election by the widest margin?",
	answerList: ["Franklin D Roosevelt", "Abraham Lincoln", "Ronald Reagan", "Dwight Eisenhower"],
	answer: 0
},{
	question: "Which President was youngest at the time of his election?",
	answerList: ["Barack Obama", "John F. Kennedy", "Theodore Roosevelt", "John Tyler"],
	answer: 2
},{
	question: "Which President was oldest at the time of his election?",
	answerList: ["George H. W. Bush", "Thomas Jefferson", "Zachary Taylor", "Donald Trump"],
	answer: 3
},{
	question: "Which president served the shortest term (only 31 days) after inauguration?",
	answerList: ["William Henry Harrison", "James A Garfield", "Millard Fillmore", "Chester A Arthur"],
	answer: 0
},{
	question: "What term, popularized after the 2000 election, describes an incompletely punched hole in a paper ballot?",
	answerList: ["Dangling Brad", "Hanging Chad", "Swinging Dad", "Half-filled Tad"],
	answer: 1
},{
	question: "Who was George Washington's running mate in 1789?",
	answerList: ["Alexander Hamiltonr", "John Adams", "Thomas Jeffersonr", "He ran without a running mate"],
	answer: 3
},{
	question: "In what year did a 3rd party candidate win electoral votes?",
	answerList: ["1952", "1968", "1996", "2008"],
	answer: 1
},{
	question: "After leavuing the White House, Teddy Roosevelt came back and ran as a member of which 3rd party?",
	answerList: ["Whig", "Libertarian", "Populist", "Bull Moose"],
	answer: 3
},{
	question: "Nebraska is one of two states that have proportional electoral voting rather than a 'winner-take-all' format. What is the other state that uses this approach?",
	answerList: ["North Carolina", "Vermont", "Arkansas", "Maine"],
	answer: 3
},{
	question: "What election saw the closest result in terms of raw popular vote?",
	answerList: ["1960 — Richard Nixon vs. John F. Kennedy", "2000 — Al Gore vs George W. Bush", "1976 — Gerald Ford vs. Jimmy Carter", "1876 — Rutherford B. Hayes over Samuel Tilden"],
	answer: 0
},{
	question: "What was the worst finish in history for an incumbent president running for reelection?",
	answerList: ["Millard Fillmore in 1856, with 21.6%", "Herbert Hoover in 1932, with 39.7%", "William Howard Taft in 1912, with 23.2% ", "Martin Van Buren in 1848, with 10.1%"],
	answer: 2
},{
	question: "To run for president, the U.S. Constitution has three requirements. Which one of the following is not one of them?",
	answerList: ["Must be at least 35 years old", "Must be able to read and write", "Must be a natural-born citizen", "Must have lived in the United States at least 14 years"],
	answer: 1
},{
	question: "One of these presidents was chosen by the House of Representatives after there was no electoral college majority. Who was it?",
	answerList: ["Woodrow Wilson 1916", "Herbert Hoover in 1928", "John Quincy Adams 1824", "John Adams in 1796"],
	answer: 2
}];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}