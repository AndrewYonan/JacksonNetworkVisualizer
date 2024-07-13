
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const frame_rate = 60;
const iterator = setInterval(frame, 1000 / frame_rate);
const W = 1500;
const H = 900;
const SEEKER_SPEED = 6; 
const SEEKER_SIZE = 22; //min 10
const SERVER_SIZE = SEEKER_SIZE;
const LINE_SPACE_BETWEEN = 5;
var frame_count = 0;
var seekers_created = 0;
var seekers_processed = 0;
var simulation_finished = false;
const MAX_SEEKERS = 120;

var seekers = []; //seeker instances
var statLog = new StatLog(); //clock, instance counts

/* set jackson network structure
- choose between configurations:
single-queue, double-queue, fork, 3-fork, fan, 2-fan, spiral, steps, waterfall, star
 */

var jacksonNetwork = new JacksonNetwork("star");
var add_seeker_interval = 5;


function frame() {
    if (!simulation_finished) {
        update_simulation_state();
    }
    display_simulation_state();
}


function update_simulation_state() {
    add_seekers_periodic();
    update_seekers();
    frame_count++;
    if (seekers.length == 0) simulation_finished = true;
}

function create_and_add_seeker_to(jacksonNetwork) {
    let seeker = new Seeker(-150, H/2);
    seeker.enter(jacksonNetwork);
    seekers.push(seeker); 
    seekers_created++;
}

function add_seekers_periodic() {
    if (seekers_created < MAX_SEEKERS && frame_count % add_seeker_interval == 0) {
        create_and_add_seeker_to(jacksonNetwork);
    }
}

function update_seekers() {
    for (let i = 0; i < seekers.length; i++) {
        if (seekers[i].is_dead()) {
            seekers.splice(i,1);
            seekers_processed++;
        } 
        else seekers[i].update();
    }
}


function display_simulation_state() {
    graphics.clear(c, ctx);
    display_seekers();
    jacksonNetwork.display_nodes();
    statLog.display();
}



function display_seekers() {
    for (let i = 0; i < seekers.length; i++) {
        seekers[i].draw();
    }
}