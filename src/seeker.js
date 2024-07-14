class Seeker {

    constructor(x_0, y_0) {

        this.x = x_0;
        this.y = y_0;
        this.size = SEEKER_SIZE;
        this.speed = SEEKER_SPEED;

        this.target_node = null;
        this.service_completed = false;
        this.in_line_for_service = false; //moving through waiting queue
        this.ready_for_service = false; //ready to move into serving box
        this.being_serverd = false; //begin served at service box
        this.place_in_line = 0; //current spot in line
        this.moving_up_in_line = false; //moving to next spot in line
        this.is_last_in_line = false; 
        this.exiting_system = false;
        this.successor_move_reaction_margin = SEEKER_REACTION_TIME;
        
        this.next_spot_in_line = null;
        this.successor = null;
        this.dead = false;
        this.active = true;
        this.visible = true;

    }

    set_speed(s) {
        this.speed = s;
    }

    set_target_node(node) {
        this.target_node = node;
    }

    enter(jacksonNetwork) {

        let entry_node = jacksonNetwork.get_random_entry_node();
        if (entry_node == null) console.log("ERROR: entry_node null");
        this.set_target_node(entry_node);
    }

    activate() {
        this.active = true;
    }

    stop() {
        this.active = false;
    }

    set_next_target_node() {
        if (this.target_node.get_tag() == "exit" || this.target_node.get_tag() == "entry-exit") {
            this.exiting_system = true;
        } 
        else {
            this.target_node = this.target_node.get_probabilistic_adjacent_node();
            if (this.target_node == null) {
                console.log("No available next nodes in jackson network found");
                this.kill();
            }
            this.reset_service_params();
        }
    }

    reset_service_params() {
        this.service_completed = false;
        this.in_line_for_service = false;
        this.ready_for_service = false;
        this.being_serverd = false;
        this.place_in_line = 0;
        this.moving_up_in_line = false;
        this.is_last_in_line = false;
        this.next_spot_in_line = null;
        this.successor = null;
    }

    is_in_range_of(vec2) {
        let margin = this.speed;
        return (Math.abs(this.x - vec2.x) < margin && Math.abs(this.y - vec2.y) < margin);
    }

    dist(vec_1, vec_2) {
        return Math.sqrt(Math.pow((vec_2.x - vec_1.x), 2) + Math.pow((vec_2.y - vec_1.y), 2));
    }

    move_towards(vec2) {
        let dir = {x : vec2.x - this.x, y : vec2.y - this.y};
        let mag = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        if (mag == 0) return; // took 2 hours to fix this bug!
        dir.x /= mag;
        dir.y /= mag;
        this.x += (dir.x * this.speed);
        this.y += (dir.y * this.speed);
    }

    snap_to(vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }

    move_to_end_of_line() {
        this.move_towards(this.target_node.get_end_of_line());
    }

    move_to_service() {
        this.move_towards(this.target_node.get_server_position());
    }

    move_to_next_line_spot() {
        this.move_towards(this.next_spot_in_line);
    }

    update_next_spot_in_line() {

        let target_server = this.target_node.get_server();

        if (this.next_spot_in_line == null) {

            if (target_server.get_line_orientation() == 1) {
                this.next_spot_in_line = {x : this.x + (SEEKER_SIZE + LINE_SPACE_BETWEEN), y : this.y};
            }
            else if (target_server.get_line_orientation() == 2) {
                this.next_spot_in_line = {x : this.x, y : this.y + (SEEKER_SIZE + LINE_SPACE_BETWEEN)};
            }
            else if (target_server.get_line_orientation() == 3) {
                this.next_spot_in_line = {x : this.x - (SEEKER_SIZE + LINE_SPACE_BETWEEN), y : this.y};
            }
            else if (target_server.get_line_orientation() == 4) {
                this.next_spot_in_line = {x : this.x, y : this.y - (SEEKER_SIZE + LINE_SPACE_BETWEEN)};
            }
        }
        else {

            if (target_server.get_line_orientation() == 1) {
                this.next_spot_in_line.x += (SEEKER_SIZE + LINE_SPACE_BETWEEN);
            }
            else if (target_server.get_line_orientation() == 2) {
                this.next_spot_in_line.y += (SEEKER_SIZE + LINE_SPACE_BETWEEN);
            }
            else if (target_server.get_line_orientation() == 3) {
                this.next_spot_in_line.x -= (SEEKER_SIZE + LINE_SPACE_BETWEEN);
            }
            else if (target_server.get_line_orientation() == 4) {
                this.next_spot_in_line.y -= (SEEKER_SIZE + LINE_SPACE_BETWEEN);
            }
        }
    }

    is_in_range_of_line_end() {
        return this.is_in_range_of(this.target_node.get_end_of_line());
    }

    is_in_range_of_server() {
        return this.is_in_range_of(this.target_node.get_server_position());
    }

    next_seeker_in_line_moved_up() {
        if (this.successor != null) {
            return (this.dist({x : this.x, y : this.y}, {x : this.successor.x, y : this.successor.y}) > (SEEKER_SIZE + LINE_SPACE_BETWEEN + this.successor_move_reaction_margin));
        }
        return false;
    }

    is_in_range_of_next_line_spot() {
        return this.is_in_range_of(this.next_spot_in_line);
    }

    at_front_of_line() {
        return this.place_in_line == 0;
    }

    end_service() {
        this.being_served = false;
        this.service_completed = true;
    }

    move_to_exit() {
        this.move_towards({x : W+100, y : this.y})
    }

    out_of_bounds() {
        let margin = 10;
        return (this.x < -margin || this.x > W + margin) || (this.y < -margin || this.y > H + margin);
    }

    kill() {
        this.dead = true;
    }

    is_dead() {
        return this.dead;
    }

    enqueue() {
        let target_server = this.target_node.get_server();
        target_server.enqueue(this);
    }

    move_to_target_node(node) {
        let server = node.get_server();
        if (this.being_served) {
            server.serve(this);
        }
        else if (this.ready_for_service) {
            this.move_to_service();
            if (this.is_in_range_of_server()) {
                this.ready_for_service = false;
                this.being_served = true;
                this.snap_to({x : server.x, y : server.y});
            }
        }
        else if (this.in_line_for_service) {
            if (this.at_front_of_line()) {
                if (!server.is_occupied) {
                    this.in_line_for_service = false;
                    server.is_occupied = true;
                    this.ready_for_service = true;
                    this.place_in_line = -1;
                }
            }
            else {
                if (this.moving_up_in_line) {
                    this.move_to_next_line_spot();
                    if (this.is_in_range_of_next_line_spot()) {
                        if (this.is_last_in_line) {
                            server.move_end_of_line_forward();
                        }
                        this.place_in_line--;
                        this.moving_up_in_line = false;
                        this.snap_to(this.next_spot_in_line);
                        if (this.place_in_line > 0) {
                            this.update_next_spot_in_line();
                        }
                    }
                }
                else if (this.next_seeker_in_line_moved_up()) {
                    this.moving_up_in_line = true;
                }
            }
        }
        else {
            this.move_to_end_of_line();
            if (this.is_in_range_of_line_end()) {
                this.snap_to(server.end_of_line);
                this.enqueue();
                this.in_line_for_service = true;
            }
        }
    }

    update() {
        if (!this.active) return;
        if (this.service_completed) {
            if (this.exiting_system) {
                this.move_to_exit();
                if (this.out_of_bounds()) {
                    this.kill();
                }
            }
            else {
                this.set_next_target_node();
            }
        }
        else {
            this.move_to_target_node(this.target_node);
        }
    }

    show_place_in_line() {

        if (this.place_in_line < 0) return;
        let margin = (SEEKER_SIZE/2 + 5);
        let target_server = this.target_node.get_server();

        ctx.font = "15px Arial";
        let cur = ctx.fillStyle;
        ctx.fillStyle = graphics.text_reg_color();

        if (target_server.get_line_orientation() == 1) {
            ctx.fillText((this.place_in_line + 1).toString(), this.x, this.y - margin);
        }
        else if (target_server.get_line_orientation() == 2) {
            ctx.fillText((this.place_in_line + 1).toString(), this.x + margin + 15, this.y);
        }
        else if (target_server.get_line_orientation() == 3) {
            ctx.fillText((this.place_in_line + 1).toString(), this.x, this.y - margin);
        }
        else if (target_server.get_line_orientation() == 4) {
            ctx.fillText((this.place_in_line + 1).toString(), this.x - margin - 15, this.y);
        }

        ctx.fillStyle = cur;

    }

    draw() {

        let cur_style = ctx.strokeStyle;
        let cur_width = ctx.lineWidth;

        if (this.being_served) {   
            ctx.lineWidth = 5; 
            graphics.trace_square(this.x, this.y, this.size, graphics.seeker_highlight_color());
        }
        else if (this.exiting_system) {
            ctx.lineWidth = 3;
            graphics.trace_square(this.x, this.y, this.size, graphics.seeker_finished_color());
        }
        else {
            ctx.lineWidth = 3;    
            graphics.trace_square(this.x, this.y, this.size, graphics.seeker_color());
        }
        
        ctx.lineWidth = cur_width;
        ctx.strokeStyle = cur_style;

        if (this.in_line_for_service) {
            this.show_place_in_line();
        }
    }
}