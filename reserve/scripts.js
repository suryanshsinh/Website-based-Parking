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
            document.getElementById("s" + i).style.backgroundImage = `url("../assets/${ i > 4 ? i%4 : i}.png")`;
            let hoursLeft = slots["s" + i]["hour"] - time[0];
            let minutesLeft = slots["s" + i]["minute"] - time[1];
            if (minutesLeft < 0) {
                minutesLeft += 60;
                hoursLeft--;
            }
            if (hoursLeft === 0 && minutesLeft === 0) {
                slots["s" + i]["status"] = "0";
                slots["s" + i]["name"] = "s" + i;
                slots["s" + i]["plate"] = "0";
                slots["s" + i]["time"] = "0";
                slots["s" + i]["hours"] = "0";
                slots["s" + i]["minutes"] = "0";
            }
            document.getElementById("s" + i).innerHTML = `<button class="reserve-button bg-red" onclick="displayUser(${i})">Reserved for ${ hoursLeft + "H:" + minutesLeft + "M"}</button>`;
            document.getElementById("s" + i).addEventListener("mouseover", function() {
                if (slots["s" + i]["status"] === "1") {
                    document.querySelector(".displayUser").style.display = "flex";
                    document.querySelector(".displayUser").innerHTML = slots["s" + i]["name"] + '<br>' + slots["s" + i]["plate"];
                }
            });
            document.getElementById("s" + i).addEventListener("mouseout", function() {
                document.querySelector(".displayUser").style.display = "none";
            });
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
        hour: parseInt(hours.value) + date.getHours() + ((parseInt(minutes.value) + date.getMinutes() > 60) ? 1 : 0),
        minute: parseInt(minutes.value) + date.getMinutes() - ((parseInt(minutes.value) + date.getMinutes() > 60) ? 60 : 0),
        time: [date.getHours(), date.getMinutes()]
    }
    document.querySelector(".popup").style.display = 'none';
    document.querySelector(".payment").style.display = 'flex';
    if (parseInt(hours.value) > 0) {
        document.getElementById("amount").innerHTML = (parseInt(hours.value)*30) + ((parseInt(minutes.value) > 30) ? 15 : 0);
    }
    else {
        document.getElementById("amount").innerHTML = 15;
    }
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