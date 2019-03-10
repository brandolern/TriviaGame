$(document).ready(function () {

    var trivia = {

        questions: ["The sky is what color?", "Do you know the answer?", "Whats my favorite animal?", "What is 4x2?"],

        answers: [
            ["red", "blue", "green", "yellow", "blue"],
            ["yes", "no", "maybe", "probably", "no"],
            ["cat", "dog", "llama", "bear", "cat"],
            ["2", "6", "1", "8", "8"]
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

        counter: 50,

        decrement: function () {
            this.counter--;
        },

        score: {
            correct: 0,
            incorrect: 0
        },

        nextQuestion: function (n) {

            this.currentQuestion = n;

            var intervalId = setInterval(this.decrement(), 1000);

            $("#time").text(this.counter);

            $("#question").text(this.questions[n]);

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

                var scoreCont = $("<p>");
                scoreCont.attr("id", "score");
                scoreCont.html(`Correct: ${trivia.score.correct} <br> Incorrect: ${trivia.score.incorrect}`);
                $("#game").append(scoreCont);
            },

            resetButton: function () {

                var resetButton = $("<button>");
                resetButton.attr("id", "reset-button");
                resetButton.text("Click here to try again!");
                $("#game").append(resetButton);

            }

        }
    }

    $("#start").on("click", function () {

        $(this).remove();
        trivia.nextQuestion(trivia.randomQuestion());

    });

    $(document).on("click", ".answer-button", function () {

        var answer = ($(this).attr("data-value"));

        if (answer === trivia.answers[trivia.currentQuestion][4]) {

            trivia.score.correct++;
            $("#time").empty();
            $("#question").empty();
            $("#answers").empty();

            if (trivia.questionsAsked.length === trivia.questions.length) {

                trivia.finished.printScore();
                trivia.finished.resetButton();
                return true;
            }

            trivia.nextQuestion(trivia.randomQuestion());


        } else {

            trivia.score.incorrect++;
            $("#time").empty();
            $("#question").empty();
            $("#answers").empty();

            if (trivia.questionsAsked.length === trivia.questions.length) {

                trivia.finished.printScore();
                trivia.finished.resetButton();
                return true;
            }

            trivia.nextQuestion(trivia.randomQuestion());

        }

    });

    $(document).on("click", "#reset-button", function () {

        trivia.questionsAsked = [];
        trivia.score.correct = 0;
        trivia.score.incorrect = 0;

        $(this).remove();
        $("#score").remove();

        trivia.nextQuestion(trivia.randomQuestion());
    })

});