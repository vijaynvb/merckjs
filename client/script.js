 //alert("hi");
 const divContent = document.getElementById('content');  
 divContent.innerHTML = "Hello World";

 const newElement = document.createElement('div');
 newElement.textContent = 'sometext';
 divContent.appendChild(newElement);
 
 setTimeout(() => {
     divContent.style.color='red';
 }, "5000");