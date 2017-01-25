{
    document.addEventListener("DOMContentLoaded", () => {
        const API_KEY = 'AIzaSyAw76SCTSMDn3wpXC3sH6dB_i-i2SA7HR8';

        const CAT_ID = 'cat.mx_739f3kl5k85k9ekt4l7h8q59ic@group.calendar.google.com'; // ALL CAT EVENTS
        const ECH_ID = 'cat.mx_3tk1f1cevauc1peloqduvain0s@group.calendar.google.com'; // ECH EVENTS
        const ES_ID = 'cat.mx_9unrjemuhto2tlsdnjr8uh1g9s@group.calendar.google.com'; // ES EVENTS
        const HS_ID = 'cat.mx_icuu2bnq9gs34i1fuklgnqf8mg@group.calendar.google.com'; // HS EVENTS
        const CALENDAR_IDs = [CAT_ID, ECH_ID, ES_ID, HS_ID];

        CALENDAR_IDs.forEach(ID => getEvents(ID));

        function getEvents(ID) {
            const eventsDiv = document.querySelector('.events');
            let events = [];
            $.ajax({
                type: 'GET',
                url: encodeURI(`https://www.googleapis.com/calendar/v3/calendars/${ID}/events?key=${API_KEY}`),
                dataType: 'json',
                success(res) {
                    
                    for (let event of res.items) {
                        //console.log(event);
                        const testDate = event.start.dateTime ? 
                            new Date(event.start.dateTime) : new Date(event.start.date);

                        // const limitDate = new Date();
                        // limitDate.setDate(limitDate.getDate() + 30);

                        if (testDate >= Date.now()) {

                            let startDate = null;
                            let allDay = false;

                            if (event.start.date) {
                                let rawDate = new Date(event.start.date).toISOString();
                                startDate = new Date(rawDate);
                                allDay = true;
                            } else if (event.start.dateTime) startDate = new Date(event.start.dateTime);

                            // eventsDiv.appendChild(eventItem.createContainer(event, startDate, allDay));

                            const modEvent = event;
                            modEvent.startDate = startDate;
                            modEvent.allDay = allDay;
                            events.push(modEvent);
                            console.log(events);
                        }
                    }
                },
                error(res) {
                    console.log(res);
                    eventsDiv.textContent = "Something went wrong when fetching events.";
                }
            });

            // for (let i = 0; i < 4; i++) {
            //     console.log(events[i]);
            // }
        }

        const format = {
            setTime(startDate, allDay) {
                let formattedStartDate = "";
                if (allDay) formattedStartDate = "All day";
                else {
                    let startHour = startDate.getHours();
                    let startMinutes = startDate.getMinutes();
                    if (startHour < 10) startHour = `0${startHour}`;
                    if (startMinutes < 10) startMinutes = `0${startMinutes}`;
                    formattedStartDate = `${startHour}:${startMinutes} hrs.`;
                }
                return formattedStartDate;
            },
            setLevel(event) {
                let level = event.organizer.displayName;
                if (level === "_CAT") level = "School-wide";
                else if (level === "_HS") level = "High School";
                else if (level === "_ES") level = "Elementary School";
                else if (level === "_ECH") level = "Early Childhood";
                else level = "Unknown";
                return level;
            },
            setMonth(startDate) {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return months[startDate.getMonth()];
            }
        };

        const eventItem = {
            createDateContainer(startDate) {
                const eventDateH2 = document.createElement("h2");
                eventDateH2.classList.add("uk-flex", "uk-flex-column", "uk-flex-middle", "event-date", "uk-text-bold");
                eventDateH2.textContent = startDate.getDate();

                const eventDateSpan = document.createElement("span");
                eventDateSpan.classList.add("uk-text-uppercase");
                eventDateSpan.textContent = format.setMonth(startDate);

                eventDateH2.appendChild(eventDateSpan);
                return eventDateH2;
            },
            createStackContainer(event) {
                const eventStackDiv = document.createElement("div");
                eventStackDiv.classList.add("event-stack");

                const eventNameP = document.createElement("p");
                eventNameP.classList.add("event-name", "uk-text-bold");
                const summary = event.summary;
                eventNameP.textContent = summary;
                eventStackDiv.appendChild(eventNameP);

                const eventLevelP = document.createElement("p");
                eventLevelP.classList.add("event-level");
                eventLevelP.textContent = format.setLevel(event);
                eventStackDiv.appendChild(eventLevelP);

                if (event.location) {
                    const eventPlaceP = document.createElement("p");
                    eventPlaceP.classList.add("event-place");
                    const location = event.location;
                    eventPlaceP.textContent = location;
                    eventStackDiv.appendChild(eventPlaceP);
                }
                return eventStackDiv;
            },
            createStartTimeContainer(startDate, allDay) {
                const eventStartP = document.createElement("p");
                eventStartP.classList.add("event-start");
                eventStartP.textContent = format.setTime(startDate, allDay);
                return eventStartP;
            },
            createContainer(event, startDate, allDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("uk-flex", "events-item");

                if (event.organizer.displayName === "_CAT") eventDiv.classList.add("event-cat");
                else if (event.organizer.displayName === "_ES") eventDiv.classList.add("event-es");
                else if (event.organizer.displayName === "_HS") eventDiv.classList.add("event-hs");
                else if (event.organizer.displayName === "_ECH") eventDiv.classList.add("event-ech");

                eventDiv.appendChild(this.createDateContainer(startDate));
                eventDiv.appendChild(this.createStackContainer(event));
                eventDiv.appendChild(this.createStartTimeContainer(startDate, allDay));
                return eventDiv;
            }
        };
    });
}