$(document).ready(function () {

    //Main object
    var trivia = {

        //Questions array
        questions: ["At the beginning of the series, how many children do Ned and Catelyn Stark have?", "How did Daenerys hatch her dragon eggs?", "What is the name of Arya's direwolf?",
            "Besides dragonglass, what is the only other substance capable of defeating White Walkers?", "Arya's punishment for stealing from the Many-Face God is:",
            "'Growing Strong' is the saying of which family house?", "Who shoots the flaming arrow that subsequently destroy's Stannis' fleet in Blackwater Bay?"
        ],

        //Answers array, 5th value is the correct answer
        answers: [
            ["3", "4", "5", "6", "5"],
            ["In a lightning storm", "In a fireplace", "In a funeral pyre", "In the ocean", "In a funeral pyre"],
            ["Grey WInd", "Wolfie", "Nymeria", "Ghost", "Ghost"],
            ["Wildfire", "Valyrian Steel", "Weirwood", "Dragon Scales", "Valyrian Steel"],
            ["Memory Loss", "Blindness", "Uncontrollable laughter", "Death", "Blindness"],
            ["The Greyjoys", "The Baratheons", "The Starks", "The Tyrells", "The Tyrells"],
            ["Bronn", "Jaime Lannister", "Tyrion Lannister", "King Joffrey", "Bronn"]
        ],

        currentQuestion: "",

        questionsAsked: [],

        randomQuestion: function () {

            var alreadyAsked = false;
            var randomNumber = Math.floor(Math.random() * this.questions.length);

            while (!alreadyAsked) {

                if (this.questionsAsked.indexOf(randomNumber) === -1) {

                    alreadyAsked = true;
                    this.questionsAsked.push(randomNumber);
                    return randomNumber;

                } else if (this.questionsAsked.length >= this.questions.length) {

                    alreadyAsked = true;

                } else {

                    randomNumber = Math.floor(Math.random() * this.questions.length);
                }
            }
        },

        timer: {
            counter: 10,
            intervalId: 0,
            runTimer: function () {
                clearInterval(trivia.timer.intervalId);
                this.counter = 10;
                $("#time").text(`Time Left: ${trivia.timer.counter} seconds`);

                this.intervalId = setInterval(this.decrement, 1000);
            },
            decrement: function () {

                $("#time").text(`Time Left: ${trivia.timer.counter} seconds`);
                trivia.timer.counter--;

                if (trivia.timer.counter < 0) {

                    clearInterval(trivia.timer.intervalId);
                    trivia.score.unanswered++;
                    trivia.gifs.unansweredGif();
                    $("#answers").empty();
                    if (trivia.questionsAsked.length === trivia.questions.length) {

                        clearInterval(trivia.timer.intervalId);

                        setTimeout(function () {
                            trivia.gifs.removeGif();
                            trivia.finished.printScore();
                            trivia.finished.resetButton();

                        }, 4000);
                        return true;
                    }

                    setTimeout(function () {

                        trivia.gifs.removeGif();
                        $("#time").empty();
                        $("#question").empty();

                        trivia.nextQuestion(trivia.randomQuestion());

                    }, 4000);
                }
            }
        },

        gifs: {
            correctGif: function () {

                var gif = $("<img>");
                gif.addClass("gif");
                gif.attr("src", "assets/images/giphy.gif");
                $(".gif").attr("alt", "That's correct!");
                $("#gif").append(gif);

                var gifText = $("<span>");
                gifText.html("<br>" + "That's correct!");
                gifText.addClass("gif-text");
                $("#gif").append(gifText);
            },

            incorrectGif: function () {

                var gif = $("<img>");
                gif.addClass("gif");
                gif.attr("src", "assets/images/giphy1.gif");
                $(".gif").attr("alt", "That's incorrect");
                $("#gif").append(gif);

                var gifText = $("<span>");
                gifText.html("<br>" + "Sorry, that's incorrect");
                gifText.addClass("gif-text");
                $("#gif").append(gifText);
            },

            unansweredGif: function () {
                var gif = $("<img>");
                gif.addClass("gif");
                gif.attr("src", "assets/images/giphy2.gif");
                $(".gif").attr("alt", "You ran out of time");
                $("#gif").append(gif);

                var gifText = $("<span>");
                gifText.html("<br>" + "Sorry, you ran out of time!");
                gifText.addClass("gif-text");
                $("#gif").append(gifText);
            },

            removeGif: function () {
                $("#gif").empty();
            }
        },

        score: {
            correct: 0,
            incorrect: 0,
            unanswered: 0
        },

        nextQuestion: function (n) {

            this.timer.runTimer();
            this.currentQuestion = n;

            $("#question").text(`${this.questionsAsked.length} . ${this.questions[n]}`);

            for (i = 0; i < 4; i++) {

                var createButton = $("<button>");
                createButton.text(this.answers[n][i]);
                createButton.addClass("answer-button");
                createButton.attr("data-value", this.answers[n][i]);
                $("#answers").append(createButton);
            };
        },

        finished: {

            printScore: function () {
                $("#time").empty();
                $("#question").empty();
                $("#answers").empty();
                $("#gif").empty();
                var scoreCont = $("<p>");
                scoreCont.attr("id", "score");
                scoreCont.html(`Correct: ${trivia.score.correct} <br> Incorrect: ${trivia.score.incorrect} <br> Unanswered: ${trivia.score.unanswered}`);
                $("#game").append(scoreCont);
            },

            resetButton: function () {

                var resetButton = $("<button>");
                resetButton.attr("id", "reset-button");
                resetButton.text("Click here to try again!");
                $("#game").append(resetButton);
            }
        }
    };

    //On click function for start button
    $("#start").on("click", function () {

        $(this).remove();
        trivia.nextQuestion(trivia.randomQuestion());

    });

    //On click function for answer buttons
    $(document).on("click", ".answer-button", function () {

        var answer = ($(this).attr("data-value"));

        if (answer === trivia.answers[trivia.currentQuestion][4]) {

            trivia.score.correct++;
            clearInterval(trivia.timer.intervalId);

            trivia.gifs.correctGif();
            $("#answers").empty();
            if (trivia.questionsAsked.length === trivia.questions.length) {

                clearInterval(trivia.timer.intervalId);

                setTimeout(function () {
                    trivia.gifs.removeGif();
                    trivia.finished.printScore();
                    trivia.finished.resetButton();

                }, 2000);

                return true;
            }

            setTimeout(function () {

                trivia.gifs.removeGif();

                $("#time").empty();
                $("#question").empty();


                trivia.nextQuestion(trivia.randomQuestion());

                return true;

            }, 2000);


        } else {

            trivia.score.incorrect++;
            clearInterval(trivia.timer.intervalId);
            $("#answers").empty();
            trivia.gifs.incorrectGif();

            if (trivia.questionsAsked.length === trivia.questions.length) {

                clearInterval(trivia.timer.intervalId);

                setTimeout(function () {
                    trivia.gifs.removeGif();
                    trivia.finished.printScore();
                    trivia.finished.resetButton();

                }, 2500);
                return true;
            }

            setTimeout(function () {

                trivia.gifs.removeGif();

                $("#time").empty();
                $("#question").empty();


                trivia.nextQuestion(trivia.randomQuestion());
                return true;

            }, 2500);

        }

    });

    //On click function for reset button
    $(document).on("click", "#reset-button", function () {

        trivia.questionsAsked = [];
        trivia.score.correct = 0;
        trivia.score.incorrect = 0;
        trivia.score.unanswered = 0;

        $(this).remove();
        $("#score").remove();

        trivia.nextQuestion(trivia.randomQuestion());
    })

});