
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const frame_rate = 60;
const iterator = setInterval(frame, 1000 / frame_rate);
const W = 1500;
const H = 900;
var frame_count = 0;
var seekers_created = 0;
var seekers_processed = 0;
var simulation_finished = false;
var seekers = []; //seeker instances
var statLog = new StatLog(); //clock, instance counts
var evtHandler = new EventHandler();
var controlPanel = new ControlPanel();

const MAX_SEEKERS = 100;
const SEEKER_SIZE = 20; 
const add_seeker_interval = 10; //frame period after which to add new seeker
const SEEKER_REACTION_TIME = 25; //reaction to next in queue moving up
const LINE_SPACE_BETWEEN = 8; //space between memebers of the queue

evtHandler.active();

/* set jackson network structure
- choose between configurations:
single-queue, double-queue, fork, 3-fork, fan, 2-fan, spiral, steps, waterfall, star
 */

var jacksonNetwork = new JacksonNetwork("fork");

function frame() {
    if (!simulation_finished) {
        update_simulation_state();
    }
    display_simulation_state();
}

function restart() {
    remove_seekers();
    jacksonNetwork.reset_nodes();
    controlPanel.reset_properties();
    frame_count = 0;
    seekers_created = 0;
    seekers_processed = 0;
    simulation_finished = false;
}

function remove_seekers() {
    seekers.splice(0, seekers.length);
}

function update_simulation_state() {
    update_control_panel_properties();
    add_seekers_periodic();
    update_seekers();
    frame_count++;
    if (seekers_created == seekers_processed) simulation_finished = true;
}


function update_control_panel_properties() {
    update_seeker_properties();

}

function update_seeker_properties() {

    let speed = controlPanel.get_seeker_speed();
    let reaction_margin = controlPanel.get_reaction_margin();
    
    for (let seeker of seekers) {
        seeker.set_speed(speed);
        seeker.set_reaction_margin(reaction_margin);
    }
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
    jacksonNetwork.update_nodes();
    statLog.display();
    controlPanel.display();
}



function display_seekers() {
    for (let i = 0; i < seekers.length; i++) {
        seekers[i].draw();
    }
}