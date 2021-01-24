import React, { Component } from 'react';
import { connect } from 'react-redux';


class FileInfo extends Component {
    render() {
        const { type, name, goal } = this.props;
        
        
        return (
            <div>
                <span>type: </span>
                <span>{type } </span>
                <span>name: </span>
                <span>{name}</span>
                <span>goal: </span>
                <span>{goal}</span>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log('mapStateToProps state  ', state)
    return {
        name: state.selectedFiles.size>0 ? state.selectedFiles[0].name : '',
        type: state.selectedFiles.size>0 ? state.selectedFiles[0].type: '',
        size: state.selectedFiles.size>0 ? state.selectedFiles[0].size : ''
    };
};

const mapDispatchToProps = () => {
    return {
      
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FileInfo);

