function calculateScore() {
  var q1 = document.querySelector('input[name="q1"]:checked').value;
  var q2 = document.querySelector('input[name="q2"]:checked').value;
  var q3 = document.querySelector('input[name="q3"]:checked').value;
  var q4 = document.querySelector('input[name="q4"]:checked').value;

  var score = parseInt(q1) + parseInt(q2) + parseInt(q3)+ parseInt(q4);

  showResult(score);
}

function restartQuiz() {
  var resultDiv = document.getElementById("result");

  // 隱藏結果區塊
  resultDiv.classList.add("hidden");

  // 重設測驗表單
  document.getElementById("quiz").reset();
}

function submitForm() {
  // 獲取問題答案
  var q1 = document.querySelector('input[name="q1"]:checked').value;
  var q2 = document.querySelector('input[name="q2"]:checked').value;
  var q3 = document.querySelector('input[name="q3"]:checked').value;
  var q4 = document.querySelector('input[name="q4"]:checked').value;

  // 計算測驗結果
  var result = parseInt(q1) + parseInt(q2) + parseInt(q3)+ parseInt(q4);

  // 根據測驗結果導向不同頁面
  if (result <= 5) {
    var choice = window.confirm("你的測驗結果是B，確定要繼續前往嗎？");
  if (choice) {
    window.location.href = "gt.html#life";
  }
 }
  if (result >=6) {
    var choice = window.confirm("你的測驗結果是B\n第二行文字" );
    if (choice) {
      window.location.href = "https://www.youtube.com/watch?v=BsU4o8Q_StY";
    }
  }
}



var questionIndex = 1; // start with question 1
var numQuestions = 4; // total number of questions

// hide all questions except the first one
for (var i = 2; i <= numQuestions; i++) {
  var questionElem = document.getElementById('question-' + i);
  if (questionElem) {
    questionElem.style.display = 'none';
  }
}

// add click event listener to the next button
var nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', function() {
  // hide current question
  var currentQuestion = document.getElementById('question-' + questionIndex);
  currentQuestion.style.display = 'none';
  
  // show next question
  questionIndex++;
  if (questionIndex <= numQuestions) {
    var nextQuestion = document.getElementById('question-' + questionIndex);
    nextQuestion.style.display = 'block';
  }
  
  // hide next button if we're on the last question
  if (questionIndex === numQuestions) {
    nextBtn.style.display = 'none';
  }
});



  //心理測驗按鈕
	let btn=document.querySelector("#test");
  let infoModal=document.querySelector("#infoModal");
  let close=document.querySelector("#close");
  btn.addEventListener("click", function(){
  infoModal.showModal();
})
close.addEventListener("click", function(){
  infoModal.close();
})
