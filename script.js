/* =========================================
   BLOODCONNECT
   Emergency Blood Donor Management
========================================= */


/* =========================================
   DONOR SECTION
========================================= */

function scrollToDonors() {

    document
        .getElementById("donors")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   OPEN EMERGENCY MODAL
========================================= */

function openRequest() {

    const modal =
        document.getElementById("requestModal");

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE EMERGENCY MODAL
========================================= */

function closeRequest() {

    const modal =
        document.getElementById("requestModal");

    modal.classList.remove("show");

    document.body.style.overflow = "auto";

}


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

const requestModal =
    document.getElementById("requestModal");


requestModal.addEventListener(
    "click",
    function(event) {

        if (event.target === requestModal) {

            closeRequest();

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeRequest();

        }

    }
);


/* =========================================
   BLOOD SEARCH
========================================= */

function searchBlood(group) {

    const result =
        document.getElementById("search-result");


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


    const count =
        donorData[group];


    result.innerHTML = `

        <h3>
            🩸 ${group} Blood Donors Available
        </h3>

        <p>
            There are currently
            <strong>${count}</strong>
            registered ${group} donors in the network.
        </p>

        <button
            class="primary-btn"
            style="margin-top:15px;"
            onclick="openRequestWithGroup('${group}')">

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
   OPEN REQUEST WITH BLOOD GROUP
========================================= */

function openRequestWithGroup(group) {

    openRequest();

    document.getElementById("bloodGroup").value =
        group;

}


/* =========================================
   SUBMIT EMERGENCY REQUEST
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

        alert(
            "Please fill all the required fields."
        );

        return;

    }


    /* Create unique request ID */

    const requestId =
        "REQ-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    /* Create request object */

    const request = {

        id: requestId,

        patient: patientName,

        bloodGroup: bloodGroup,

        units: units,

        location: location,

        status: "URGENT",

        time: new Date().toLocaleString()

    };


    /* Get existing requests */

    let requests =
        JSON.parse(
            localStorage.getItem(
                "bloodRequests"
            )
        ) || [];


    /* Add newest request */

    requests.unshift(request);


    /* Save to browser */

    localStorage.setItem(
        "bloodRequests",
        JSON.stringify(requests)
    );


    /* Close modal */

    closeRequest();


    /* Clear form */

    document
        .querySelector("#requestModal form")
        .reset();


    /* Update screen */

    displayRequests();


    /* Update counter */

    updateRequestCount();


    /* Confirmation */

    alert(

        "🚨 Emergency Request Created Successfully!\n\n" +

        "Request ID: " +
        requestId +

        "\nPatient: " +
        patientName +

        "\nBlood Group: " +
        bloodGroup +

        "\nUnits Required: " +
        units +

        "\nLocation: " +
        location

    );


    /* Scroll to requests */

    setTimeout(function() {

        document
            .getElementById(
                "emergency-requests"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 400);

}


/* =========================================
   DISPLAY REQUESTS
========================================= */

function displayRequests() {

    const container =
        document.getElementById(
            "requests-container"
        );


    let requests =
        JSON.parse(
            localStorage.getItem(
                "bloodRequests"
            )
        ) || [];


    /* No requests */

    if (requests.length === 0) {

        container.innerHTML = `

            <div class="empty-requests">

                <div class="empty-icon">
                    🩸
                </div>

                <h3>
                    No Active Requests
                </h3>

                <p>
                    Emergency blood requests will appear here.
                </p>

            </div>

        `;

        updateRequestCount();

        return;

    }


    /* Display every request */

    container.innerHTML =
        requests.map(function(request) {

            return `

                <div class="request-card">

                    <div class="request-top">

                        <span class="request-id">
                            ${request.id}
                        </span>

                        <span class="request-status">
                            🚨 ${request.status}
                        </span>

                    </div>


                    <div class="request-blood">

                        <div class="request-blood-icon">
                            🩸
                        </div>

                        <div>

                            <h3>
                                ${request.bloodGroup}
                            </h3>

                            <p>
                                Blood Required
                            </p>

                        </div>

                    </div>


                    <div class="request-details">


                        <div class="request-detail">

                            <span>
                                Patient
                            </span>

                            <strong>
                                ${request.patient}
                            </strong>

                        </div>



                        <div class="request-detail">

                            <span>
                                Units Required
                            </span>

                            <strong>
                                ${request.units}
                                Unit(s)
                            </strong>

                        </div>



                        <div class="request-detail">

                            <span>
                                Hospital / Location
                            </span>

                            <strong>
                                ${request.location}
                            </strong>

                        </div>



                        <div class="request-detail">

                            <span>
                                Requested At
                            </span>

                            <strong>
                                ${request.time}
                            </strong>

                        </div>


                    </div>


                    <button
                        class="remove-request-btn"
                        onclick="removeRequest('${request.id}')">

                        ✓ Mark Request Completed

                    </button>


                </div>

            `;

        }).join("");


    updateRequestCount();

}


/* =========================================
   REMOVE / COMPLETE REQUEST
========================================= */

function removeRequest(requestId) {

    let requests =
        JSON.parse(
            localStorage.getItem(
                "bloodRequests"
            )
        ) || [];


    requests =
        requests.filter(
            function(request) {

                return request.id !== requestId;

            }
        );


    localStorage.setItem(
        "bloodRequests",
        JSON.stringify(requests)
    );


    displayRequests();

    updateRequestCount();

}


/* =========================================
   UPDATE REQUEST COUNTER
========================================= */

function updateRequestCount() {

    const requests =
        JSON.parse(
            localStorage.getItem(
                "bloodRequests"
            )
        ) || [];


    const counter =
        document.getElementById(
            "requestCount"
        );


    if (counter) {

        counter.textContent =
            requests.length;

    }

}


/* =========================================
   LOAD DATA WHEN PAGE OPENS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayRequests();

        updateRequestCount();

    }
);


/* =========================================
   NAVIGATION ACTIVE LINK
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


window.addEventListener(
    "scroll",
    function() {

        let currentSection = "";


        sections.forEach(
            function(section) {

                const sectionTop =
                    section.offsetTop - 150;


                const sectionHeight =
                    section.clientHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function(link) {

                link.style.color = "";


                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.style.color =
                        "#e63946";

                }

            }
        );

    }
);


/* =========================================
   BUTTON RIPPLE
========================================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {

            return;

        }


        const ripple =
            document.createElement(
                "span"
            );


        ripple.style.position =
            "absolute";


        ripple.style.width =
            "10px";


        ripple.style.height =
            "10px";


        ripple.style.borderRadius =
            "50%";


        ripple.style.background =
            "rgba(255,255,255,0.35)";


        ripple.style.pointerEvents =
            "none";


        button.style.position =
            "relative";


        button.style.overflow =
            "hidden";


        const rect =
            button.getBoundingClientRect();


        ripple.style.left =
            event.clientX -
            rect.left +
            "px";


        ripple.style.top =
            event.clientY -
            rect.top +
            "px";


        button.appendChild(
            ripple
        );


        ripple.animate(

            [

                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 0.8
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(15)",

                    opacity: 0
                }

            ],

            {

                duration: 500,

                easing: "ease-out"

            }

        );


        setTimeout(
            function() {

                ripple.remove();

            },
            500
        );

    }
);


console.log(
    "🩸 BloodConnect loaded successfully."
);
