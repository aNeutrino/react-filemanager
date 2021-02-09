import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContextMenu.css';
import { Menu } from '@material-ui/core';
import SetGoalAction from './ContextMenuActions/SetGoalAction.jsx';

class ContextMenu extends Component {
    
    render() {

        const { visible, x, y } = this.props

        return (
            <div>
                <Menu
                    keepMounted
                    open={visible}
                    onClose={() => { }}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: y, left: x }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <SetGoalAction goalName={"Change replication"} />
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        x: state.contextMenuPosition[0] || 0,
        y: state.contextMenuPosition[1] || 0,
        visible: !!state.contextMenuVisible,
        goalList: state.goalList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
