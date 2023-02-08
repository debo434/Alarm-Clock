
let alarmListArr = [];
showTime();
showAlam();

//for show actual time(clock)
function showTime() {
	var date = new Date();
	var h = date.getHours(); // 0 - 23
	var m = date.getMinutes(); // 0 - 59
	var s = date.getSeconds(); // 0 - 59
	var session = "AM";

	if (h == 0) {
		h = 12;
	}

	if (h > 12) {
		h = h - 12;
		session = "PM";
	}

	h = (h < 10) ? "0" + h : h;
	m = (m < 10) ? "0" + m : m;
	s = (s < 10) ? "0" + s : s;

	var time = h + ":" + m + ":" + s + " " + session;
	document.getElementById("MyClockDisplay").innerText = time;
	document.getElementById("MyClockDisplay").textContent = time;

	setTimeout(showTime, 1000);
	// let y=`${h}:${m}:${s}:${session}`;
	// 	console.log(y);
	

	//check and show alam alert
		for(let i=0; i<alarmListArr.length;i++){
			if(alarmListArr[i]==`${h}:${m}:${s}:${session}`){
				alert("Alam ring!!")
			}
		}
		//console.log("1")
	

}

//for set alam in local storage
let setBtn = document.getElementById("setBtn")
setBtn.addEventListener("click", function (e) {

	let hou = document.getElementById("hou");
	let min = document.getElementById("min");
	let sec = document.getElementById("sec");
	let pe = document.getElementById("pe");


	let alam = localStorage.getItem("showAlam");
	if (alam == null) {
		alamObj = [];
	}
	else {
		alamObj = JSON.parse(alam);
	}
	let MyObj = {
		h: hou.value,
		m: min.value,
		s: sec.value,
		pe: pe.value

	}

	alamObj.push(MyObj);
	localStorage.setItem("showAlam", JSON.stringify(alamObj));

	hou.value = "";
	min.value = "";
	sec.value = "";
	pe.value = "";

	//console.log(alamObj);

	
	showAlam();
})



//For Note Show parpass
function showAlam() {
	//console.log("1")
	let alam = localStorage.getItem("showAlam");
	if (alam == null) {
		alamObj = [];
	}
	else {
		alamObj = JSON.parse(alam);
	}
	let html = "";
	alamObj.forEach(function (element, index) {
		html += `
			<div class="myAlam my-3">
				<div>
					<span>${element.h}</span>:
					<span>${element.m}</span>:
					<span>${element.s}</span>:
					<span>${element.pe}</span>
				</div>

				<div><button id="${index}"onclick="deleteAlam(this.id)">Delete</button></div>
			</div>
        `;
		alarmTime = `${element.h}:${element.m}:${element.s}:${element.pe}`;
		console.log(alarmTime)
        alarmListArr.push(alarmTime);

	});
	let alamEle = document.getElementById("showAlam");
	//console.log(alamObj)
	//console.log(html)
	if (alamObj.length != 0) {
		alamEle.innerHTML = html;
	}
	
}

//Delete parpass
function deleteAlam(index) {
    //console.log(`I am deleting!! ${index}`);
    let alam = localStorage.getItem("showAlam");
    if (alam == null) {
        alamObj = [];
    }
    else {
        alamObj = JSON.parse(alam);
    }
    alamObj.splice(index, 1);
    localStorage.setItem("showAlam", JSON.stringify(alamObj));
    showAlam();
}





