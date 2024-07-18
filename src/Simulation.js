class Simulation {

    //Note (TO FIX)
    //should simulation care about what the hell User interface 
    //is being used to access it??
    //control panel????
    //stat log???????
    //omg i care so much that
    //i need stat log and control panel
    //else i don't work idk
    //yes i am simulation that needs a statistics log built
    //into it's implementation, or else don't work, yes and implementation
    //deeply cares about its poor control panel (because no one else will)
    //fix it goddamn it, it's fucking bullshit
    //more coupled than a tightly-coupled harmonic oscillator
    //less cohesion than [something that's not very cohesive]
    //open (as fuck) for modification and closed (as fuck) for extension

    constructor() {
        this.jackson_network = null;
        this.seekers = [];
        this.seekers_created = 0;
        this.seekers_processed = 0
        this.add_seeker_interval = 10;
        this.simulation_finished = false;
        this.frame_count = 0;
        this.max_seekers = 100;
        this.preset = null;
        this.control_panel = new ControlPanel();
        this.stat_log = new StatLog(this);
    }

    get_jackson_network_UI() {
        if (this.jackson_network != null) {
            return this.jackson_network.get_UI();
        } 
        return null;
    }

    init(preset) {
        this.preset = preset;
        this.seekers_created = 0;
        this.seekers_processed = 0
        this.simulation_finished = false;
        this.frame_count = 0;
        this.jackson_network = new JacksonNetwork(preset);
        this.jackson_network.attach_UI_interface();
    }

    restart() {
        this.clear_seekers();
        this.init(this.preset);
    }

    step() {
        if (this.is_finished()) return;
        this.add_seekers_periodic();
        this.update_seekers();  
        this.check_completion();
        this.update_frame_count();
    }

    update_frame_count() {
        if (!this.is_finished()) this.frame_count++;
    }

    display() {
        graphics.clear(c, ctx);
        this.display_seekers();
        this.jackson_network.display_nodes();
        this.control_panel.display();
        this.stat_log.display();
    }

    get_seekers_created() {
        return this.seekers_created;
    }

    get_seekers_processed() {
        return this.seekers_processed;
    }

    get_frame_count() {
        return this.frame_count;
    }

    check_completion() {
        if (this.seekers_created == this.seekers_processed) this.simulation_finished = true;
    }

    is_finished() {
        return this.simulation_finished;
    }

    update_seekers() {
        for (let i = 0; i < this.seekers.length; i++) {
            if (this.seekers[i].is_dead()) {
                this.seekers.splice(i,1);
                this.seekers_processed++;
            } 
            else this.seekers[i].update();
        }
    }

    display_seekers() {
        for (let i = 0; i < this.seekers.length; i++) {
            this.seekers[i].draw();
        }
    }

    clear_seekers() {
        this.seekers.splice(0, this.seekers.length);
    }

    add_seekers_periodic() {
        if (this.seekers_created < this.max_seekers && this.frame_count % this.add_seeker_interval == 0) {
            this.create_and_add_seeker_to_network();
        }
    }

    create_and_add_seeker_to_network() {
        let seeker = new Seeker(-150, H/2);
        seeker.set_speed(this.control_panel.get_seeker_speed());
        seeker.enter(this.jackson_network);
        this.seekers.push(seeker); 
        this.seekers_created++;
    }

    get_control_panel() {
        return this.control_panel;
    }

    change_jackson_network(preset) {
        this.preset = preset;
        this.jackson_network = new JacksonNetwork(preset);
        this.jackson_network.attach_UI_interface();
        for (let seeker of this.seekers) {
            if (!seeker.is_exiting_network())
            seeker.reset();
            seeker.enter(this.jackson_network);
        }
    }
}