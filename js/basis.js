'use script';
function a2d(a){
	return a*180/Math.PI;
}
function hoverDir(obj,oEvent){
	var x = obj.offsetLeft+obj.offsetWidth/2-oEvent.clientX;
	var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
	var y = obj.offsetTop+obj.offsetHeight/2-oEvent.clientY-scrollT;
	
	return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;

}
function hoverGo(obj){
	var oS1 = obj.children[1];
	obj.onmouseover=function(ev){
		var oEvent = ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom))return;
		var dir = hoverDir(obj,oEvent);
		
		switch(dir){
			case 0:
				oS1.style.left = '220px';
				oS1.style.top = 0;
				break;
			case 1:
				oS1.style.left = 0;
				oS1.style.top = '220px';
				break;
			case 2:
				oS1.style.left = '-220px';
				oS1.style.top = 0;
				break;
			case 3:
				oS1.style.left = 0;
				oS1.style.top = '-220px';
				break;
		}
		
		startMove(oS1,{top:0,left:0});
	};
	obj.onmouseout=function(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo))return;
		var dir = hoverDir(obj,oEvent);
		switch(dir){
			case 0:
				startMove(oS1,{left:220,top:0});
				break;
			case 1:
				startMove(oS1,{left:0,top:220});
				break;
			case 2:
				startMove(oS1,{left:-220,top:0});
				break;
			case 3:
				startMove(oS1,{left:0,top:-220});
				break;
		}
	};
};


window.onload = function(){
	var oBody = document.getElementById('body');
	var oUl = document.getElementById('through_wall');
	var aLi = oUl.children;
	var oTop = document.getElementById('top');
	var iNow =0;
	setInterval(function(){
		iNow++;
		
		if (iNow>4) {
			iNow=0;
		}
		oBody.style.backgroundImage='url(img/'+iNow+'.jpg)';
	},5000)
	
	for(var i=0;i<aLi.length;i++){
		hoverGo(aLi[i]);
	}
	var iSpeedX = 0;
	var iSpeedY = 6;
	var timer = null;
	move();
	function move(){
		timer = setInterval(function(){
			iSpeedY+=2;
			var l = oTop.offsetLeft+iSpeedX;
			var t = oTop.offsetTop+iSpeedY;
			if(t>=document.documentElement.clientHeight-oTop.offsetHeight){
				t=document.documentElement.clientHeight-oTop.offsetHeight;
				iSpeedY*=-0.9;
				iSpeedX*=0.9			}
			if(t<0){
				t=0;
				iSpeedY*=-0.9;
				iSpeedX*=0.9;
			}
			if(l>=document.documentElement.clientWidth-oTop.offsetWidth){
				l=document.documentElement.clientWidth-oTop.offsetWidth;
				iSpeedX*=-0.9;
				iSpeedY*=0.9;
			}
			if(l<0){
				l=0;
				iSpeedX*=-0.9;
				iSpeedY*=0.9;
			}
			oTop.style.left = l+'px';
			oTop.style.top = t+'px';
			
			if(Math.abs(iSpeedX)<1)iSpeedX=0;
			if(Math.abs(iSpeedY)<1)iSpeedY=0;
			if(iSpeedX==0&&iSpeedY==0&&t==document.documentElement.clientHeight-oTop.offsetHeight){
				clearInterval(timer);
			}
		},30);

	}
		
	oTop.onclick=function(){
   		scrollmove(0,2000)
  	};
	var oTapNow=0;
	
	function scrollmove(target,time,complete){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var start=scrollTop;
		var count=Math.floor(time/30);
		var n=0;
		var timer=null;
		var discollTop=target-start;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			if(window.navigator.userAgent.toLowerCase().indexOf('chrome')!=-1)
			{
				document.body.scrollTop=start+discollTop*(1-a*a*a);
			}
			else{

				document.documentElement.scrollTop=start+discollTop*(1-a*a*a);
			}

			if(n==count){
				bFlog=true;
				clearInterval(timer);
				complete&&complete();
			};
		},30)
	};


	



}