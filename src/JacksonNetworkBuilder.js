class JacksonNetworkBuilder {

    constructor(nodes) {
        this.nodes = nodes;
    }

    configure(preset) {
        if (preset == "single-queue") {
            this.configure_single_queue();
        }
        else if (preset == "double-queue") {
            this.configure_double_queue();
        }
        else if (preset == "fork") {
            this.configure_fork();
        }
        else if (preset == "3-fork") {
            this.configure_3_fork();
        }
        else if (preset == "fan") {
            this.configure_fan();
        }
        else if (preset == "2-fan") {
            this.configure_2_fan();
        }
        else if (preset == "fast-track") {
            this.configure_fast_track();
        }
        else if (preset == "end") {
            this.configure_end();
        }
        else if (preset == "spiral") {
            this.configure_spiral();
        }
        else if (preset == "steps") {
            this.configure_steps();
        }
        else if (preset == "waterfall") {
            this.configure_waterfall();
        }
        else if (preset == "star") {
            this.configure_star();
        }
        else {
            this.configure_single_queue();
        }
    }

    configure_end() {
        var node1 = new JacksonNode(W - 100, H/2, 0, "entry-exit", 1);
        this.nodes.push(node1);
    }

    configure_fork() {

        var node1 = new JacksonNode(W/3, H/2, 20, "entry", 1);
        var node2 = new JacksonNode(2*W/3, H/2 - 100, 70, "exit", 1);
        var node3 = new JacksonNode(2*W/3, H/2 + 100, 70, "exit", 1);

        node1.add_adjacent_node(node2, 0.5);
        node1.add_adjacent_node(node3, 0.5);

        this.nodes.push(node1);
        this.nodes.push(node2);
        this.nodes.push(node3);

    }

    configure_3_fork() {

        let rate1 = 5;
        let rate2 = 20;

        var node1 = new JacksonNode(W/3, H/2, rate1, "entry", 1);
        var node2 = new JacksonNode(2*W/3, 1*H/4, 20, "reg", 1);
        var node3 = new JacksonNode(2*W/3, 2*H/4, 30, "exit", 1);
        var node4 = new JacksonNode(2*W/3, 3*H/4, 40, "reg", 1);

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

        var node1 = new JacksonNode(W/2, H/2, 50, "entry-exit", 1);
        this.nodes.push(node1);

    }

    configure_fast_track() {
        var node = new JacksonNode(W/2, H/2, 1, "entry-exit", 1);
        this.nodes.push(node);

    }

    configure_double_queue() {

        var node1 = new JacksonNode(W/3, H/2, 10, "entry", 1);
        var node2 = new JacksonNode(2*W/3, H/2, 11, "exit", 1);

        node1.add_adjacent_node(node2, 1);

        this.nodes.push(node1);
        this.nodes.push(node2);
    }

    configure_fan() {

        let num_servers = 6;
        let a = 5;
        let fast_rate = 10;
        let slow_rate = 90;

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

    build() {
        return this.nodes;
    }
}