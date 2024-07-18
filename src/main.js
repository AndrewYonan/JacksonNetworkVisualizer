
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const frame_rate = 60;
const W = 1500; //width
const H = 900; //height
const SEEKER_SIZE = 20; // size of queue entries (seekers)
const SERVER_SIZE = SEEKER_SIZE; //size of queue service nodes
const LINE_SPACE_BETWEEN = 8; //space between queue entries (seekers)
const iterator = setInterval(frame, 1000 / frame_rate);
const evtHandler = new EventHandler();
var simulation = new Simulation();

var ZOOM_SCALE = 1; //unused, couldn't implement correctly
var X_ORIGIN = 0;
var Y_ORIGIN = 0;

evtHandler.set_active();
simulation.init("1-Queue");


function frame() {
    simulation.step();
    simulation.display();
}