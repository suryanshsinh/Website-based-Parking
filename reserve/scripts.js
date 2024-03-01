let slots = {
    "s1": {
        "status": "0",
        "name": "s1",
        "plate": "0",
        "time": "0",
        "hours": "0",
        "minutes": "0"
    },
    "s2": {
        "status": "0",
        "name": "s1",
        "plate": "0",
        "time": "0",
        "hours": "0",
        "minutes": "0"
    },
    "s3": {
        "status": "0",
        "name": "s1",
        "plate": "0",
        "time": "0",
        "hours": "0",
        "minutes": "0"
    },
    "s4": {
        "status": "0",
        "name": "s1",
        "plate": "0",
        "time": "0",
        "hours": "0",
        "minutes": "0"
    },
    "s5": {
        "status": "0",
        "name": "s1",
        "plate": "0",
        "time": "0",
        "hours": "0",
        "minutes": "0"
    },
    "s6": {
        "status": "0",
        "name": "s1",
        "plate": "0",
        "time": "0",
        "hours": "0",
        "minutes": "0"
    }
};
let s;
let slot;
let name = document.getElementById("name");
let plate = document.getElementById("plate");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");

function getSlots() {
    // let slots = await fetch("/reserve/api/slots.json");
    // return slots.json();
    return slots;
}

function paintSlots() {
    let slots = getSlots();
    let date = new Date();
    let time = [date.getHours(), date.getMinutes()];
    for (let i = 1; i < 7; i++) {
        if (slots["s" + i]["status"] === "1") {
            document.getElementById("s" + i).style.backgroundImage = `url("/assets/${ i > 4 ? i%4 : i}.png")`;
                        // Calculate hours and minutes left till the slot expires
            let currentHours = time[0];
            let currentMinutes = time[1];
            let bookedHours = slots["s" + i]["time"][0];
            let bookedMinutes = slots["s" + i]["time"][1];
            let bookedDurationHours = parseInt(slots["s" + i]["hours"]);
            let bookedDurationMinutes = parseInt(slots["s" + i]["minutes"]);

            let hoursLeft = bookedDurationHours - (currentHours - bookedHours);
            let minutesLeft = bookedDurationMinutes - (currentMinutes - bookedMinutes);

            // let h = parseInt(slots["s" + i]["hours"]) + parseInt(slots["s" + i]["time"][0]) - time[0];
            // let m = parseInt(slots["s" + i]["minutes"]) + parseInt(slots["s" + i]["time"][1]) - time[1];            
            document.getElementById("s" + i).innerHTML = `<button class="reserve-button bg-red">Reserved for ${ hoursLeft + "H " + minutesLeft }M</button>`;
        }
        else {
            document.getElementById("s" + i).style.backgroundImage = 'none';
            document.getElementById("s" + i).innerHTML = '<button class="reserve-button bg-green" onclick="reserveMenu('+i+')">Reserve Slot-'+i+'</button>';
        }
    }
}

function reserveMenu(slot) {
    openPopup();
    document.getElementById('reserve-slot-heading').innerHTML = `Reserve Slot: ${slot}`;
    s = slot;
}

function submit() {
    let slots = getSlots();
    let date = new Date();
    slot = {
        status: "1",
        name: name.value,
        plate: plate.value,
        hours: hours.value,
        minutes: minutes.value,
        time: [date.getHours(), date.getMinutes()]
    }
    document.querySelector(".popup").style.display = 'none';
    document.querySelector(".payment").style.display = 'flex';
    document.getElementById("amount").innerHTML = (parseInt(hours.value)*30) + ((parseInt(minutes.value) > 30) ? 15 : 0);
    name.value = "";
    plate.value = "";
    hours.value = "";
    minutes.value = "";
}

setInterval(paintSlots, 1000);

function pay() {
    slots["s" + s] = slot;
    closePopup();
}

function closePopup() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector(".popup").style.display = 'flex';
    document.querySelector(".payment").style.display = 'none';
    name.value = "";
    plate.value = "";
    hours.value = "";
    minutes.value = "";
}
function openPopup() {
    document.querySelector('.overlay').style.display = 'flex';
}