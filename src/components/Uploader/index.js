import React, { Component } from "react";

class Uploader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="file-upload">
                    <input type="file" />
                    <i className="fa fa-arrow-up"></i>
                </div>
            </div>
        );
    }
}

export default Uploader;