
class JacksonNetwork {

    constructor(preset) {

        this.preset = preset;
        this.nodes = [];

        this.builder = new JacksonNetworkBuilder(this.nodes);
        this.builder.configure(preset);
        this.nodes = this.builder.build();

        this.assert_law_of_probability();
    }

    get_nodes() {
        return this.nodes;
    }

    assert_law_of_probability() {
        for (let node of this.nodes) {
            if (!node.follows_law_of_probability()) {
                throw new Error('Law of total probability not satisfied among nodes!');
            } 
        }
        return true;
    }


    display_nodes() {
        for (let node of this.nodes) {
            node.get_server().display();
        }
    }

    get_random_entry_node() {
        let entry_nodes = [];
        for (let node of this.nodes) {
            if (node.get_tag() == "entry" || node.get_tag() == "entry-exit") {
                entry_nodes.push(node);
            }
        }
        if (entry_nodes.length == 0) {
            console.log("ERROR : no entry nodes");
            return null;
        }
        let rand = Random.rand_int(entry_nodes.length);
        return entry_nodes[rand];
    }
};