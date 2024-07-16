
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const frame_rate = 60;
const iterator = setInterval(frame, 1000 / frame_rate);
const W = 1500; //width
const H = 900; //height
const SEEKER_SIZE = 20; // size of queue entries (seekers)
const SERVER_SIZE = SEEKER_SIZE; //size of queue service nodes
const LINE_SPACE_BETWEEN = 8; //space between queue entries (seekers)
const evtHandler = new EventHandler();
var simulation = new Simulation();


evtHandler.active();
simulation.init("Cycle");


function frame() {
    simulation.step();
    simulation.display();
}