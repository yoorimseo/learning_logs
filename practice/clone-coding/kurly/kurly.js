//gnb 상단 메뉴 고정
$(document).ready(function() {
    //상대적인 좌표 값을 반환, .offset()가 반환 하는 객체는 left와 top 속성을 제공
    //top 속성을 이용해서 메뉴의 수직 위치를 구함
       var menu_offset = $('.gnb').offset();

       //스크롤 바를 스크롤할 때 매개변수로 전달된 함수를 실행시킴
       $(window).scroll(function() {
           //문서의 스크롤바 위치와 메뉴의 수직 위치를 비교해서 
           //문서의 스크롤바 위치가 메뉴의 수직 위치보다 크면(위치로 표현하면 아래)
         if ($(document).scrollTop() > menu_offset.top) {
             //메뉴에 menu-fixed 클래스를 추가해서 메뉴를 고정시킴
               $('.gnb').addClass('gnb-fixed');
         }else {
             //메뉴에서 menu-fized 클래스를 제거해서 메뉴를 수직으로 이동할 수 있도록 처리함
               $('.gnb').removeClass('gnb-fixed');
         }
       });
 });

 //main 이미지 슬라이더
 var index = 0;   //이미지에 접근하는 인덱스

 window.onload = function(){
    slideShow();
    
 }
 
 function slideShow() {
    var i;
    var x = document.getElementsByClassName("sliderImg");  //slide1에 대한 dom 참조
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";   //처음에 전부 display를 none으로 한다.
    }

    index++;

    if (index > x.length) {
        index = 1;  //인덱스가 초과되면 1로 변경
    }   

    x[index-1].style.display = "block";  //해당 인덱스는 block으로

    setTimeout(slideShow, 4000);   //함수를 4초마다 호출
    
}