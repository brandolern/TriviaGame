$(document).ready(function () {

    var trivia = {
        questions: ["The sky is what color?", "Do you know the answer?", "Whats my favorite animal?", "What is 4x2?"],

        answers: [
            ["red", "blue", "green", "yellow", "blue"],
            ["yes", "no", "maybe", "probably", "no"],
            ["cat", "dog", "llama", "bear", "cat"],
            ["2", "6", "1", "8", "8"]
        ],

        questionsAsked: [],

        randomQuestion: function () {

            var alreadyAsked = false;
            var randomNumber = Math.floor(Math.random() * this.questions.length);

            while (!alreadyAsked) {

                if (this.questionsAsked.indexOf(randomNumber) === -1) {
                    alreadyAsked = true;
                    this.questionsAsked.push(randomNumber);
                    return randomNumber;

                } else if (this.questionsAsked.length > this.questions.length) {

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
            // var intervalId = setInterval(this.decrement, 1000);

            // $("#time").text(this.counter);

            $("#question").text(this.questions[n]);

            for (i = 0; i < 4; i++) {
                var createButton = $("<button>");
                createButton.text(this.answers[n][i]);
                createButton.addClass("answer-button");
                createButton.attr("data-value", this.answers[n][i]);
                $("#answers").append(createButton);
            }
        }

    }

    $("#start").on("click", function () {
        $(this).remove();
        trivia.nextQuestion(trivia.randomQuestion());
    });

    $(".answer-button").on("click", function () {

    });











    //Create onclick function for go button.
    //Create object that will hold questions and answers
    //Create variable for timer
    //Create 

});