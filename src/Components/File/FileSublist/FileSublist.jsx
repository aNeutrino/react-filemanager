import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    enterToDirectorySublist, setSelectedFolderSublist, setSelectedNewGoal 
} from '../../../Actions/Actions.js';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import '../File.css';

const styles = theme => ({
});


class FileSublist extends Component {
    render() {
        const { type, name, handleClick, isSelected, handleDoubleClick } = this.props;
        const avatarStyle = {
            backgroundColor: isSelected ? '#ffbe59' : null
        };
        return (
            <div className="File" onClick={handleClick} data-selected={isSelected} onDoubleClick={handleDoubleClick}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={avatarStyle}>
                            { type === 'dir' ? <FolderIcon /> : <FileIcon />}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} secondary="" />
                </ListItem>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        filePath: [...state.path, ownProps.name],
        isSelected: state.selectedFolderSublist && (state.selectedFolderSublist.name === ownProps.name)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleDoubleClick: (event) => {
            dispatch(enterToDirectorySublist(ownProps.name));
            dispatch(setSelectedFolderSublist(null));
        },

        /**
         * @param {Object} event
         * @returns {undefined}
         */
        handleClick: (event) => {
            event.stopPropagation(); 
            dispatch(setSelectedNewGoal(ownProps.name));
            dispatch(setSelectedFolderSublist(ownProps));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FileSublist));

