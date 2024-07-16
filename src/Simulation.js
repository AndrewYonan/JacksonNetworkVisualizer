class Simulation {

    constructor() {
        this.jackson_network = null;
        this.seekers = [];
        this.seekers_created = 0;
        this.seekers_processed = 0
        this.add_seeker_interval = 2;
        this.simulation_finished = false;
        this.frame_count = 0;
        this.max_seekers = 100;

        this.control_panel = new ControlPanel();
        this.stat_log = new StatLog(this);
        this.control_panel_update_interval = 5;
        
    }

    init(preset) {
        this.seekers_created = 0;
        this.seekers_processed = 0
        this.add_seeker_interval = 10;
        this.simulation_finished = false;
        this.frame_count = 0;
        this.jackson_network = new JacksonNetwork(preset);
    }

    restart() {
        this.clear_seekers();
        this.jackson_network.reset_nodes();
        this.frame_count = 0;
        this.seekers_created = 0;
        this.seekers_processed = 0;
        this.simulation_finished = false;
    }

    step() {
        this.add_seekers_periodic();
        this.update_seekers(); 
        this.update_control_panel_properties(); 
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

    update_control_panel_properties() {
        if (this.control_panel.sliders_have_been_changed_recently(this.frame_count)) {
            if (this.frame_count % this.control_panel_update_interval == 0) {
                this.update_seeker_properties_from_control_panel();
            }
        }
    }

    update_seeker_properties_from_control_panel() {
        let speed = this.control_panel.get_seeker_speed();
        let reaction_margin = this.control_panel.get_reaction_margin();
        for (let seeker of this.seekers) {
            seeker.set_speed(speed);
            seeker.set_reaction_margin(reaction_margin);
        }
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

    change_jackson_network_structure(preset) {
        this.jackson_network = new JacksonNetwork(preset);
        for (let seeker of this.seekers) {
            if (!seeker.is_exiting_network())
            seeker.reset();
            seeker.enter(this.jackson_network);
        }
    }
}