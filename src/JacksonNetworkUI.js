class JacksonNetworkUI {
    constructor(jacksonNetwork) {
        this.jacksonNetwork = jacksonNetwork;
    }
    highlight_hovered_nodes(x,y) {
        for (let node of this.jacksonNetwork.get_nodes()) {
            if (node.is_overlapping(x,y)) {
                node.set_highlight(true);
            }
            else {
                node.set_highlight(false);
            }
        }
    }
    open_clicked_node_info_boxes(x, y) {
        for (let node of this.jacksonNetwork.get_nodes()) {
            if (node.is_overlapping(x, y)) {
                node.open_info_box();
            }
            else {
                node.close_info_box();
            }
        }
    }
}