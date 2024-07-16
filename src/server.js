class Server {
    constructor(x_0, y_0, rate, orientation) {
        this.x = x_0;
        this.y = y_0;
        this.size = SEEKER_SIZE + 20;
        this.service_time = rate;
        this.is_occupied = false;
        this.service_counter = 0;
        this.end_of_line_spot = 0;
        this.line_orientation = this.create_line_orientation(orientation); //1 - left, 2 - top, 3 - right, 4 - bottom (direction queueing instances line up for service)

        this.queue = [];
        this.space_between_line_spots = LINE_SPACE_BETWEEN;
        this.end_of_line = this.create_end_of_line();
    }

    reset_params() {
        this.is_occupied = false;
        this.service_counter = 0;
        this.end_of_line_spot = 0;
        this.queue = [];
        this.end_of_line = this.create_end_of_line();

    }

    remove_seekers() {
        this.queue.splice(0, this.queue.length);
    }

    create_end_of_line() {

        if (this.line_orientation == 1) {
            return {x : this.x - (this.size + this.space_between_line_spots), y : this.y};
        }
        else if (this.line_orientation == 2) {
            return {x : this.x, y : this.y - (this.size + this.space_between_line_spots)};
        }
        else if (this.line_orientation == 3) {
            return {x : this.x + (this.size + this.space_between_line_spots), y : this.y};
        }
        else if (this.line_orientation == 4) {
            return {x : this.x, y : this.y + (this.size + this.space_between_line_spots)};
        }
    }

    get_end_of_line() {
        return this.end_of_line;
    }

    create_line_orientation(i) {
        if (i == 1 || i == 2 || i == 3 || i == 4) {
            return i;
        }
        else {
            return 1;
        }
    }

    get_line_orientation() {
        return this.line_orientation;
    }

    set_service_time(t) {
        this.service_time = t;
    }

    move_end_of_line_back() {

        this.end_of_line_spot++;

        if (this.line_orientation == 1) {
            this.end_of_line.x -= (SEEKER_SIZE + this.space_between_line_spots);
        }
        else if (this.line_orientation == 2) {
            this.end_of_line.y -= (SEEKER_SIZE + this.space_between_line_spots);
        }
        else if (this.line_orientation == 3) {
            this.end_of_line.x += (SEEKER_SIZE + this.space_between_line_spots);
        }
        else if (this.line_orientation == 4) {
            this.end_of_line.y += (SEEKER_SIZE + this.space_between_line_spots);
        }
    }

    move_end_of_line_forward() {

        this.end_of_line_spot--;

        if (this.line_orientation == 1) {
            this.end_of_line.x += (SEEKER_SIZE + this.space_between_line_spots);
        }
        else if (this.line_orientation == 2) {
            this.end_of_line.y += (SEEKER_SIZE + this.space_between_line_spots);
        }
        else if (this.line_orientation == 3) {
            this.end_of_line.x -= (SEEKER_SIZE + this.space_between_line_spots);
        }
        else if (this.line_orientation == 4) {
            this.end_of_line.y -= (SEEKER_SIZE + this.space_between_line_spots);
        }
    }
    
    reset_end_of_line() {
        this.end_of_line_spot = 0;
        this.end_of_line = this.create_end_of_line();
    }

    get_line_successor_of(seeker) {
        if (this.queue.length == 0) return null;
        for (let i = this.queue.length - 1; i >= 0; --i) {
            if (this.queue[i].place_in_line < seeker.place_in_line) {
                return this.queue[i];
            }
        }
        return null;
    }

    enqueue(seeker) {
        seeker.place_in_line = this.end_of_line_spot;
        seeker.is_last_in_line = true;
        if (this.end_of_line_spot > 0) {
            seeker.successor = this.get_line_successor_of(seeker);
            seeker.successor.is_last_in_line = false;
            seeker.update_next_spot_in_line();
        }
        else {
            seeker.successor = null;
        }
        this.queue.push(seeker);
        this.move_end_of_line_back();
    }

    serve(seeker) {

        this.service_counter++;

        if (this.service_counter >= this.service_time) {
            this.service_counter = 0;
            seeker.end_service();
            this.dequeue();

            if (seeker.is_last_in_line) {
                this.reset_end_of_line();
            }

            this.is_occupied = false;
        }
    }

    dequeue() {
        this.queue.splice(0,1);
    }

    show_service_time() {

        ctx.font = "20px Arial";
        let margin = this.size/2 + 10;
        let cur = ctx.fillStyle;
        ctx.fillStyle = graphics.text_reg_color();

        if (this.line_orientation == 2) {
            ctx.fillText(this.service_counter.toString(), this.x + margin + 10, this.y); 
        }
        else {
            ctx.fillText(this.service_counter.toString(), this.x, this.y - margin);
        }

        ctx.fillStyle = cur;
    }

    show_end_of_line() {
        graphics.trace_square(this.end_of_line.x, this.end_of_line.y, SEEKER_SIZE + 2, "#333");
    }

    display() {

        if (this.is_occupied) {

            let cur_line_width = ctx.lineWidth;
            ctx.lineWidth = 3;
            graphics.trace_square(this.x, this.y, this.size, graphics.server_highlight_color());    
            ctx.lineWidth = cur_line_width;

            this.show_service_time();

        }
        graphics.trace_square(this.x, this.y, this.size, graphics.server_color());
    }
}