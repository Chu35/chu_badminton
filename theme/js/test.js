// 記錄答案的變數
var answers = [];

// 題目及選項
var questions = [
  {
    question: "你喜歡旅行嗎？",
    options: ["喜歡", "不喜歡"]
  },
  {
    question: "你喜歡動物嗎？",
    options: ["喜歡", "不喜歡"]
  },
  {
    question: "你喜歡運動嗎？",
    options: ["喜歡", "不喜歡"]
  }
];

// 取得 HTML 元素
var questionElement = document.getElementById("question");
var optionElements = document.getElementById("options");
var resultElement = document.getElementById("result");

// 顯示問題
function showQuestion(index) {
  var question = questions[index];
  questionElement.textContent = (index + 1) + ". " + question.question;
  
  // 清空選項
  optionElements.innerHTML = "";
  
  // 顯示選項
  for (var i = 0; i < question.options.length; i++) {
    var option = question.options[i];
    var optionElement = document.createElement("button");
    optionElement.textContent = option;
    
    // 綁定選項點擊事件
    optionElement.addEventListener("click", function() {
      answers.push(this.textContent);
      if (index + 1 < questions.length) {
        showQuestion(index + 1);
      } else {
        showResult();
      }
    });
    
    optionElements.appendChild(optionElement);
  }
}

// 顯示結果
function showResult() {
  questionElement.style.display = "none";
  optionElements.style.display = "none";
  
  var result = "你的測驗結果是：";
  for (var i = 0; i < answers.length; i++) {
    result += "\n" + (i + 1) + ". " + questions[i].question + " " + answers[i];
  }
  
  resultElement.textContent = result;
}

// 啟動測驗
showQuestion(0);
