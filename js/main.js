let db_data;
let j=document.getElementById('for_json');
let black_back=document.getElementById('black_back');
let image=document.getElementById('image');
let info=document.getElementById('info');
let wrapper=document.getElementsByClassName('wrapper');
let win_wid=document.documentElement.clientWidth;
//let r=win_wid/4.7;
let surname=document.getElementById('surname');
let name=document.getElementById('name');
let patronymic=document.getElementById('patronymic');
let number=document.getElementById('number');
let address=document.getElementById('address');
let close=document.getElementById('close');


window.onload=function(){
	//let req=new XMLHttpRequest();
	

	let k=[
	    { id:"surname", header:"Фамилия", fillspace:true},
	    { id:"name", header:"Имя", fillspace:true},
	    { id:"patronymic", header:"Отчество", fillspace:true }
	  ];


	//req.onreadystatechange=function(){
	$.ajax({
  		url: 'php/load_data.php',
  		success: function(data){
  			//alert('witchouse');
    		db_data=JSON.parse(data);
    		let array=[]
			for(let i=0;i<db_data.length;i++){
				array.push({	id:i+1,
								surname:db_data[i]["surname"],
								name:db_data[i]["name"],
								patronymic:db_data[i]["patronymic"],
								number:db_data[i]["number"],
								address:db_data[i]["address"]
					});
			};
			
			webix.ui({
				container:"header",
				type:"clean",
    			rows:[

    				{view:"datatable",
    				id:"table",
					  	columns:k,	 
					  	autoConfig:true,
					  	autoheight:true,
					  	on:{
					    	"onItemClick":function(id, e, trg){
					    		let row=this.getItem(id).id;
					    		let numb=array[row-1]["number"];
					    		black_back.style.opacity="0.7";
								black_back.style.zIndex="1";
					    		$.ajax({
								  	url: 'php/upload_img.php',
								  	data: 'number=' + numb,
								  	success: function(data){
								  		$("#image").html('<img src="data:image/png;base64,'+data+'"width="300"/>');
								  		info.style.opacity="1";
								  		info.style.zIndex="3";
								  		surname.innerHTML=array[row-1]["surname"];
								  		name.innerHTML=array[row-1]["name"];
								  		patronymic.innerHTML=array[row-1]["patronymic"];
								  		number.innerHTML=array[row-1]["number"];
								  		address.innerHTML="Адрес: "+array[row-1]["address"];


								  	}
								});
					    		

    					}
  					},
					  data:array,
			    	},
			    	
			    ],
			});
  		}
	});
}

close.onclick=function(){
	black_back.style.opacity="0";
	black_back.style.zIndex="-1";
	info.style.opacity="0";
	info.style.zIndex="-1";
}

webix.event(window, "resize", function(e){
    $$("table").resize();
});