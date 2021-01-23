import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileSublist from '../../File//FileSublist/FileSublist.jsx'; 
import Loader from '../../Loader/Loader.jsx'; 
import FileListEmptyMessage from '../FileListEmptyMessage';
import './FileListSublist.css'; 

class FileListSublist extends Component {
    render() {
        const { loadingSublist, goalList } = this.props;
        
        let fileListComponent = [];
        for (var i = 0; i < goalList.length; i++) {
            fileListComponent.push(<FileSublist key={i} name={goalList[i]} />);
        }

        return <div className="FileListSublist">
            { loadingSublist ? 
                <Loader /> : 
                fileListComponent.length ? fileListComponent : <FileListEmptyMessage />
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    const filteredList = state.fileListSublist
        .filter(file => file.type === 'dir')
        .filter(file => state.path.join('').trim() === state.pathSublist.join('').trim() ? 
            !state.selectedFiles.find(f => f.name === file.name) : true
        );
    
    return {
        fileList: filteredList,
        loadingSublist: state.loadingSublist,
        goalList: state.goalList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileListSublist);
