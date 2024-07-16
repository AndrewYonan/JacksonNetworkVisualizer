class JacksonNetworkBuilder {

    constructor(nodes) {
        this.nodes = nodes;
    }

    configure(preset) {
        if (preset == "1-Queue") {
            this.configure_single_queue();
        }
        else if (preset == "2-Queue") {
            this.configure_double_queue();
        }
        else if (preset == "3-Queue") {
            this.configure_triple_queue();
        }
        else if (preset == "Fork") {
            this.configure_fork();
        }
        else if (preset == "3-Fork") {
            this.configure_3_fork();
        }
        else if (preset == "Cycle") {
            this.configure_cycle();
        }
        else if (preset == "Fan") {
            this.configure_fan();
        }
        else if (preset == "2-Fan") {
            this.configure_2_fan();
        }
        else if (preset == "Spiral") {
            this.configure_spiral();
        }
        else if (preset == "Steps") {
            this.configure_steps();
        }
        else if (preset == "Waterfall") {
            this.configure_waterfall();
        }
        else if (preset == "Star") {
            this.configure_star();
        }
        else {
            this.configure_single_queue();
        }
    }

    configure_fork() {

        let node1 = new JacksonNode(W/3, H/2, 20, "entry", 1);
        let node2 = new JacksonNode(2*W/3, H/2 - 100, 70, "exit", 1);
        let node3 = new JacksonNode(2*W/3, H/2 + 100, 70, "exit", 1);

        node1.add_adjacent_node(node2, 0.5);
        node1.add_adjacent_node(node3, 0.5);

        this.nodes.push(node1);
        this.nodes.push(node2);
        this.nodes.push(node3);

    }

    configure_3_fork() {

        let node1 = new JacksonNode(W/3, H/2, 5, "entry", 1);
        let node2 = new JacksonNode(2*W/3, 1*H/4, 30, "reg", 1);
        let node3 = new JacksonNode(2*W/3, 2*H/4, 30, "exit", 1);
        let node4 = new JacksonNode(2*W/3, 3*H/4, 30, "reg", 1);

        node1.add_adjacent_node(node2, 0.4);
        node1.add_adjacent_node(node3, 0.2);
        node1.add_adjacent_node(node4, 0.4);
        node4.add_adjacent_node(node1, 1);
        node2.add_adjacent_node(node1, 1);

        this.nodes.push(node1);
        this.nodes.push(node2);
        this.nodes.push(node3);
        this.nodes.push(node4);
    }

    configure_single_queue() {

        let node1 = new JacksonNode(W/2, H/2, 50, "entry-exit", 1);
        this.nodes.push(node1);

    }


    configure_double_queue() {

        let node1 = new JacksonNode(W/3, H/2, 10, "entry", 1);
        let node2 = new JacksonNode(2*W/3, H/2, 11, "exit", 1);

        node1.add_adjacent_node(node2, 1);

        this.nodes.push(node1);
        this.nodes.push(node2);
    }

    configure_triple_queue() {

        let node1 = new JacksonNode(W/4, H/2, 15, "entry", 1);
        let node2 = new JacksonNode(2*W/4, H/2 - 100, 17, "reg", 1);
        let node3 = new JacksonNode(3*W/4, H/2 - 200, 19, "exit", 1);

        node1.add_adjacent_node(node2, 1);
        node2.add_adjacent_node(node3, 1);

        this.nodes.push(node1);
        this.nodes.push(node2);
        this.nodes.push(node3);
    }

    configure_cycle() {

        let entry = new JacksonNode(W/4, H/2, 5, "entry", 1);
        let lower1 = new JacksonNode(2*W/4, H/2 + 200, 5, "reg", 4);
        let lower2 = new JacksonNode(3*W/4, H/2 + 75, 9, "reg", 1);
        let upper1 = new JacksonNode(W/4 + 200, H/2 - 150, 5, "reg", 2);
        let upper2 = new JacksonNode(3*W/4 - 150, H/2 - 50, 7, "reg", 1);
        let top = new JacksonNode(W/2 + 400, 200, 7, "reg", 3);

        entry.add_adjacent_node(lower1, 1);
        lower1.add_adjacent_node(lower2, 0.5);
        lower1.add_adjacent_node(entry, 0.5);

        lower2.add_adjacent_node(top, 1);
        top.add_adjacent_node(upper1, 1);

        upper1.add_adjacent_node(upper2, 0.9);
        upper1.add_adjacent_node(entry, 0.1);
        upper2.add_adjacent_node(upper1, 0.25);
        upper2.add_adjacent_node(lower1, 0.25);
        upper2.add_adjacent_node(top, 0.25);
        upper2.add_adjacent_node(lower2, 0.25);

        this.nodes.push(entry);
        this.nodes.push(lower1);
        this.nodes.push(lower2);
        this.nodes.push(upper1);
        this.nodes.push(upper2);
        this.nodes.push(top);

    }

    configure_fan() {

        let num_servers = 6;
        let a = 5;
        let fast_rate = 5;
        let slow_rate = 140;

        let node = new JacksonNode(W - 300, H/2, fast_rate, "exit", 1);
        this.nodes.push(node);

        for (let i = 0; i < num_servers; ++i) {
            let fan_node = new JacksonNode(W/3, H/2 + (SERVER_SIZE) * a * (num_servers/2) - (SERVER_SIZE * a * i), slow_rate, "entry", 1);
            fan_node.add_adjacent_node(node, 1);
            this.nodes.push(fan_node);
        }
    }

    configure_2_fan() {

        let num_servers = 6;
        let a = 5;
        let fast_rate = 30;
        let slow_rate = 90;

        let node1 = new JacksonNode(W - 300, H/2 - 100, fast_rate, "exit", 1);
        let node2 = new JacksonNode(W - 300, H/2 + 100, fast_rate, "exit", 1);
        this.nodes.push(node1);
        this.nodes.push(node2);

        for (let i = 0; i < num_servers; ++i) {
            let fan_node = new JacksonNode(W/3, H/2 + (SERVER_SIZE) * a * (num_servers/2) - (SERVER_SIZE * a * i), slow_rate, "entry", 1);

            fan_node.add_adjacent_node(node1, 0.5);
            fan_node.add_adjacent_node(node2, 0.5);
            this.nodes.push(fan_node);
        }
    }

    configure_spiral() {

        let r = 150;

        let node1 = new JacksonNode(W/2 - r, H/2 - r, 15, "entry", 1);
        let node2 = new JacksonNode(W/2 + r, H/2 - r, 16, "reg", 2);
        let node3 = new JacksonNode(W/2 + r, H/2 + r, 17, "reg", 3);
        let node4 = new JacksonNode(W/2 - r, H/2 + r, 18, "reg", 4);

        node1.add_adjacent_node(node2, 1);
        node2.add_adjacent_node(node3, 1);
        node3.add_adjacent_node(node4, 1);
        node4.add_adjacent_node(node1, 1);

        this.nodes.push(node1);
        this.nodes.push(node2);
        this.nodes.push(node3);
        this.nodes.push(node4);
    }

    configure_steps() {

        let n = 6;
        let margin = 80;
        let gap = (SERVER_SIZE + margin);
        let dist = (n - 1) * gap;

        for (let i = 0; i < n; ++i) {

            let x = W/2 - dist/2 + gap * i;
            let y = H/2 - dist/2 + gap * i;
            let tag = "entry";
            let rate = 20 + 2*i;

            if (i == n - 1) tag = "exit";
            else if (i > 0) tag = "reg";

            let node = new JacksonNode(x, y, rate, tag, 1)

            if (i > 0) this.nodes[i-1].add_adjacent_node(node, 1);
            this.nodes.push(node);
        }
    }

    configure_waterfall() {

        let n = 6;
        let margin = 80;
        let gap = (SERVER_SIZE + margin);
        let dist = (n - 1) * gap;

        for (let i = 0; i < n; ++i) {

            let x = W/2 - dist/2 + gap * i;
            let y = H/2 - dist/2 + gap * i;
            let tag = "entry";
            let rate = 0 + 2*i;

            if (i == n - 1) tag = "exit";
            else if (i > 0) tag = "entry";

            let node = new JacksonNode(x, y, rate, tag, 1)

            if (i > 0) this.nodes[i-1].add_adjacent_node(node, 1);
            this.nodes.push(node);
        }
    }

    configure_star() {

        let r = 120;
        let rate = 80;

        let node1 = new JacksonNode(W/2 - r, H/2 - 2*r, rate, "entry", 2);
        let node2 = new JacksonNode(W/2 + r, H/2 - 2*r, rate, "entry", 2);

        let node3 = new JacksonNode(W/2 + 2*r, H/2 - r, rate, "entry", 3);
        let node4 = new JacksonNode(W/2 + 2*r, H/2 + r, rate, "entry", 3);

        let node5 = new JacksonNode(W/2 - r, H/2 + 2*r, rate, "entry", 4);
        let node6 = new JacksonNode(W/2 + r, H/2 + 2*r, rate, "entry", 4);

        let node7 = new JacksonNode(W/2 - 2*r, H/2 + r, rate, "entry", 1);
        let node8 = new JacksonNode(W/2 - 2*r, H/2 - r, rate, "entry", 1);

        let node9 = new JacksonNode(W/2, H/2, 1, "exit", 1);

        node1.add_adjacent_node(node9, 1);
        node2.add_adjacent_node(node9, 1);
        node3.add_adjacent_node(node9, 1);
        node4.add_adjacent_node(node9, 1);
        node5.add_adjacent_node(node9, 1);
        node6.add_adjacent_node(node9, 1);
        node7.add_adjacent_node(node9, 1);
        node8.add_adjacent_node(node9, 1);

        this.nodes.push(node1);
        this.nodes.push(node2);
        this.nodes.push(node3);
        this.nodes.push(node4);
        this.nodes.push(node5);
        this.nodes.push(node6);
        this.nodes.push(node7);
        this.nodes.push(node8);
        this.nodes.push(node9);
    }

    configure_lattice() {

        //non-operational

        let n = 4;
        let margin = 150;
        let gap = (SERVER_SIZE + margin);
        let dist = (n - 1) * gap;

        let rate = 4;

        let start_x = W/2 - dist/2;
        let start_y = H/2 - dist/2;

        for (let i = 0; i < n; ++i) {

            let x = start_x + i*gap;

            for (let j = 0; j < n; ++j) {

                let y = start_y + j*gap;

                let tag = (i == 0 && j == 0) ? "entry" : "reg";
                if (i == n-1 && j == n-1) tag = "exit";

                let node = new JacksonNode(x,y,rate,tag,1);

                if (i > 0 && j == 0) {
                    this.nodes[i-1].add_adjacent_node(node, 1);
                }

                this.nodes.push(node);
            }
        }

    }

    build() {
        return this.nodes;
    }
}