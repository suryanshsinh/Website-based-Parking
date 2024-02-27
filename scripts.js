async function paintSlots() {
    let response = await fetch("/api/slots.json");
    let slots = await response.json();
    document.getElementById("s1").style.backgroundImage = slots["s1"] === "1" ? 'url("/assets/1.png")' : "none";
    document.getElementById("s2").style.backgroundImage = slots["s2"] === "1" ? 'url("/assets/4.png")' : "none";
    document.getElementById("s3").style.backgroundImage = slots["s3"] === "1" ? 'url("/assets/3.png")' : "none";
    document.getElementById("s4").style.backgroundImage = slots["s4"] === "1" ? 'url("/assets/2.png")' : "none";
    document.getElementById("s5").style.backgroundImage = slots["s5"] === "1" ? 'url("/assets/1.png")' : "none";
    document.getElementById("s6").style.backgroundImage = slots["s6"] === "1" ? 'url("/assets/4.png")' : "none";
}

setInterval(paintSlots, 1000);