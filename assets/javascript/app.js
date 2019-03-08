$(document).ready(function () {

    var trivia = {
        questions: ["What color is my ass?", "Do you know the answer?", "What is 3+3?", "What is 4+4?"],

        answers: [
            ["red", "blue", "green", "yellow", "green"],
            ["yes", "no", "maybe", "probably", "yes"],
            ["cat", "dog", "llama", "bear"],
            ["2", "6", "1", "8"]
        ],

        nextQuestion: function (x) {
            // var intervalId = setInterval(decrement, 300);
            // $("#time").text(intervalId);
            $("#question").text(trivia.questions[x]);

            for (i = 0; i < 4; i++) {
                var createButton = $("<button>");
                createButton.text(trivia.answers[x][i]);
                createButton.attr("id", trivia.answers[x][i]);
                $("#answers").append(createButton);
            }

        }

    }
    trivia.nextQuestion(1)
    //Create onclick function for go button.
    //Create object that will hold questions and answers
    //Create variable for timer
    //Create 

});