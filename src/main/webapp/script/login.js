
function checkName(name)  
{
  if (name=="")  
  {  
	
      $('#imgName').attr("src","images/error.gif");
      
  }  
  else  
  {  
	  $('#imgName').attr("src","images/right.gif");
	
  }  
 
}  

function checkPass(password)  
{  

  if (password == "")  
  {  
	
	   $('#imgPass').attr("src","images/error.gif");
  }   
  else  
  {
	  $('#imgPass').attr("src","images/right.gif"); 
  }  
 
}  
function login(){
	
	var username=$('#username').val();
	var password=$('#password').val();
	$.post(
			'login',
			{username:username,password:password},
			function(data) {
				if(data==('success')){
					$('#loginMsg').hide();
					window.location.replace('homepage.jsp');
					
				}
					
				else
					{
						$('#loginMsg').html($.i18n.prop('msgLogin'));
						$('#loginMsg').show();
					}
			});
}

$(document).ready(function() {
	loadProperties();
});

