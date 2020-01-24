let db_data;
let j=document.getElementById('for_json');
let black_back=document.getElementById('black_back');
let image=document.getElementById('image');
let info=document.getElementById('info');
let wrapper=document.getElementsByClassName('wrapper');
let close=document.getElementById('close');
let win_wid=document.documentElement.clientWidth;
let r=win_wid/4.5;

let surname=document.getElementById('surname');
let name=document.getElementById('name');
let patronymic=document.getElementById('patronymic');
let number=document.getElementById('number');
let address=document.getElementById('address');
let old_num=document.getElementById('old_num');
let uploader=document.getElementById('uploader');
let reset=document.getElementById('reset');


var tabs=document.getElementsByClassName('tab');
window.onload=function(){

	

	let k=[
	    { id:"surname", header:"Фамилия",sort:"string", fillspace:true},
	    { id:"name", header:"Имя",sort:"string", fillspace:true},
	    { id:"patronymic", header:"Отчество",sort:"string", fillspace:true }
	  ];

	$.ajax({
  		url: 'php/load_data.php',
  		success: function(data){
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
    				view:"datatable",
    				container:"table",
    				id:"table",
					  	columns:k,
					  	autoConfig:true,
					  	autoheight:true,

					  	on:{
					    	"onItemClick":function(id, e, trg){
					    		let num=array[this.getItem(id).id-1]["number"];
					    		let num_str=array[this.getItem(id).id-1]["id"];
					    		//alert(this.getItem(id).number);
					    	switch(head_flag){
					    		case 2:
					    			document.location.href = "https://vhost100866.cpsite.ru/php/delete.php?number="+num;
					    			break;
					    		case 3:
							    	black_back.style.opacity="0.7";
									black_back.style.zIndex="1";
									info.style.opacity="1";
								  	info.style.zIndex="3";

								  	surname.value=this.getItem(id).surname;
									name.value=this.getItem(id).name;
									patronymic.value=this.getItem(id).patronymic;
									number.value=this.getItem(id).number;
									old_num.value=num;
									address.value=this.getItem(id).address;
									uploader.required = false;
									break;



					    	}

    					}
  					},
					  data:array,
			    	
			   
			});
  		}
	});
}

let head_flag=0;
function visvet(){
    for (var j=0; j<tabs.length; j++){   
        tabs[j].style.backgroundColor="#485382";
        tabs[j].style.color="#ffffff";
        
        	tabs[j].classList.remove("shadow");
    }
    this.style.backgroundColor="#ffffff";
    this.style.color="#485382";
    this.classList.add("shadow");

    
    if (this==tabs[0]){
        head_flag=1;
    	black_back.style.opacity="0.7";
		black_back.style.zIndex="1";
		info.style.opacity="1";
	  	info.style.zIndex="3";
	  	reset.click();
    }
    if (this==tabs[1]){
        head_flag=2;
    }
    if (this==tabs[2]){
        head_flag=3;
        reset.click();
    }
}

for (var i=0; i<tabs.length; i++){
    tabs[i].onclick=visvet;
}

close.onclick=function(){
	black_back.style.opacity="0";
	black_back.style.zIndex="-1";
	info.style.opacity="0";
	info.style.zIndex="-2";
	for (var j=0; j<tabs.length; j++){   
        tabs[j].style.backgroundColor="#485382";
        tabs[j].style.color="#ffffff";
        tabs[j].classList.remove("shadow");
    }
    head_flag=0;
	reset.click();
}

webix.event(window, "resize", function(e){
    $$("table").resize();
});

$$("table").define("css", "table_font");