import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import FileCopy from '@material-ui/icons/FileCopy';
import { initSubList, setVisibleDialogMove } from '../../../Actions/Actions.js';

function MoveAction(props) {
    const {handleClick, selectedFiles, goalName, isSelected} = props;
    const avatarStyle = {
        backgroundColor: isSelected ? '#ffbe59' : null
    };

    return (
        <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
            <ListItemIcon style={avatarStyle}>
                <FileCopy />
            </ListItemIcon>
            <Typography variant="inherit">
                { goalName }
            </Typography>
        </MenuItem>
    );
}

const mapStateToProps = (state) => {
    return {
        selectedFiles: state.selectedFiles
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClick: (event, selectedFiles) => {
            dispatch(initSubList());
            dispatch(setVisibleDialogMove(true));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveAction);
