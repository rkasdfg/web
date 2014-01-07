function edit(host,submit) { 
	var test = document.getElementById(host); 
	var mysubmit = document.getElementById(submit); 
	test.readOnly = false; 
	test.className = "s"; 
	mysubmit.style.display = ""; 
} 

function show(host,submit) { 
	var test = document.getElementById(host); 
	var mysubmit = document.getElementById(submit); 
	test.readOnly = true; 
	test.className = "t"; 
	mysubmit.style.display = "none"; 
} 

function def(host,submit) { 
	var test = document.getElementById(host); 
	var mysubmit = document.getElementById(submit); 
	test.readOnly = true; 
	test.className = "t"; 
	mysubmit.style.display = "none"; 
} 