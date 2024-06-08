// Main pomodoro timer
let mainTimer;
let mainSeconds = 0o0;
let mainMinutes = 25;
let mainIsTimerRunning = false;

const audio = new Audio('static/media/audio/Airtel Mp3 - Airtel Song.mp3');

function startMainTimer() {
	if (!mainIsTimerRunning) {
		mainTimer = setInterval(updateMainTimer, 1000);
		mainIsTimerRunning = true;
	}
}

function updateMainTimer() {
	if (mainSeconds === 0o0 && mainMinutes === 0){
		clearInterval(mainTimer);
		mainIsTimerRunning = false;
		timerComplete();
		return;
	}

	if (mainSeconds === 0o0 ){
		mainSeconds = 59;
		mainMinutes--;
	} else {
		mainSeconds--;
	}
	updateMainTimerDisplay();
}


function updateMainTimerDisplay() {
	document.getElementById('minutes').innerText = padTime(mainMinutes);
	document.getElementById('seconds').innerText = padTime(mainSeconds);
}

function timerComplete() {
	audio.play();
}

function pauseTimer() {
	clearInterval(mainTimer);
	mainIsTimerRunning = false;
}

function resetTimer() {
	clearInterval(mainTimer);
	mainIsTimerRunning = false;
	mainSeconds = 0o0;
	mainMinutes = 25;
	updateMainTimerDisplay();
}

function padTime(time) {
	return (time < 10) ? `0${time}` : time;
}



// For individual timer
const timers = {};

function startITimer(timerId) {
	const initialMinutes = parseInt(document.getElementById(`initialMinutes${timerId}`).innerText) || 0o0;
	const initialSeconds = parseInt(document.getElementById(`initialSeconds${timerId}`).innerText) || 0o0;

	const totalSeconds = initialMinutes * 60 + initialSeconds;

	timers[timerId] = {
		timer: setInterval(() => updateITimer(timerId), 1000),
		isTimerRunning: true,
		minutes: initialMinutes,
		seconds: initialSeconds,
		totalSeconds: totalSeconds,
		progressBar: document.getElementById(`progressBar${timerId}`)
	};

	setProgressBarDuration(timerId, totalSeconds);
	updateITimerDisplay(timerId);
}

function setProgressBarDuration(timerId, duration) {
	const progressBar = timers[timerId].progressBar;
	progressBar.style.setProperty('--duration', duration + 's');
}

function updateITimer(timerId) {
	let timer = timers[timerId];

	// Check if the timer is running
	if (timer.seconds === 0o0 && timer.minutes === 0o0) {
		clearInterval(timer.timer);
		timer.isTimerRunning = false;
		timerComplete(timerId);
		return;
	}

	if (timer.seconds ===0o0 ) {
		timer.seconds = 59;
		timer.minutes--;
	} else {
		timer.seconds--;
	}

		updateITimerDisplay(timerId);
		updateProgressBar(timerId);
}

function updateProgressBar(timerId) {
	let timer = timers[timerId];

	let remainingSeconds = timer.minutes * 60 + timer.seconds;
	let progressPercentage = ((timer.totalSeconds - remainingSeconds) / timer.totalSeconds) * 100;

	timer.progressBar.style.width = `${progressPercentage}%`;

}


function pauseITimer(timerId) {
	const timer = timers[timerId];

	if (timer.isTimerRunning) {
		clearInterval(timer.timer);
		timer.isTimerRunning = false;
	}
}

function resumeITimer(timerId) {
	const timer = timers[timerId];

	if (!timer.isTimerRunning) {
		timer.timer = setInterval(() => updateITimer(timerId), 1000);
		timer.isTimerRunning = true;
	}
}

function resetITimer(timerId) {
	const initialMinutes = parseInt(document.getElementById(`initialMinutes${timerId}`).innerText) || 0;
	const initialSeconds = parseInt(document.getElementById(`initialSeconds${timerId}`).innerText) || 0;

	let timer = timers[timerId];
	clearInterval(timer.timer);
	timer.isTimerRunning = false;
	timer.seconds = initialSeconds;
	timer.hours = 0;
	timer.minutes = initialMinutes;
	updateITimerDisplay(timerId);
}

function timerComplete(timerId) {
	const audio1 = new Audio('static/media/audio/Airtel Mp3 - Airtel Song.mp3');
	console.log("Played...")
	audio1.play();
}

function updateITimerDisplay(timerId) {
	let timer = timers[timerId];;
	const formattedMinutes = padTime(timer.minutes);
	const formattedSeconds = padTime(timer.seconds);

	document.getElementById(`minutes${timerId}`).innerText = formattedMinutes;
	document.getElementById(`seconds${timerId}`).innerText = formattedSeconds;
}

function padTime(time) {
	return (time < 10) ? `0${time}` : time;
}
