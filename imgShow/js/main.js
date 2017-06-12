//3.通用函数
function g(selector) {
    var method= selector.substr(0,1)=='.'? 'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}
//随机生成一个值，可为负数，传入的参数为random([min,max])
function random(range) {
    var max=Math.max(range[0],range[1]);
    var min=Math.min(range[0],range[1]);
    var diff=max-min;
    var number=Math.ceil(Math.random()*diff+min);
    return number;
}
//4.输出所有的海报
var data=data;
function addPhotos() {
    var template=g('#wrap').innerHTML;
    var html=[];
    var nav=[];
    for(var s=0;s<data.length;s++){
        //如果一个变量不常用，会以_开头，表示临时变量
        var _html=template
            .replace('{{index}}',s)
            .replace('{{img}}',data[s].img)
            .replace('{{caption}}',data[s].caption)
            .replace('{{desc}}',data[s].desc);
        html.push(_html);

        nav.push('<span id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))" class="i"></span>')
    }
    html.push('<div class="nav">'+nav.join('')+'</div>')

    g('#wrap').innerHTML=html.join("");//用空格作分隔符连接数组元素返回字符串
    rsort(random([0,data.length]));
}
addPhotos();

//6.计算左右分区的范围，返回Object{left:{x:[min,max],y:[min,max]},right:{x:[min,max],y:[min,max]}}
function range() {
    var range={left:{x:[],y:[]},right:{x:[],y:[]}};
    var wrap={
        w:g('#wrap').clientWidth,
        h:g('#wrap').clientHeight
    }
    var photo={
        w:g('.photo')[0].clientWidth,
        h:g('.photo')[0].clientHeight
    }
    range.wrap=wrap;
    range.photo=photo;
    range.left.x=[0-photo.w, wrap.w/2-photo.w/2];
    range.left.y=[0-photo.h, wrap.h];
    range.right.x=[wrap.w/2+photo.w/2,wrap.w+photo.w];
    range.right.y=range.left.y;
    return range;
}

//5.排序海报
function rsort(n) {
    var _photo=g('.photo');//类数组没有sort方法
    var photos=[];
    for(var s=0;s<_photo.length;s++){
        _photo[s].className=_photo[s].className.replace(/\s*photo_center\s*/,' ');
        _photo[s].className=_photo[s].className.replace(/\s*photo-front\s*/,' ');
        _photo[s].className=_photo[s].className.replace(/\s*photo-back\s*/,' ');
        _photo[s].className+=' photo-front';
        _photo[s].style.left='';
        _photo[s].style.top='';
        _photo[s].style['transform']=_photo[s].style['-webkit-transform']='rotateY(360deg) scale(1.2)';
        photos.push(_photo[s]);
    }
    var photocenter=g('#photo_'+n);
    photocenter.className+=' photo_center';
    photocenter=photos.splice(n,1)[0];
    //分为左右两个区域
    var photos_left=photos.splice(0,Math.ceil(photos.length/2));
    var photos_right=photos;
    var ranges=range();//注意变量和函数名不能相同
    for(var s=0; s<photos_left.length; s++){
        var photo=photos_left[s];
        photo.style.left=random(ranges.left.x)+'px';
        photo.style.top=random(ranges.left.y)+'px';
        photo.style['transform']=photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg) scale(1)';
    }
    for(s in photos_right){
        var photo=photos_right[s];
        photo.style.left=random(ranges.right.x)+'px';
        photo.style.top=random(ranges.right.y)+'px';
        photo.style['transform']=photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg) scale(1)';
    }
    //控制按钮处理
    var navs=g('.i');
    for(var s=0;s<navs.length; s++){
        navs[s].className=navs[s].className.replace(/\s*i_current\s*/,' ');
        navs[s].className=navs[s].className.replace(/\s*i_back\s*/,' ');
    }
    g('#nav_'+n).className+=' i_current';
    console.log(photos_left,photos_right);
}
//1.翻面控制
function turn(elem) {
    var cls=elem.className;
    var n=elem.id.split('_')[1];//
    if(!/photo_center/.test(cls)){
        return rsort(n);
    }
    if(/photo-front/.test(cls)){
        cls=cls.replace(/photo-front/,'photo-back');
        g('#nav_'+n).className+=' i_back';
    }else{
        cls=cls.replace(/photo-back/,'photo-front');
        g('#nav_'+n).className=g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
    }
    return elem.className=cls;
}
