import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContextMenu.css';
import { Menu } from '@material-ui/core';
import MoveAction from './ContextMenuActions/MoveAction.jsx';

class ContextMenu extends Component {
    
    render() {

        const { visible, x, y, goalList } = this.props;

        let actionsComp = [];
        for (var i = 0; i < goalList.length; i++) {
            actionsComp.push(<MoveAction key={i} goalName={goalList[i]} />);
        }

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
                    <MoveAction key={i} goalName={"Change replication"} />
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
