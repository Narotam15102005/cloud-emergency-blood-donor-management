/* =========================================
   BLOODCONNECT
   JavaScript Functionality
   ========================================= */


/* =========================================
   SCROLL TO DONORS
   ========================================= */

function scrollToDonors() {

    const donorsSection = document.getElementById("donors");

    donorsSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   EMERGENCY REQUEST MODAL
   ========================================= */

function openRequest() {

    const modal = document.getElementById("requestModal");

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeRequest() {

    const modal = document.getElementById("requestModal");

    modal.classList.remove("show");

    document.body.style.overflow = "auto";

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================= */

const requestModal = document.getElementById("requestModal");

requestModal.addEventListener("click", function(event) {

    if (event.target === requestModal) {

        closeRequest();

    }

});


/* =========================================
   ESCAPE KEY CLOSES MODAL
   ========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeRequest();

    }

});


/* =========================================
   BLOOD GROUP SEARCH
   ========================================= */

function searchBlood(group) {

    const result = document.getElementById("search-result");

    const donorData = {

        "A+": 214,
        "A-": 86,
        "B+": 302,
        "B-": 71,
        "AB+": 54,
        "AB-": 31,
        "O+": 398,
        "O-": 128

    };

    const count = donorData[group];

    result.innerHTML = `

        <h3>🩸 ${group} Blood Donors Available</h3>

        <p>
            There are currently
            <strong>${count}</strong>
            registered ${group} donors in the network.
        </p>

        <button
            class="primary-btn"
            style="margin-top:15px;"
            onclick="openRequestWithGroup('${group}')"
        >
            🚨 Request ${group} Blood
        </button>

    `;

    result.classList.add("show");

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   OPEN REQUEST WITH SELECTED BLOOD GROUP
   ========================================= */

function openRequestWithGroup(group) {

    openRequest();

    const bloodGroup = document.getElementById("bloodGroup");

    bloodGroup.value = group;

}


/* =========================================
   EMERGENCY REQUEST SUBMISSION
   ========================================= */

function submitRequest(event) {

    event.preventDefault();

    const patientName =
        document.getElementById("patientName").value.trim();

    const bloodGroup =
        document.getElementById("bloodGroup").value;

    const units =
        document.getElementById("units").value;

    const location =
        document.getElementById("location").value.trim();


    if (
        patientName === "" ||
        bloodGroup === "" ||
        units === "" ||
        location === ""
    ) {

        alert("Please fill all the required fields.");

        return;

    }


    const requestId =
        "REQ-" +
        Math.floor(100000 + Math.random() * 900000);


    closeRequest();


    setTimeout(function() {

        alert(
            "🚨 Emergency Request Created Successfully!\n\n" +

            "Request ID: " + requestId + "\n" +

            "Patient: " + patientName + "\n" +

            "Blood Group: " + bloodGroup + "\n" +

            "Units Required: " + units + "\n" +

            "Location: " + location + "\n\n" +

            "Compatible donors will be contacted."
        );


        document.querySelector("#requestModal form").reset();

    }, 300);

}


/* =========================================
   NAVBAR ACTIVE LINK
   ========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar nav a");


window.addEventListener("scroll", function() {

    let currentSection = "";

    sections.forEach(function(section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function(link) {

        link.style.color = "";

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

            link.style.color = "#e63946";

        }

    });

});


/* =========================================
   PAGE LOAD ANIMATION
   ========================================= */

window.addEventListener("load", function() {

    document.body.classList.add("loaded");

});


/* =========================================
   BUTTON RIPPLE EFFECT
   ========================================= */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest("button");

    if (!button) {
        return;
    }


    const ripple =
        document.createElement("span");

    ripple.style.position = "absolute";

    ripple.style.width = "10px";

    ripple.style.height = "10px";

    ripple.style.borderRadius = "50%";

    ripple.style.background =
        "rgba(255,255,255,0.35)";

    ripple.style.pointerEvents = "none";


    button.style.position = "relative";

    button.style.overflow = "hidden";


    const rect =
        button.getBoundingClientRect();


    ripple.style.left =
        event.clientX - rect.left + "px";

    ripple.style.top =
        event.clientY - rect.top + "px";


    button.appendChild(ripple);


    ripple.animate(
        [
            {
                transform: "translate(-50%, -50%) scale(0)",
                opacity: 0.8
            },
            {
                transform: "translate(-50%, -50%) scale(15)",
                opacity: 0
            }
        ],
        {
            duration: 500,
            easing: "ease-out"
        }
    );


    setTimeout(function() {

        ripple.remove();

    }, 500);

});


/* =========================================
   CONSOLE INFORMATION
   ========================================= */

console.log(
    "🩸 BloodConnect Emergency Donor Network Loaded Successfully."
);

console.log(
    "☁️ Cloud-ready Blood Donor Management System"
);
