(function(){(function(a){return a.fn.canvasResizer=function(e){var f,d,c,b;c={width:640,height:480,success:function(g){return g}};b=a.extend(c,e);d=function(l){var i,j,k,h,g;j=this.files;if(j.length){g=[];for(k=0,h=j.length;k<h;k++){i=j[k];g.push((function(){var m;m=new Image;m.onload=function(){return f.call(m)};return m.src=URL.createObjectURL(i)})())}return g}};f=function(){var g,r,j,n,i,s,k,o,l,p,q,m=this;i=document.createElement("canvas");k=this.height;q=this.width;if(q>b.width||k>b.height){j=q/b.width;g=k/b.height;n=k/j;r=q/g;if(n<=b.height&&r<=b.width){o=g>=j?j:g}else{if(n<=b.height){o=j}else{o=g}}p=Math.floor(q/o);l=Math.floor(k/o)}else{p=q;l=k}i.setAttribute("width",p);i.setAttribute("height",l);s=i.getContext("2d");s.drawImage(this,0,0,p,l);this.onload=function(){return b.success.call(m,m)};return this.src=i.toDataURL()};return this.each(function(){if(this.nodeName!=="INPUT"||this.attributes.getNamedItem("type").value.toLowerCase()!=="file"){return false}return a(this).on("change",d)})}})(jQuery)}).call(this);