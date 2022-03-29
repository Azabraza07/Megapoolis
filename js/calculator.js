
var percentEl = document.querySelector('.__calculator_result_degrees_numbers_degrees span');
var creditMonthEl = document.querySelector('.__calculator_result_money_numbers');
var percentSumEl = document.querySelector('.__calculator_result_degrees_payment_numbers');
var resultSumEl = document.querySelector('.__calculator_result_money_payment_numbers')
// var payMonthEl = document.querySelector('.__calculator_result_money_numbers')

var creditSum = 100000;
var creditMonth = 1;
var percent  = parseInt(percentEl.textContent);
var payMonth = 0;
var resultSum = 0;
var percentSum = 0;
console.log(percent)

$(function () {
  $("#slider-1").slider({
    animate: "slow",
    range: "min",
    min:100000,
    max:10000000,
    value: 50,
    slide: function (event, ui) {
      creditSum = parseInt(ui.value)
      $("#selectValue").text(ui.value);
      calculateCredit()
    },
  });
});
$(function () {
  $("#slider-2").slider({
    animate: "slow",
    range: "min",
    min:1,
    max:12,
    value: 1,
    slide: function (event, ui) {
      $("#select-value-2").text(ui.value);
      creditMonth = ui.value ;
      calculateCredit()
    },
  });
});

function calculateCredit(){
  //Окр(СуммаКредита*ПроцентКредита/100*КоличествоМесяцев);// округление до целых чисел
  console.log(creditMonth, creditSum)
  percentSum = getPercentSum()

  updateValuesOnDOM()

}
function getPercentSum(){
  // console.log(creditSum*percent/100*creditMonth)
  return Math.floor( (creditSum*percent/100*creditMonth))
}
function getResultSum(){
  return percentSum + creditSum;
}
// СуммаПараметрВознаграждение = 0;
// СуммаПараметрОсновнойДолг = 0;

// Для Индекс = 1 По КоличествоМесяцев Цикл	
// 	ДатаПогашения			       			= ДобавитьМесяц(НачалоДня(Док.Дата), Индекс); //Дата погашения
	
// 	Если Индекс = КоличествоМесяцев Тогда 
// 		Вознаграждение			   			= СуммаВознаграждения - СуммаПараметрВознаграждение;
// 		ОсновнойДолг               			= СуммаКредита - СуммаПараметрОсновнойДолг;
// 	Иначе
// 		Вознаграждение 						= Цел(СуммаВознаграждения/12) + ?(СуммаВознаграждения%12 > 0, 1, 0);
// 		СуммаПараметрВознаграждение 		= СуммаПараметрВознаграждение + Вознаграждение;
		
// 		ОсновнойДолг 						= Цел(СуммаКредита/12) + ?(СуммаКредита%12 > 0, 1, 0);
// 		СуммаПараметрОсновнойДолг 			= СуммаПараметрОсновнойДолг + ОсновнойДолг;
// 	КонецЕсли;
	
// 	СуммаПогашения			   				= ОсновнойДолг + Вознаграждение; // Сумма для оплаты
// КонецЦикла;

function calculatePerMonthPay(){
   var sums = [];
    var sumParamGift = 0;
    var sumParamMain = 0;
    //  var sumPerMonth = 0;
    
  for(var i=1; i <= creditMonth; i++){
    var sumGift = 0;
    var sumMain = 0;

      if(i == 1){
        sumGift = percentSum - sumParamGift;
        sumMain = creditSum - sumParamMain;

      }else{
        sumGift = Math.floor(percentSum/creditMonth + (percentSum % 12 > 0 ? 1 : 0)) ;
        sumParamGift = sumParamGift + sumGift;

        sumMain = Math.floor(creditSum/creditMonth + (creditSum%12 > 0 ? 1 : 0));
        console.log("sumMain", sumMain, creditSum, creditSum/12)
        sumParamMain = sumParamMain + sumMain;
      }
      payMonth = sumMain+sumGift;

  }

}
function updateValuesOnDOM(isInit){
  calculatePerMonthPay();
  if(!isInit){
      percentSumEl.innerHTML =  percentSum+' тг'
      resultSumEl.innerHTML = (percentSum + creditSum )+ ' тг'
      creditMonthEl.innerHTML = payMonth + 'тг'
      
      return;
  }
  percentSumEl.innerHTML = getPercentSum() +' тг'
  resultSumEl.innerHTML = getResultSum() + getPercentSum() + ' тг'
  creditMonthEl.innerHTML = payMonth + 'тг'
}

updateValuesOnDOM(true);