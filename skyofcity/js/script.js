// JavaScript Document
window.onload=function(){
	var page1=document.getElementById("page1");
	var page2=document.getElementById("page2");
	var page3=document.getElementById("page3");
	
	var music=document.getElementById("music");
	var audio=document.getElementsByTagName("audio")[0];
	//监听audio，当音乐播放完毕，图标停止旋转
	audio.addEventListener("ended",function(event){
		music.setAttribute("class","");
		//music.style.animationPlayState="paused"; 	
	 },false);
	//点击音乐图标，控制播放和暂停，但是移动端不是点击是触摸
	/*
	music.onclick=function(){
		if(audio.paused){
			audio.play();
			this.setAttribute("class","play");
			//this.style.animationPlayState="running"; //4.4以下的安卓不兼容，iphone6plus及以上才兼容
		}
		else{
			audio.pause();
			this.setAttribute("class",""); 
			//this.style.animationPlayState="paused"; 	
		}	
	};
	*/
	//监听music，当用户触碰，如果音乐暂停，则音频播放music旋转；否则，音频暂停music不旋转
	music.addEventListener("touchstart",function(event){
		if(audio.paused){
			audio.play();
			this.setAttribute("class","play");
		}
		else{
			audio.pause();
			this.setAttribute("class",""); 	
		}	
	 },false);
	//监听page1，当用户触碰，page1隐藏，page2、3出现但是page3在页面之下，隔5.5秒page2淡出3淡入
	page1.addEventListener("touchstart",function(event){
		page1.style.display="none";
		page2.style.display="block";
		page3.style.display="block";
		page3.style.top="100%";
		setTimeout(function(){
			page2.setAttribute("class","page fadeOut");
			page3.setAttribute("class","page fadeIn");
			},5500);
		},false);
};